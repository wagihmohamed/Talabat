import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";
import { toast } from "react-toastify";
import { useAuth } from "@/store";
import { useNavigate } from "react-router-dom";
import { LoginParams } from "@/models";

export const useLogin = () => {
  const { setLoginVlaues } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ key, password }: LoginParams) => loginService({ key, password }),
    onSuccess: (res) => {
      setLoginVlaues(res);
      navigate("/home");
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
};
