import { sleep } from "@/lib/sleep";
import { restaurantsData } from "@/mockup/restuarants";

export const getRestaurantsService = async () => {
  await sleep(2000);
  return restaurantsData;
};
