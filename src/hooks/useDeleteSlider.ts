import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSliderService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteSlider = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (sliderId: number) => {
            return deleteSliderService(sliderId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["sliders"]);
            toast.success("تم حذف العنصر بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
