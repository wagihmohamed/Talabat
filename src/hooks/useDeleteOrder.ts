import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteOrder = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: number) => {
            return deleteOrderService(orderId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("تم حذف الطلب بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
