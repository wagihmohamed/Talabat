import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/services";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
};
