import { sleep } from "@/lib/sleep";
import { deliveriesPersons } from "@/mockup";
import { DeliveryPerson } from "@/models";

export const addDeliveryUserService = async (newDelivery: DeliveryPerson) => {
    await sleep(2000);
    const newDeliveryData = deliveriesPersons.push(newDelivery);
    return newDeliveryData;
};
