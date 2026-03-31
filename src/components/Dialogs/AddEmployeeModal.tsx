import { useState, useRef } from 'react';
import type { AddEmployeeModalProps, Employee } from '@interfaces/EmployeeProps';

const inputClass =
  'w-full border border-app-quinary rounded-xl px-4 py-3 text-app-primary text-sm outline-none focus:ring-2 focus:ring-app-secondary/30 bg-[#F5F9FB]';
const labelClass = 'text-sm font-semibold text-app-secondary mb-1 block';

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const AddEmployeeModal = ({ isOpen, onClose, onSave }: AddEmployeeModalProps) => {
  const [firstName, setFirstName] = useState('');
  const [paternalSurname, setPaternalSurname] = useState('');
  const [maternalSurname, setMaternalSurname] = useState('');
  const [position, setPosition] = useState('');
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
  const [rfc, setRfc] = useState('');
  const [curp, setCurp] = useState('');
  const [weeklySalary, setWeeklySalary] = useState('');
  const [infonavitCredit, setInfonavitCredit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [documentationUrl, setDocumentationUrl] = useState('');
  const [docFileName, setDocFileName] = useState('');
  const docFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const reset = () => {
    setFirstName('');
    setPaternalSurname('');
    setMaternalSurname('');
    setPosition('');
    setSocialSecurityNumber('');
    setRfc('');
    setCurp('');
    setWeeklySalary('');
    setInfonavitCredit('');
    setStartDate('');
    setEndDate('');
    setStreet('');
    setNeighborhood('');
    setPostalCode('');
    setMunicipality('');
    setDocumentationUrl('');
    setDocFileName('');
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocFileName(file.name);
      setDocumentationUrl(`/docs/employees/${file.name}`);
    }
  };

  const handleSave = () => {
    if (
      !firstName ||
      !paternalSurname ||
      !maternalSurname ||
      !position ||
      !socialSecurityNumber ||
      !rfc ||
      !curp ||
      !weeklySalary ||
      !startDate ||
      !street ||
      !neighborhood ||
      !postalCode ||
      !municipality
    )
      return;

    const newEmployee: Omit<Employee, 'id'> = {
      firstName,
      paternalSurname,
      maternalSurname,
      position,
      socialSecurityNumber,
      rfc,
      curp,
      weeklySalary,
      infonavitCredit: infonavitCredit || 'N/A',
      startDate,
      endDate: endDate || undefined,
      fiscalAddress: { street, neighborhood, postalCode, municipality },
      documentationUrl: documentationUrl || undefined,
    };

    onSave(newEmployee);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[520px] p-8 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-app-secondary">Nuevo empleado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre(s)">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                placeholder="Ej: Carlos"
              />
            </Field>
            <Field label="Apellido paterno">
              <input
                type="text"
                value={paternalSurname}
                onChange={(e) => setPaternalSurname(e.target.value)}
                className={inputClass}
                placeholder="Ej: García"
              />
            </Field>
            <Field label="Apellido materno">
              <input
                type="text"
                value={maternalSurname}
                onChange={(e) => setMaternalSurname(e.target.value)}
                className={inputClass}
                placeholder="Ej: López"
              />
            </Field>
            <Field label="Puesto">
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={inputClass}
                placeholder="Ej: UI Designer"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Número de seguridad social">
              <input
                type="text"
                value={socialSecurityNumber}
                onChange={(e) => setSocialSecurityNumber(e.target.value)}
                className={inputClass}
                placeholder="11 dígitos"
                maxLength={11}
              />
            </Field>
            <Field label="RFC">
              <input
                type="text"
                value={rfc}
                onChange={(e) => setRfc(e.target.value.toUpperCase())}
                className={inputClass}
                placeholder="Ej: GALC900101ABC"
                maxLength={13}
              />
            </Field>
            <Field label="CURP">
              <input
                type="text"
                value={curp}
                onChange={(e) => setCurp(e.target.value.toUpperCase())}
                className={`${inputClass} sm:col-span-2`}
                placeholder="18 caracteres"
                maxLength={18}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Sueldo semanal">
              <input
                type="text"
                value={weeklySalary}
                onChange={(e) => setWeeklySalary(e.target.value)}
                className={inputClass}
                placeholder="Ej: $1,700.00"
              />
            </Field>
            <Field label="Crédito Infonavit">
              <input
                type="text"
                value={infonavitCredit}
                onChange={(e) => setInfonavitCredit(e.target.value)}
                className={inputClass}
                placeholder="N/A si no aplica"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Fecha de inicio">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Fecha de baja (opcional)">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div>
            <p className="text-sm font-bold text-app-secondary mb-3">Dirección fiscal</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Calle">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={inputClass}
                  placeholder="Ej: Av. Reforma 100"
                />
              </Field>
              <Field label="Colonia">
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className={inputClass}
                  placeholder="Ej: Juárez"
                />
              </Field>
              <Field label="Código postal">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={inputClass}
                  placeholder="Ej: 06600"
                  maxLength={5}
                />
              </Field>
              <Field label="Municipio">
                <input
                  type="text"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className={inputClass}
                  placeholder="Ej: Cuauhtémoc"
                />
              </Field>
            </div>
          </div>

          <div className="mt-2">
            <Field label="Expediente de Documentación (INE, CURP, Acta...)">
              <div
                onClick={() => docFileRef.current?.click()}
                className="mt-1 border-2 border-dashed border-app-quinary rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-app-secondary/50 hover:bg-[#F5F9FB] transition-all group"
              >
                <div className="w-8 h-8 bg-app-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-app-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-app-secondary">
                  {docFileName ? docFileName : 'Subir expediente PDF'}
                </p>
                <input ref={docFileRef} type="file" accept=".pdf" className="hidden" onChange={handleDocChange} />
              </div>
            </Field>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 border border-app-quinary text-app-secondary font-bold py-3 rounded-full hover:bg-app-quinary/30 transition-colors"
          >
            Salir
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-app-secondary text-white font-bold py-3 rounded-full hover:bg-app-primary transition-colors shadow-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
