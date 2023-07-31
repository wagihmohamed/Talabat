import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteAdmin = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: number) => {
      return deleteAdminService(adminId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("تم حذف المشرف بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
