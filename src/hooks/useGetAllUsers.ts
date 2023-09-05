import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/services/getAllUsers";

export const useGetAllUsers = (data?: {
    search?: string;
    role?: string;
}) => {
    return useQuery({
        queryKey: ["getAllUsers", data],
        queryFn: () => getAllUsersService(data),
        enabled: !!data?.search || !!data?.role,
    });
}