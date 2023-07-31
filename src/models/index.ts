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
