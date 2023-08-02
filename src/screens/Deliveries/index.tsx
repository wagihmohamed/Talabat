import { DeliveryTable, LoadingErrorPlaceholder, Sidebar } from "@/components";
import { deliveriesColumns } from "@/components/ui/DeliveryTable/columns";
import { useDeliveries } from "@/hooks";

export const DeliveriesScreen = () => {
    const { data: deliveries = [], isLoading, isError } = useDeliveries();
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
                    <LoadingErrorPlaceholder
                        isLoading={isLoading}
                        isError={isError}
                    >
                        <DeliveryTable data={deliveries} columns={deliveriesColumns} />
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
