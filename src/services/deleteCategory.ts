import { api } from "@/api";
import { deleteCategory } from "@/api/apiURLs";

export const deleteCategoryService = async (categorytId: number) => {
  const response = await api.delete(deleteCategory + categorytId);
  return response.data;
};
