import { api } from "@/api";
import { deleteProduct } from "@/api/apiURLs";

export const deleteProductService = async (id: number) => {
    const response = await api.delete(deleteProduct + id);
    return response;
}