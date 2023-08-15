import { api } from "@/api";
import { editProductGroup } from "@/api/apiURLs";

export interface EditProductGroupPayload {
    name?: string;
    options?: {
        name: string;
        value: number;
    }[]
}

export const editProductGroupService = async (
    { id, payload }: {
        id: number;
        payload: EditProductGroupPayload
    }
) => {
    const response = await api.patch(editProductGroup + id, {
        name: payload.name,
        options: payload.options
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};