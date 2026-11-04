export type ProductCategory = 'REGULAR' | 'LIMITED_EDITION';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category: ProductCategory;
  imageUrl?: string | null;
  stock: number;
  editionSize?: number | null;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Optional client-side enhancement fields
  galleryImages?: string[];
  fabric?: string;
  fit?: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: Product;
}
