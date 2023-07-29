import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) => {
      return deleteCategoryService(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("تم حذف القسم بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
