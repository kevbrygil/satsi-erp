import { useState } from 'react';
import type { Contract } from '@interfaces/ContractProps';
import DashboardLayout from '../Layout/DashboardLayout';
import AddContractModal from '../Dialogs/AddContractModal';

// Reusable Components
import ActionButton from '../Buttons/ActionButton';
import SearchInput from '../Inputs/SearchInput';
import Pagination from '../Lists/Pagination';
import DataTable from '../Lists/DataTable';

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Carlos García López',
    legalDocumentId: 1,
    legalDocumentName: 'Contrato Normal v2.1',
    signedDocumentUrl: '/docs/signed/carlos_garcia.pdf',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'María Martínez Hernández',
    legalDocumentId: 2,
    legalDocumentName: 'Contrato Honorarios v1.4',
    startDate: '2023-06-20',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Luis Rodríguez Pérez',
    legalDocumentId: 3,
    legalDocumentName: 'Contrato Home Office v3.0',
    signedDocumentUrl: '/docs/signed/luis_rodriguez.pdf',
    startDate: '2022-09-01',
    endDate: '2023-09-01',
  },
];

const ContractsScreen = () => {
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Filtering Logic
  const filtered = contracts
    .filter((c) => {
      const query = searchQuery.toLowerCase();
      return (
        !query ||
        c.employeeName.toLowerCase().includes(query) ||
        c.legalDocumentName.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const cmp = a.employeeName.localeCompare(b.employeeName);
      return sortAsc ? cmp : -cmp;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleSave = (data: Omit<Contract, 'id'>) => {
    const newContract: Contract = {
      ...data,
      id: contracts.length + 1,
    };
    setContracts((prev) => [newContract, ...prev]);
  };

  const tableHeaders = [
    { label: 'EMPLEADO' },
    { label: 'DOC. LEGAL', className: 'hidden md:table-cell' },
    { label: 'DOC. FIRMADO', className: 'text-center' },
    { label: 'INICIO', className: 'hidden sm:table-cell text-center' },
    { label: 'FIN', className: 'hidden lg:table-cell text-center' },
    { label: 'ACCIONES', className: 'text-right pr-6' },
  ];

  return (
    <DashboardLayout pageTitle="Contratos">
      <div className="flex flex-col gap-6 pr-4 sm:pr-8">
        {/* Actions bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <ActionButton
              label="Orden"
              onClick={() => setSortAsc(!sortAsc)}
              variant="secondary"
              hideLabelMobile
              icon={
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                  />
                </svg>
              }
            />
          </div>
          <ActionButton
            label="Nuevo"
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            icon={
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            }
          />
        </div>

        {/* Table Area */}
        <DataTable
          headers={tableHeaders}
          isEmpty={paginated.length === 0}
          emptyMessage="No se encontraron contratos">
          {paginated.map((contract, index) => (
            <tr
              key={contract.id}
              className={
                index % 2 === 1 ? 'bg-[#D8E9F0]/60' : 'bg-transparent'
              }>
              <td className="px-5 py-4 rounded-l-[1.5rem] whitespace-nowrap">
                <span className="font-bold">{contract.employeeName}</span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-xs text-app-secondary/80">
                {contract.legalDocumentName}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-center">
                {contract.signedDocumentUrl ? (
                  <button className="text-app-secondary hover:text-app-primary transition-colors flex items-center justify-center mx-auto gap-1 underline text-xs">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    Ver archivo
                  </button>
                ) : (
                  <span className="text-red-400 text-[10px] font-bold italic">
                    Pendiente
                  </span>
                )}
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell text-center font-mono text-xs">
                {contract.startDate}
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden lg:table-cell text-center font-mono text-xs">
                {contract.endDate || '-'}
              </td>
              <td className="px-5 py-4 rounded-r-[1.5rem] whitespace-nowrap text-right pr-6">
                <div className="flex items-center justify-end gap-1">
                  <button className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>

        {/* Pagination area */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setCurrentPage(1);
          }}
        />

        <AddContractModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </DashboardLayout>
  );
};

export default ContractsScreen;
