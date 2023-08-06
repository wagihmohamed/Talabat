import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductService } from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useEditProduct = ({
    onSuccess,
}: {
    onSuccess: () => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: {
            id: number;
            payload: FormData;
        }) => {
            return editProductService(id, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast.success("تم تعديل المنتج بنجاح");
            onSuccess();
        },
        onError: (error: AxiosError<{ error: string }>) => {
            toast.error(error.response?.data.error || "حدث خطأ ما");
        }
    });
}