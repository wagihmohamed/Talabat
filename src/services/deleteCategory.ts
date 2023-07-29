import { sleep } from "@/lib/sleep";
import { categories } from "@/mockup";

export const deleteCategoryService = async (categorytId: number) => {
  await sleep(2000);
  const newCategoriesData = categories.filter((category) => {
    if (category.id !== categorytId) {
      return category;
    }
  });
  return newCategoriesData;
};
