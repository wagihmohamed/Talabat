import { api } from "@/api";
import { getNotifications } from "@/api/apiURLs";

export interface Notification {
    id: number;
    title: string;
    description: string;
    seen: boolean;
    orderId: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface notificationsResponse {
    results: Notification[]
}

export const getNotificationsService = async () => {
    const response = await api.get<notificationsResponse>(getNotifications);
    return response.data;
};