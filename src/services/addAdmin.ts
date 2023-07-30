import { sleep } from "@/lib/sleep";
import { adminsData } from "@/mockup";
import { AddAdminParams } from "@/models";

export const addAdminService = async (newAdmin: AddAdminParams) => {
  await sleep(2000);
  console.log(newAdmin);

  return adminsData;
};
