import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeliveryAreaService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteDeliveryArea = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (areaId: number) => {
            return deleteDeliveryAreaService(areaId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveryAreas"]);
            toast.success("تم حذف المنطقة بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
