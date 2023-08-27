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
import { useDeleteSlider } from "@/hooks";
import { SliderItem } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteSliderDialog = ({ slider }: { slider: SliderItem }) => {
    const { mutate: deleteSlider, isLoading } = useDeleteSlider({
        onSuccess: () => {
            setOpen(false);
        }
    });
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        deleteSlider(slider.id);
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
                        هل انت متأكد من حذف العنصر {slider.title}؟
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        لا يمكنك التراجع عن هذا الاجراء, سيتم حذف العنصر نهائياً
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
