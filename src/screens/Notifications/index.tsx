import { Button, CustomSelect, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingErrorPlaceholder, Sidebar, Textarea } from "@/components";
import { useSendNotifications } from "@/hooks";
import { useForm } from "react-hook-form";
import { sendNotificationSchema, topics } from "./utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

export const NotificationsScreen = () => {
    const { mutate: sendNotification, isLoading } = useSendNotifications();

    const form = useForm<z.infer<typeof sendNotificationSchema>>({
        resolver: zodResolver(sendNotificationSchema),
        defaultValues: {
            title: "",
            description: "",
            topic: undefined,
            // usersIds: [],
        },
    });

    const onSubmit = (values: z.infer<typeof sendNotificationSchema>) => {
        sendNotification({
            description: values.description,
            title: values.title,
            topic: values.topic === 'manual' ? undefined : values.topic,
            // usersIds: values.topic !== 'manual' ? undefined : values.usersIds?.map((id) => parseInt(id)),
        });
    };
    const watchedTopic = form.watch('topic');

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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="mt-10 mb-10">
                                    <FormField
                                        control={form.control}
                                        name="topic"
                                        render={() => (
                                            <FormItem className="flex flex-col space-y-4">
                                                <FormLabel>تحديد المستهدفين للارسال</FormLabel>
                                                <FormControl>
                                                    <CustomSelect
                                                        options={topics}
                                                        onChange={(option: {
                                                            label: string;
                                                            value: string;
                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        }) => form.setValue('topic', option.value as any)}
                                                    />
                                                </FormControl>
                                                {!watchedTopic && form.formState.isSubmitted && (
                                                    <p className="text-sm font-medium text-destructive">
                                                        يجب اختيار مستهدفين للارسال
                                                    </p>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {watchedTopic === 'manual' && <div className="flex flex-col space-y-4 mt-4 mb-6">
                                    <Input placeholder="ابحث بالاسم" />
                                    <div className="flex flex-col space-y-4 h-64 w-full bg-muted/40 rounded-md overflow-y-scroll">
                                        <div className="grid grid-cols-3 gap-4 p-4">
                                            <div className={cn("flex items-center justify-around gap-4 bg-background p-2 rounded cursor-pointer"
                                            )}>
                                                <p>عمر</p>
                                                <p>مستخدم</p>
                                                01115923203
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div className="flex flex-col space-y-10">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col space-y-4">
                                                <FormLabel>عنوان الاشعار</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col space-y-4">
                                                <FormLabel>محتوى الاشعار</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex mt-10 gap-10">
                                    <Button className="w-44"
                                        isLoading={isLoading}
                                        type="submit"
                                        disabled={
                                            isLoading ||
                                            !form.formState.isValid
                                        }
                                    >
                                        ارسال
                                    </Button>
                                    <Button type="reset" className="w-44" variant='destructive'>
                                        الغاء
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div >
    );
};
