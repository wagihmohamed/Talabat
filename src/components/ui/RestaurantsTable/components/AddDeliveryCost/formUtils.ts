import * as z from "zod";

export const addRestaurantDeliveryCostFormSchema = z.object({
    costs: z.array(z.object({
        areaName: z.string(),
        areaId: z.number(),
        cost: z.number().positive(),
        areaItemId: z.number().optional(),
    })),
});
