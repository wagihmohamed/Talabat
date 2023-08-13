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
import { useDeleteDeliveryArea } from "@/hooks";
import { DeliveryArea } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteDeliveryAreaDialog = ({ area }: { area: DeliveryArea }) => {
    const {
        mutate: deleteDeliveryArea,
        isLoading,
        reset,
    } = useDeleteDeliveryArea({
        onSuccess: () => {
            setOpen(false);
            reset();
        },
    });
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        deleteDeliveryArea(area.id);
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
            }}
        >
            <AlertDialogTrigger asChild>
                <Trash2 className="h-5 w-5 text-red-500 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        هل انت متأكد من حذف المنطقة {area.name}؟
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        لا يمكنك التراجع عن هذا الاجراء, سيتم حذف المنطقة نهائياً
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
