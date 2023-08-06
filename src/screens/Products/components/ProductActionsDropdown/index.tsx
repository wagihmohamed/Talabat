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
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('vendorId', product.vendorId.toString());
        formData.append('description', product.description);
        formData.append('categoryId', product.categoryId.toString());
        formData.append('available', product.available ? 'false' : 'true');
        formData.append('featured', product.featured ? 'true' : 'false');
        changeProductStatus({
            id: product.id,
            payload: formData
        })
    }

    const handleFeatureChange = () => {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('vendorId', product.vendorId.toString());
        formData.append('description', product.description);
        formData.append('categoryId', product.categoryId.toString());
        formData.append('available', product.available ? 'true' : 'false');
        formData.append('featured', product.featured ? 'false' : 'true');
        changeProductStatus({
            id: product.id,
            payload: formData
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
