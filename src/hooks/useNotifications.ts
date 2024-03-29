import { useQuery } from "@tanstack/react-query";
import { getNotificationsService } from "@/services/getNotifications";
import { useAuth } from "@/store";
import { useLocation } from "react-router-dom";

export const useNotifications = () => {
    const { user } = useAuth();
    const url = useLocation();
    const isNavigation = url.pathname.startsWith("/notifications");
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotificationsService,
        enabled: !!user.token,
        refetchInterval: (data) => {
            if (data?.results.some((notification) => !notification.seen)) {
                return Infinity
            }
            return 30000
        },
        refetchOnWindowFocus: (query) => {
            if (query.state?.data?.results.some((notification) => !notification.seen)) {
                return false
            }
            return true
        },
        refetchOnMount: isNavigation ? true : false,
    });
};
