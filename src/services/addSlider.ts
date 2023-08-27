import { api } from "@/api";
import { addSlider } from "@/api/apiURLs";

export const addSliderService = async (payload: FormData) => {
    const response = await api.post(addSlider, payload);
    return response.data;
}