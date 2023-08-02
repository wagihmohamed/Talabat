import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveryUserService } from "@/services";
import { DeliveryPerson } from "@/models";
import { toast } from "react-toastify";

export const useAddDelivery = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRestaurant: DeliveryPerson) => {
            return addDeliveryUserService(newRestaurant);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveries"]);
            toast.success("تم اضافة عامل التوصيل بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
