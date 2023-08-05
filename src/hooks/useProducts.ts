import { useQuery } from "@tanstack/react-query";
import { getAllProductsService } from "@/services";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProductsService,
    });
};
