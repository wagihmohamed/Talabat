import { useQuery } from "@tanstack/react-query";
import { getRestaurantsService } from "@/services";

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurantsService,
  });
};
