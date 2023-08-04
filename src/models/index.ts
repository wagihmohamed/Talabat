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
  image: File | undefined | FormData | string | object | null;
}
// API
export interface EditRestaurantParams {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
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
  image: string;
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
