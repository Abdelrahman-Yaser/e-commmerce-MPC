import { Product, ApiResponse } from '../types/product';

const API_URL = (import.meta as any).env.VITE_API_URL;

export const productApi = {
  // Fetch all products
  async getAll(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const json: ApiResponse<Product[]> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Unknown error');
    return json.data;
  },

  // Fetch product by ID
  async getById(id: number): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    const json: ApiResponse<Product> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Unknown error');
    return json.data;
  },

  // Filter by category
  async getByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error(`Failed to fetch products in ${category}`);
    const json: ApiResponse<Product[]> = await res.json();
    if (!json.success || !json.data) throw new Error(json.error || 'Unknown error');
    return json.data;
  },

  // Get all unique categories
  async getCategories(): Promise<string[]> {
    const products = await productApi.getAll();
    return [...new Set(products.map((p) => p.category))].sort();
  },
};
