import { api } from "@/api";
import { editDeliveryUser } from "@/api/apiURLs";
import { EditDeliveryPersonPayload } from "@/models";

export const editDeliveryUserService = async (newDeliveryData: EditDeliveryPersonPayload) => {
    const response = await api.patch<EditDeliveryPersonPayload>(editDeliveryUser, newDeliveryData);
    return response.data;
};
