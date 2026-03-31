import { useState } from 'react';
import type { Employee } from '@interfaces/EmployeeProps';
import DashboardLayout from '../Layout/DashboardLayout';
import AddEmployeeModal from '../Dialogs/AddEmployeeModal';

// Reusable Components
import ActionButton from '../Buttons/ActionButton';
import SearchInput from '../Inputs/SearchInput';
import Pagination from '../Lists/Pagination';
import DataTable from '../Lists/DataTable';

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    firstName: 'Carlos',
    paternalSurname: 'García',
    maternalSurname: 'López',
    position: 'UI Designer',
    socialSecurityNumber: '12345678901',
    rfc: 'GALC900101ABC',
    curp: 'GALC900101HDFXXX01',
    weeklySalary: '$1,700.00',
    infonavitCredit: '1234567890',
    startDate: '2022-03-15',
    documentationUrl: '/docs/employees/carlos_garcia_docs.pdf',
    fiscalAddress: {
      street: 'Av. Reforma 100',
      neighborhood: 'Juárez',
      postalCode: '06600',
      municipality: 'Cuauhtémoc',
    },
  },
  {
    id: 2,
    firstName: 'María',
    paternalSurname: 'Martínez',
    maternalSurname: 'Hernández',
    position: 'UX Designer',
    socialSecurityNumber: '98765432100',
    rfc: 'MAHM850215DEF',
    curp: 'MAHM850215MDFXXX02',
    weeklySalary: '$1,200.00',
    infonavitCredit: '0987654321',
    startDate: '2023-01-10',
    documentationUrl: '/docs/employees/maria_martinez_docs.pdf',
    fiscalAddress: {
      street: 'Calle Insurgentes 45',
      neighborhood: 'Roma Norte',
      postalCode: '06700',
      municipality: 'Cuauhtémoc',
    },
  },
  {
    id: 3,
    firstName: 'Luis',
    paternalSurname: 'Rodríguez',
    maternalSurname: 'Pérez',
    position: 'React Developer',
    socialSecurityNumber: '11223344550',
    rfc: 'ROPL780312GHI',
    curp: 'ROPL780312HDFXXX03',
    weeklySalary: '$3,999.00',
    infonavitCredit: 'N/A',
    startDate: '2021-07-01',
    endDate: '2024-12-31',
    documentationUrl: '/docs/employees/luis_rodriguez_docs.pdf',
    fiscalAddress: {
      street: 'Blvd. Adolfo López Mateos 200',
      neighborhood: 'San Pedro',
      postalCode: '03800',
      municipality: 'Álvaro Obregón',
    },
  },
  {
    id: 4,
    firstName: 'Ana',
    paternalSurname: 'Flores',
    maternalSurname: 'Sánchez',
    position: 'UX Researcher Intern',
    socialSecurityNumber: '66778899001',
    rfc: 'FOSA011203JKL',
    curp: 'FOSA011203MDFXXX04',
    weeklySalary: '$400.00',
    infonavitCredit: 'N/A',
    startDate: '2024-08-19',
    fiscalAddress: {
      street: 'Calle Morelos 7',
      neighborhood: 'Centro',
      postalCode: '06000',
      municipality: 'Cuauhtémoc',
    },
  },
  {
    id: 5,
    firstName: 'Jorge',
    paternalSurname: 'Torres',
    maternalSurname: 'Ramírez',
    position: 'Accountant',
    socialSecurityNumber: '22334455660',
    rfc: 'TORJ750520MNO',
    curp: 'TORJ750520HDFXXX05',
    weeklySalary: '$2,000.00',
    infonavitCredit: '5544332211',
    startDate: '2020-02-03',
    fiscalAddress: {
      street: 'Av. Universidad 350',
      neighborhood: 'Copilco',
      postalCode: '04360',
      municipality: 'Coyoacán',
    },
  },
];

const HRScreen = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Filtering Logic
  const filtered = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${emp.firstName} ${emp.paternalSurname} ${emp.maternalSurname}`.toLowerCase();
    return !query || fullName.includes(query) || emp.position.toLowerCase().includes(query) || emp.rfc.toLowerCase().includes(query);
  }).sort((a, b) => {
    const cmp = a.firstName.localeCompare(b.firstName);
    return sortAsc ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleSave = (data: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...data,
      id: employees.length + 1,
    };
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const tableHeaders = [
    { label: 'NOMBRE' },
    { label: 'PUESTO', className: 'hidden md:table-cell text-center' },
    { label: 'RFC', className: 'hidden sm:table-cell text-center' },
    { label: 'EXPEDIENTE', className: 'text-center' },
    { label: 'ESTADO', className: 'text-center' },
  ];

  return (
    <DashboardLayout pageTitle="Recursos humanos">
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

            <ActionButton
              label="Filtrar"
              onClick={() => {}} // TODO: Add filter logic if needed
              variant="secondary"
              hideLabelMobile
              icon={
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              }
            />
          </div>

          <ActionButton
            label="Agregar"
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
          emptyMessage="No se encontraron empleados"
        >
          {paginated.map((emp, index) => (
            <tr key={emp.id} className={index % 2 === 1 ? 'bg-[#D8E9F0]/60' : 'bg-transparent'}>
              <td className="px-5 py-4 rounded-l-[1.5rem] whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="truncate max-w-[120px] sm:max-w-none font-bold">{emp.firstName}</span>
                  <span className="text-[10px] text-app-secondary/70">{emp.paternalSurname} {emp.maternalSurname}</span>
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-center text-xs">
                {emp.position}
              </td>
              <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell text-center font-mono text-[10px]">
                {emp.rfc}
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-center">
                {emp.documentationUrl ? (
                  <button className="flex items-center justify-center gap-1.5 mx-auto px-3 py-1.5 bg-app-secondary/10 text-app-secondary rounded-lg hover:bg-app-secondary text-[10px] font-bold transition-all hover:text-white group">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Ver PDF
                  </button>
                ) : (
                  <span className="text-red-400 text-[10px] font-bold italic opacity-60">Sin archivo</span>
                )}
              </td>
              <td className="px-5 py-4 rounded-r-[1.5rem] whitespace-nowrap text-center text-xs">
                {emp.endDate ? (
                  <span className="bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">Inactivo</span>
                ) : (
                  <span className="bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">Activo</span>
                )}
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

        <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      </div>
    </DashboardLayout>
  );
};

export default HRScreen;
