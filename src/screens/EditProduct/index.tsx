import { Product } from "@/models";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useCategories, useRestaurants } from "@/hooks";
import { editProductFormSchema } from "./formUtils";

interface LocationState {
    product: Product;
}

type ProfileFormValues = z.infer<typeof editProductFormSchema>


export const EditProductScreen = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { productId } = useParams();
    const { data: restaurants = {
        count: 0,
        results: []
    } } = useRestaurants();
    const { data: categories = {
        results: []
    } } = useCategories();
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state as LocationState;

    const defaultValues: Partial<ProfileFormValues> = {
        title: product.title,
        available: product.available,
        featured: product.available,
        price: product.price,
        restaurant: product.user.name,
        description: product.description,
        category: product.category.name,
        images: product.productImages.map((image) => {
            return {
                value: image.image,
            }
        }),
    }

    const restaurantOptions = restaurants?.results.map((restaurant) => ({
        label: restaurant.name,
        value: restaurant.id.toString(),
    }));

    const categoryOptions = categories?.results.map((category) => ({
        label: category.name,
        value: category.id.toString(),
    }));

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        name: "images",
        control: form.control,
    })
    function onSubmit(data: ProfileFormValues) {
        console.log(data)
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
                                            options={restaurantOptions}
                                            defaultValue={{
                                                label: product.user.name,
                                                value: product.user.id.toString(),

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
                                            options={categoryOptions}
                                            defaultValue={{
                                                label: product.category.name,
                                                value: product.category.id.toString(),

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
                            <div className="grid grid-cols-4 gap-4">
                                {fields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`images.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <X
                                                            size={25}
                                                            className="absolute text-rose-500 cursor-pointer bg-black opacity-80 rounded-full p-1 -top-2 -right-2"
                                                            onClick={() => remove(index)} />
                                                        <img
                                                            className="rounded-lg shadow-lg"
                                                            src={field.value}
                                                            width={300}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <p className="text-sm font-medium text-destructive">
                                    {form.formState.errors.images?.message}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ value: "https://th.bing.com/th/id/OIP.R1keaRdir0ZYP5LaDS5PogAAAA?w=211&h=99&c=7&r=0&o=5&pid=1.7" })}
                            >
                                اضافة صورة
                            </Button>
                            <div className="flex items-center gap-5">
                                <Button type="submit" disabled={!form.formState.isValid}>تعديل المنتج</Button>
                                <Button onClick={handleNavigateBack} type="reset" variant='outline'>الرجوع</Button>
                            </div>
                        </form>
                    </Form>
                </Sidebar>
            </div>
        </div>
    )
}