import { api } from "@/api";
import { deleteUser } from "@/api/apiURLs";

export const deleteAdminService = async (adminId: number) => {
  const response = await api.delete(deleteUser + `/${adminId}`);
  return response.data;
};
