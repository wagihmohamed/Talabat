import { api } from "@/api";
import { deleteoptionsGroupById } from "@/api/apiURLs";

export const deleteOptionsGroupByIdService = async (groupId: number) => {
    const response = await api.delete(deleteoptionsGroupById + groupId);
    return response.data;
};
