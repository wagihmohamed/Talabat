import { api } from "@/api";
import { getDeliveryArea } from "@/api/apiURLs";
import { DeliveryAreas } from "@/models";

export const getDeliveryAreasService = async () => {
    const response = await api.get<DeliveryAreas>(getDeliveryArea);
    return response.data;
};
