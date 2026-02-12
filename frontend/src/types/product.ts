export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  stock: number;
  variants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    category?: string;
    count?: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
}
