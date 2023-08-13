import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOptionsGroupByIdService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteOptionsGroupById = ({
    onSuccess,
    productId,
}: {
    onSuccess: () => void;
    productId: string;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (groupId: number) => {
            return deleteOptionsGroupByIdService(groupId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products", productId]);
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
