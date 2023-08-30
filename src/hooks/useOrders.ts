import { useQuery } from "@tanstack/react-query";
import { getOrdersService } from "@/services";

export const useOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrdersService(),
    });
};
