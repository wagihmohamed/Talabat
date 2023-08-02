import { api } from "@/api";
import { editRestaurant } from "@/api/apiURLs";
import { EditRestaurantParams, CreateRestaurantResponse } from "@/models";
import { AxiosResponse } from "axios";

export const editRestaurantsService = async (newRestauran: EditRestaurantParams) => {
  const response = await api.patch<
    EditRestaurantParams,
    AxiosResponse<CreateRestaurantResponse>
  >(editRestaurant, newRestauran);
  return response.data;
};
