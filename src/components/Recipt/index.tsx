import { Order } from "@/services/getOrders";
import "./styles.css";
import { LogoBG } from "@/assets";

interface TableRowProps {
  item: string;
  quantity: string;
  subtotal: string;
  notes?: string;
  options?: {
    id: number;
    name: string;
    value: string;
  }[];
  index: number;
}
function TableRow({
  item,
  quantity,
  subtotal,
  notes,
  options,
  index,
}: TableRowProps) {
  return (
    <>
      <tr className="service">
        <td className="tableitem">
          <p className="itemtext">{`${index + 1}. ${item}`}</p>
        </td>
        <td className="tableitem">
          <p className="itemtext">{quantity}</p>
        </td>
        <td className="tableitem">
          <p className="itemtext">{subtotal}</p>
        </td>
        <td className="tableitem">
          <p className="itemtext">{notes || "--"}</p>
        </td>
      </tr>
      {options && options.length > 0 ? (
        <tr className="border-b-2">
          <td colSpan={4} className="tableitem">
            <p className="itemtext">
              الاضافات: {options.map((option) => option.name).join(" و ")}
            </p>
          </td>
        </tr>
      ) : (
        <tr className="border-b-2">
          <td colSpan={4} className="tableitem">
            <p className="itemtext">الاضافات: لا يوجد</p>
          </td>
        </tr>
      )}
    </>
  );
}
export const Receipt = ({
  order,
  innerRef,
  className,
}: {
  order: Order;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef: any;
  className?: string;
}) => {
  return (
    <div className={className} id="invoice-POS" ref={innerRef}>
      <center id="top">
        <img className="logo" src={LogoBG} />
        <div className="info">
          <p className="mt-2 font-bold">طلباتك</p>
        </div>
      </center>
      <div id="mid">
        <div className="info spacey-2">
          <h2>معلومات التوصيل</h2>
          <p className="font-bold">
            العنوان : {order.address}
            <br />
            <div className="my-1" />
            الهاتف: {order.phone}
            <br />
            <div className="my-1" />
            ملاحظات: {order.notes || "--"}
          </p>
        </div>
      </div>
      <div id="table">
        <table>
          <thead>
            <tr className="tabletitle">
              <td className="item">
                <p className="itemtext">الاسم</p>
              </td>
              <td className="Hours">
                <p className="text-2xl">العدد</p>
              </td>
              <td className="Rate">
                <p className="text-2xl">الاجمالي</p>
              </td>
              <td className="Rate">
                <p className="text-2xl">الملاحظات</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {order.cart_products?.map((product, idx) => (
              <TableRow
                key={product.id}
                item={product.product.title}
                quantity={product.quantity.toString()}
                subtotal={product.total.toString()}
                notes={product.notes}
                options={product.options}
                index={idx}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="tabletitle">
              <td></td>
              <td className="Rate">
                <p className="text-2xl">قيمة التوصيل</p>
              </td>
              <td className="payment">
                <p className="text-2xl">{order.shipping}</p>
              </td>
            </tr>
            <tr className="tabletitle">
              <td></td>
              <td className="Rate">
                <p className="text-2xl">الاجمالي</p>
              </td>
              <td className="payment">
                <p className="text-2xl">{order.total}</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
