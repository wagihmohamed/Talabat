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
  ImageUploader,
  Button,
  buttonVariants
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addCategoryFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCategory } from "@/hooks";
import { useState } from "react";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const {
    mutate: addCategory,
    isLoading,
    reset,
  } = useAddCategory({
    onSuccess: () => {
      reset();
      setOpen(false);
      form.reset();
      setSelectedImage(undefined)
    },
  });
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
      order: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) => {
    const fm = new FormData()
    fm.append("image", selectedImage as File)
    addCategory({
      image: fm.get('image')?.valueOf() ?? null,
      name: values.name,
      order: values.order ? parseInt(values.order) : undefined,
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
        <Button variant="outline">اضافه قسم</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اضافه قسم</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="mx-auto flex flex-col">
              <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              {!selectedImage && form.formState.isSubmitted && <p className="text-xs text-destructive">
                يجب اختيار صوره
              </p>}
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
              name="order"
              render={({ field }) => (
                <>
                  <FormItem className="grid grid-cols-8 items-center">
                    <FormLabel className="col-span-2">الترتيب</FormLabel>
                    <FormControl className="col-span-6">
                      <Input {...field} type="number" />
                    </FormControl>
                  </FormItem>
                  <FormMessage className="text-xs" />
                </>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                disabled={!selectedImage}
                isLoading={isLoading}
                size="lg"
                type="submit"
              >
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
