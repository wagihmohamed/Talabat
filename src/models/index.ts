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
  image: null | string;
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

export interface Category {
  id: number;
  name: string;
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

export interface AddAdminParams {
  name: string;
  phone: string;
  roles: string[];
  status: AdminStatus;
  password: string;
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
