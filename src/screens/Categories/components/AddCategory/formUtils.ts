import * as z from "zod";

export const addCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "الاسم  يجب ان يكون اكثر من حرفين",
    })
    .max(50, {
      message: "الاسم  يجب ان يكون اقل من 50 حرف",
    }),
    order: z.string().optional(),
});
