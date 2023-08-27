import { api } from "@/api";
import { getSliderData } from "@/api/apiURLs";
import { SliderResponse } from "@/models";

export const getSliderDataService = async () => {
    const response = await api.get<SliderResponse>(getSliderData);
    return response.data;
};
