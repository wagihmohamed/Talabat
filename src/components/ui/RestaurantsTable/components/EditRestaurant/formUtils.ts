import * as z from "zod";

export const addRestaurantFormInitialValues = {
  address: "",
  email: "",
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
  description: "",
}

export const editRestaurantFormSchema = z.object({
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
    .min(9, {
      message: "رقم الهاتف  يجب ان يكون اكثر من 9 حروف",
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
    .min(3, {
      message: "البريد الالكتروني  يجب ان يكون اكثر من 3 حروف",
    })
    .max(50, {
      message: "البريد الالكتروني  يجب ان يكون اقل من 50 حرف",
    }),
  //   description: z
  //     .string(),
  //   password: z
  //     .string(),
  //   confirm_password: z
  //     .string()
  // }).refine((data) => data.password === data.confirm_password, {
  //   message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  //   path: ["confirmPassword"],
});

export const ordersMethods = [
  { value: "Phone", label: "الهاتف" },
  { value: "Cart", label: "السلة" },
];
