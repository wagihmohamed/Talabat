import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductOptionByIdService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteProductOptionById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (optionId: number) => {
            return deleteProductOptionByIdService(optionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
