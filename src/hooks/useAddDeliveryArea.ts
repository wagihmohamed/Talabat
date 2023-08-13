import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveryAreaService } from "@/services";
import { toast } from "react-toastify";

export const useAddDeliveryArea = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (areaName: string) => {
            return addDeliveryAreaService(areaName);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveryAreas"]);
            toast.success("تم اضافة المنطقة بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
