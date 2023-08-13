import { LoadingErrorPlaceholder, Sidebar } from "@/components";
import { useDeliveryAreas } from "@/hooks";
import { AddDeliveryArea, DeliveryAreaItem } from "./components";

export const DeliveryAreasScreen = () => {
    const { data: areas = {
        results: []
    }, isLoading, isError } = useDeliveryAreas();
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">مناطق التوصيل</h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك رؤية مناطق التوصيل المتاحة, يمكنك اضافه او حذف منطقة جديدة.
                    </p>
                    <AddDeliveryArea />
                    <LoadingErrorPlaceholder
                        isEmpty={areas.results.length === 0}
                        emptyText={
                            <h1 className="text-2xl font-bold text-center">لا يوجد مناطق.</h1>
                        }
                        isError={isError}
                        isLoading={isLoading}
                    >
                        <div className="grid grid-cols-12 gap-4 mt-4">
                            {areas.results.map((areaItem) => (
                                <DeliveryAreaItem area={areaItem} key={areaItem.id} />
                            ))}
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
