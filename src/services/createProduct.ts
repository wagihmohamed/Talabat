import { api } from "@/api";
import { createProduct } from "@/api/apiURLs";

export const createProductService = async (payload: FormData) => {
    const response = await api.post(createProduct, payload);
    return response.data;
}