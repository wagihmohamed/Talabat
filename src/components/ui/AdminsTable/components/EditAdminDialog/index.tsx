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
  Button,
  buttonVariants
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editAdminFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditAdmin } from "@/hooks";
import { useState } from "react";
import { ADMIN_ROLES } from "@/mockup";
import { Admin } from "@/models";
import { Pencil } from "lucide-react";

export const EditAdminDialog = ({
  admin
}: {
  admin: Admin
}) => {
  const [open, setOpen] = useState(false);
  const {
    mutate: editAdmin,
    isLoading,
    reset,
  } = useEditAdmin({
    onSuccess: () => {
      reset();
      setOpen(false);
      form.reset();
    },
  });

  const userRoles = admin.roles.map((role) => {
    return ADMIN_ROLES.find((adminRole) => adminRole.value === role)
  })


  const form = useForm<z.infer<typeof editAdminFormSchema>>({
    resolver: zodResolver(editAdminFormSchema),
    defaultValues: {
      name: admin.name,
      phone: admin.phone,
      role: userRoles,
    },
  });

  const onSubmit = (values: z.infer<typeof editAdminFormSchema>) => {
    editAdmin({
      name: values.name,
      phone: values.phone,
      roles: {
        manage_admins: false,
        manage_orders: false,
        manage_products: false,
        manage_deliveries: false,
        manage_vendors: false,
      },
      password: "123456",
      confirm_password: "123456",
      email: '',
      fcm: null,
      image: null,
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button
          className="flex w-full items-center justify-end gap-2"
          variant="ghost"
        >
          تعديل
          <Pencil className="h-4 w-4" />
        </Button>
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
                          field.onChange(e);
                        }}
                        isMulti
                        value={field.value}
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
            <DialogFooter className="mt-4">
              <Button isLoading={isLoading} size="lg" type="submit">
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
