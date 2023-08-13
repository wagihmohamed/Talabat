import { api } from "@/api";
import { addDeliveryCostForVendor } from "@/api/apiURLs";

export interface addDeliveryCostForVendorPayload {
    vendorId: number;
    costs: {
        area: number;
        cost: number;
    }[];
}

export const addDeliveryCostForVendorService = async (newDelivery: addDeliveryCostForVendorPayload) => {
    const response = await api.post<addDeliveryCostForVendorPayload
    >(addDeliveryCostForVendor, newDelivery, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
