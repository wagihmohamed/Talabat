import { Sidebar } from "@/components";

export const DeliveriesScreen = () => {
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">
                        موظفي التوصيل
                    </h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك إضافة موظفين جدد أو حذف الموظفين الحاليين, يمكنك أيضاً تعديل
                        بيانات الموظفين الحاليين.
                    </p>

                </Sidebar>
            </div>
        </div>
    );
};
