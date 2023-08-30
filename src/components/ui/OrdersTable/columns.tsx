import { ColumnDef } from "@tanstack/react-table";
import {
    Badge,
} from "@/components";
import { Order } from "@/services";
import { DeleteOrderDialog } from "./components/DeleteOrder";

export const columns: ColumnDef<Order>[] = [
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
        header: "الطلبات",
        cell: ({ row }) => {
            const value = row.original;
            return (
                <div className="flex">
                    <div className="mx-auto flex justify-end">
                        {value.cart_products.map((item, index) => (
                            <Badge className="text-white" key={index}>{item.product.title} : {item.quantity}</Badge>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "cart_products",
        header: "المطاعم",
        cell: ({ row }) => {
            const value = row.original;
            return (
                <div className="flex">
                    <div className="mx-auto flex justify-end">
                        {value.cart_products.map((item, index) => (
                            <Badge variant='outline' className="text-white" key={index}>{item.product.user.name}</Badge>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "total",
        header: "المجموع",
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const value = row.original;
            return (
                <div className="flex">
                    {value.status === 'complete' ? (
                        <div className="mx-auto flex">
                            <Badge>تم التوصيل</Badge>
                        </div>
                    ) : value.status === 'in the way' ? (
                        <div className="mx-auto flex justify-end">
                            <Badge variant='secondary'>في الطريق</Badge>
                        </div>
                    ) : value.status === 'not started' ? (
                        <div className="mx-auto flex justify-end">
                            <Badge variant='destructive'>لم يبدأ</Badge>
                        </div>
                    ) : value.status === 'preparing' ? (
                        <div className="mx-auto flex justify-end">
                            <Badge variant='warning'>قيد التحضير</Badge>
                        </div>
                    ) : value.status === 'started' ? (
                        <div className="mx-auto flex justify-end">
                            <Badge variant='outline'>تم البدء</Badge>
                        </div>) : null}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original;

            return (
                <div className="flex justify-center items-center gap-4">
                    <DeleteOrderDialog order={order} />
                </div>
            );
        },
    },
];
