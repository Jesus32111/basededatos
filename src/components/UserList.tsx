import React from 'react';
import { useUsers } from '../hooks/useUsers';

export const UserList = () => {
  const usuarios = useUsers();

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuarios del sistema</h2>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Rol</th>
            <th className="text-left p-2">Registrado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.nombre}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.rol}</td>
              <td className="p-2">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
