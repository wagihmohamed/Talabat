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

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "اسم المستخدم يجب ان يكون اكثر من حرفين",
    })
    .max(50, {
      message: "اسم المستخدم يجب ان يكون اقل من 50 حرف",
    }),
  password: z.string().min(8).max(50),
});

export const LoginScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full h-screen bg-white default">
      <div className="grid grid-cols-12 h-full w-full">
        <div className="flex bg-white col-span-8 ">
          <img className="h-full" src={LoginImage} alt="login" />
        </div>
        <div className="flex flex-col col-span-4 justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">مرحبا بك</h1>
          <p className="text-gray-500 mb-8">
            سجل الدخول للمتابعة الى لوحة التحكم
          </p>
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
                      <Input placeholder="****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
