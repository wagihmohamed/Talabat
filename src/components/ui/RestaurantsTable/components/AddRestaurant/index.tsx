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
  Textarea,
  ImageUploader,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addRestaurantFormInitialValues, addRestaurantFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddRestaurant } from "@/hooks";
import { useState } from "react";

export const AddRestaurant = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedCover, setSelectedCover] = useState<File>();

  const {
    mutate: addRestaurant,
    isLoading,
    reset,
  } = useAddRestaurant({
    onSuccess: () => {
      reset();
      setOpen(false);
      form.reset();
    },
  });
  const form = useForm<z.infer<typeof addRestaurantFormSchema>>({
    resolver: zodResolver(addRestaurantFormSchema),
    defaultValues: addRestaurantFormInitialValues,
  });

  const onSubmit = (values: z.infer<typeof addRestaurantFormSchema>) => {
    const fm = new FormData()
    fm.append("image", selectedImage as File)
    fm.append("cover", selectedCover as File)

    addRestaurant({
      address: values.address,
      email: values.email,
      name: values.name,
      phone: values.phone,
      image: fm.get('image')?.valueOf() ?? null,
      password: values.password,
      confirm_password: values.confirm_password,
      description: values.description,
      fcm: null,
      open: true,
      cover: fm.get('cover')?.valueOf() ?? null,
    });
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
        setSelectedImage(undefined);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline">اضافه مطعم</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>اضافه مطعم</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="mx-auto flex gap-4">
              <ImageUploader placeholder="اضغط لاضافه صوره للمطعم" selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              <ImageUploader placeholder="اضغط لاضافه صوره خلفية للمطعم" selectedImage={selectedCover} setSelectedImage={setSelectedCover} />
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
            <div className="flex justify-between items-center gap-4">
              <div>
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
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormItem className="grid grid-cols-8 items-center gap-1">
                        <FormLabel className="col-span-2">
                          البريد الالكتروني
                        </FormLabel>
                        <FormControl className="col-span-6">
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="text-xs" />
                    </>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center gap-1">
                    <FormLabel className="col-span-2">
                      كلمه المرور
                    </FormLabel>
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
              name="confirm_password"
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center gap-1">
                    <FormLabel className="col-span-2">
                      وصف المطعم
                    </FormLabel>
                    <FormControl className="col-span-6">
                      <Textarea  {...field} />
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
    </Dialog >
  );
};
