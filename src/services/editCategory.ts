import { api } from "@/api";
import { editCategory } from "@/api/apiURLs";

export interface EditCategoryPayload {
    name: string;
    image: File | undefined | FormData | string | object | null;

}

export const editCategoryService = async (categorytId: number, newCategoryDate: EditCategoryPayload) => {
    const response = await api.patch(editCategory + categorytId, newCategoryDate, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;

}