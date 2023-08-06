import {
    Button,
    CustomSelect,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Label,
    Switch,
} from "@/components";
import { ProductsFilterTypes, useCategories, useProducts, useRestaurants } from "@/hooks";
import { filterInitialState } from "@/lib/constants";
import { X, RotateCw } from "lucide-react";

interface Props {
    filters: ProductsFilterTypes;
    setFilters: React.Dispatch<React.SetStateAction<ProductsFilterTypes>>;
}

export const ProductFilters = ({ filters, setFilters }: Props) => {
    const { refetch } = useProducts(filters);
    const { restaurantOptions } = useRestaurants();
    const { categoryOptions } = useCategories();
    const { featured, available, bestSeller, recent } = filters;

    const handleCheckboxChange = (field: keyof ProductsFilterTypes) => (checked: boolean) => {
        setFilters((prev) => ({
            ...prev,
            [field]: checked,
        }));
    };

    const handleChangePageSize = (size: number) => {
        setFilters((prev) => ({
            ...prev,
            size,
        }));
    };

    const handleResetFilters = () => {
        setFilters(filterInitialState);
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center px-10 gap-4 mb-4">
                <div className="flex gap-4 items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="available-switch" className="text-base">
                        منتجات متاحة
                    </Label>
                    <Switch
                        id="available-switch"
                        checked={available}
                        onCheckedChange={handleCheckboxChange("available")}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
                    <Label className="text-base">
                        منتجات مميزة
                    </Label>
                    <Switch
                        checked={featured}
                        onCheckedChange={handleCheckboxChange("featured")}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
                    <Label className="text-base">
                        الاخيرة
                    </Label>
                    <Switch
                        checked={recent}
                        onCheckedChange={handleCheckboxChange("recent")}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
                    <Label className="text-base">
                        الافضل مبيعا
                    </Label>
                    <Switch
                        checked={bestSeller}
                        onCheckedChange={handleCheckboxChange("bestSeller")}
                    />
                </div>
                <div className="flex gap-2">
                    <div
                        onClick={() => {
                            refetch();
                        }}
                        className="flex items-center bg-primary justify-center rounded-lg border w-min p-3 "
                    >
                        <RotateCw size={16} className="text-white cursor-pointer" />
                    </div>
                    <div
                        onClick={handleResetFilters}
                        className="flex items-center bg-destructive justify-center rounded-lg border w-min p-3 "
                    >
                        <X size={16} className="text-white cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-10 gap-4 items-center justify-between">
                <div className="flex-1">
                    <CustomSelect
                        withLabel
                        label="المطاعم"
                        options={restaurantOptions || []}
                        onChange={(restaurant: {
                            label: string;
                            value: string;
                        }) => setFilters((prev) => ({ ...prev, vendorId: restaurant.value }))}
                    />
                </div>
                <div className="flex-1">
                    <CustomSelect
                        withLabel
                        label="الاقسام"
                        options={categoryOptions || []}
                        onChange={(category: {
                            label: string;
                            value: string;
                        }) => setFilters((prev) => ({ ...prev, categoryId: category.value }))}
                    />
                </div>
                <div className="flex-1 mt-6">
                    <DropdownMenu dir="rtl">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                حجم الصفحة
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50">
                            <DropdownMenuItem asChild>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        handleChangePageSize(10)
                                    }}
                                    variant="outline"
                                >
                                    10
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="my-2" asChild>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        handleChangePageSize(20)
                                    }}
                                    variant="outline"
                                >
                                    20
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        handleChangePageSize(50)
                                    }}
                                    variant="outline"
                                >
                                    50
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}