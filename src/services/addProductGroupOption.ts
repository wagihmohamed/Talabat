import { api } from "@/api";
import { addProductGroupOption } from "@/api/apiURLs";

export interface NewProductOptions {
    productId: number;
    groups: {
        name: string;
        options: {
            name: string;
            value: number;
        }[]
    }[]

}

export const addProductGroupOptionService = async (newOptions: NewProductOptions) => {
    const response = await api.post<NewProductOptions>(addProductGroupOption, newOptions);
    return response.data;
};
