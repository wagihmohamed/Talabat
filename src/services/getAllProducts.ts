import { api } from "@/api";
import { getAllProducts } from "@/api/apiURLs";
import { ProductsResponse } from "@/models";

export const getAllProductsService = async () => {
    const response = await api.get<ProductsResponse>(getAllProducts);
    return response.data;
};