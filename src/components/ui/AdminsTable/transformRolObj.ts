import { AdminItem } from "@/models";

interface RoleTranslations {
    [key: string]: string;
}

export const roleTranslations: RoleTranslations = {
    admin: 'مشرف',
    super_admin: 'مشرف رئيسي',
    manage_orders: 'مشرف طلبات',
    manage_products: 'مشرف منتجات',
    manage_admins: 'مشرف مستخدمين',
    manage_deliveries: 'مشرف توصيلات',
    manage_vendors: 'مشرف مطاعم',
};

export const getArabicRole = (roleName: string) => roleTranslations[roleName] || roleName;
export const extractRoles = (adminRole: AdminItem['admin']['adminRole']) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, updatedAt, adminId, ...roles } = adminRole;
    return roles;
};
export const displayUserRoles = (userRoles: Record<string, boolean>) => {
    const roleNames = Object.keys(userRoles).filter(roleName => userRoles[roleName]);
    const arabicRoles = roleNames.map(getArabicRole);
    return arabicRoles.join(' , ');
};