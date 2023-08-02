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
import { addDeliveryFormSchema } from "../AddDelivey/formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditDeliveryUser } from "@/hooks";
import { useState } from "react";
import { DeliveryPerson } from "@/models";
import { Pencil } from "lucide-react";
import { useRestaurants } from "@/hooks";

interface EditRestaurantProps {
    deliveryUser: DeliveryPerson;
}

export const EditRestaurant = ({ deliveryUser }: EditRestaurantProps) => {
    const { data: restaurants = {
        results: []
    } } = useRestaurants();
    const restaurantsOptions = restaurants?.results.map((restaurant) => ({
        label: restaurant.name,
        value: restaurant.id.toString(),
    }));
    const [open, setOpen] = useState(false);
    const {
        mutate: editDeliveryUser,
        isLoading,
        reset,
    } = useEditDeliveryUser({
        onSuccess: () => {
            reset();
            setOpen(false);
            form.reset();
        },
    });
    const form = useForm<z.infer<typeof addDeliveryFormSchema>>({
        resolver: zodResolver(addDeliveryFormSchema),
        defaultValues: {
            name: deliveryUser.name,
            phone: deliveryUser.phone,
            restaurant: {
                label: deliveryUser.restaurantName,
                value: deliveryUser?.restaurantId.toString(),
            },
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (values: z.infer<typeof addDeliveryFormSchema>) => {
        editDeliveryUser({
            id: deliveryUser.id,
            name: values.name,
            phone: values.phone,
            restaurantId: parseInt(values.restaurant.value),
            restaurantName: values.restaurant.label,
            status: deliveryUser.status,
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
                    <DialogTitle>اضافه عامل توصيل</DialogTitle>
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
                            name="restaurant"
                            render={({ field }) => (
                                <>
                                    <FormItem className="grid grid-cols-8 items-center">
                                        <FormLabel className="col-span-2">المطعم</FormLabel>
                                        <FormControl className="col-span-6">
                                            <CustomSelect
                                                options={restaurantsOptions}
                                                onChange={(e: {
                                                    value: string | undefined,
                                                    label: string | undefined
                                                }) => {
                                                    field.onChange(e);
                                                }}
                                                value={field.value}
                                                placeholder="اختر مطعم"
                                                error={!!form.formState.errors.restaurant}
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <p className="text-xs font-medium text-red-500">
                                        {form.formState.errors.restaurant && "يجب اختيار مطعم"}
                                    </p>
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
