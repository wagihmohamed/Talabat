import { api } from "@/api";
import { addRestaurant } from "@/api/apiURLs";
import { CreateRestaurantResponse, CreateRestaurantParams } from "@/models";
import { AxiosResponse } from "axios";

export const addRestaurantsService = async (newRestaurant: CreateRestaurantParams) => {
  const response = await api.post<
    CreateRestaurantParams,
    AxiosResponse<CreateRestaurantResponse>
  >(addRestaurant, newRestaurant, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
