import * as z from "zod";

export const editAdminFormSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "الرجاء ادخال اسم صحيح",
      })
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
      .string({
        invalid_type_error: "الرجاء ادخال عنوان صحيح",
      })
      .min(5, {
        message: "العنوان  يجب ان يكون اكثر من 5 حروف",
      })
      .max(50, {
        message: "العنوان  يجب ان يكون اقل من 50 حرف",
      }),
    email: z.string({
      invalid_type_error: "الرجاء ادخال بريد الكتروني صحيح",
    }).email({
      message: "الرجاء ادخال بريد الكتروني صحيح",
    }),
  })
