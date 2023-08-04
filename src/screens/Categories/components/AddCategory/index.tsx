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
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addCategoryFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCategory } from "@/hooks";
import { useState } from "react";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const {
    mutate: addCategory,
    isLoading,
    reset,
  } = useAddCategory({
    onSuccess: () => {
      reset();
      setOpen(false);
      form.reset();
    },
  });
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) => {
    addCategory({ name: values.name, id: Math.random(), createdAt: new Date().toISOString(), image: "https://picsum.photos/200/300", updatedAt: new Date().toISOString() });
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
