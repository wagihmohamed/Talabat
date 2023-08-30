import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
} from "@/components";
import { useDeleteOrder } from "@/hooks";
import { Order } from "@/services";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteOrderDialog = ({
    order,
}: {
    order: Order;
}) => {
    const {
        mutate: deleteOrder,
        isLoading,
        reset,
    } = useDeleteOrder({
        onSuccess: () => {
            setOpen(false);
            reset();
        },
    });
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        deleteOrder(order.id);
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
            }}
        >
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        هل انت متأكد من حذف طلب {order.name}؟
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        لا يمكنك التراجع عن هذا الاجراء, سيتم حذف الطلب نهائياً
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            isLoading={isLoading}
                        >
                            حذف
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogCancel>الغاء</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
