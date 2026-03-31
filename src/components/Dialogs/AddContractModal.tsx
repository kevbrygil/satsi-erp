import { useState, useRef, type ReactNode } from 'react';
import type { AddContractModalProps } from '@interfaces/ContractProps';
import type { Employee } from '@interfaces/EmployeeProps';

const LEGAL_DOCUMENTS = [
  { id: 1, name: 'Contrato Normal', variables: ['sueldo', 'fecha_inicio', 'puesto', 'rfc', 'curp'] },
  { id: 2, name: 'Contrato Honorarios', variables: ['pago_mensual', 'vigencia', 'servicio_profesional', 'nss'] },
  { id: 3, name: 'Contrato Home Office', variables: ['ubicacion_remota', 'equipo_asignado', 'horario_conexion', 'puesto'] },
  { id: 4, name: 'Contrato Operador Tractocamión', variables: ['num_licencia', 'unidad_asignada', 'seguro_viaje', 'nss'] },
  { id: 5, name: 'Contrato Trabajador Vehículo Asignado', variables: ['placas', 'modelo_auto', 'limite_gasolina', 'direccion'] },
];

const EMPLOYEES: Employee[] = [
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
    fiscalAddress: {
      street: 'Blvd. Adolfo López Mateos 200',
      neighborhood: 'San Pedro',
      postalCode: '03800',
      municipality: 'Álvaro Obregón',
    },
  },
];

const inputClass =
  'w-full border border-app-quinary rounded-xl px-4 py-3 text-app-primary text-sm outline-none focus:ring-2 focus:ring-app-secondary/30 bg-[#F5F9FB] shadow-sm transition-all';
const labelClass = 'text-sm font-semibold text-app-secondary mb-1 block';

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const getAutoFillValue = (variableName: string, employee: Employee): string => {
  const name = variableName.toLowerCase().replace(/_/g, '');
  
  if (name === 'sueldo' || name === 'sueldosemanal' || name === 'pagomensual') return employee.weeklySalary;
  if (name === 'puesto' || name === 'posicion') return employee.position;
  if (name === 'rfc') return employee.rfc;
  if (name === 'curp') return employee.curp;
  if (name === 'nss' || name === 'segurosocial') return employee.socialSecurityNumber;
  if (name === 'nombre' || name === 'empleado') return `${employee.firstName} ${employee.paternalSurname} ${employee.maternalSurname}`;
  if (name === 'fechainicio') return employee.startDate;
  if (name === 'direccion' || name === 'domicilio') {
    return `${employee.fiscalAddress.street}, Col. ${employee.fiscalAddress.neighborhood}, CP ${employee.fiscalAddress.postalCode}`;
  }
  
  return '';
};

