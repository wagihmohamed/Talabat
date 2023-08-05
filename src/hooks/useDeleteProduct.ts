import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteProduct = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId: number) => {
            return deleteProductService(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast.success("تم حذف العنصر بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
