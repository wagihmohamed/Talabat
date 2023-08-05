import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Button,
    DropdownMenuItem,
    Switch
} from "@/components"
import { useEditProduct } from "@/hooks";
import { Product } from "@/models";

interface ProductActionsDropdownProps {
    product: Product
}

export const DropdownMenuRadioGroupDemo = ({
    product
}: ProductActionsDropdownProps) => {
    const { mutate: changeProductStatus } = useEditProduct({
        onSuccess: () => { }
    });

    const handleStockChange = () => {
        changeProductStatus({
            id: product.id,
            payload: {
                available: product.available ? 'false' : 'true',
                categoryId: product.categoryId.toString(),
                featured: product.featured ? 'true' : 'false',
                description: product.description,
                price: product.price.toString(),
                title: product.title,
                vendorId: product.vendorId.toString(),
            }
        })
    }

    const handleFeatureChange = () => {
        changeProductStatus({
            id: product.id,
            payload: {
                available: product.available ? 'true' : 'false',
                categoryId: product.categoryId.toString(),
                featured: product.featured ? 'false' : 'true',
                description: product.description,
                price: product.price.toString(),
                title: product.title,
                vendorId: product.vendorId.toString(),
            }
        })
    }

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    تعديل حالة المنتج
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50">
                <DropdownMenuLabel>
                    حالة المنتج
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <div className="flex justify-between items-center">
                        <p>متاح</p>
                        <Switch
                            checked={product.available}
                            onCheckedChange={handleStockChange}
                        />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <div className="flex justify-between items-center">
                        <p>مميز</p>
                        <Switch
                            checked={product.featured}
                            onCheckedChange={handleFeatureChange}
                        />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
