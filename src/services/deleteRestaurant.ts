import { sleep } from "@/lib/sleep";
import { restuarantsData } from "@/mockup";

export const deleteRestaurantsService = async (restaurantId: number) => {
  await sleep(2000);
  const newRestaurantData = restuarantsData.filter((restaurant) => {
    if (restaurant.id !== restaurantId) {
      return restaurant;
    }
  });
  return newRestaurantData;
};
