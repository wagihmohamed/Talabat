import * as z from "zod";

export const addRestaurantFormSchema = z.object({
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
  address: z
    .string()
    .min(5, {
      message: "العنوان  يجب ان يكون اكثر من 5 حروف",
    })
    .max(50, {
      message: "العنوان  يجب ان يكون اقل من 50 حرف",
    }),
  email: z
    .string()
    .email({
      message: "البريد الالكتروني غير صحيح",
    })
    .min(5, {
      message: "البريد الالكتروني  يجب ان يكون اكثر من 5 حروف",
    })
    .max(50, {
      message: "البريد الالكتروني  يجب ان يكون اقل من 50 حرف",
    }),
});
