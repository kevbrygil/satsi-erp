import { useState } from 'react';
import type {
  LegalDocument,
  ContractType,
} from '@interfaces/LegalDocumentProps';
import DashboardLayout from '../Layout/DashboardLayout';
import UploadDocumentModal from '../Dialogs/UploadDocumentModal';

// Reusable Components
import ActionButton from '../Buttons/ActionButton';
import SearchInput from '../Inputs/SearchInput';
import Pagination from '../Lists/Pagination';
import DataTable from '../Lists/DataTable';

const CONTRACT_TYPES: ContractType[] = [
  'Normal',
  'Honorarios',
  'Home office',
  'Operador tractocamion',
  'Trabajador con vehiculo asignado',
];

const CONTRACT_TYPE_COLORS: Record<ContractType, string> = {
  Normal: 'bg-blue-100 text-blue-700',
  Honorarios: 'bg-purple-100 text-purple-700',
  'Home office': 'bg-teal-100 text-teal-700',
  'Operador tractocamion': 'bg-orange-100 text-orange-700',
  'Trabajador con vehiculo asignado': 'bg-indigo-100 text-indigo-700',
};

const INITIAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 1,
    name: 'Contrato Normal',
    contractType: 'Normal',
    version: 'v2.1',
    templateVariables: ['sueldo', 'fecha_inicio', 'puesto'],
    uploadedAt: '2024-01-15',
    updatedAt: '2025-01-10',
    uploadedBy: 'RH Admin',
    fileSize: '245 KB',
    status: 'active',
  },
  {
    id: 2,
    name: 'Contrato Honorarios',
    contractType: 'Honorarios',
    version: 'v1.4',
    templateVariables: ['pago_mensual', 'vigencia', 'servicio_profesional'],
    uploadedAt: '2023-06-20',
    updatedAt: '2024-11-05',
    uploadedBy: 'RH Admin',
    fileSize: '198 KB',
    status: 'active',
  },
  {
    id: 3,
    name: 'Contrato Home Office',
    contractType: 'Home office',
    version: 'v3.0',
    templateVariables: ['ubicacion_remota', 'equipo_asignado', 'horario_conexion'],
    uploadedAt: '2022-09-01',
    updatedAt: '2025-02-18',
    uploadedBy: 'Legal',
    fileSize: '312 KB',
    status: 'active',
  },
  {
    id: 4,
    name: 'Contrato Operador Tractocamión',
    contractType: 'Operador tractocamion',
    version: 'v1.1',
    templateVariables: ['num_licencia', 'unidad_asignada', 'seguro_viaje'],
    uploadedAt: '2023-03-12',
    updatedAt: '2024-08-30',
    uploadedBy: 'Legal',
    fileSize: '270 KB',
    status: 'active',
  },
  {
    id: 5,
    name: 'Contrato Trabajador Vehículo Asignado',
    contractType: 'Trabajador con vehiculo asignado',
    version: 'v2.0',
    templateVariables: ['placas', 'modelo_auto', 'limite_gasolina'],
    uploadedAt: '2023-07-07',
    updatedAt: '2024-09-14',
    uploadedBy: 'RH Admin',
    fileSize: '289 KB',
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Contrato Trabajador Vehículo Asignado',
    contractType: 'Trabajador con vehiculo asignado',
    version: 'v2.1',
    templateVariables: ['placas', 'modelo_auto', 'mantenimiento_preventivo'],
    uploadedAt: '2023-07-07',
    updatedAt: '2024-09-14',
    uploadedBy: 'RH Admin',
    fileSize: '289 KB',
    status: 'active',
  },
];

