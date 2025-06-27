import { useEffect, useState } from 'react';

export const useExportData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/views/inventario')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return data;
};
