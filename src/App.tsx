import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useDatabase } from './hooks/useDatabase';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { Product } from './types';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { MovementForm } from './components/MovementForm';
import { MovementList } from './components/MovementList';

function App() {
  const {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getStats
  } = useDatabase();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando sistema de inventario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Sistema de Inventario
                </h1>
                <p className="text-sm text-gray-500">
                  Gestiona tu inventario de forma eficiente
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dashboard con estadísticas */}
        <Dashboard stats={getStats()} />

        {/* Lista de productos */}
        <ProductList
          products={products}
          categories={categories}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Formulario emergente para crear o editar productos */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSave={handleSaveProduct}
            onClose={handleCloseForm}
          />
        )}

        {/* Sección de usuarios */}
        <section className="mt-10 grid md:grid-cols-2 gap-8">
          <UserForm />
          <UserList />
        </section>

        {/* Sección de movimientos */}
        <section className="mt-10 grid md:grid-cols-2 gap-8">
          <MovementForm
            products={products}
            userId={1} // reemplazar por el ID del usuario autenticado
            onSubmit={() => window.location.reload()}
          />
          <MovementList />
        </section>
      </main>
    </div>
  );
}

export default App;
