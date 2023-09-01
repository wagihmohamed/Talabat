import { api } from "@/api";
import { createCommonGroup } from "@/api/apiURLs";

export interface CreateCommonGroupPayload {
    products: number[];
    groups: {
        name: string;
        type: string;
        options: {
            name: string;
            value: string;
        }[];
    }[];
}

export const createCommonGroupService = async (
    payload: CreateCommonGroupPayload
) => {
    const response = await api.post<CreateCommonGroupPayload>(createCommonGroup, payload);
    return response;
};