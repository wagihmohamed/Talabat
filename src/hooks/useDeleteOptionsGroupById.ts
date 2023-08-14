import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOptionsGroupByIdService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteOptionsGroupById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (groupId: number) => {
            return deleteOptionsGroupByIdService(groupId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
