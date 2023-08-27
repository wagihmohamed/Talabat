import { api } from "@/api";
import { editSlider } from "@/api/apiURLs";

export const editSliderService = async ({ newSliderData, sliderId }: {
    newSliderData: FormData,
    sliderId: number,
}) => {
    const response = await api.patch(editSlider + sliderId, newSliderData);
    return response.data;
};
