import {
    Form,
    FormDescription,
    FormLabel,
    FormMessage,
    FormItem,
    Input,
    Button,
    LoadingErrorPlaceholder,
} from "@/components"
import {
    useProductsById,
    useDeleteProductOptionById,
    useDeleteOptionsGroupById,
    useAddGroupOptions,
    useEditProductOption,
    useEditProductGroup,
} from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as z from "zod"

const productsOptionsSchema = z.object({
    options_groups: z.array(
        z.object({
            id: z.number().optional(),
            name: z.string(),
            oldOption: z.boolean(),
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
                    old: z.boolean()
                })
            ).min(1, {
                message: 'يجب اضافة قيمة واحدة على الاقل لهذا الخيار'
            }),
        })
    )
})

type ProductOptionsFormValues = z.infer<typeof productsOptionsSchema>


export const ProductOptionsForm = () => {
    const { productId = '' } = useParams();
    const { data: productData, isLoading: isFetchLoading, isError } = useProductsById({
        productId: parseInt(productId),
    })
    const { mutate: addGroupsOptions, isLoading: isSavingChanges } = useAddGroupOptions()
    const { mutate: editProductGroup, isLoading: isEditingProductGroup } = useEditProductGroup({
        onSuccess: () => { }
    })

    const { mutateAsync: deleteProductOptionById } = useDeleteProductOptionById()
    const { mutateAsync: deleteProductOptionGroupById } = useDeleteOptionsGroupById()
    const {
        mutate: editProductOption,
        isLoading: isEditingProductOptionLoading
    } = useEditProductOption({
        onSuccess: () => { }
    })

    const defaultValues = useMemo(() => {
        if (productData) {
            return {
                options_groups: productData.product.options_groups.map((optionGroup) => {
                    return {
                        ...optionGroup,
                        oldOption: true,
                        options: optionGroup.options.map((option) => {
                            return {
                                ...option,
                                value: option.value.toString(),
                                old: true,
                            }
                        })
                    }
                })
            }
        }
        return {}
    }, [productData])

    const form = useForm<ProductOptionsFormValues>({
        resolver: zodResolver(productsOptionsSchema),
        defaultValues,
        mode: 'onChange',
    })

    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues, form])

    const { append, remove } = useFieldArray({
        control: form.control,
        name: "options_groups",
    })

    const onSubmit = (data: ProductOptionsFormValues) => {
        const newOptions = data.options_groups.map((group) => {
            if (!group.oldOption) {
                return {
                    name: group.name,
                    options: group.options.map((option) => {
                        return {
                            name: option.name,
                            value: parseInt(option.value),
                        }
                    })
                }
            }
        });

        addGroupsOptions({
            productId: parseInt(productId),
            groups: newOptions.filter((option) => option !== undefined).map((option) => option!)
        })

    }
    const watchedFields = form.watch("options_groups")

    const productDataLength = productData?.product.options_groups.length || 0

    return (
        <LoadingErrorPlaceholder isError={isError} isLoading={isFetchLoading}>
            {!form.getValues().options_groups?.length ? (
                <div className="flex flex-col justify-center h-56 items-center border-2 rounded-lg">
                    <p className="text-gray-500 font-bold text-lg">لا يوجد خيارات لهذا المنتج</p>
                    <Button onClick={() => append({
                        name: '',
                        options: [],
                        oldOption: false
                    })} className="mt-5">اضافة خيار</Button>
                </div>
            ) : (
                <div className="mb-10">
                    <Form {...form}>
                        {watchedFields.map((field, index) => {
                            return (
                                <div key={field.id} className="border p-5 mb-5 rounded-lg shadow-md">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-xl font-bold">خيار {field.name}</h3>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                isLoading={isEditingProductGroup}
                                                onClick={() => {
                                                    editProductGroup({
                                                        id: field.id || 0,
                                                        payload: {
                                                            name: field.name,
                                                        }
                                                    })
                                                }}
                                                variant='outline'
                                            >
                                                تعديل
                                            </Button>
                                            <Button onClick={() => {
                                                if (!field.id) {
                                                    remove(index)
                                                    return;
                                                }
                                                deleteProductOptionGroupById(field.id)
                                                    .then(() => {
                                                        remove(index)
                                                    })
                                            }}
                                                variant='destructive'
                                            >
                                                حذف
                                            </Button>
                                        </div>
                                    </div>
                                    <FormItem>
                                        <FormLabel>اسم الخيار</FormLabel>
                                        <Input {...form.register(`options_groups.${index}.name`)} />
                                        <FormMessage />
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel>القيم</FormLabel>
                                        <FormDescription>اضف القيم لهذا الخيار</FormDescription>
                                        {field.options.map((option, optionIndex) => {
                                            return (
                                                <div key={option.id} className="flex items-center mb-5 gap-5">
                                                    <Input {...form.register(`options_groups.${index}.options.${optionIndex}.name`)} />
                                                    <Input
                                                        {...form.register(`options_groups.${index}.options.${optionIndex}.value`)}
                                                        type="number"
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            if (!option.old) {
                                                                const options = form.getValues().options_groups[index].options
                                                                const newOptions = options.filter((_, i) => i !== optionIndex)
                                                                form.setValue(`options_groups.${index}.options`, newOptions)
                                                                return;
                                                            }
                                                            deleteProductOptionById(option.id)
                                                                .then(() => {
                                                                    const options = form.getValues().options_groups[index].options
                                                                    const newOptions = options.filter((_, i) => i !== optionIndex)
                                                                    form.setValue(`options_groups.${index}.options`, newOptions)
                                                                })
                                                        }}
                                                        variant='destructive'
                                                        className="w-1/6"
                                                    >
                                                        حذف الخيار
                                                    </Button>
                                                    {option.old ? (
                                                        <Button
                                                            isLoading={isEditingProductOptionLoading}
                                                            disabled={!option.old}
                                                            onClick={() => {
                                                                if (!option.value) {
                                                                    return;
                                                                }
                                                                editProductOption({
                                                                    id: option.id,
                                                                    payload: {
                                                                        name: option.name,
                                                                        value: parseInt(option.value),
                                                                    }
                                                                })
                                                            }}
                                                            className="w-1/6"
                                                        >
                                                            تعديل الخيار
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            isLoading={isEditingProductOptionLoading}
                                                            disabled={option.value === '' || option.name === ''}
                                                            onClick={() => {
                                                                const newItems = form.getValues().options_groups[index].options.map((item) => {
                                                                    if (item.old === false) {
                                                                        return {
                                                                            name: item.name,
                                                                            value: parseInt(item.value),
                                                                        }
                                                                    }
                                                                })
                                                                editProductGroup({
                                                                    id: field.id || 0,
                                                                    payload: {
                                                                        options: newItems.filter((item) => item !== undefined).map((item) => item!),
                                                                    }
                                                                })
                                                            }}
                                                            className="w-1/6"
                                                        >
                                                            اضافة الخيار
                                                        </Button>
                                                    )}
                                                </div>
                                            )
                                        })}
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const options = form.getValues().options_groups[index].options
                                                form.setValue(`options_groups.${index}.options`, [...options, {
                                                    id: Date.now(),
                                                    name: '',
                                                    value: '',
                                                    old: false,
                                                }])
                                            }}
                                            className="mt-5"
                                        >
                                            اضافة خيار
                                        </Button>
                                    </FormItem>
                                </div>
                            )
                        })}
                        <Button
                            type="button"
                            onClick={() => append({ name: '', options: [], oldOption: false })}
                            className="mt-5">
                            اضافه خيار رئيسي
                        </Button>
                        <div>
                            <Button
                                isLoading={isSavingChanges}
                                onClick={form.handleSubmit(onSubmit)}
                                disabled={
                                    !form.formState.isValid ||
                                    isSavingChanges ||
                                    isEditingProductGroup ||
                                    isEditingProductOptionLoading
                                    || form.getValues().options_groups.length <= productDataLength
                                }
                                className="mt-5">
                                حفظ التغييرات
                            </Button>
                        </div>
                    </Form>
                </div >
            )
            }
        </LoadingErrorPlaceholder >
    );
}
