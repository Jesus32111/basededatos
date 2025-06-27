import { CSVLink } from 'react-csv';

export const ExportCSV = ({ data }: { data: any[] }) => {
  const headers = [
    { label: 'Producto', key: 'name' },
    { label: 'Categoría', key: 'categoria' },
    { label: 'Stock', key: 'stock' }
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename="inventario.csv"
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
    >
      Exportar a CSV
    </CSVLink>
  );
};
