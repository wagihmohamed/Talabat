import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestauarantAreaCostService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteRestauarantAreaCost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (areaId: number) => {
            return deleteRestauarantAreaCostService(areaId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["restaurants"]);
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
