import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSliderService } from "@/services";
import { toast } from "react-toastify";

export const useEditSlider = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ newSliderData, sliderId }: {
            newSliderData: FormData,
            sliderId: number,
        }) => {
            return editSliderService({ newSliderData, sliderId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["sliders"]);
            toast.success("تم تعديل السلايدر بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
