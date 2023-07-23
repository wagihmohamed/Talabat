import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";
import { toast } from "react-toastify";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return loginService({ username, password });
    },
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
};
