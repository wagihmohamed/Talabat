import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormLabel,
    FormField,
    FormMessage,
    FormItem,
    Input,
    Textarea,
    CustomSelect,
    Sidebar,
    Switch,
    LoadingErrorPlaceholder
} from '@/components'
import { ChevronRight, X } from "lucide-react";
import { useCategories, useDeleteProductImage, useEditProduct, useProductsById, useRestaurants } from "@/hooks";
import { editProductFormSchema } from "./formUtils";
import ImageUploading from "react-images-uploading";
import { useEffect, useMemo } from "react";

type ProfileFormValues = z.infer<typeof editProductFormSchema>


export const EditProductScreen = () => {
    const { productId = '' } = useParams();
    const { restaurantOptions } = useRestaurants();
    const { categoryOptions } = useCategories();
    const { data: productData, isError, isLoading: isFetchLoading } = useProductsById({
        productId: parseInt(productId),
    })
    const { mutate: editProduct, isLoading } = useEditProduct({
        onSuccess: () => { }
    });
    const { mutateAsync: deleteImage, isLoading: isDeleting } = useDeleteProductImage({
        productId: parseInt(productId),
    })
    const navigate = useNavigate();

    const defaultValues: Partial<ProfileFormValues> = useMemo(() => {
        if (productData) {
            return {
                title: productData?.product.title,
                available: productData?.product.available,
                featured: productData?.product.featured,
                price: productData?.product.price,
                restaurant: productData?.product.user.id.toString(),
                description: productData?.product.description,
                category: productData?.product.category.id.toString(),
                images: productData?.product.productImages.map((image) => {
                    return {
                        dataURL: image.image,
                        imageId: image.id,
                    }
                }),
            }
        }
        return {}
    }, [productData])

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: useMemo(() => {
            return defaultValues
        }, [defaultValues]),
        mode: "onChange",
    })

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    const { remove, fields } = useFieldArray({
        name: "images",
        control: form.control,
    })
    const onSubmit = (data: ProfileFormValues) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('vendorId', data.restaurant);
        formData.append('description', data.description);
        formData.append('categoryId', data.category);
        formData.append('available', data.available ? 'true' : 'false');
        formData.append('featured', data.featured ? 'true' : 'false');
        fields.forEach((image) => {
            formData.append('image', image.file);
        })
        editProduct({
            id: parseInt(productId),
            payload: formData
        })
    }

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <LoadingErrorPlaceholder
                        isLoading={isFetchLoading}
                        isError={isError}
                    >
                        <h1 className="text-2xl font-bold mb-2">
                            <ChevronRight onClick={handleNavigateBack} className="inline-block cursor-pointer ml-2" size={30} />
                            تعديل المنتج
                        </h1>
                        <p className="mb-5 text-gray-500 text-md">
                            يمكنك تعديل المنتج من هنا, يمكنك تعديل الاسم والسعر والوصف والصورة
                        </p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>اسم المنتج</FormLabel>
                                            <FormControl>
                                                <Input placeholder="اسم المنتج" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                هذا هو اسم المنتج الذي سيظهر للجميع
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>سعر المنتج</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="100" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                هذا هو سعر المنتج الذي سيظهر للجميع
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="restaurant"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>المطعم</FormLabel>
                                            <CustomSelect
                                                options={restaurantOptions || []}
                                                defaultValue={{
                                                    label: productData?.product.user.name || '',
                                                    value: productData?.product.user.id.toString() || '',

                                                }}
                                                onChange={(value: {
                                                    label: string;
                                                    value: string;
                                                }) => {
                                                    field.onChange(value.value)
                                                }}
                                            />
                                            <FormDescription>
                                                هذا هو اسم المطعم البائع لهذا المنتج, سيظهر للجميع
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>القسم</FormLabel>
                                            <CustomSelect
                                                options={categoryOptions || []}
                                                defaultValue={{
                                                    label: productData?.product.category.name || '',
                                                    value: productData?.product.category.id.toString() || '',

                                                }}
                                                onChange={(value: {
                                                    label: string;
                                                    value: string;
                                                }) => {
                                                    field.onChange(value.value)
                                                }}
                                            />
                                            <FormDescription>
                                                هذا هو اسم القسم الذي ينتمي له المنتج, سيظهر للجميع
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>وصف المنتج</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="ادخل وصف المنتج"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                يمكنك كتابة وصف للمنتج هنا, سيظهر للجميع
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="available"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    هل هذا المنتج متاح؟
                                                </FormLabel>
                                                <FormDescription>
                                                    يمكنك تغيير حالة المنتج من هنا
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    هل هذا المنتج مميز؟
                                                </FormLabel>
                                                <FormDescription>
                                                    يمكنك تغيير حالة المنتج من هنا
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <p className="text-sm font-medium leading-none">
                                    صور المنتج
                                </p>
                                <span className="text-sm text-muted-foreground">
                                    هذه هي صور المنتج, يمكنك اضافة صور جديدة او حذف الصور القديمة
                                </span>
                                <ImageUploading
                                    multiple
                                    value={form.getValues('images') || []}
                                    onChange={(imageList) => {
                                        form.setValue('images', imageList.map((image) => {
                                            return {
                                                dataURL: image.dataURL || '',
                                                file: image.file,
                                                imageId: image.imageId,
                                            }
                                        }))
                                    }}
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                    }) => (
                                        <div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="mt-2"
                                                onClick={onImageUpload}
                                            >
                                                اضافة صورة
                                            </Button>
                                            &nbsp;
                                            <div className="grid grid-cols-4 gap-4 mt-5">
                                                {imageList.map((image, index) => {
                                                    return (
                                                        <div key={index} className={`image-item ${isDeleting && 'opacity-20'}`}>
                                                            <div className="relative">
                                                                <X
                                                                    size={25}
                                                                    className="absolute text-rose-500 cursor-pointer bg-black opacity-80 rounded-full p-1 -top-2 -right-2"
                                                                    onClick={() => {
                                                                        if (!image.imageId) {
                                                                            remove(index)
                                                                            return;
                                                                        }
                                                                        deleteImage(image.imageId)
                                                                            .then(() => {
                                                                                remove(index)
                                                                            })

                                                                    }} />
                                                                <img
                                                                    className={`rounded-lg shadow-lg `}
                                                                    src={image.dataURL}
                                                                    width={300}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                                <div className="flex items-center gap-5">
                                    <Button type="submit" disabled={
                                        !form.formState.isValid || isLoading
                                    }>تعديل المنتج</Button>
                                    <Button onClick={handleNavigateBack} type="reset" variant='outline'>الرجوع</Button>
                                </div>
                            </form>
                        </Form>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    )
}