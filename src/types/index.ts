export interface Product {
  id: number;
  nombre: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  min_stock: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  categories: number;
}