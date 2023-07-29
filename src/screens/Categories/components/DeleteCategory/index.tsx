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
import { useDeleteCategory } from "@/hooks";
import { Category } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteCategoryDialog = ({ category }: { category: Category }) => {
  const {
    mutate: deleteRestaurant,
    isLoading,
    reset,
  } = useDeleteCategory({
    onSuccess: () => {
      setOpen(false);
      reset();
    },
  });
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    deleteRestaurant(category.id);
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
            هل انت متأكد من حذف القسم {category.name}؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكنك التراجع عن هذا الاجراء, سيتم حذف القسم نهائياً
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
