import { sleep } from "@/lib/sleep";
import { adminsData } from "@/mockup";
import { AddAdminParams } from "@/models";

export const editAdminService = async (newRestauran: AddAdminParams) => {
    await sleep(2000);
    const newAdmintData = adminsData.map((admin) => {
        if (admin.phone === newRestauran.phone) {
            return newRestauran;
        }
        return admin;
    });
    return newAdmintData;
};
