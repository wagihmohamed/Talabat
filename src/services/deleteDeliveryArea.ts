import { api } from "@/api";
import { deleteDeliveryArea } from "@/api/apiURLs";

export const deleteDeliveryAreaService = async (areaId: number) => {
    const response = await api.delete(deleteDeliveryArea + areaId);
    return response.data;
};
