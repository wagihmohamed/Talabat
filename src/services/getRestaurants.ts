import { sleep } from "@/lib/sleep";
import { restuarantsData } from "@/mockup";

export const getRestaurantsService = async () => {
  await sleep(2000);
  return restuarantsData;
};
