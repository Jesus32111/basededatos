import { useEffect, useState } from 'react';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  created_at: string;
}

export const useUsers = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(setUsuarios)
      .catch(console.error);
  }, []);

  return usuarios;
};