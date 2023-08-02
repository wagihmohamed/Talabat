import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Checkbox,
  DeleteRestuarantDialog,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components";
import { RestuarantItemResponse } from "@/models";
import { EditRestaurant } from "./components/EditRestaurant";

export const columns: ColumnDef<RestuarantItemResponse>[] = [
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
    id: "image",
    accessorKey: "image",
    cell: ({ row }) => {
      const value = row.original;
      return (
        <Avatar className="mx-auto">
          <AvatarImage src={value.image || ''} alt="restaurant image" />
          <AvatarFallback>
            {value.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar >
      )
    },
  },
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "address",
    header: "العنوان",
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
              <EditRestaurant restaurant={restuarant} />
              <DeleteRestuarantDialog restuarant={restuarant} />
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <span className="sr-only">الذهاب الى صفحة تفاصيل المطعم</span>
            <ChevronLeft className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
      );
    },
  },
];
