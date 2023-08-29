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
  Input,
  DialogClode,
  Textarea,
  ImageUploader,
  CustomSelect,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  addRestaurantFormInitialValues,
  addRestaurantFormSchema,
  directionOptions,
  ordersMethods,
} from "./formUtils";
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
      email: values.email.value,
      name: values.name,
      phone: values.phone,
      image: fm.get('image')?.valueOf() ?? null,
      password: values.password,
      confirm_password: values.confirm_password,
      description: values.description,
      fcm: null,
      open: true,
      cover: fm.get('cover')?.valueOf() ?? null,
      delivery_time: values.deliveryTime.toString(),
      direction: values.direction,
      distance: "10",
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
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
            <div className="flex justify items-center gap-7">
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
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <>
                    <FormItem className="flex-1 grid grid-cols-8 items-center">
                      <FormLabel className="col-span-2">رقم الهاتف</FormLabel>
                      <FormControl className="col-span-6">
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </div>

            <div className="flex justify-between items-center gap-4 mb-2">
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
                          طريقة الطلب
                        </FormLabel>
                        <FormControl className="col-span-6">
                          <CustomSelect
                            options={ordersMethods}
                            value={field.value}
                            onChange={(e: {
                              value: string,
                              label: string
                            }) => { field.onChange(e) }}
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex justify items-center gap-4">
              {/* <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-8 items-center">
                      <FormLabel className="col-span-2">
                        المسافة
                      </FormLabel>
                      <FormControl className="col-span-6">
                        <Input
                          {...field}
                          type="number"
                          value={field.value === 0 ? undefined : field.value}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              /> */}
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <>
                    <FormItem className="w-1/3 -mt-4">
                      <CustomSelect
                        withLabel
                        label="الاتجاه"
                        options={directionOptions}
                        onChange={(e: {
                          value: string,
                          label: string
                        }) => {
                          field.onChange(e.value)
                        }}
                      />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <>
                    <FormItem className="flex-1 grid grid-cols-8 items-center">
                      <FormLabel className="col-span-2">
                        وقت التوصيل
                      </FormLabel>
                      <FormControl className="col-span-6">
                        <Input
                          {...field}
                          type="number"
                          value={field.value === 0 ? undefined : field.value}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
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
