import { api } from "@/api";
import { getAdmins } from "@/api/apiURLs";
import { AdminResponse } from '@/models'

export const getAdminsService = async () => {
  const response = await api.get<AdminResponse>(getAdmins);
  return response.data;
};
