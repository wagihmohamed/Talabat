import { useQuery } from "@tanstack/react-query";
import { getProductByIdService } from "@/services";

export const useProductsById = ({
    productId,
}: {
    productId: number;
}) => {
    return useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProductByIdService(productId),
    });
};
