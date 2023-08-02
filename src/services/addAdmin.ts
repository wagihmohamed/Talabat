import { api } from "@/api";
import { addAdmin } from "@/api/apiURLs";
import { AddAdminParams, AddAdminResponse } from "@/models";
import { AxiosResponse } from "axios";


export const addAdminService = async (newAdmin: AddAdminParams) => {
  const response = await api.post<
    AddAdminParams,
    AxiosResponse<AddAdminResponse>
  >(addAdmin, newAdmin);
  return response.data;
};
