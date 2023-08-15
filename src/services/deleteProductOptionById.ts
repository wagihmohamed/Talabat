import { api } from "@/api";
import { deleteProductOptionById } from "@/api/apiURLs";

export const deleteProductOptionByIdService = async (optionId: number) => {
    const response = await api.delete(deleteProductOptionById + optionId);
    return response.data;
};
