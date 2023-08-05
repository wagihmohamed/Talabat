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
import { useDeleteProduct } from "@/hooks";
import { Product } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteProductDialog = ({ product }: { product: Product }) => {
    const {
        mutate: deleteProduct,
        isLoading,
        reset,
    } = useDeleteProduct({
        onSuccess: () => {
            setOpen(false);
            reset();
        },
    });
    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        deleteProduct(product.id);
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
                    className=""
                    variant="destructive"
                    size='sm'
                >
                    <span className="sr-only">حذف المشرف</span>
                    حذف
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        هل انت متأكد من حذف العنصر {product.title}؟
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
