import { api } from "@/api";
import { addDeliveryUser } from "@/api/apiURLs";
import { CreateDeliveryParams, CreateDeliveryResponse } from "@/models";
import { AxiosResponse } from "axios";

export const addDeliveryUserService = async (newDelivery: CreateDeliveryParams) => {
    const response = await api.post<CreateDeliveryResponse,
        AxiosResponse<CreateDeliveryResponse>
    >(addDeliveryUser, newDelivery);
    return response.data;
};
