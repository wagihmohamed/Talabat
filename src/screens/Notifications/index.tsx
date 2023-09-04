import { Button, CustomSelect, Input, Label, LoadingErrorPlaceholder, Sidebar, Textarea } from "@/components";
import { useState } from "react";

const options = [
    {
        label: "المطاعم",
        value: "vendor",
    },
    {
        label: "عملاء التوصيل",
        value: "delivery",
    },
    {
        label: "العملاء",
        value: "customer",
    },
    {
        label: "تحديد يدوي",
        value: "manual",
    },
];

export const NotificationsScreen = () => {
    const [selectedOption, setSelectedOption] = useState<typeof options[0]>();
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">الاشعارات</h1>
                    <p className="text-sm text-muted-foreground mb-5">
                        يمكنك ارسال اشتعارات للمستخدمين من هنا
                    </p>
                    <LoadingErrorPlaceholder
                        isError={false}
                        isLoading={false}
                    >
                        <div className="mt-10 mb-10">
                            <div className="flex flex-col space-y-4">
                                <Label>
                                    تحديد المستهدفين للارسال
                                </Label>
                                <CustomSelect
                                    options={options}
                                    value={selectedOption}
                                    onChange={(option: {
                                        label: string;
                                        value: string;
                                    }) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-10">
                            <div className="flex flex-col space-y-4">
                                <Label>
                                    عنوان الاشعار
                                </Label>
                                <Input />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Label htmlFor="message">
                                    محتوى الاشعار
                                </Label>
                                <Textarea id="message" />
                            </div>
                        </div>
                        <div className="flex mt-10 gap-10">
                            <Button className="w-44">
                                ارسال
                            </Button>
                            <Button className="w-44" variant='destructive'>
                                الغاء
                            </Button>
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div >
    );
};
