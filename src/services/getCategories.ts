import { api } from "@/api";
import { getCategoreis } from "@/api/apiURLs";
import { Category } from "@/models";

interface CategoryResponse {
  results: Category[];
}

export const getCategoriesService = async () => {
  const response = await api.get<CategoryResponse>(getCategoreis);
  return response.data;
};
