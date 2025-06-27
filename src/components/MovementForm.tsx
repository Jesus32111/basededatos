import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface MovementFormProps {
  products: Product[];
  userId: number; // ID del usuario que realiza el movimiento
  onSubmit: () => void;
}

export const MovementForm: React.FC<MovementFormProps> = ({ products, userId, onSubmit }) => {
  const [form, setForm] = useState({
    producto_id: 0,
    tipo: 'entrada',
    cantidad: 1,
    observaciones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'cantidad' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, usuario_id: userId })
      });
      alert('Movimiento registrado correctamente');
      onSubmit();
      setForm({ producto_id: 0, tipo: 'entrada', cantidad: 1, observaciones: '' });
    } catch (error) {
      console.error(error);
      alert('Error al registrar movimiento');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow border max-w-lg space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Registrar Movimiento</h2>

      <div>
        <label className="block text-sm mb-1 font-medium">Producto</label>
        <select name="producto_id" value={form.producto_id} onChange={handleChange} required className="w-full border px-3 py-2 rounded-lg">
          <option value={0}>Selecciona un producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Tipo de Movimiento</label>
        <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg">
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          min={1}
          required
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Observaciones</label>
        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Guardar Movimiento
      </button>
    </form>
  );
};
