import { queryClient, router } from "@/main";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import jwt_decode from "jwt-decode";
import { LoginResponse } from "@/models";

interface AuthStore extends LoginResponse {
  setLoginVlaues: (token: LoginResponse) => void;
  logout: () => void;
}

// interface TokenDecoded {
//   userId: number;
//   iat: number;
//   exp: number;
// }

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      message: "",
      user: {
        id: 0,
        name: "",
        fcm: "",
        email: "",
        phone: "",
        role: '',
        super_admin: false,
        roles: {
          id: 0,
          manage_orders: false,
          manage_products: false,
          manage_admins: false,
          manage_deliveries: false,
          manage_vendors: false,
          createdAt: "",
          updatedAt: "",
          adminId: 0,
        },
        token: "",
      },
      setLoginVlaues: (LoginResponse: LoginResponse) => {
        localStorage.setItem("token", LoginResponse.user.token);
        set({
          message: LoginResponse.message,
          user: {
            email: LoginResponse.user.email,
            fcm: LoginResponse.user.fcm,
            id: LoginResponse.user.id,
            name: LoginResponse.user.name,
            phone: LoginResponse.user.phone,
            role: LoginResponse.user.role,
            roles: {
              adminId: LoginResponse.user.roles.adminId,
              createdAt: LoginResponse.user.roles.createdAt,
              id: LoginResponse.user.roles.id,
              manage_admins: LoginResponse.user.roles.manage_admins,
              manage_deliveries: LoginResponse.user.roles.manage_deliveries,
              manage_orders: LoginResponse.user.roles.manage_orders,
              manage_products: LoginResponse.user.roles.manage_products,
              manage_vendors: LoginResponse.user.roles.manage_vendors,
              updatedAt: LoginResponse.user.roles.updatedAt,
            },
            super_admin: LoginResponse.user.super_admin,
            token: LoginResponse.user.token,
          }
        });
      },
      logout: () => {
        set({
          message: "",
          user: {
            id: 0,
            name: "",
            fcm: "",
            email: "",
            phone: "",
            role: "",
            super_admin: false,
            roles: {
              id: 0,
              manage_orders: false,
              manage_products: false,
              manage_admins: false,
              manage_deliveries: false,
              manage_vendors: false,
              createdAt: "",
              updatedAt: "",
              adminId: 0,
            },
            token: "",
          },
        });
        localStorage.removeItem("token");
        queryClient.clear();
        router.navigate(`/`);
      },
    }),
    {
      name: "auth",
    }
  )
);

export const useAuth = () => useAuthStore((state) => state);
