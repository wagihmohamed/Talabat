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
import { useEditCategory } from "@/hooks";
import { useEffect, useState } from "react";
import { Category } from "@/models";
import { Pencil, Trash2 } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface Props {
    category: Category;
}

export const EditCategory = ({ category }: Props) => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        if (!category.image?.toString()?.includes("null")) {
            setImages([{
                dataURL: category.image,
                file: null,
            }])
        }
    }, [category.image])

    const {
        mutate: editCategory,
        isLoading,
        reset,
    } = useEditCategory({
        onSuccess: () => {
            reset();
            setOpen(false);
            form.reset();
        },
    });
    const form = useForm<z.infer<typeof addCategoryFormSchema>>({
        resolver: zodResolver(addCategoryFormSchema),
        defaultValues: {
            name: category.name,
            order: category.order.toString(),
        },
    });
    const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) => {
        editCategory({
            categoryId: category.id,
            newCategoryDate: {
                image: images[0]?.dataURL?.file ?? null,
                name: values.name,
                order: values.order ? parseInt(values.order) : undefined,
            }
        });
    };

    const onImagesChange = (
        imageList: ImageListType,
    ) => {
        setImages(imageList as never[]);
    };

    return (
        <Dialog
            onOpenChange={(open) => {
                setOpen(open);
                form.reset();
                setImages([{
                    dataURL: category.image,
                    file: null,
                }])
            }}
            open={open}
        >
            <DialogTrigger asChild>
                <Pencil className="w-5 h-5 text-amber-500 cursor-pointer" />
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
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onImagesChange}
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
                            {!images[0]?.dataURL && <p className="text-xs text-center text-destructive">
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
                                disabled={!images[0]?.dataURL}
                                isLoading={isLoading}
                                size="lg"
                                type="submit"
                            >
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
