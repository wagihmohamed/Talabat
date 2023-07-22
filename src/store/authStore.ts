import { queryClient, router } from "@/main";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwt_decode from "jwt-decode";

interface AuthStore {
  id: string;
  token: string | null;
  email: string;
  setToken: (token: string) => void;
  logout: () => void;
}

interface TokenDecoded {
  email: string;
  id: string;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: "",
      id: "",
      subDomain: "",
      isAdmin: false,
      isStudent: false,
      isTeacher: false,
      role: "",
      setToken: (token) => {
        localStorage.setItem("token", token);
        const decodedToken: TokenDecoded = jwt_decode(token);
        const { email } = decodedToken;
        set({
          email,
          token,
          id: decodedToken.id,
        });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({
          token: null,
          email: "",
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
