import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategoryService, EditCategoryPayload } from "@/services/editCategory";
import { toast } from "react-toastify";

export const useEditCategory = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            categoryId,
            newCategoryDate,
        }: {
            categoryId: number,
            newCategoryDate: EditCategoryPayload,
        }) => {
            return editCategoryService(categoryId, newCategoryDate,);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            toast.success("تم تعديل القسم بنجاح");
            onSuccess();
        },
        onError: () => {
            toast.error("حدث خطأ ما");
        },
    });
};