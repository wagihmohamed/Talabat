import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCategoryPayload, addCategoryService } from "@/services";
import { toast } from "react-toastify";

export const useAddCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCategory: AddCategoryPayload) => {
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
