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
    ImageUploader,
} from "@/components";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { addCategoryFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditCategory } from "@/hooks";
import { useState } from "react";
import { Category } from "@/models";
import { Pencil } from "lucide-react";

interface Props {
    category: Category;
}

export const EditCategory = ({ category }: Props) => {
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedImage, setSelectedImage] = useState<any>(category.image);
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
        },
    });
    const onSubmit = (values: z.infer<typeof addCategoryFormSchema>) => {
        const fm = new FormData()
        fm.append("image", selectedImage as File)
        editCategory({
            categoryId: category.id,
            newCategoryDate: {
                image: fm.get('image')?.valueOf() ?? null,
                name: values.name,
            }
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
