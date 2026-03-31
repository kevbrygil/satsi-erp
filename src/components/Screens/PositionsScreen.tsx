import { useState } from 'react';
import type { Position } from '@interfaces/PositionProps';
import DashboardLayout from '../Layout/DashboardLayout';
import AddPositionModal from '../Dialogs/AddPositionModal';

// Reusable Components
import ActionButton from '../Buttons/ActionButton';
import SearchInput from '../Inputs/SearchInput';
import Pagination from '../Lists/Pagination';
import DataTable from '../Lists/DataTable';

const INITIAL_POSITIONS: Position[] = [
  {
    id: 1,
    name: 'Desarrollador Senior',
    department: 'IT',
    activities: 'Liderazgo técnico, revisión de código, arquitectura de software.',
    status: 'active',
  },
  {
    id: 2,
    name: 'Gerente de RH',
    department: 'RH',
    activities: 'Gestión de talento, nóminas, clima organizacional.',
    status: 'active',
  },
  {
    id: 3,
    name: 'Ejecutivo de Ventas',
    department: 'Ventas',
    activities: 'Prospección de clientes, cierre de contratos, seguimiento.',
    status: 'inactive',
  },
];

const PositionsScreen = () => {
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = positions.filter((p) => {
    const query = searchQuery.toLowerCase();
    return !query || 
           p.name.toLowerCase().includes(query) || 
           p.department.toLowerCase().includes(query);
  }).sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return sortAsc ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSave = (data: Omit<Position, 'id'>) => {
    setPositions((prev) => [{ ...data, id: prev.length + 1 }, ...prev]);
  };

  const tableHeaders = [
    { label: 'NOMBRE' },
    { label: 'DEPARTAMENTO', className: 'text-center' },
    { label: 'ACTIVIDADES', className: 'hidden md:table-cell' },
    { label: 'ESTADO', className: 'text-center' },
    { label: 'ACCIONES', className: 'text-right pr-6' },
  ];

  return (
    <DashboardLayout pageTitle="Puestos">
      <div className="flex flex-col gap-6 pr-4 sm:pr-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <ActionButton
              label="Orden"
              onClick={() => setSortAsc(!sortAsc)}
              variant="secondary"
              hideLabelMobile
              icon={<svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" /></svg>}
            />
          </div>
          <ActionButton
            label="Nuevo Puesto"
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            icon={<svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>}
          />
        </div>

        <DataTable headers={tableHeaders} isEmpty={paginated.length === 0} emptyMessage="No se encontraron puestos">
          {paginated.map((pos, index) => (
            <tr key={pos.id} className={index % 2 === 1 ? 'bg-[#D8E9F0]/60' : 'bg-transparent'}>
              <td className="px-5 py-4 rounded-l-[1.5rem] whitespace-nowrap font-bold">
                {pos.name}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-center text-xs">
                <span className="bg-app-quinary/50 text-app-secondary px-3 py-1 rounded-full font-bold">
                  {pos.department}
                </span>
              </td>
              <td className="px-5 py-4 hidden md:table-cell max-w-[300px]">
                <p className="text-xs text-app-secondary/70 truncate">{pos.activities}</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-center">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pos.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {pos.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-5 py-4 rounded-r-[1.5rem] whitespace-nowrap text-right pr-6">
                <div className="flex items-center justify-end gap-1">
                  <button className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary transition-colors"><svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg></button>
                  <button className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary transition-colors"><svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
        />

        <AddPositionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      </div>
    </DashboardLayout>
  );
};

export default PositionsScreen;
