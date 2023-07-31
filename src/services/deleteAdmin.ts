import { sleep } from "@/lib/sleep";
import { adminsData } from "@/mockup";

export const deleteAdminService = async (adminId: number) => {
  await sleep(2000);
  const newAdminsData = adminsData.filter((admin) => {
    if (admin.id !== adminId) {
      return admin;
    }
  });
  return newAdminsData;
};
