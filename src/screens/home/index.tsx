import { Sidebar, RestaurantsTable } from "@/components";
import { columns } from "@/components/ui/RestaurantsTable/columns";
import { useRestaurants } from "@/hooks";

export const HomeScreen = () => {
  const { data: restaurants, isLoading, isError } = useRestaurants();

  return (
    <div className="border-t">
      <div className="h-screen">
        <Sidebar className="block">
          <h1 className="text-2xl font-bold mb-8">كل المطاعم</h1>
          <RestaurantsTable
            isLoading={isLoading}
            isError={isError}
            columns={columns}
            data={restaurants || []}
          />
        </Sidebar>
      </div>
    </div>
  );
};
