import { api } from "@/api";
import { editDeliveryArea } from "@/api/apiURLs";


export const editDeliveryAreaService = async (areaId: number, name: string) => {
    const response = await api.patch(editDeliveryArea + areaId, { name }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;

}