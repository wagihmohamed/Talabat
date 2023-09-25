import { Sidebar, RestaurantsTable } from "@/components";
import { columns } from "@/components/ui/RestaurantsTable/columns";
import { useNotifications, useRestaurants } from "@/hooks";

export const HomeScreen = () => {
  const { data: restaurants = {
    results: []
  }, isLoading, isError } = useRestaurants();
  useNotifications();
  return (
    <div className="w-full">
      <div className="h-screen">
        <Sidebar>
          <h1 className="text-2xl font-bold mb-8">كل المطاعم</h1>
          <RestaurantsTable
            isLoading={isLoading}
            isError={isError}
            columns={columns}
            data={restaurants.results}
          />
        </Sidebar>
      </div>
    </div>
  );
};