const LegalDocumentsScreen = () => {
  const [documents, setDocuments] =
    useState<LegalDocument[]>(INITIAL_DOCUMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [filterType, setFilterType] = useState<ContractType | 'all'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = documents
    .filter((d) => {
      const matchStatus = filterStatus === 'all' || d.status === filterStatus;
      const matchType = filterType === 'all' || d.contractType === filterType;
      const matchSearch =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.contractType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchType && matchSearch;
    })
    .sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return sortAsc ? cmp : -cmp;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleSave = (data: Omit<LegalDocument, 'id'>) => {
    setDocuments((prev) => [{ ...data, id: prev.length + 1 }, ...prev]);
  };

  const toggleStatus = (id: number) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' }
          : d,
      ),
    );
  };

  // Table Headers with responsive visibility
  const tableHeaders = [
    { label: 'NOMBRE' },
    { label: 'TIPO', className: 'hidden sm:table-cell text-center' },
    { label: 'VERSIÓN', className: 'hidden md:table-cell text-center' },
    { label: 'VARIABLES', className: 'hidden lg:table-cell text-center' },
    { label: 'ESTADO', className: 'hidden xl:table-cell text-center' },
    { label: 'ACCIONES', className: 'text-right pr-6' },
  ];

  return (
    <DashboardLayout pageTitle="Documentos legales">
      <div className="flex flex-col gap-6 pr-4 sm:pr-8">
        {/* Actions bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            
            <ActionButton
              label="Orden"
              onClick={() => setSortAsc((v) => !v)}
              variant="secondary"
              hideLabelMobile
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                </svg>
              }
            />

            <div className="relative">
              <ActionButton
                label="Filtrar"
                onClick={() => setShowFilterMenu((v) => !v)}
                variant="secondary"
                hideLabelMobile
                icon={
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                }
              />
              {showFilterMenu && (
                <div className="absolute left-0 top-12 z-40 bg-white rounded-2xl shadow-xl border border-app-quinary/30 p-4 min-w-[220px] flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-bold text-app-secondary/70 uppercase tracking-wider mb-2">Estado</p>
                    <div className="flex gap-2">
                      {(['all', 'active', 'inactive'] as const).map((s) => (
                        <button key={s} onClick={() => { setFilterStatus(s); setCurrentPage(1); }} className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${filterStatus === s ? 'bg-app-secondary text-white border-app-secondary' : 'bg-white text-app-secondary border-app-quinary hover:bg-gray-50'}`}>
                          {s === 'all' ? 'Todos' : s === 'active' ? 'Activo' : 'Inactivo'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-app-secondary/70 uppercase tracking-wider mb-2">Tipo</p>
                    <select value={filterType} onChange={(e) => { setFilterType(e.target.value as ContractType | 'all'); setCurrentPage(1); }} className="w-full border border-app-quinary rounded-xl px-3 py-2 text-sm text-app-primary outline-none bg-[#F5F9FB]">
                      <option value="all">Todos los tipos</option>
                      {CONTRACT_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <ActionButton
            label="Subir"
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            icon={
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            }
          />
        </div>

        {/* Table/Data Area */}
        <DataTable
          headers={tableHeaders}
          isEmpty={paginated.length === 0}
          emptyMessage="No se encontraron documentos"
        >
          {paginated.map((doc, index) => (
            <tr key={doc.id} className={index % 2 === 1 ? 'bg-[#D8E9F0]/60' : 'bg-transparent'}>
              <td className="px-5 py-4 rounded-l-[1.5rem] whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-app-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-app-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="truncate max-w-[120px] sm:max-w-none">{doc.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell text-center">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${CONTRACT_TYPE_COLORS[doc.contractType]}`}>{doc.contractType}</span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-center font-mono text-xs">{doc.version}</td>
              <td className="px-5 py-4 whitespace-nowrap hidden lg:table-cell text-center">
                <div className="flex flex-wrap justify-center gap-1">
                  {doc.templateVariables?.slice(0, 2).map(v => (
                    <span key={v} className="bg-app-quinary/50 text-[8px] px-1.5 py-0.5 rounded text-app-secondary font-bold">#{v}</span>
                  ))}
                  {doc.templateVariables && doc.templateVariables.length > 2 && (
                    <span className="text-[8px] text-app-secondary/50 font-bold">+{doc.templateVariables.length - 2}</span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden xl:table-cell text-center">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${doc.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{doc.status === 'active' ? 'Activo' : 'Inactivo'}</span>
              </td>
              <td className="px-5 py-4 rounded-r-[1.5rem] whitespace-nowrap text-right pr-6">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => toggleStatus(doc.id)} className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary transition-colors"><svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg></button>
                  <button className="p-1.5 hover:bg-app-quinary/50 rounded-lg text-app-secondary transition-colors"><svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
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
          onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
        />

        <UploadDocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      </div>
    </DashboardLayout>
  );
};

export default LegalDocumentsScreen;
