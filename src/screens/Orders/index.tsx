import { OrdersTable, Sidebar, } from "@/components";
import { columns } from "@/components/ui/OrdersTable/columns";
import { useOrders } from "@/hooks";

export const OrdersScreen = () => {
    const { data: orders = {
        results: [],
    }, isLoading, isError } = useOrders();

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-8">كل الطلبات</h1>
                    <OrdersTable
                        isLoading={isLoading}
                        isError={isError}
                        columns={columns}
                        data={orders.results}
                    />
                </Sidebar>
            </div>
        </div>
    );
};
