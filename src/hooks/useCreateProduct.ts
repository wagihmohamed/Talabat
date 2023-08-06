import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "@/services";
import { toast } from "react-toastify";

export const useAddProduct = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct: FormData) => {
            return createProductService(newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast.success("تم اضافة المنتج بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};
