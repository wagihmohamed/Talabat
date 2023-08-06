import { ProductsFilterTypes } from "@/hooks";

export const filterInitialState: ProductsFilterTypes = {
    page: 1,
    size: 10,
    featured: undefined,
    recent: undefined,
    bestSeller: undefined,
    vendorId: undefined,
    categoryId: undefined,
    available: undefined,
}