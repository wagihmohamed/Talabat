import { createDeliveryArea } from "@/api/apiURLs";
import { api } from "@/api";

export const addDeliveryAreaService = async (name: string) => {
    const response = await api.post(createDeliveryArea, {name}, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
