import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDeliveryAreaService } from "@/services";
import { toast } from "react-toastify";

export const useEditDeliveryArea = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            areaId,
            areaName,
        }: {
            areaId: number,
            areaName: string,
        }) => {
            return editDeliveryAreaService(areaId, areaName);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveryAreas"]);
            toast.success("تم تعديل المنطقة بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};