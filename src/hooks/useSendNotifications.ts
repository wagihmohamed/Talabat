import { useMutation } from "@tanstack/react-query";
import { sendNotificationService, SendNotificationParams } from "@/services/sendNotifications";
import { toast } from "react-toastify";

export const useSendNotifications = () => {
    return useMutation({
        mutationFn: ({
            description,
            title,
            topic,
            usersIds
        }: SendNotificationParams) => sendNotificationService({
            description,
            title,
            topic,
            usersIds
        }),
        onSuccess: () => {
            toast.success("تم إرسال الإشعار بنجاح");
        }
    })
}