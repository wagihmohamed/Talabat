import { api } from "@/api";
import { getDeliveriesUsers } from "@/api/apiURLs";
import { DeliveryResponse } from "@/models";

export const getDeliveriesService = async () => {
  const response = await api.get<DeliveryResponse>(getDeliveriesUsers);
  return response.data;
};
