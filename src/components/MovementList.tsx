import React, { useEffect, useState } from 'react';

interface Movimiento {
  id: number;
  producto: string;
  tipo: 'entrada' | 'salida';
  cantidad: number;
  fecha: string;
  usuario: string;
  observaciones: string;
}

export const MovementList = () => {
  const [movements, setMovements] = useState<Movimiento[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/movements')
      .then(res => res.json())
      .then(setMovements)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Historial de Movimientos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Producto</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Cantidad</th>
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(mov => (
              <tr key={mov.id} className="border-t">
                <td className="p-2">{mov.producto}</td>
                <td className="p-2">{mov.tipo === 'entrada' ? 'Entrada' : 'Salida'}</td>
                <td className="p-2">{mov.cantidad}</td>
                <td className="p-2">{mov.usuario}</td>
                <td className="p-2">{new Date(mov.fecha).toLocaleString()}</td>
                <td className="p-2">{mov.observaciones || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
