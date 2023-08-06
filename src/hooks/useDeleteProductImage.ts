import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductImageService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteProductImage = ({
    productId,
}: {
    productId: number;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (imageId: number) => {
            return deleteProductImageService(imageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["products", productId]);
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
