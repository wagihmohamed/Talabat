import { api } from "@/api";
import { deleteUser } from "@/api/apiURLs";

export const deleteRestaurantsService = async (restaurantId: number) => {
  const response = await api.delete(deleteUser + `/${restaurantId}`);
  return response.data;
};
