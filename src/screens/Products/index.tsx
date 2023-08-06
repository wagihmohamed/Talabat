import { Button, LoadingErrorPlaceholder, Sidebar } from "@/components";
import { ProductCard } from "./components/ProductItem";
import { useProducts } from "@/hooks";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductsScreen = () => {
    const navigate = useNavigate();
    const { data: response = {
        count: 0,
        pages: 0,
        results: []
    }, isLoading, isError } = useProducts();
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-8">كل المنتجات</h1>
                    <Button onClick={() => navigate('create')} className="mb-6">
                        اضافه منتج
                        <Plus className="h-4 w-4 mr-2" />
                    </Button>
                    <LoadingErrorPlaceholder
                        isError={isError}
                        isLoading={isLoading}
                    >
                        <div className="grid grid-cols-4 gap-4">
                            {response.results.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
