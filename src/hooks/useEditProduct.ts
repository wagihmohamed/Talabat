import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProductPayload } from "@/models";
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
            payload: EditProductPayload;
        }) => {
            return editProductService(id, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            onSuccess();
        },
        onError: (error: AxiosError<{ error: string }>) => {
            toast.error(error.response?.data.error || "حدث خطأ ما");
        }
    });
}