import { sleep } from "@/lib/sleep";
import { categories } from "@/mockup";

export const getCategoriesService = async () => {
  await sleep(2000);
  return categories;
};
