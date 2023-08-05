import { useQuery } from "@tanstack/react-query";
import { getRestaurantsService } from "@/services";

export const useRestaurants = () => {
  const query = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurantsService,
  });
  const restaurantOptions = query.data?.results.map((restaurant) => ({
    label: restaurant.name,
    value: restaurant.id.toString(),
  }));
  return { ...query, restaurantOptions };
};
