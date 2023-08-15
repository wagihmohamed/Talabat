import { api } from "@/api";
import { editProductOption } from "@/api/apiURLs";

export interface EditProductOptionPayload {
    name: string;
    value: number;
}

export const editProductOptionService = async (
    { id, payload }: {
        id: number;
        payload: EditProductOptionPayload
    }
) => {
    const response = await api.patch(editProductOption + id, payload);
    return response.data;
};