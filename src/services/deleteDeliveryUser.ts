import { sleep } from "@/lib/sleep";
import { deliveriesPersons } from "@/mockup";

export const deleteDeliveryUserService = async (deliveryUserId: number) => {
    await sleep(2000);
    const newDeliveryUsersData = deliveriesPersons.filter((deliveryUser) => {
        if (deliveryUser.id !== deliveryUserId) {
            return deliveryUser;
        }
    });
    return newDeliveryUsersData;
};
