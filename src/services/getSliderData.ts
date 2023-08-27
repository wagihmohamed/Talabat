import { api } from "@/api";
import { getSliderData } from "@/api/apiURLs";
import { ResultResponse } from "@/models";

export const getSliderDataService = async () => {
    const response = await api.get<ResultResponse>(getSliderData);
    return response.data;
};
