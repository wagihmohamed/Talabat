import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewProductOptions, addProductGroupOptionService } from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useAddGroupOptions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRestaurant: NewProductOptions) => {
            return addProductGroupOptionService(newRestaurant);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast.success("تم تعديل  بنجاح");
        },
        onError: (err: AxiosError<{ error: string; }>) => {
            toast.error(err.response?.data.error || "حدث خطأ");
        },
    });
};
