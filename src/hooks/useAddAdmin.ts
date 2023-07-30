import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAdminService } from "@/services";
import { AddAdminParams } from "@/models";
import { toast } from "react-toastify";

export const useAddAdmin = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAdmin: AddAdminParams) => {
      return addAdminService(newAdmin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("تم اضافة المشرف بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
