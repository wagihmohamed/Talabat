import { api } from "@/api";
import { deleteProductImage } from "@/api/apiURLs";

export const deleteProductImageService = async (id: number) => {
    const { data } = await api.delete(deleteProductImage + id);
    return data;
}