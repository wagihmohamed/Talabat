import { Admin } from "@/models";

export const adminsData: Admin[] = [
  {
    id: 1,
    name: "محمد",
    phone: "01000000000",
    roles: ["10", "20"],
    roleLabel: "مشرف عام",
    status: "active",
  },
  {
    id: 2,
    name: "أحمد",
    phone: "01000002323",
    roles: ["20"],
    roleLabel: "مشرف مطاعم",
    status: "active",
  },
  {
    id: 3,
    name: "محمود",
    phone: "01033333333",
    roles: ["30"],
    roleLabel: "مشرف مستخدمين",
    status: "active",
  },
  {
    id: 4,
    name: "علي",
    phone: "01000045340",
    roles: ["40"],
    roleLabel: "مشرف أقسام",
    status: "suspended",
  },
];
