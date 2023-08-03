import { api } from "@/api";
import { deleteUser } from "@/api/apiURLs";

export const deleteDeliveryUserService = async (deliveryUserId: number) => {
    const response = await api.delete(deleteUser + `/${deliveryUserId}`);
    return response.data;
};
