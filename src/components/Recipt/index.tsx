import { Order } from '@/services';
import './styles.css'
import { LogoBG } from '@/assets';

interface TableRowProps {
    item: string;
    quantity: string;
    subtotal: string;
    notes?: string;
}

function TableRow({ item, quantity, subtotal, notes }: TableRowProps) {
    return (
        <tr className="service">
            <td className="tableitem"><p className="itemtext">{item}</p></td>
            <td className="tableitem"><p className="itemtext">{quantity}</p></td>
            <td className="tableitem"><p className="itemtext">{subtotal}</p></td>
            <td className="tableitem"><p className="itemtext">{notes || "--"}</p></td>
        </tr>
    );
}

export const Receipt = ({ order, innerRef, className }: {
    order: Order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    innerRef: any
    className?: string
}) => {

    return (
        <div className={className} id="invoice-POS" ref={innerRef}>
            <center id="top">
                <img className="logo" src={LogoBG} />
                <div className="info">
                    <p className='mt-2 font-bold'>طلباتك</p>
                </div>
            </center>
            <div id="mid">
                <div className="info">
                    <h2>معلومات التوصيل</h2>
                    <p className='font-bold'>
                        العنوان : {order.address}<br />
                        الهاتف: {order.phone}<br />
                    </p>
                </div>
            </div>
            <div id="table">
                <table>
                    <thead>
                        <tr className="tabletitle">
                            <td className="item"><p className='text-4xl'>الاسم</p></td>
                            <td className="Hours"><p className='text-2xl'>العدد</p></td>
                            <td className="Rate"><p className='text-2xl'>الاجمالي</p></td>
                            <td className="Rate"><p className='text-2xl'>الملاحظات</p></td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cart_products?.map((product) => (
                            <TableRow
                                key={product.id}
                                item={product.product.title}
                                quantity={product.quantity.toString()}
                                subtotal={product.total.toString()}
                                notes={product.notes}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="tabletitle">
                            <td></td>
                            <td className="Rate"><p className='text-2xl'>قيمة التوصيل</p></td>
                            <td className="payment"><p className='text-2xl'>{order.shipping}</p></td>
                        </tr>
                        <tr className="tabletitle">
                            <td></td>
                            <td className="Rate"><p className='text-2xl'>الاجمالي</p></td>
                            <td className="payment"><p className='text-2xl'>{order.total}</p></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/*  */}
            <div id="table" className='mt-4'>
                <table>
                    <thead>
                        <tr className="tabletitle">
                            <td className="item"><p className='text-4xl'>الاضافه</p></td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cart_products?.map((product) => {
                            return product.options.map((option) => (
                                <tr className="service">
                                    <td className="tableitem"><p className="itemtext">{option.name}</p></td>
                                </tr>
                            ))
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
