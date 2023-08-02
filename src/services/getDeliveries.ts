import { sleep } from "@/lib/sleep";
import { deliveriesPersons } from "@/mockup";

export const getDeliveriesService = async () => {
  await sleep(2000);
  return deliveriesPersons;
};
