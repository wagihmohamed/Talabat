import { api } from "@/api";
import { getProductById } from "@/api/apiURLs";
import { Product } from "@/models";

interface GetProductByIdResponse {
    message: string;
    product: Product
}

export const getProductByIdService = async (id: number) => {
    const { data } = await api.get<GetProductByIdResponse>(getProductById + id);
    return data;
}