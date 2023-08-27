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
import { editSliderFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useEditSlider } from "@/hooks";
import { SliderItem } from "@/models";
import { Pencil } from "lucide-react";

interface EditSliderProps {
    slider: SliderItem;
}

export const EditSlider = ({ slider }: EditSliderProps) => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedImage, setSelectedImage] = useState<any>(slider.image);

    const { mutate: editSlider, isLoading } = useEditSlider({
        onSuccess: () => {
            setOpen(false);
        }
    });

    const form = useForm<z.infer<typeof editSliderFormSchema>>({
        resolver: zodResolver(editSliderFormSchema),
        defaultValues: {
            name: slider.title,
        },
    });
    const onSubmit = (values: z.infer<typeof editSliderFormSchema>) => {
        const fm = new FormData()
        fm.append("title", values.name)
        fm.append("image", selectedImage as File)
        editSlider({
            newSliderData: fm,
            sliderId: slider.id
        })
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
                <Pencil className="w-5 h-5 text-amber-500 cursor-pointer" />
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
