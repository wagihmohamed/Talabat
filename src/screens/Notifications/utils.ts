import * as z from "zod";

export const sendNotificationSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "عنوان الإشعار يجب ان يكون اكثر من حرفين",
        })
        .max(50, {
            message: "عنوان الإشعار يجب ان يكون اقل من 50 حرف",
        }),
    description: z
        .string()
        .min(2, {
            message: "وصف الإشعار يجب ان يكون اكثر من حرفين",
        })
        .max(100, {
            message: "وصف الإشعار يجب ان يكون اقل من 100 حرف",
        }),
    topic: z
        .enum(["vendor", "delivery", "customer", "manual"], {
            description: "يجب اختيار موضوع الإشعار",
        }),
    // usersIds: z
    //     .array(z.string())
    //     .min(1, {
    //         message: "يجب اختيار مستخدم واحد على الأقل",
    //     })
    //     .max(100, {
    //         message: "يجب اختيار مستخدم واحد على الأقل",
    //     }).optional(),
})



export const topics = [
    {
        label: "المطاعم",
        value: "vendor",
    },
    {
        label: "عملاء التوصيل",
        value: "delivery",
    },
    {
        label: "العملاء",
        value: "customer",
    },
    {
        label: "تحديد يدوي",
        value: "manual",
    },
]