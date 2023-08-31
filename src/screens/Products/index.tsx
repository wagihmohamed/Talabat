import { Button, LoadingErrorPlaceholder, Sidebar } from "@/components";
import { ProductCard } from "./components/ProductItem";
import { ProductsFilterTypes, useProducts } from "@/hooks";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductFilters } from "./components";
import { filterInitialState } from "@/lib/constants";
import { Pagination } from '@mantine/core';

export const ProductsScreen = () => {
    const [filters, setFilters] = useState<ProductsFilterTypes>(filterInitialState);
    const navigate = useNavigate();
    const { data: response = {
        count: 0,
        pages: 0,
        results: []
    }, isLoading,
        isError,
        isFetching
    } = useProducts(filters);
    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar className="block">
                    <h1 className="text-2xl font-bold mb-8">كل المنتجات</h1>
                    <Button onClick={() => navigate('create')} className="mb-6">
                        اضافه منتج
                        <Plus className="h-4 w-4 mr-2" />
                    </Button>
                    <ProductFilters
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <LoadingErrorPlaceholder
                        isError={isError}
                        isLoading={isLoading || isFetching}
                    >
                        <div className="grid grid-cols-4 gap-4">
                            {response.results.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                        </div>
                        {response.pages ? <div className="mt-8 flex">
                            <Pagination
                                total={response.pages}
                                dir="rtl"
                                className="mx-auto"
                                value={filters.page}
                                onChange={(page) => setFilters({ ...filters, page })}
                                withControls={false}
                                color="hsl(var(--primary))"
                            />
                        </div> : null}
                    </LoadingErrorPlaceholder>
                </Sidebar>
            </div>
        </div>
    );
};
