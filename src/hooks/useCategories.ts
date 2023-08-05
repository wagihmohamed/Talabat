import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/services";

export const useCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
  const categoryOptions = query.data?.results.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));
  return { ...query, categoryOptions }
};
