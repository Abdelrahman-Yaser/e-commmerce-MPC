import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { productApi } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (category?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = category && category !== 'All'
        ? await productApi.getByCategory(category)
        : await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, fetchProducts };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    productApi.getCategories().then((cats) => setCategories(['All', ...cats])).catch(console.error);
  }, []);

  return categories;
}
