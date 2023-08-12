import { useQuery } from "@tanstack/react-query";
import { getDeliveryAreasService } from "@/services";

export const useDeliveryAreas = () => {
    return useQuery({
        queryKey: ["deliveryAreas"],
        queryFn: getDeliveryAreasService,
    });
};
