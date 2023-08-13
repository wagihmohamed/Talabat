import { LoadingErrorPlaceholder, Sidebar } from "@/components";

export const DeliveryAreasScreen = () => {
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">مناطق التوصيل</h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك رؤية مناطق التوصيل المتاحة, يمكنك اضافه او حذف منطقة جديدة.
                    </p>
                    <LoadingErrorPlaceholder
                        // isEmpty={categories.results.length === 0}
                        emptyText={
                            <h1 className="text-2xl font-bold text-center">لا يوجد مناطق.</h1>
                        }
                        isError={false}
                        isLoading={false}
                    >
                        {/* <div className="grid grid-cols-12 gap-4 mt-4">
              {categories.results.map((category) => (
                <CategoryItem category={category} key={category.id} />
              ))}
            </div> */}
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
