import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components";
import { ADMIN_ROLES } from "@/mockup";
import { AdminItem } from "@/models"
import { useState } from "react";
import { Trash2, UserPlus2 } from "lucide-react";
import { useUpdateAdminRoles } from "@/hooks";

export const EditAdminRoles = ({
    admin,
}: {
    admin: AdminItem
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [adminData, setAdminData] = useState<any>(admin);

    const { mutateAsync: updateRoles, isLoading } = useUpdateAdminRoles({
        onSuccess: () => { }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderRoles = (admin: any) => {
        return ADMIN_ROLES.map((role) => {
            const hasRole = admin.admin.adminRole[role.value];

            return (
                <div key={role.value} className="bg-slate-50 h-14 rounded flex justify-between items-center px-4">
                    <span>{role.label}</span>
                    {hasRole ? (
                        <Trash2
                            className="cursor-pointer text-red-500"
                            size={24}
                            onClick={() => {
                                if (isLoading) return;
                                updateRoles({
                                    userId: adminData.id,
                                    roles: {
                                        [role.value]: false,
                                    },
                                }).then(() => {
                                    handleRoleClick(role.value);
                                }
                                );
                            }}
                        />
                    ) : (
                        <UserPlus2
                            className="cursor-pointer text-green-500"
                            size={24}
                            onClick={() => {
                                if (isLoading) return;
                                updateRoles({
                                    userId: adminData.id,
                                    roles: {
                                        [role.value]: true,
                                    },
                                }).then(() => {
                                    handleRoleClick(role.value);
                                }
                                );
                            }}
                        />
                    )}
                </div>
            );
        });
    };

    const handleRoleClick = (roleValue: string) => {
        const updatedAdminData = {
            ...adminData,
            admin: {
                ...adminData.admin,
                adminRole: {
                    ...adminData.admin.adminRole,
                    [roleValue]: !adminData.admin.adminRole[roleValue],
                },
            },
        };
        setAdminData(updatedAdminData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex w-full items-center justify-end gap-2"
                    variant="ghost"
                >
                    تعديل الصلاحيات
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>تعديل الصلاحيات</DialogTitle>
                </DialogHeader>
                {renderRoles(adminData)}
            </DialogContent>
        </Dialog>
    )
}