const AddContractModal = ({ isOpen, onClose, onSave }: AddContractModalProps) => {
  const [employeeId, setEmployeeId] = useState(EMPLOYEES[0].id);
  const [legalDocumentId, setLegalDocumentId] = useState(LEGAL_DOCUMENTS[0].id);
  const [startDate, setStartDate] = useState(() => EMPLOYEES[0].startDate);
  const [endDate, setEndDate] = useState('');
  const [fileName, setFileName] = useState('');
  const [variableValues, setVariableValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    LEGAL_DOCUMENTS[0].variables.forEach((v) => {
      initialValues[v] = getAutoFillValue(v, EMPLOYEES[0]);
    });
    return initialValues;
  });
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleEmployeeChange = (id: number) => {
    setEmployeeId(id);
    const employee = EMPLOYEES.find(e => e.id === id);
    const doc = LEGAL_DOCUMENTS.find(d => d.id === legalDocumentId);
    if (employee && doc) {
      const newValues: Record<string, string> = {};
      doc.variables.forEach(v => {
        newValues[v] = getAutoFillValue(v, employee) || '';
      });
      setVariableValues(newValues);
      setStartDate(employee.startDate);
    }
  };

  const handleLegalDocChange = (id: number) => {
    setLegalDocumentId(id);
    const employee = EMPLOYEES.find(e => e.id === employeeId);
    const doc = LEGAL_DOCUMENTS.find(d => d.id === id);
    if (employee && doc) {
      const newValues: Record<string, string> = {};
      doc.variables.forEach(v => {
        newValues[v] = getAutoFillValue(v, employee) || '';
      });
      setVariableValues(newValues);
    }
  };

  const reset = () => {
    setEmployeeId(EMPLOYEES[0].id);
    setLegalDocumentId(LEGAL_DOCUMENTS[0].id);
    setStartDate(EMPLOYEES[0].startDate);
    setEndDate('');
    setFileName('');
    const resp: Record<string, string> = {};
    LEGAL_DOCUMENTS[0].variables.forEach(v => { resp[v] = getAutoFillValue(v, EMPLOYEES[0]); });
    setVariableValues(resp);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const updateVariableValue = (key: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!startDate) return;

    const employee = EMPLOYEES.find(e => e.id === Number(employeeId))!;
    const legalDoc = LEGAL_DOCUMENTS.find(d => d.id === Number(legalDocumentId))!;

    onSave({
      employeeId: employee.id,
      employeeName: `${employee.firstName} ${employee.paternalSurname}`,
      legalDocumentId: legalDoc.id,
      legalDocumentName: legalDoc.name,
      startDate,
      endDate: endDate || undefined,
      signedDocumentUrl: fileName ? `/docs/signed/${fileName}` : undefined,
      // @ts-expect-error - Extendiendo para prototipo
      variables: variableValues 
    });
    reset();
    onClose();
  };

  const currentDoc = LEGAL_DOCUMENTS.find(d => d.id === Number(legalDocumentId));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[600px] p-8 md:p-10 relative max-h-[90vh] overflow-y-auto border border-app-quinary/30">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-app-secondary tracking-tight">Vincular Contrato</h2>
            <p className="text-xs text-app-secondary/50 font-medium italic">Sugerencia: Define variables como 'sueldo' o 'rfc' para autollenado</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Empleado">
              <select value={employeeId} onChange={(e) => handleEmployeeChange(Number(e.target.value))} className={inputClass}>
                {EMPLOYEES.map((e) => (<option key={e.id} value={e.id}>{e.firstName} {e.paternalSurname}</option>))}
              </select>
            </Field>

            <Field label="Plantilla de Documento">
              <select value={legalDocumentId} onChange={(e) => handleLegalDocChange(Number(e.target.value))} className={inputClass}>
                {LEGAL_DOCUMENTS.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
              </select>
            </Field>
          </div>

          {currentDoc && currentDoc.variables.length > 0 && (
            <div className="bg-app-quinary/20 rounded-3xl p-6 border border-app-quinary/50">
              <p className="text-xs font-bold text-app-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#4CC9F0]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Campos del Template
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {currentDoc.variables.map(v => (
                  <div key={v}>
                    <label className="text-[10px] font-bold text-app-secondary/60 uppercase ml-3 mb-1 block">
                      {v.replace('_', ' ')}
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={variableValues[v] || ''}
                        onChange={(e) => updateVariableValue(v, e.target.value)}
                        className="w-full bg-white border border-app-quinary rounded-xl px-4 py-2 text-sm text-app-primary outline-none focus:ring-2 focus:ring-[#4CC9F0]/30 transition-all font-medium"
                        placeholder={`Valor para ${v}`}
                      />
                      {getAutoFillValue(v, EMPLOYEES.find(e => e.id === employeeId)!) && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4CC9F0] opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Vigencia inicio">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </Field>
            <Field label="Vigencia fin">
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
            </Field>
          </div>

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-app-quinary rounded-3xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#4CC9F0]/50 hover:bg-[#F5F9FB] transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#4CC9F0]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-xs font-bold text-app-secondary">
              {fileName ? fileName : 'Subir contrato firmado final'}
            </p>
            <input ref={fileRef} type="file" accept=".pdf,.png,.jpg" className="hidden" onChange={handleFileChange} />
          </div>
        </div>

        <div className="flex gap-4 mt-12 pb-2">
          <button onClick={onClose} className="flex-1 bg-white border border-app-quinary text-app-secondary font-bold py-4 rounded-full hover:bg-app-quinary/20 transition-all active:scale-95">Cancelar</button>
          <button onClick={handleSave} className="flex-1 bg-[#003865] text-white font-bold py-4 rounded-full hover:bg-app-primary transition-all shadow-lg shadow-app-secondary/20 active:scale-95 transform">Generar y Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default AddContractModal;
