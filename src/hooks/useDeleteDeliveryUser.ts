import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeliveryUserService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteDeliveryUser = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (deliveryUserId: number) => {
            return deleteDeliveryUserService(deliveryUserId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveries"]);
            toast.success("تم حذف عامل التوصيل بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
