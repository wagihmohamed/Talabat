import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAdminService } from "@/services";
import { AddAdminParams } from "@/models";
import { toast } from "react-toastify";

export const useEditAdmin = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAdmin: AddAdminParams) => {
            return editAdminService(newAdmin);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admins"]);
            toast.success("تم تعديل المشرف بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
