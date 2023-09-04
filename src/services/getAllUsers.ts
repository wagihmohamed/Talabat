import { api } from "@/api";
import { getAllUsers } from "@/api/apiURLs";

export interface UsersResponse {
    count: number;
    pages: number | null;
    results: {
        id: number;
        name: string;
        email: string;
        phone: string;
        password: string;
        address: string;
        role: string;
        image: string;
    }[];
}

export const getAllUsersService = async (data?: {
    search?: string;
    role?: string;
}) => {

    const {
        role,
        search
    } = data || {};

    const response = await api.get<UsersResponse>(
        getAllUsers,
        {
            params: {
                role: role || undefined,
                search: search || undefined,
                size: 100
            }
        }
    );
    return response.data;
};