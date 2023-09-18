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
  CustomSelect,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editRestaurantFormSchema, ordersMethods } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditRestaurant } from "@/hooks";
import { useEffect, useState } from "react";
import { RestuarantItemResponse } from "@/models";
import { Pencil, Trash2 } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface EditRestaurantProps {
  restaurant: RestuarantItemResponse;
}

export const EditRestaurant = ({ restaurant }: EditRestaurantProps) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);
  const [coverImages, setCoverImages] = useState<ImageListType>([]);

  useEffect(() => {
    if (restaurant.image) {
      setImages([{ dataURL: restaurant.image }]);

    }
    if (restaurant.cover) {
      setCoverImages([{ dataURL: restaurant.cover }]);
    }
  }, [restaurant]);

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
      free_delivery_limit: restaurant.free_delivery_limit,
    },
  });

  const getOrderMethod = (value: string) => {
    if (value === "Cart") {
      return ordersMethods.find((method) => method.value === "Cart");
    } else if (value === "Phone") {
      return ordersMethods.find((method) => method.value === "Phone");
    }
  };

  const onImagesChange = (
    imageList: ImageListType,
  ) => {
    setImages(imageList);
  };

  const onCoverChange = (
    imageList: ImageListType,
  ) => {
    setCoverImages(imageList);
  };

  const onSubmit = (values: z.infer<typeof editRestaurantFormSchema>) => {
    const formData = new FormData();

    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("id", restaurant.id.toString());
    if (restaurant.image !== images[0]?.dataURL) {
      formData.append("image", images[0]?.file || '');
    }
    if (restaurant.cover !== coverImages[0]?.dataURL) {
      formData.append("cover", coverImages[0]?.file || '');
    }
    formData.append("free_delivery_limit", values.free_delivery_limit);
    editRestaurant(formData);
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
            <div className="mx-auto flex gap-4">
              <div className="flex flex-col justify-center items-center">
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onImagesChange}
                  key={images[0]?.dataURL}
                >
                  {({ imageList, onImageUpload, onImageRemove, }) => (
                    <div>
                      {imageList.length < 1 && <div onClick={onImageUpload} className="w-32 h-32 relative rounded-3xl cursor-pointer flex justify-center items-center border-4">
                        <span className="text-gray-500 text-xs text-center">{"اضغط لاضافة صورة"}</span>
                      </div>}
                      &nbsp;
                      {imageList[0]?.dataURL && <div key={imageList[0]?.dataURL} className="image-item">
                        <div>
                          <div className="relative">
                            <img
                              alt="not found"
                              className="w-32 h-32 rounded-3xl object-contain"
                              src={imageList[0]?.dataURL}
                            />
                            <br />
                            <Trash2
                              className="w-6 h-6 text-red-500 cursor-pointer absolute top-0 right-0"
                              onClick={() => onImageRemove(0)}
                            />
                          </div>
                        </div>
                      </div>}
                    </div>
                  )}
                </ImageUploading>
                <p className="text-xs">صورة المطعم</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <ImageUploading
                  multiple
                  value={coverImages}
                  onChange={onCoverChange}
                  key={coverImages[0]?.dataURL}
                >
                  {({ imageList, onImageUpload, onImageRemove, }) => (
                    <div className="upload__image-wrapper">
                      {imageList.length < 1 && <div onClick={onImageUpload} className="w-32 h-32 relative rounded-3xl cursor-pointer flex justify-center items-center border-4">
                        <span className="text-gray-500 text-xs text-center">{"اضغط لاضافة صورة"}</span>
                      </div>}
                      &nbsp;
                      {imageList[0]?.dataURL && <div key={imageList[0]?.dataURL} className="image-item">
                        <div>
                          <div className="relative">
                            <img
                              alt="not found"
                              className="w-32 h-32 rounded-3xl object-contain"
                              src={imageList[0]?.dataURL}
                            />
                            <br />
                            <Trash2
                              className="w-6 h-6 text-red-500 cursor-pointer absolute top-0 right-0"
                              onClick={() => onImageRemove(0)}
                            />
                          </div>
                        </div>
                      </div>}
                    </div>
                  )}
                </ImageUploading>
                <p className="text-xs">صورة الغلاف</p>
              </div>
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
            <FormField
              control={form.control}
              name="free_delivery_limit"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">قيمة التوصيل المجاني</FormLabel>
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
                تعديل
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
