import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategoryService } from "@/services";
import { Category } from "@/models";
import { toast } from "react-toastify";

export const useAddCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCategory: Category) => {
      return addCategoryService(newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("تم اضافة القسم بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
