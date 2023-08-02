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
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addRestaurantFormSchema } from "./formUtils";
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

  const form = useForm<z.infer<typeof addRestaurantFormSchema>>({
    resolver: zodResolver(addRestaurantFormSchema),
    defaultValues: {
      address: restaurant.address,
      email: restaurant.email,
      name: restaurant.name,
      phone: restaurant.phone,
    },
  });
  const onSubmit = (values: z.infer<typeof addRestaurantFormSchema>) => {
    editRestaurant({
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
        <Button
          className="flex w-full items-center justify-end gap-2 "
          variant="ghost"
        >
          تعديل
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل مطعم</DialogTitle>
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
