import { api } from "@/api";
import { getOrders } from "@/api/apiURLs";

export interface OrdersResponse {
    count: number;
    pages: null | number;
    results: Order[];
}

export interface Order {
    id: number;
    status: "not started" | "started" | "preparing" | "in the way" | "complete";
    name: string;
    address: string;
    location: string;
    phone: string;
    notes: string;
    total_quantity: number;
    subtotal: string;
    shipping: string;
    total: string;
    deliveryId: null | number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    user: OrderUser;
    cart_products: CartProduct[];
}

export interface CartProduct {
    id: number;
    quantity: number;
    notes: string;
    subtotal: string;
    total: string;
    ordered: boolean;
    vendorId: number;
    createdAt: Date;
    updatedAt: Date;
    cartId: number;
    orderId: number;
    productId: number;
    product: Product;
    options: {
        id: number;
        name: string;
        value: string;
    }[];
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    show_price: boolean;
    available: boolean;
    featured: boolean;
    orders: number;
    createdAt: Date;
    updatedAt: Date;
    vendorId: number;
    categoryId: number;
    user: ProductUser;
}

export interface ProductUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    vendor: Vendor;
}

export interface Vendor {
    id: number;
    direction: string;
    distance: string;
}

export interface OrderUser {
    id: number;
    name: string;
    phone: string;
    address: null | string;
}

export const getOrdersService = async () => {
    const response = await api.get<OrdersResponse>(getOrders);
    return response.data;
};
