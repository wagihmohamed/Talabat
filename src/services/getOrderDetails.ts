import { api } from "@/api";
import { getOrderDetails } from "@/api/apiURLs";
import { Order } from ".";

interface GetOrderDeatilsResponse {
    message: string;
    order: Order
}

export const getOrderDetailsService = async (id: number) => {
    const { data } = await api.get<GetOrderDeatilsResponse>(getOrderDetails + id);
    return data;
}