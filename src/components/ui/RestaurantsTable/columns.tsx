import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Checkbox,
  DeleteRestuarantDialog,
} from "@/components";
import { Restuarant } from "@/models";

export const columns: ColumnDef<Restuarant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="تحديد الكل"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="تحديد صف"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "username",
    header: "اسم المستخدم",
  },
  {
    accessorKey: "phone",
    header: "الهاتف",
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    accessorKey: "address.street",
    header: "الشارع",
  },
  {
    accessorKey: "address.city",
    header: "المدينة",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const restuarant = row.original;

      return (
        <div className="flex justify-center items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">فتح قائمة الاجراءات للمستخدم</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel className="text-end mb-2">
                <span className="sr-only">الاجراءات</span>
                الاجراءات
              </DropdownMenuLabel>
              <DeleteRestuarantDialog restuarant={restuarant} />
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-end gap-2">
                <span className="sr-only">تعديل المطعم</span>
                تعديل
                <Pencil className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <span className="sr-only">الذهاب الى صفحة تفاصيل المطعم</span>
            <ChevronLeft className="h-4 w-4" />
          </div>
        </div>
      );
    },
  },
];
