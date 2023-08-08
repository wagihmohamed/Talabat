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
    // CustomSelect,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editDeliveryFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditDeliveryUser } from "@/hooks";
import { useState } from "react";
import { DeliveryUser } from "@/models";
import { Pencil } from "lucide-react";
// import { useRestaurants } from "@/hooks";

interface EditRestaurantProps {
    deliveryUser: DeliveryUser;
}

export const EditDelivery = ({ deliveryUser }: EditRestaurantProps) => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedImage, setSelectedImage] = useState<any>(deliveryUser.image);
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
    const form = useForm<z.infer<typeof editDeliveryFormSchema>>({
        resolver: zodResolver(editDeliveryFormSchema),
        defaultValues: {
            name: deliveryUser.name,
            phone: deliveryUser.phone,
            address: deliveryUser.address || "",
            email: deliveryUser.email,
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (values: z.infer<typeof editDeliveryFormSchema>) => {
        const fm = new FormData()
        fm.append("image", selectedImage as File)
        editDeliveryUser({
            id: deliveryUser.id,
            name: values.name,
            phone: values.phone,
            address: values.address,
            email: values.email,
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
                    className="flex w-full items-center justify-end gap-2 "
                    variant="ghost"
                >
                    تعديل
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>تعديل عامل توصيل</DialogTitle>
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
