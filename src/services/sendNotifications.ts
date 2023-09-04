import { api } from "@/api";
import { sendNotification } from "@/api/apiURLs";

export interface SendNotificationParams {
    title: string;
    description: string;
    topic?: 'vendor' | 'delivery' | 'customer' | 'manual';
    usersIds?: number[];
}

export const sendNotificationService = async ({
    title,
    description,
    topic,
    usersIds,
}: SendNotificationParams) => {
    const response = await api.post<SendNotificationParams>(sendNotification, {
        title,
        description,
        topic,
        usersIds,
    });
    return response.data;
}