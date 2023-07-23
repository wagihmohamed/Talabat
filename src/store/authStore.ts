import { queryClient, router } from "@/main";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt_decode from "jwt-decode";

interface AuthStore {
  id: number;
  username: string;
  token: string | null;
  email: string;
  setToken: (token: string) => void;
  logout: () => void;
}

interface TokenDecoded {
  username: string;
  id: number;
  email: string;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: "",
      id: 0,
      username: "",
      setToken: (userToken) => {
        localStorage.setItem("token", userToken);
        const decodedToken: TokenDecoded = jwt_decode(userToken);
        const { email, id, username } = decodedToken;
        set({
          email,
          token: userToken,
          id,
          username,
        });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({
          token: null,
          email: "",
          id: 0,
          username: "",
        });
        queryClient.clear();
        router.navigate(`/login`);
      },
    }),
    {
      name: "auth",
    }
  )
);

export const useAuth = () => useAuthStore((state) => state);
