import { LoginImage } from "@/assets";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./formUtils";
import { useLogin } from "@/hooks";

export const LoginScreen = () => {
  const { mutate: login, isError, error, isLoading } = useLogin();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    login({
      key: values.username,
      password: values.password,
    });
  };

  return (
    <div className="w-full h-screen bg-white default">
      <div className="grid grid-cols-12 h-full w-full">
        <div className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4 justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">مرحبا بك</h1>
          <p className="text-gray-500 mb-8">
            سجل الدخول للمتابعة الى لوحة التحكم
          </p>
          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">خطأ!</strong>
              <span className="block sm:inline">{error?.message}</span>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-2/3"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder="saher" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input placeholder="****" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button isLoading={isLoading} className="w-full" type="submit">
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </div>
        <div className="hidden bg-white sm:hidden md:flex md:col-span-6 lg:col-span-8 ">
          <img
            className="h-full sm:hidden md:block object-cover"
            src={LoginImage}
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

/* 
 
*/
