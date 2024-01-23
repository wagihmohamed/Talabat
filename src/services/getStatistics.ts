import { api } from "@/api";
import { getStatistics } from "@/api/apiURLs";

interface StatisticsResponse {
  products: number;
  customers: number;
  orders: number;
}

export const getStatisticsService = async () => {
  const response = await api.get<StatisticsResponse>(getStatistics);
  return response.data;
};
