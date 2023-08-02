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
  Badge,
} from "@/components";
import { DeliveryUser } from "@/models";
// import { DeleteDeliveryDialog, EditRestaurant } from "./components";

export const deliveriesColumns: ColumnDef<DeliveryUser>[] = [
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
    accessorKey: "phone",
    header: "الهاتف",
  },
  {
    accessorKey: "restaurantName",
    header: "المطعم",
    cell: ({ getValue }) => {
      const restaurantName = getValue();
      return restaurantName ? restaurantName : "لا يوجد";
    }
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status === "active" ? "مفعل" : "غير مفعل"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      // { row }
      // const deliveryUser = row.original;

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
              {/* <DeleteDeliveryDialog deliveryUser={deliveryUser} />
              <EditRestaurant deliveryUser={deliveryUser} /> */}
              <DropdownMenuSeparator />
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
