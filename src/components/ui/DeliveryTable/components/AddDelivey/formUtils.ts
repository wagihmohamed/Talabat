import * as z from "zod";

export const addDeliveryFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "الاسم  يجب ان يكون اكثر من حرفين",
      })
      .max(50, {
        message: "الاسم  يجب ان يكون اقل من 50 حرف",
      }),
    phone: z
      .string()
      .min(10, {
        message: "رقم الهاتف  يجب ان يكون اكثر من 10 حروف",
      })
      .max(50, {
        message: "رقم الهاتف  يجب ان يكون اقل من 50 حرف",
      }),
    restaurant: z
      .object({
        value: z.string().min(1),
        label: z.string(),
      }).refine((data) => data.value !== "", {
        message: "يجب اختيار مطعم",
      }),
  });