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
import { addRestaurantFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddRestaurant } from "@/hooks";
import { useState } from "react";

export const AddRestaurant = () => {
  const [open, setOpen] = useState(false);
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
    defaultValues: {
      address: "",
      email: "",
      name: "",
      phone: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addRestaurantFormSchema>) => {
    addRestaurant({
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: {
        city: values.address,
        street: values.address,

        geo: {
          lat: "0",
          lng: "0",
        },
        suite: values.address,
        zipcode: values.address,
      },
      company: {
        name: "XDD",
        bs: "LOL",
        catchPhrase: "LOL",
      },
      website: "LOL.COM",
      id: 0,
      username: "LOL",
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
        <Button variant="outline">اضافه مطعم</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اضافه مطعم</DialogTitle>
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
