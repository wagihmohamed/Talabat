import { sleep } from "@/lib/sleep";
import { restuarantsData } from "@/mockup";
import { Restuarant } from "@/models";

export const editRestaurantsService = async (newRestauran: Restuarant) => {
  await sleep(2000);
  const newRestaurantData = restuarantsData.map((restaurant) => {
    if (restaurant.id === newRestauran.id) {
      return newRestauran;
    }
    return restaurant;
  });
  return newRestaurantData;
};
