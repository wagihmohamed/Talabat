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
import { useDeleteAdmin } from "@/hooks";
import { AdminItem } from "@/models";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteAdminDialog = ({ admin }: { admin: AdminItem }) => {
  const {
    mutate: deleteAdmin,
    isLoading,
    reset,
  } = useDeleteAdmin({
    onSuccess: () => {
      setOpen(false);
      reset();
    },
  });
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    deleteAdmin(admin.id);
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
          <span className="sr-only">حذف المشرف</span>
          حذف
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            هل انت متأكد من حذف المشرف {admin.name}؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكنك التراجع عن هذا الاجراء, سيتم حذف المشرف نهائياً
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
