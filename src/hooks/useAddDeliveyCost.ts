import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeliveryCostForVendorPayload, addDeliveryCostForVendorService } from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useAddDeliveryCost = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRestaurant: addDeliveryCostForVendorPayload) => {
            return addDeliveryCostForVendorService(newRestaurant);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveryCosts"]);
            toast.success("تم تعديل مناطق التوصيل بنجاح");
            onSuccess();
        },
        onError: (err: AxiosError<{ error: string; }>) => {
            toast.error(err.response?.data.error || "حدث خطأ اثناء تعديل مناطق التوصيل");
        },
    });
};
