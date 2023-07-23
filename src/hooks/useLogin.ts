import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";
import { toast } from "react-toastify";
import { useAuth } from "@/store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
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
    onSuccess: (res: string) => {
      setToken(res);
      navigate("/home");
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
};
