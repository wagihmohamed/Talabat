import { api } from "@/api";
import { createCommonGroup } from "@/api/apiURLs";

export interface CreateCommonGroupPayload {
    products: number[];
    groups: {
        name: string;
        type: string;
        options: {
            name: string;
            value: number;
        }[];
    }[];
}

export const createCommonGroupService = async (
    payload: CreateCommonGroupPayload
) => {
    const response = await api.post<CreateCommonGroupPayload>(createCommonGroup, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};