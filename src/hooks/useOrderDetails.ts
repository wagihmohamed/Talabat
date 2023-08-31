import { useQuery } from "@tanstack/react-query";
import { getOrderDetailsService } from "@/services";

export const useOrderDetails = ({
    orderId,
}: {
    orderId: number;
}) => {
    return useQuery({
        queryKey: ["orders", orderId],
        queryFn: () => getOrderDetailsService(orderId),
    });
};
