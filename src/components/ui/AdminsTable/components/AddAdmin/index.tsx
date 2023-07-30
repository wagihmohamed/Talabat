import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  DialogClode,
  CustomSelect,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addAdminFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAddRestaurant } from "@/hooks";
import { useState } from "react";
import { ADMIN_ROLES } from "@/mockup";

export const AddAdmin = () => {
  const [open, setOpen] = useState(false);
  //   const {
  //     mutate: addRestaurant,
  //     isLoading,
  //     reset,
  //   } = useAddRestaurant({
  //     onSuccess: () => {
  //       reset();
  //       setOpen(false);
  //       form.reset();
  //     },
  //   });
  const form = useForm<z.infer<typeof addAdminFormSchema>>({
    resolver: zodResolver(addAdminFormSchema),
    defaultValues: {
      confirmPassword: "",
      name: "",
      password: "",
      phone: "",
      role: "",
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (values: z.infer<typeof addAdminFormSchema>) => {};

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline">اضافه مشرف</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اضافه مشرف</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">الاسم</FormLabel>
                    <FormControl className="col-span-6">
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">رقم الهاتف</FormLabel>
                    <FormControl className="col-span-6">
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">الدور</FormLabel>
                    <FormControl className="col-span-6">
                      <CustomSelect
                        options={ADMIN_ROLES}
                        onChange={(e: { value: string | undefined }) => {
                          field.onChange(e.value);
                        }}
                        helperText={
                          form.formState.errors.role?.message || undefined
                        }
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">كلمه المرور</FormLabel>
                    <FormControl className="col-span-6">
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center gap-1">
                    <FormLabel className="col-span-2">
                      تاكيد كلمه المرور
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />
            <DialogFooter className="mt-4">
              {/* isLoading={isLoading} */}
              <Button size="lg" type="submit">
                اضافه
              </Button>
              <DialogClode
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                الغاء
              </DialogClode>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
