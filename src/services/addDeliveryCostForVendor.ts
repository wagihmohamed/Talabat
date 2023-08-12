import { api } from "@/api";
import { addDeliveryCostForVendor } from "@/api/apiURLs";

export interface addDeliveryCostForVendorPayload {
    vendorId: string;
    costs: {
        area: string;
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
