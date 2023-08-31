interface OrderDetailsItemProps {
    title: string;
    value?: string;
    productChildren?: React.ReactNode;
}

export const OrderDetailsItem = ({ title, value, productChildren }: OrderDetailsItemProps) => {
    return (
        <div className="flex border-2 border-primary flex-col bg-muted/70 p-3 rounded-lg">
            <h2 className="text-lg font-bold mb-4">
                {title}
            </h2>
            <p className="text-md">
                {value}
            </p>
            {productChildren}
        </div>
    );
}