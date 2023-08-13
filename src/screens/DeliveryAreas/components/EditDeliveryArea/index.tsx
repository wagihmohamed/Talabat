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
import { editDeliveryAreaFormSchema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditDeliveryArea } from "@/hooks";
import { useState } from "react";
import { DeliveryArea } from "@/models";
import { Pencil } from "lucide-react";

interface Props {
    area: DeliveryArea;
}

export const EditDeliveryArea = ({ area }: Props) => {
    const [open, setOpen] = useState(false);
    const {
        mutate: editAreaName,
        isLoading,
        reset,
    } = useEditDeliveryArea({
        onSuccess: () => {
            reset();
            setOpen(false);
            form.reset();
        },
    });
    const form = useForm<z.infer<typeof editDeliveryAreaFormSchema>>({
        resolver: zodResolver(editDeliveryAreaFormSchema),
        defaultValues: {
            name: area.name,
        },
    });

    const onSubmit = (values: z.infer<typeof editDeliveryAreaFormSchema>) => {
        editAreaName({
            areaId: area.id,
            areaName: values.name,
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
