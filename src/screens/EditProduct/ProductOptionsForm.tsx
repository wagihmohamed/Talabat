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
            options: z.array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    value: z.string(),
                })
            )
        })
    )
})

type ProductOptionsFormValues = z.infer<typeof productsOptionsSchema>


export const ProductOptionsForm = () => {
    const { productId = '' } = useParams();
    const { data: productData, isLoading: isFetchLoading, isError } = useProductsById({
        productId: parseInt(productId),
    })

    const { mutateAsync: deleteProductOptionById } = useDeleteProductOptionById({
        productId: productId,
        onSuccess: () => { }
    })
    const { mutateAsync: deleteProductOptionGroupById } = useDeleteOptionsGroupById({
        productId: productId,
        onSuccess: () => { }
    })

    const defaultValues = useMemo(() => {
        if (productData) {
            return {
                options_groups: productData.product.options_groups.map((optionGroup) => {
                    return {
                        ...optionGroup,
                        options: optionGroup.options.map((option) => {
                            return {
                                ...option,
                                value: option.value.toString(),
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: ProductOptionsFormValues) => { }

    const watchedFields = form.watch("options_groups")
    console.log(watchedFields);


    return (
        <LoadingErrorPlaceholder isError={isError} isLoading={isFetchLoading}>
            {!form.getValues().options_groups?.length ? (
                <div className="flex justify-center h-56 bg-slate-50 items-center">
                    <p className="text-gray-500 font-bold text-lg">لا يوجد خيارات لهذا المنتج</p>
                    <Button onClick={() => append({ name: '', options: [] })} className="mt-5">اضافة خيار</Button>
                </div>
            ) : (
                <div className="mb-10">
                    <Form {...form}>
                        {watchedFields.map((field, index) => {
                            return (
                                <div key={field.id} className="border p-5 mb-5 rounded-lg shadow-md">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="text-xl font-bold">الخيار {field.name}</h3>
                                        <Button onClick={() => {
                                            if (!field.id) {
                                                remove(index)
                                                return;
                                            }
                                            deleteProductOptionGroupById(field.id)
                                                .then(() => {
                                                    remove(index)
                                                })
                                        }} variant='destructive'>حذف</Button>
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
                                                            if (!option.value) {
                                                                const options = form.getValues().options_groups[index].options
                                                                const newOptions = options.filter((_, i) => i !== optionIndex)
                                                                console.log(newOptions);
                                                                form.setValue(`options_groups.${index}.options`, newOptions)
                                                                return;
                                                            }
                                                            deleteProductOptionById(option.id)
                                                                .then(() => {
                                                                    const options = form.getValues().options_groups[index].options
                                                                    const newOptions = options.filter((_, i) => i !== optionIndex)
                                                                    console.log(newOptions);
                                                                    form.setValue(`options_groups.${index}.options`, newOptions)
                                                                })
                                                        }}
                                                        variant='destructive'
                                                        className="w-1/6"
                                                    >
                                                        حذف الخيار
                                                    </Button>
                                                    <FormMessage />
                                                </div>
                                            )
                                        })}
                                        <Button onClick={() => {
                                            const options = form.getValues().options_groups[index].options
                                            form.setValue(`options_groups.${index}.options`, [...options, { id: Date.now(), name: '', value: '' }])
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
                            onClick={() => append({ name: '', options: [] })}
                            className="mt-5">
                            اضافه خيار رئيسي
                        </Button>
                    </Form>
                </div>
            )
            }
        </LoadingErrorPlaceholder>
    );
}
