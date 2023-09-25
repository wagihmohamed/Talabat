import { useQuery } from "@tanstack/react-query";
import { getNotificationsService } from "@/services/getNotifications";
import { useAuth } from "@/store";

export const useNotifications = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotificationsService,
        enabled: !!user.token,
        refetchInterval: (data) => {
            if (data?.results.some((notification) => !notification.seen)) {
                return Infinity
            }
            return 10000
        },
        refetchOnWindowFocus: (query) => {
            if (query.state?.data?.results.some((notification) => !notification.seen)) {
                return false
            }
            return true
        },
        refetchOnMount: false,
    });
};
