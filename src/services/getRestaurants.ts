import { api } from "@/api";
import { RestuarantResponse } from "@/models";

export const getRestaurantsService = async () => {
  const response = await api.get<RestuarantResponse>("vendor/get-vendors");
  return response.data;
};
