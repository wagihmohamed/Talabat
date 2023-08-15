import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProductOptionPayload, editProductOptionService } from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useEditProductOption = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: {
            id: number;
            payload: EditProductOptionPayload;
        }) => {
            return editProductOptionService({
                id,
                payload
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            toast.success("تم تعديل بنجاح");
            onSuccess();
        },
        onError: (error: AxiosError<{ error: string }>) => {
            toast.error(error.response?.data.error || "حدث خطأ ما");
        }
    });
}