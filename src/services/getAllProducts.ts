import { api } from "@/api";
import { getAllProducts } from "@/api/apiURLs";
import { ProductsFilterTypes } from "@/hooks";
import { ProductsResponse } from "@/models";

export const getAllProductsService = async (data?: ProductsFilterTypes) => {

    const {
        page,
        size,
        featured,
        recent,
        bestSeller,
        vendorId,
        categoryId,
        available,
    } = data || {};

    const response = await api.get<ProductsResponse>(
        getAllProducts,
        {
            params: {
                page: page || 1,
                size: size || 10,
                featured: featured || undefined,
                recent: recent || undefined,
                bestSeller: bestSeller || undefined,
                vendorId: vendorId || undefined,
                categoryId: categoryId || undefined,
                available: available || undefined,
            }
        }
    );
    return response.data;
};