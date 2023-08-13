import { api } from "@/api";
import { deleteDeliveryCosy } from "@/api/apiURLs";

export const deleteRestauarantAreaCostService = async (areaId: number) => {
    const response = await api.delete(deleteDeliveryCosy + areaId);
    return response.data;
};
