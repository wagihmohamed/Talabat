import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDeliveryCostService } from "@/services";
import { toast } from "react-toastify";

export const useEditDeliveryCost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            areaCostId,
            newCostValue,
        }: {
            areaCostId: number,
            newCostValue: number,
        }) => {
            return editDeliveryCostService(areaCostId, newCostValue,);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["restaurants"]);
            toast.success("تم تعديل السعر بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};