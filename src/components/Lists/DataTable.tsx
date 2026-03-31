import type { DataTableProps } from '@interfaces/DataTableProps';

const DataTable = ({
  children,
  headers,
  emptyMessage = 'No se encontraron resultados',
  isEmpty = false,
  className = '',
}: DataTableProps) => {
  return (
    <div className="bg-white rounded-[2rem] p-5 lg:p-8 shadow-sm border border-app-quinary/30 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table
          className={`w-full text-left ${className}`}
          style={{ borderSpacing: '0 8px', borderCollapse: 'separate' }}
        >
          <thead>
            <tr className="text-[10px] sm:text-xs uppercase tracking-wider text-app-secondary/80 font-bold">
              {headers.map((header, i) => (
                <th 
                  key={i} 
                  className={`px-5 py-3 sm:py-4 pb-6 whitespace-nowrap ${header.className || ''}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm font-semibold text-app-primary">
            {isEmpty ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-16 text-app-secondary/50 font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
