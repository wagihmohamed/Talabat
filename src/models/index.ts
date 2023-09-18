// API
export interface RestuarantResponse {
  count: number;
  results: RestuarantItemResponse[];
}
// API
export interface RestuarantItemResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  fcm: string;
  role: string;
  description: string;
  image: null | string;
  cover: null | string;
  status: 'open' | 'close' | 'busy' | 'soon';
  areas: Area[];
  free_delivery_limit: string;
}

export interface Area {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  delivery_cost: {
    id: number;
    cost: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    areaId: number;
  }
}


// API
export interface CreateRestaurantParams {
  name: string;
  email: string;
  phone: string;
  address: string;
  fcm: string | null;
  open: boolean;
  description: string | null;
  password: string;
  confirm_password: string;
  image?: File | undefined | FormData | string | object | null;
  cover?: File | undefined | FormData | string | object | null;
  delivery_time: string;
  distance: string;
  free_delivery_limit: string;
  direction: string;
}
// API
export interface EditRestaurantParams {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: File | undefined | FormData | string | object | null;
  cover: File | undefined | FormData | string | object | null;
}
// API
export interface CreateRestaurantResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    description: string;
    image: null | string;
    fcm: string | null;
    token: string;
    role: string;
    open: boolean;
  }
}

export interface Restuarant {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
// API
export interface Category {
  id: number;
  name: string;
  image: File | undefined | FormData | string | object | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type AdminStatus = "active" | "suspended";
export interface Admin {
  id: number;
  name: string;
  phone: string;
  roles: string[];
  roleLabel: string;
  status: AdminStatus;
}
// API
export type Roles = {
  manage_orders: boolean;
  manage_products: boolean;
  manage_admins: boolean;
  manage_deliveries: boolean;
  manage_vendors: boolean;
}
export interface AddAdminParams {
  name: string;
  email: string;
  phone: string;
  fcm: string | null;
  password: string;
  confirm_password: string;
  roles: Roles
  image: File | undefined | FormData | string | object | null;
}
// API
export interface AddAdminResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    fcm: string | null;
    super_admin: boolean;
    role: string;
    roles: {
      id: number;
      manage_orders: boolean;
      manage_products: boolean;
      manage_admins: boolean;
      manage_deliveries: boolean;
      manage_vendors: boolean;
      adminId: number;
      createdAt: string;
      updatedAt: string;
    },
    token: string;
  }
}
export interface DeliveryPerson {
  id: number;
  name: string;
  phone: string;
  status: "active" | "suspended";
  restaurantId: number;
  restaurantName: string;
}

export interface EditDeliveryPersonPayload {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  image?: File | undefined | FormData | string | object | null;
}

// API
export interface DeliveryResponse {
  count: number;
  results: DeliveryUser[];
}
// API
export interface DeliveryUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: null;
  role: string;
  fcm: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  delivery: Delivery;
  image: null | string;
}
// API
export interface Delivery {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
// API
export interface CreateDeliveryParams {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirm_password: string;
  fcm: string | null;
  image?: File | undefined | FormData | string | object | null;
}
// API
export interface CreateDeliveryResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    fcm: string | null;
    token: string;
    role: string;
  }
}
// API
export interface AdminResponse {
  count: number;
  results: AdminItem[]
}
// API
export interface AdminItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  image: null | string;
  fcm: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  admin: {
    id: number;
    super_admin: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
    adminRole: {
      id: number;
      manage_orders: boolean;
      manage_products: boolean;
      manage_admins: boolean;
      manage_deliveries: boolean;
      manage_vendors: boolean;
      createdAt: string;
      updatedAt: string;
      adminId: number;
    }
  }
}

// API
export interface LoginParams {
  key: string;
  password: string;
}
// API
export interface LoginResponse {
  message: string;
  user: User;
}
// API
export interface User {
  id: number;
  name: string;
  fcm: string;
  email: string;
  phone: string;
  role: string;
  super_admin: boolean;
  roles: LoginRoles;
  token: string;
}
// API
export interface LoginRoles {
  id: number;
  manage_orders: boolean;
  manage_products: boolean;
  manage_admins: boolean;
  manage_deliveries: boolean;
  manage_vendors: boolean;
  createdAt: string;
  updatedAt: string;
  adminId: number;
}

export interface ProductsResponse {
  count: number;
  pages: number;
  results: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  available: boolean;
  featured: boolean;
  show_price: boolean;
  orders: number;
  createdAt: Date;
  updatedAt: Date;
  vendorId: number;
  categoryId: number;
  productImages: ProductImage[];
  user: ProductCategory;
  category: ProductCategory;
  options_groups: {
    id: number;
    name: string;
    type: 'single' | 'multi';
    options: {
      id: number;
      name: string;
      value: string;
    }[]
  }[]
}

export interface ProductCategory {
  id: number;
  name: string;
  image: File | undefined | FormData | string | object | null;
}

export interface ProductImage {
  id: number;
  image: string;
}

export interface EditProductPayload {
  title: string;
  description: string;
  price: string;
  vendorId: string;
  categoryId: string;
  featured: string;
  available: string;
  image?: File | undefined | FormData | string | object | null;
}

export interface EditAdminPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  fcm: string;
  address: string;
  image?: File | undefined | FormData | string | object | null;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  price: string;
  vendorId: string;
  categoryId: string;
  featured: string;
  available: string;
  image?: File | undefined | FormData | string | object | null;
}

export interface DeliveryAreas {
  results: DeliveryArea[];
}

export interface DeliveryArea {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SliderResponse {
  results: SliderItem[];
}

export interface SliderItem {
  id: number;
  title: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  productId: null;
  vendorId: null;
}