import { sleep } from "@/lib/sleep";
import { adminsData } from "@/mockup";

export const getAdminsService = async () => {
  await sleep(2000);
  return adminsData;
};
