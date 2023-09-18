import * as z from "zod";

export const addRestaurantFormInitialValues = {
  address: "",
  email: {
    value: "",
    label: "",
  },
  name: "",
  phone: "",
  password: "",
  confirm_password: "",
  description: "",
  distance: 0,
  direction: "",
  deliveryTime: 0,
  free_delivery_limit: '',
}

export const directionOptions = [
  { value: "north", label: "شمال" },
  { value: "south", label: "جنوب" },
  { value: "east", label: "شرق" },
  { value: "west", label: "غرب" },
];

export const addRestaurantFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "الاسم  يجب ان يكون اكثر من حرفين",
    })
    .max(50, {
      message: "الاسم  يجب ان يكون اقل من 50 حرف",
    }),
  direction: z
    .string(),
  // distance: z
  //   .number({
  //     invalid_type_error: "المسافة يجب ان يكون رقم",
  //   })
  //   .min(1, {
  //     message: "المسافة  يجب ان يكون اكثر من 1 متر",
  //   }),
  deliveryTime: z
    .number({
      invalid_type_error: "وقت التوصيل يجب ان يكون رقم",
    })
    .min(1, {
      message: "وقت التوصيل  يجب ان يكون اكثر من دقيقة واحدة",
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
    .object({
      value: z.string({
        required_error: "طريقة التةصيل مطلوبة",
      }),
      label: z.string({
        required_error: "طريقة التةصيل مطلوبة",
      }),
    }),
  description: z
    .string(),
  password: z
    .string()
    .min(5, {
      message: "كلمة المرور  يجب ان يكون اكثر من 5 حروف",
    })
    .max(50, {
      message: "كلمة المرور  يجب ان يكون اقل من 50 حرف",
    }),
  confirm_password: z
    .string()
    .min(5, {
      message: "كلمة المرور  يجب ان يكون اكثر من 5 حروف",
    })
    .max(50, {
      message: "كلمة المرور  يجب ان يكون اقل من 50 حرف",
    }),
  free_delivery_limit: z
    .string()

}).refine((data) => data.password === data.confirm_password, {
  message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  path: ["confirmPassword"],
});

export const ordersMethods = [
  { value: "Phone", label: "الهاتف" },
  { value: "Cart", label: "السلة" },
];
