import { api } from "@/api";
import { editProduct } from "@/api/apiURLs";

export const editProductService = async (
    id: number,
    payload: FormData
) => {
    const response = await api.patch(editProduct + id, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};