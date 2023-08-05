import * as z from "zod";
export const editProductFormSchema = z.object({
    title: z
        .string({
            required_error: "هذا الحقل مطلوب."
        })
        .min(3, {
            message: "اسم المنتج يجب ان يكون اكثر من 3 حروف.",
        })
        .max(30, {
            message: "اسم المنتج يجب ان يكون اقل من 30 حرف.",
        }),
    restaurant: z
        .string({
            required_error: "هذا الحقل مطلوب."
        }),
    category: z
        .string({
            required_error: "هذا الحقل مطلوب."
        }),
    description: z
        .string({
            required_error: "هذا الحقل مطلوب."
        })
        .min(5, {
            message: "احرص على ان يكون الوصف اكثر من 5 حروف.",
        }).max(100, {
            message: "احرص على ان يكون الوصف اقل من 100 حرف.",
        }),
    price: z
        .string({
            required_error: "هذا الحقل مطلوب.",
        }).min(1, {
            message: "احرص على ان يكون السعر اكثر من 1.",
        }),
    available: z.boolean().optional(),
    featured: z.boolean().optional(),
    images: z.array(z.object({
        value: z.string({
            invalid_type_error: "هذا الحقل مطلوب.",
        })
    })).min(1, {
        message: "يجب ان تضيف صورة واحدة على الاقل.",
    }),
})
