export interface Colorway {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  collection: string;
  colorway: Colorway;
  texture: string;
  isNew?: boolean;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  ornaments: string[];
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}