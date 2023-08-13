import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormField,
    FormItem,
    FormLabel,
    Input,
    DialogClode,
    CustomSelect,
    FormMessage,
} from "@/components";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
    addRestaurantDeliveryCostFormSchema,
} from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useAddDeliveryCost,
    useDeleteRestauarantAreaCost,
    useDeliveryAreas,
    useEditDeliveryCost,
} from "@/hooks";
import { useState } from "react";
import { RestuarantItemResponse } from "@/models";
import { X } from "lucide-react";

interface Props {
    restaurant: RestuarantItemResponse;
}

export const AddDeliveryCost = ({ restaurant }: Props) => {
    const addRestaurantDeliveryCostFormInitialValues = {
        costs: restaurant.areas ? restaurant.areas.map((area) => (
            {
                areaId: area.id,
                areaName: area.name,
                cost: parseInt(area.delivery_cost.cost),
                areaItemId: area.delivery_cost.id,
            })) : [
            {
                areaId: 0,
                areaName: '',
                cost: 0
            }
        ]
    }

    const { mutate: editCost, isLoading: isEditing } = useEditDeliveryCost();
    const { data: deliveryArea } = useDeliveryAreas();
    const { mutateAsync: deleteDeliveryCost, isLoading: isDeleting } = useDeleteRestauarantAreaCost();
    const deliveryAreaOptions = deliveryArea?.results?.map((area) => ({
        label: area.name,
        value: area.id.toString(),
    }));
    const [open, setOpen] = useState(false);
    const {
        mutate: addDeliveryCost,
        isLoading,
        reset,
    } = useAddDeliveryCost({
        onSuccess: () => {
            reset();
            setOpen(false);
            form.reset();
        },
    });
    const form = useForm<z.infer<typeof addRestaurantDeliveryCostFormSchema>>({
        resolver: zodResolver(addRestaurantDeliveryCostFormSchema),
        defaultValues: addRestaurantDeliveryCostFormInitialValues,

    });

    const newAddedAreas = form.getValues().costs.filter((cost) => !cost.areaItemId);
    const onSubmit = () => {
        if (newAddedAreas.length) {
            addDeliveryCost({
                vendorId: restaurant.id,
                costs: newAddedAreas.map((cost) => ({
                    area: cost.areaId,
                    cost: cost.cost,
                })),
            });
        }
    };

    const { fields, remove, append } = useFieldArray({
        name: "costs",
        control: form.control,
    })
    const costs = form.watch("costs");

    return (
        <Dialog
            onOpenChange={(open) => {
                setOpen(open);
                form.reset();
            }}
            open={open}
            key={restaurant.id}
        >
            <DialogTrigger asChild>
                <Button
                    className="flex w-full items-center justify-end gap-2 "
                    variant="ghost"
                >
                    تكلفة توصيل
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>تكلفة توصيل</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormItem>
                            <FormLabel>المناطق</FormLabel>
                            <div className="flex flex-col gap-4">
                                {fields.length ? fields.map((field, index) => (
                                    <div key={field.id} className={`flex mb-6 gap-4 relative ${isDeleting || isEditing && 'opacity-40'}`}>
                                        <FormField
                                            control={form.control}
                                            key={field.id}
                                            name={`costs.${index}.areaId`}
                                            render={() => (
                                                <>
                                                    <X className="absolute text-red-500 -top-7 left-2 cursor-pointer"
                                                        onClick={() => {
                                                            if (field.areaItemId) {
                                                                deleteDeliveryCost(field.areaItemId)
                                                                remove(index)
                                                            } else {
                                                                remove(index)
                                                            }
                                                        }}
                                                    />
                                                    <CustomSelect
                                                        className="w-1/2"
                                                        placeholder="اختر المنطقة"
                                                        defaultValue={{
                                                            label: field.areaName,
                                                            value: field.areaId.toString(),
                                                        }}
                                                        disabled={field.areaItemId ? true : false}
                                                        onChange={(e: {
                                                            label: string;
                                                            value: string;
                                                        }) => {
                                                            form.setValue(
                                                                `costs.${index}.areaId`,
                                                                parseInt(e.value)
                                                            );
                                                            form.setValue(
                                                                `costs.${index}.areaName`,
                                                                e.label
                                                            );
                                                        }}
                                                        options={deliveryAreaOptions || []}
                                                    />
                                                    <div className="flex flex-col w-full space-y-2 -mt-5">
                                                        <FormLabel>التكلفة</FormLabel>
                                                        <Input
                                                            type="number"
                                                            defaultValue={field.cost || undefined}
                                                            onChange={(e) => {
                                                                form.setValue(
                                                                    `costs.${index}.cost`,
                                                                    parseInt(e.target.value)
                                                                );
                                                            }}
                                                        />
                                                        <FormMessage />
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-1/3 mt-1"
                                                        onClick={() => {
                                                            editCost({
                                                                areaCostId: field.areaItemId || 0,
                                                                newCostValue: form.getValues().costs[index].cost,
                                                            });
                                                        }}
                                                        disabled={
                                                            isDeleting ||
                                                            costs[index].cost === field.cost ||
                                                            isEditing
                                                        }
                                                    >
                                                        تعديل التكلفة
                                                    </Button>
                                                </>
                                            )}
                                        />
                                    </div>
                                )) : (
                                    <p className="text-center mb-5 font-semibold">
                                        لا يوجد مناطق متاحة, يرجى اضافة منطقة جديدة
                                    </p>
                                )}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => append({ cost: 0, areaId: 0, areaName: '' })}
                                >
                                    اضافه منطقه جديدة
                                </Button>
                            </div>
                        </FormItem>

                        <DialogFooter className="mt-4">
                            <Button
                                isLoading={isLoading}
                                size="lg"
                                type="submit"
                                disabled={
                                    !newAddedAreas.length || form.getValues().costs.length < addRestaurantDeliveryCostFormInitialValues.costs.length
                                }
                            >
                                اضافه منطقة
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
        </Dialog >
    );
};
