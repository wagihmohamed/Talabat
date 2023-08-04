import { api } from "@/api";
import { updatedAdminRole } from "@/api/apiURLs";

export const updateAdminRoles = async (userId: number, roles: { [x: string]: boolean; }) => {
    const response = await api.patch(
        updatedAdminRole + '?userId=' + userId
        , roles

    );
    return response.data;
};