import { Button, CustomSelect, Form, Input, LoadingErrorPlaceholder, Sidebar, } from "@/components";
import { useCreateCommonGroup, useProducts } from "@/hooks";
import { ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const productsOptionsSchema = z.object({
    groups: z.array(
        z.object({
            id: z.number().optional(),
            name: z.string()
                .min(1, {
                    message: 'يجب ان يكون الاسم اكبر من حرف واحد',
                })
                .max(255, {
                    message: 'يجب ان يكون الاسم اقل من 255 حرف',
                }),
            type: z.string()
                .min(1, {
                    message: 'يجب ان يكون النوع اكبر من حرف واحد',
                })
                .max(255, {
                    message: 'يجب ان يكون النوع اقل من 255 حرف',
                }),
            options: z.array(
                z.object({
                    id: z.number(),
                    name: z.string({
                        invalid_type_error: 'يجب ان يكون الاسم نص',
                    }).min(1, {
                        message: 'يجب ان يكون الاسم اكبر من حرف واحد',
                    }),
                    value: z.string().min(1, {
                        message: 'يجب ان يكون القيمة اكبر من حرف واحد',
                    }),
                })
            ).min(1, {
                message: 'يجب اضافة قيمة واحدة على الاقل لهذا الخيار'
            }),
        })
    )
})

type ProductOptionsFormValues = z.infer<typeof productsOptionsSchema>


export const RestaurantCommonGroups = () => {
    const { restaurantId = '' } = useParams();
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const { data: products = {
        results: [],
    }, isLoading, isError } = useProducts({ vendorId: restaurantId });
    const transformedProducts = products?.results.map((product) => ({
        label: product.title,
        value: product.id.toString(),
    }));

    const defaultValues = {
        groups: [
            {
                id: 0,
                name: '',
                type: '',
                options: [
                    {
                        id: 0,
                        name: '',
                        value: '',
                    }
                ]
            }
        ]
    }

    const { mutate: createGroup, isLoading: isCreating } = useCreateCommonGroup({
        onSuccess: () => {
            form.reset(defaultValues)
        }
    });
    const [selectedProducts, setSelectedProducts] = useState<{
        value: string;
        label: string;
    }[]>([]);

    const form = useForm<ProductOptionsFormValues>({
        resolver: zodResolver(productsOptionsSchema),
        defaultValues,
    })

    const { append, remove } = useFieldArray({
        control: form.control,
        name: "groups",
    })

    const watchedFields = form.watch("groups")
    console.log(form.formState.errors);

    const handleSubmit = () => {
        const { groups } = form.getValues()

        createGroup({
            products: selectedProducts.map((product) => parseInt(product.value)),
            groups: groups.map((group) => ({
                name: group.name,
                type: group.type,
                options: group.options.map((option) => ({
                    name: option.name,
                    value: parseInt(option.value),
                }))
            }))
        })
    }

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <LoadingErrorPlaceholder
                        isLoading={isLoading}
                        isError={isError}
                    >
                        <div className="flex justigy-between items-center">
                            <div className="flex items-center gap-3 mb-8">
                                <ChevronRight onClick={handleBack} className="w-8 h-8 cursor-pointer" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold mb-6">
                            كل المنتجات الخاصه بالمطعم
                        </p>
                        <CustomSelect
                            options={transformedProducts || []}
                            isMulti
                            onChange={(e: {
                                value: string;
                                label: string;
                            }) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                setSelectedProducts(e as any)
                            }}
                        />
                        <div className="mt-8">
                            <p className="text-2xl font-bold mb-6">
                                اضافة خيارات للمنتجات
                            </p>
                            <div className="flex flex-col gap-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                                        {watchedFields.map((group, groupIndex) => (
                                            <div key={group.id} className="flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <Input
                                                        autoFocus
                                                        className="border border-gray-300 rounded-md w-1/2 p-2"
                                                        placeholder="اسم المجموعة"
                                                        {...form.register(`groups.${groupIndex}.name`)}
                                                    />
                                                    <CustomSelect
                                                        className="border-gray-300 rounded-md w-1/2 p-2"
                                                        options={[
                                                            {
                                                                label: 'فردي',
                                                                value: 'single',
                                                            },
                                                            {
                                                                label: 'متعدد',
                                                                value: 'multiple',
                                                            },
                                                        ]}
                                                        onChange={(e: {
                                                            value: string;
                                                            label: string;
                                                        }) => form.setValue(`groups.${groupIndex}.type`, e.value)}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    {group.options.map((option, optionIndex) => (
                                                        <div key={option.id} className="flex gap-4">
                                                            <Input
                                                                autoFocus
                                                                className="border border-gray-300 rounded-md w-1/2 p-2"
                                                                placeholder="اسم الخيار"
                                                                {...form.register(`groups.${groupIndex}.options.${optionIndex}.name`)}
                                                            />
                                                            <Input
                                                                className="border border-gray-300 rounded-md w-1/2 p-2"
                                                                placeholder="قيمة الخيار"
                                                                {...form.register(`groups.${groupIndex}.options.${optionIndex}.value`)}
                                                                type="number"
                                                            />
                                                            <Trash2 onClick={() => {
                                                                const options = form.getValues(`groups.${groupIndex}.options`)
                                                                form.setValue(`groups.${groupIndex}.options`, options.filter((_, index) => index !== optionIndex))
                                                            }} className="w-8 h-8 cursor-pointer" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-4">
                                                    <Button
                                                        variant='destructive'
                                                        onClick={() => remove(groupIndex)}
                                                        disabled={watchedFields.length === 1}
                                                    >
                                                        حذف المجموعة
                                                    </Button>
                                                    <Button
                                                        onClick={() => append({
                                                            name: '',
                                                            type: '',
                                                            options: [
                                                                {
                                                                    name: '',
                                                                    value: '',
                                                                    id: Math.random(),
                                                                }
                                                            ]
                                                        })}
                                                    >
                                                        اضافة مجموعة جديدة
                                                    </Button>
                                                    <Button
                                                        variant='secondary'
                                                        onClick={() => {
                                                            const options = form.getValues(`groups.${groupIndex}.options`)
                                                            form.setValue(`groups.${groupIndex}.options`, [...options, {
                                                                name: '',
                                                                value: '',
                                                                id: Math.random(),
                                                            }])
                                                        }}
                                                    >
                                                        اضافة خيار جديد
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </form>
                                </Form>
                                <Button
                                    onClick={handleSubmit}
                                    isLoading={isCreating}
                                    disabled={
                                        form.formState.isSubmitting
                                        || !form.formState.isValid
                                        || selectedProducts.length === 0
                                    }
                                >
                                    حفظ
                                </Button>
                            </div>
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
}