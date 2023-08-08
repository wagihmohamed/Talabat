import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDeliveryUserService } from "@/services";
import { EditDeliveryPersonPayload } from "@/models";
import { toast } from "react-toastify";

export const useEditDeliveryUser = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserData: EditDeliveryPersonPayload) => {
            return editDeliveryUserService(newUserData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["deliveries"]);
            toast.success("تم تعديل عامل التوصيل بنجاح ");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
