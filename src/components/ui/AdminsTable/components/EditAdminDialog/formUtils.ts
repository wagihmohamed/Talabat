import { ADMIN_ROLES } from "@/mockup";
import * as z from "zod";

const allowedRoleIds = ADMIN_ROLES.map((role) => role.value);

const roleObjectSchema = z.object({
  label: z.string(),
  value: z.string().refine((value) => allowedRoleIds.includes(value), {
    message: "الرجاء تحديد دور صحيح",
  }),
});

export const editAdminFormSchema = z
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
    // password: z
    //   .string()
    //   .min(5, {
    //     message: "كلمة المرور  يجب ان يكون اكثر من 5 حروف",
    //   })
    //   .max(50, {
    //     message: "كلمة المرور  يجب ان يكون اقل من 50 حرف",
    //   }),
    // confirmPassword: z.string().min(5, {
    //   message: "تأكيد كلمة المرور  يجب ان يكون اكثر من 5 حروف",
    // }),
    role: z.array(roleObjectSchema).min(1, {
      message: "الرجاء تحديد دور واحد على الاقل",
    }),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  //   path: ["confirmPassword"],
  // });
