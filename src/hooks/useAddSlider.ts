import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSliderService } from "@/services";
import { toast } from "react-toastify";

export const useAddSlider = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSldier: FormData) => {
            return addSliderService(newSldier);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["sliders"]);
            toast.success("تم اضافة السلايدر بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
