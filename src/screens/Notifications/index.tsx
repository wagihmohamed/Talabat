import { Button, CustomSelect, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingErrorPlaceholder, Sidebar, Textarea, Checkbox } from "@/components";
import { useGetAllUsers, useSendNotifications } from "@/hooks";
import { useForm } from "react-hook-form";
import { renderUserRole, sendNotificationSchema, topics } from "./utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebounce } from 'use-debounce';

export const NotificationsScreen = () => {
    const defaultValues = {
        title: "",
        description: "",
        topic: undefined,
        // usersIds: [],
    }

    const form = useForm<z.infer<typeof sendNotificationSchema>>({
        resolver: zodResolver(sendNotificationSchema),
        defaultValues,
    });

    const { mutate: sendNotification, isLoading } = useSendNotifications({
        onSuccess: () => {
            form.reset(defaultValues);
            setSelectedUsers([]);
            setSelectedRole(undefined);
            setSearchTerm("");
        },
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [value] = useDebounce(searchTerm, 1000);
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);



    const { data: usersData = {
        results: []
    }, isLoading: isSearching } = useGetAllUsers({
        role: selectedRole,
        search: value,
    });

    const onSubmit = (values: z.infer<typeof sendNotificationSchema>) => {
        sendNotification({
            description: values.description,
            title: values.title,
            topic: values.topic === 'manual' ? undefined : values.topic,
            usersIds: values.topic !== 'manual' ? undefined : selectedUsers,
        });
    };
    const watchedTopic = form.watch('topic');

    const handleAddOrRemoveUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };


    const handleSelectRole = (role: string) => {
        if (selectedRole === role) {
            setSelectedRole(undefined);
        } else {
            setSelectedRole(role);
        }
    };

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
                                    <Input
                                        defaultValue={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="ابحث بالاسم"
                                        type="search"
                                    />
                                    <div className="flex items-center gap-8 px-6">
                                        <div className="items-top flex gap-2">
                                            <Checkbox id="vendors"
                                                onCheckedChange={() => handleSelectRole('vendor')}
                                                checked={selectedRole === 'vendor'}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="vendors"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    مطاعم
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex gap-2">
                                            <Checkbox id="delivery"
                                                onCheckedChange={() => handleSelectRole('delivery')}
                                                checked={selectedRole === 'delivery'}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor="delivery"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    دليفري
                                                </label>
                                            </div>
                                        </div>
                                        <div className="items-top flex gap-2">
                                            <Checkbox
                                                id="admin"
                                                onCheckedChange={() => handleSelectRole('admin')}
                                                checked={selectedRole === 'admin'}
                                            />
                                            <div className="grid gap-1.3 leading-none">
                                                <label
                                                    htmlFor="admin"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    ادمن
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-4 h-72 w-full bg-muted/40 rounded-md overflow-y-scroll">
                                        <div className="grid grid-cols-2 gap-4 p-4">
                                            {isSearching && value && <p>جاري البحث...</p>}
                                            {!value && !selectedRole &&
                                                <p>ابحث عن مستخدمين</p>
                                            }
                                            {!isSearching && usersData.results.map((user) => (
                                                <div
                                                    onClick={() => handleAddOrRemoveUser(user.id)}
                                                    className={cn("flex items-center justify-around gap-4 bg-background p-2 rounded cursor-pointer"
                                                        , selectedUsers.includes(user.id) && "bg-primary/60 text-white"
                                                    )}>
                                                    <p>{user.name}</p>
                                                    <p>{renderUserRole(user.role)}</p>
                                                    <p>{user.phone}</p>
                                                </div>
                                            ))}
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
