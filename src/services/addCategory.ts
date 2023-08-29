import { addCategory } from "@/api/apiURLs";
import { api } from "@/api";
import { Category } from "@/models";
import { AxiosResponse } from "axios";

export interface AddCategoryPayload {
  name: string;
  image: File | undefined | FormData | string | object | null;
  order?: number;
}

interface AddCategoryResponse {
  message: string;
  category: Category;
}

export const addCategoryService = async (newCategory: AddCategoryPayload) => {
  const response = await api.post<
    AddCategoryPayload,
    AxiosResponse<AddCategoryResponse>
  >(addCategory, newCategory, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
