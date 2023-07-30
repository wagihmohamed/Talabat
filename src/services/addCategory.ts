import { sleep } from "@/lib/sleep";
import { categories } from "@/mockup";
import { Category } from "@/models";

export const addCategoryService = async (newCategory: Category) => {
  await sleep(2000);
  const newCategories = categories.push(newCategory);
  return newCategories;
};
