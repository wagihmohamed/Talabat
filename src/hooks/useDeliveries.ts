import { useQuery } from "@tanstack/react-query";
import { getDeliveriesService } from "@/services";

export const useDeliveries = () => {
    return useQuery({
        queryKey: ["deliveries"],
        queryFn: getDeliveriesService,
    });
};
