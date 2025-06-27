import { useState, useEffect } from 'react';
import { Product, Category, InventoryStats } from '../types';

const API_URL = 'http://localhost:3001/api';

export const useDatabase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`)
      ]);

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      await loadData();
    } catch (err) {
      console.error('Error agregando producto:', err);
    }
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
      await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      await loadData();
    } catch (err) {
      console.error('Error actualizando producto:', err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err) {
      console.error('Error eliminando producto:', err);
    }
  };

  const getStats = (): InventoryStats => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const lowStockItems = products.filter(product => product.stock <= product.min_stock).length;
    const categoriesCount = categories.length;

    return {
      totalProducts,
      totalValue,
      lowStockItems,
      categories: categoriesCount
    };
  };

  return {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getStats
  };
};
