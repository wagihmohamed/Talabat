import { LoadingErrorPlaceholder, Sidebar } from "@/components";
import { CarouselCard } from "./components/ProductItem";
import { useProducts } from "@/hooks";

export const ProductsScreen = () => {
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
                    <LoadingErrorPlaceholder
                        isError={isError}
                        isLoading={isLoading}
                    >
                        <div className="grid grid-cols-4 gap-4">
                            {response.results.map((product) => (
                                <CarouselCard product={product} key={product.id} />
                            ))}
                        </div>
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
