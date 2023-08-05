import { api } from "@/api";
import { editProduct } from "@/api/apiURLs";
import { EditProductPayload } from "@/models";

export const editProductService = async (
    id: number,
    payload: EditProductPayload
) => {
    const response = await api.patch(editProduct + id, payload);
    return response.data;
};