import { LoadingErrorPlaceholder, Sidebar } from "@/components";

export const NotificationsScreen = () => {
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">الاشعارات</h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك ارسال اشتعارات للمستخدمين من هنا
                    </p>
                    <LoadingErrorPlaceholder
                        isError={false}
                        isLoading={false}
                    >
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
