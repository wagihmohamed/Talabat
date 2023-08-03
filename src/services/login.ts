import { api } from "@/api";
import { adminLogin } from "@/api/apiURLs";
import { LoginParams, LoginResponse } from "@/models";
import { AxiosResponse } from "axios";

export const loginService = async ({
  key,
  password,
}: LoginParams) => {
  const response = await api.post<
    LoginParams,
    AxiosResponse<LoginResponse>
  >(adminLogin, {
    key,
    password,
  });
  return response.data;

};
