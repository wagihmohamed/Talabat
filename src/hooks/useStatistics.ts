import { useQuery } from "@tanstack/react-query";
import { getStatisticsService } from "@/services";

export const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStatisticsService(),
  });
};
