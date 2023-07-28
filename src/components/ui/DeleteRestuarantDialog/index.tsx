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
import { Restuarant } from "@/models";
import { Trash2 } from "lucide-react";

export const DeleteRestuarantDialog = ({
  restuarant,
}: {
  restuarant: Restuarant;
}) => {
  const { name } = restuarant;

  return (
    <AlertDialog>
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
            هل انت متأكد من حذف المطعم {name}؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكنك التراجع عن هذا الاجراء, سيتم حذف المطعم نهائياً
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>الغاء</AlertDialogCancel>
          <AlertDialogAction>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
