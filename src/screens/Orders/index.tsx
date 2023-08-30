import { Sidebar, } from "@/components";
// import { useRestaurants } from "@/hooks";

export const OrdersScreen = () => {
    //   const { data: restaurants = {
    //     results: []
    //   }, isLoading, isError } = useRestaurants();

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-8">كل الطلبات</h1>
                    {/* <RestaurantsTable
                        isLoading={isLoading}
                        isError={isError}
                        columns={columns}
                        data={restaurants.results}
                    /> */}
                </Sidebar>
            </div>
        </div>
    );
};
