import { useQuery } from "@tanstack/react-query";
import { getAllProductsService } from "@/services";

export interface ProductsFilterTypes {
    page: number;
    size: number;
    available: boolean | undefined;
    featured: boolean | undefined;
    recent: boolean | undefined;
    bestSeller: boolean | undefined;
    vendorId: string | undefined;
    categoryId: string | undefined;
}

export const useProducts = (
    searchFilters?: ProductsFilterTypes
) => {
    return useQuery({
        queryKey: ["products", searchFilters],
        queryFn: () => getAllProductsService(searchFilters),
    });
};
