import { LoadingErrorPlaceholder, Sidebar } from "@/components";
import { useNotifications } from "@/hooks";
import { NotificationItem } from "./components/NotificationItem";

export const RecievedNotifications = () => {
    const { data: notifications = {
        results: []
    }, isLoading, isError } = useNotifications();
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-12">الاشعارات</h1>
                    <LoadingErrorPlaceholder
                        isLoading={isLoading}
                        isError={isError}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {notifications.results.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    description={notification.description}
                                    orderId={notification.orderId}
                                    seen={notification.seen}
                                    title={notification.title}
                                />
                            ))}
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
