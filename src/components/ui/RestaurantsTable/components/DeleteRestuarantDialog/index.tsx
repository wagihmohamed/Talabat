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
import { useDeleteRestaurant } from "@/hooks";
import { Restuarant } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteRestuarantDialog = ({
  restuarant,
}: {
  restuarant: Restuarant;
}) => {
  const {
    mutate: deleteRestaurant,
    isLoading,
    reset,
  } = useDeleteRestaurant({
    onSuccess: () => {
      setOpen(false);
      reset();
    },
  });
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    deleteRestaurant(restuarant.id);
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
          className="flex w-full items-center justify-end gap-2 hover:bg-red-500 hover:text-white"
          variant="ghost"
        >
          <span className="sr-only">حذف المطعم</span>
          حذف
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            هل انت متأكد من حذف المطعم {restuarant.name}؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكنك التراجع عن هذا الاجراء, سيتم حذف المطعم نهائياً
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
