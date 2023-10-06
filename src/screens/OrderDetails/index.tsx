import { Badge, Button, LoadingErrorPlaceholder, Sidebar, } from "@/components";
import { DeleteOrderDialog } from "@/components/ui/OrdersTable/components/DeleteOrder";
import { useOrderDetails } from "@/hooks";
import { Order } from "@/services";
import { ChevronRight, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetailsItem } from "./components/OrderDetailsItem";
import { Receipt } from "@/components/Recipt";
import { useReactToPrint } from 'react-to-print';
import { useRef } from "react";


export const OrderItemDetailsScreen = () => {
    const { orderId = '' } = useParams();
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => {
            const printableComponent = componentRef.current as HTMLElement | null;
            if (printableComponent) {
                printableComponent.classList.remove("hidden");
            }
            return printableComponent;
        },
        onAfterPrint: () => {
            const printableComponent = componentRef.current as HTMLElement | null;
            if (printableComponent) {
                printableComponent.classList.add("hidden");
            }
        },
    });

    const { data: orderDetails = {
        message: '',
        order: {} as Order
    }, isLoading, isError } = useOrderDetails({
        orderId: parseInt(orderId)
    });
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <div className="flex justigy-between items-center">
                        <div className="flex items-center gap-3 mb-8">
                            <ChevronRight onClick={handleBack} className="w-8 h-8 cursor-pointer" />
                            <h1 className="text-2xl font-bold ml-4">
                                الطلب الخاص ب{orderDetails?.order?.name}
                            </h1>
                            {orderDetails?.order && <DeleteOrderDialog order={orderDetails?.order} />}
                            <Button onClick={handlePrint} variant='secondary'>
                                <Printer onClick={handlePrint} className="h-4 w-4 cursor-pointer" />
                            </Button>
                        </div>
                    </div>
                    <LoadingErrorPlaceholder
                        isLoading={isLoading}
                        isError={isError}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <OrderDetailsItem
                                title="اسم العميل"
                                value={orderDetails?.order?.name}
                            />
                            <OrderDetailsItem
                                title="العنوان"
                                value={orderDetails?.order?.address}
                            />
                            <OrderDetailsItem
                                title="رقم الهاتف"
                                value={orderDetails?.order?.phone}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-6">
                            <OrderDetailsItem
                                title="قيمة الطلب"
                                value={orderDetails?.order?.subtotal}
                            />
                            <OrderDetailsItem
                                title="قيمة التوصيل"
                                value={orderDetails?.order?.shipping}
                            />
                            <OrderDetailsItem
                                title="الإجمالي"
                                value={orderDetails?.order?.total}
                            />
                            <OrderDetailsItem
                                title="الكمية"
                                value={orderDetails?.order?.total_quantity?.toString()}
                            />
                        </div>
                        <h1 className="text-2xl font-bold mt-8 mb-4">
                            المنتجات المطلوبة
                        </h1>
                        {orderDetails.order?.notes && (
                            <p className="mb-8">
                                ملاحظات: {orderDetails.order?.notes}
                            </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {orderDetails?.order?.cart_products?.map((product) => (
                                <OrderDetailsItem
                                    key={product.id}
                                    title={product.product.title}
                                    productChildren={
                                        <>
                                            <div className="flex items-center gap-5">
                                                <div>
                                                    السعر: <Badge className="mt-4" color="primary">
                                                        {product?.product?.price}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    العدد: <Badge className="mt-4 px-2" variant='outline'>
                                                        {product?.quantity}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p className="mt-3">
                                                ملاحظات: {product?.notes || 'لا يوجد'}
                                            </p>
                                            {product?.options.length > 0 ? (
                                                <>
                                                    <p className="mt-4">الاضافات</p>
                                                    <div className="mr-4">
                                                        {product.options.map((option) => (
                                                            <span className="flex items-center gap-2" key={option.id}>
                                                                {option?.name}
                                                                <Badge>{option?.value}</Badge>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : null}
                                        </>
                                    }
                                />
                            ))}
                            <Receipt
                                order={orderDetails.order}
                                innerRef={componentRef}
                                className="hidden"
                            />
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
