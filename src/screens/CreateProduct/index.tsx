import { useNavigate } from "react-router-dom";
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
    Switch
} from '@/components'
import { ChevronRight, X } from "lucide-react";
import { useAddProduct, useCategories, useRestaurants } from "@/hooks";
import { addProductFormSchema } from "./formUtils";
import ImageUploading from "react-images-uploading";

type ProfileFormValues = z.infer<typeof addProductFormSchema>

export const CreateProductScreen = () => {
    const { restaurantOptions } = useRestaurants();
    const { categoryOptions } = useCategories();
    const { mutate: createProduct, isLoading } = useAddProduct({
        onSuccess: () => {
            handleNavigateBack();
        }
    });
    const navigate = useNavigate();

    const defaultValues: Partial<ProfileFormValues> = {
        title: '',
        available: false,
        featured: false,
        price: '',
        restaurant: '',
        description: '',
        category: '',
        images: [],
        showPrice: false,
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(addProductFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { remove } = useFieldArray({
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
        formData.append('show_price', data.showPrice ? 'true' : 'false');
        data.images.forEach((image) => {
            formData.append('image', image.file!);
        })
        createProduct(formData)
    }

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">
                        <ChevronRight onClick={handleNavigateBack} className="inline-block cursor-pointer ml-2" size={30} />
                        اضافه منتج
                    </h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك اضافه المنتج من هنا, يمكنك تعديل الاسم والسعر والوصف والصورة
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
                                                label: '',
                                                value: '',

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
                                name="showPrice"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                هل يظهر سعر المنتج؟   
                                            </FormLabel>
                                            <FormDescription>
                                                يمكنك التحكم في ظهور سعر المنتج من هنا
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
                                    form.setValue('images', imageList)
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
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <div className="relative">
                                                        <X
                                                            size={25}
                                                            className="absolute text-rose-500 cursor-pointer bg-black opacity-80 rounded-full p-1 -top-2 -right-2"
                                                            onClick={() => {
                                                                remove(index)
                                                            }} />
                                                        <img
                                                            className="rounded-lg shadow-lg"
                                                            src={image.dataURL}
                                                            width={300}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                            <div className="flex items-center gap-5">
                                <Button isLoading={isLoading} type="submit" >اضافه المنتج</Button>
                                <Button onClick={handleNavigateBack} type="reset" variant='outline'>الرجوع</Button>
                            </div>
                        </form>
                    </Form>
                </Sidebar>
            </div>
        </div >
    )
}