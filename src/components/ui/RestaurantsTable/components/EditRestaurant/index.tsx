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
  CustomSelect,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editRestaurantFormSchema, ordersMethods } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditRestaurant } from "@/hooks";
import { useState } from "react";
import { RestuarantItemResponse } from "@/models";
import { Pencil } from "lucide-react";

interface EditRestaurantProps {
  restaurant: RestuarantItemResponse;
}

export const EditRestaurant = ({ restaurant }: EditRestaurantProps) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>(restaurant.image);

  const {
    mutate: editRestaurant,
    isLoading,
    reset,
  } = useEditRestaurant({
    onSuccess: () => {
      reset();
      setOpen(false);
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof editRestaurantFormSchema>>({
    resolver: zodResolver(editRestaurantFormSchema),
    defaultValues: {
      address: restaurant.address,
      email: restaurant.email,
      name: restaurant.name,
      phone: restaurant.phone,
    },
  });

  const getOrderMethod = (value: string) => {
    if (value === "Cart") {
      return ordersMethods.find((method) => method.value === "Cart");
    } else if (value === "Phone") {
      return ordersMethods.find((method) => method.value === "Phone");
    }
  };

  const onSubmit = (values: z.infer<typeof editRestaurantFormSchema>) => {
    const fm = new FormData()
    fm.append("image", selectedImage as File)

    editRestaurant({
      address: values.address,
      email: values.email,
      name: values.name,
      phone: values.phone,
      id: restaurant.id,
      image: fm.get('image') ?? null,
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
          className="flex w-full items-center justify-end gap-2 "
          variant="ghost"
        >
          تعديل
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>تعديل مطعم</DialogTitle>
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
              <div className="flex-1">
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
              <div className="flex-1 h-10">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <CustomSelect
                        options={ordersMethods}
                        value={getOrderMethod(field.value)}
                        onChange={(value: {
                          label: string;
                          value: string;
                        }) => {
                          field.onChange(value.value);
                        }}
                      />
                    </>
                  )}
                />
              </div>
            </div>
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
