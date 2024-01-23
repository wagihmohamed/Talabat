import { Sidebar, RestaurantsTable } from "@/components";
import { columns } from "@/components/ui/RestaurantsTable/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications, useRestaurants, useStatistics } from "@/hooks";
import { Skeleton, rem } from "@mantine/core";

export const HomeScreen = () => {
  const {
    data: restaurants = {
      results: [],
    },
    isLoading,
    isError,
  } = useRestaurants();
  const { data: statistics, isLoading: isStatisticsLoading } = useStatistics();
  useNotifications();
  return (
    <div className="border-t">
      <div className="h-screen">
        <Sidebar className="block">
          <h1 className="text-2xl font-bold mb-8">كل المطاعم</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            {isStatisticsLoading ? (
              <>
                <Skeleton height={rem(110)} width={rem(300)} />
                <Skeleton height={rem(110)} width={rem(300)} />
                <Skeleton height={rem(110)} width={rem(300)} />
              </>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      عدد العملاء
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statistics?.customers}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      عدد المنتجات
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statistics?.products}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      عدد الطلبات
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {statistics?.orders}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
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
