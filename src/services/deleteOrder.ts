import { api } from "@/api";
import { deleteOrder } from "@/api/apiURLs";

export const deleteOrderService = async (id: number) => {
    const response = await api.delete(deleteOrder + id);
    return response;
}