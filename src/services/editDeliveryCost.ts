import { api } from "@/api";
import { editDeliveryCost } from "@/api/apiURLs";

export const editDeliveryCostService = async (areaCostId: number, newCostValue: number) => {
    const response = await api.patch(editDeliveryCost + areaCostId, {
        cost: newCostValue
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;

}