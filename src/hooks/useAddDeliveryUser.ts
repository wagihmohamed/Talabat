import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveryUserService } from "@/services";
import { CreateDeliveryParams } from "@/models";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useAddDelivery = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRestaurant: CreateDeliveryParams) => {
            return addDeliveryUserService(newRestaurant);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveries"]);
            toast.success("تم اضافة عامل التوصيل بنجاح");
            onSuccess();
        },
        onError: (err: AxiosError<{ error: string; }>) => {
            toast.error(err.response?.data.error || "حدث خطأ اثناء اضافة عامل التوصيل");
        },
    });
};
