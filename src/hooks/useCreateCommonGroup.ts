import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommonGroupPayload, createCommonGroupService } from "@/services";
import { toast } from "react-toastify";

export const useCreateCommonGroup = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct: CreateCommonGroupPayload) => {
            return createCommonGroupService(newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("تم اضافة الخيار بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
