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
import { addSliderFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAddSlider } from "@/hooks";

export const AddSlider = () => {
    const { mutate: addSlider, isLoading } = useAddSlider({
        onSuccess: () => {
            setOpen(false);
        }
    });
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File>();
    const form = useForm<z.infer<typeof addSliderFormSchema>>({
        resolver: zodResolver(addSliderFormSchema),
        defaultValues: {
            name: "",
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (values: z.infer<typeof addSliderFormSchema>) => {
        const fm = new FormData()
        fm.append("title", values.name)
        fm.append("image", selectedImage as File)
        addSlider(fm)
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
                <Button variant="default">اضافه سلايدر</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>اضافه سلايدر</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <div className="mx-auto flex flex-col">
                            <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                            {!selectedImage && form.formState.isSubmitted && (
                                <p className="text-destructive text-xs mt-2">
                                    يجب اختيار صوره
                                </p>
                            )}
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
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
