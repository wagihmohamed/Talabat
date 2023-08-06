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
  Button,
  buttonVariants,
  ImageUploader,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editAdminFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditAdmin } from "@/hooks";
import { useState } from "react";
import { AdminItem } from "@/models";
import { Pencil } from "lucide-react";

export const EditAdminDialog = ({
  admin
}: {
  admin: AdminItem
}) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>(admin.image);

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

  const form = useForm<z.infer<typeof editAdminFormSchema>>({
    resolver: zodResolver(editAdminFormSchema),
    defaultValues: {
      name: admin.name,
      phone: admin.phone,
      address: admin.address,
      email: admin.email,
    },
  });

  const onSubmit = (values: z.infer<typeof editAdminFormSchema>) => {
    const fm = new FormData()
    fm.append("image", selectedImage as File)
    editAdmin({
      id: admin.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      fcm: admin.fcm,
      address: values.address,
      image: fm.get('image')?.valueOf() ?? null,
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
          <DialogTitle>تعديل مشرف</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="mx-auto flex flex-col">
              <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            </div>
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
              name="email"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">البريد الالكتروني</FormLabel>
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
              name="address"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">العنوان</FormLabel>
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
                      <Input type="number" {...field} />
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
