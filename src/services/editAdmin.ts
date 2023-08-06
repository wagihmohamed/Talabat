import { api } from "@/api";
import { editAdmin } from "@/api/apiURLs";
import { EditAdminPayload } from "@/models";

export const editAdminService = async (newRestauran: EditAdminPayload) => {
    const response = await api.patch<EditAdminPayload>(editAdmin, newRestauran);
    return response.data;
};
