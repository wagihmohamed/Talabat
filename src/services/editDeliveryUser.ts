import { sleep } from "@/lib/sleep";
import { deliveriesPersons } from "@/mockup";
import { DeliveryPerson } from "@/models";

export const editDeliveryUserService = async (newDeliveryData: DeliveryPerson) => {
    await sleep(2000);
    const newDeliveyUsersData = deliveriesPersons.map((delivery) => {
        if (delivery.id === newDeliveryData.id) {
            return newDeliveryData;
        }
        return delivery;
    });
    return newDeliveyUsersData;
};
