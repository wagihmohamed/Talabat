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
      .min(2, {
        message: "العنوان  يجب ان يكون اكثر من حرفين",
      })
      .max(50, {
        message: "العنوان  يجب ان يكون اقل من 50 حرف",
      }),
    password: z
      .string()
      .min(2, {
        message: "كلمة المرور  يجب ان يكون اكثر من حرفين",
      })
      .max(50, {
        message: "كلمة المرور  يجب ان يكون اقل من 50 حرف",
      }),
    confirm_password: z
      .string()
      .min(2, {
        message: "كلمة المرور  يجب ان يكون اكثر من حرفين",
      })
      .max(50, {
        message: "كلمة المرور  يجب ان يكون اقل من 50 حرف",
      }),
    restaurant: z
      .object({
        value: z.string().min(1),
        label: z.string(),
      }).refine((data) => data.value !== "", {
        message: "يجب اختيار مطعم",
      }),
  }).refine((data) => data.password === data.confirm_password, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirm_password"],
  });