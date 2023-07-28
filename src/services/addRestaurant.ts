import { sleep } from "@/lib/sleep";
import { restuarantsData } from "@/mockup";
import { Restuarant } from "@/models";

export const addRestaurantsService = async (newRestaurant: Restuarant) => {
  await sleep(2000);
  const newRestaurantData = restuarantsData.push(newRestaurant);
  return newRestaurantData;
};
