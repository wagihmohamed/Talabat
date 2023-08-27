import * as z from "zod";

export const addSliderFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "الاسم  يجب ان يكون اكثر من حرفين",
        })
        .max(50, {
            message: "الاسم  يجب ان يكون اقل من 50 حرف",
        }),
});
