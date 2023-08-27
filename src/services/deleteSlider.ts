import { api } from "@/api";
import { deleteSlider } from "@/api/apiURLs";

export const deleteSliderService = async (sliderId: number) => {
    const response = await api.delete(deleteSlider + sliderId);
    return response.data;
};
