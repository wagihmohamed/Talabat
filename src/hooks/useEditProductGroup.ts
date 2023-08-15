import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProductGroupPayload, editProductGroupService } from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useEditProductGroup = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: {
            id: number;
            payload: EditProductGroupPayload;
        }) => {
            return editProductGroupService({
                id,
                payload
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("تم الاضافة بنجاح");
            onSuccess();
        },
        onError: (error: AxiosError<{ error: string }>) => {
            toast.error(error.response?.data.error || "حدث خطأ ما");
        }
    });
}