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
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addDeliveryFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDelivery } from "@/hooks";
import { useState } from "react";

export const AddDelivery = () => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File>();

    const {
        mutate: addDeliveryUser,
        isLoading,
        reset,
    } = useAddDelivery({
        onSuccess: () => {
            reset();
            setOpen(false);
            form.reset();
        },
    });
    const form = useForm<z.infer<typeof addDeliveryFormSchema>>({
        resolver: zodResolver(addDeliveryFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            confirm_password: "",
            email: "",
            password: "",
        },
    });
    console.log(form.formState.errors);

    const onSubmit = (values: z.infer<typeof addDeliveryFormSchema>) => {
        const fm = new FormData()
        fm.append("image", selectedImage as File)
        addDeliveryUser({
            name: values.name,
            phone: values.phone,
            address: values.address,
            password: values.password,
            confirm_password: values.confirm_password,
            email: values.email,
            fcm: null,
            image: fm.get('image')?.valueOf() ?? null,
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
                <Button variant="outline">اضافه عامل توصيل</Button>
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
                            name="address"
                            render={({ field }) => (
                                <>
                                    <FormItem className="grid grid-cols-8 items-center">
                                        <FormLabel className="col-span-2"> العنوان</FormLabel>
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
                            name="password"
                            render={({ field }) => (
                                <>
                                    <FormItem className="grid grid-cols-8 items-center">
                                        <FormLabel className="col-span-2">كلمه المرور</FormLabel>
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
                                    <FormItem className="grid grid-cols-8 items-center">
                                        <FormLabel className="col-span-2">تاكيد كلمه المرور</FormLabel>
                                        <FormControl className="col-span-6">
                                            <Input type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                    <FormMessage className="text-xs" />
                                </>
                            )}
                        />
                        {/* <FormField
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
                        /> */}
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
