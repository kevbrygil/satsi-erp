import { useState, type ReactNode } from 'react';
import type { AddPositionModalProps } from '@interfaces/PositionProps';

const DEPARTMENTS = ['RH', 'Ventas', 'Legal', 'Operaciones', 'IT', 'Marketing', 'Finanzas'];

const inputClass =
  'w-full border border-app-quinary rounded-xl px-4 py-3 text-app-primary text-sm outline-none focus:ring-2 focus:ring-app-secondary/30 bg-[#F5F9FB] shadow-sm transition-all';
const labelClass = 'text-sm font-semibold text-app-secondary mb-1 block';

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const AddPositionModal = ({ isOpen, onClose, onSave }: AddPositionModalProps) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [activities, setActivities] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  if (!isOpen) return null;

  const reset = () => {
    setName('');
    setDepartment(DEPARTMENTS[0]);
    setActivities('');
    setStatus('active');
  };

  const handleSave = () => {
    if (!name || !department || !activities) return;
    onSave({
      name,
      department,
      activities,
      status,
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[550px] p-8 md:p-10 relative max-h-[90vh] overflow-y-auto border border-app-quinary/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-app-secondary tracking-tight">Nuevo Puesto</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6 ">
          <Field label="Nombre del puesto">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Ej: Desarrollador Senior"
            />
          </Field>

          <Field label="Departamento">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={inputClass}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Actividades">
            <textarea
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              className={`${inputClass} min-h-[120px] resize-none py-4`}
              placeholder="Describe las responsabilidades del puesto..."
            />
          </Field>

          <Field label="Estado">
            <div className="flex gap-4">
              {(['active', 'inactive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-3.5 rounded-2xl text-sm font-bold border transition-all shadow-sm ${
                    status === s
                      ? s === 'active'
                        ? 'bg-green-500 text-white border-green-500 shadow-green-200'
                        : 'bg-red-400 text-white border-red-400 shadow-red-200'
                      : 'bg-white text-app-secondary border-app-quinary hover:bg-gray-50'
                  }`}
                >
                  {s === 'active' ? 'Activo' : 'Inactivo'}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="flex gap-4 mt-12 pb-2">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-app-quinary text-app-secondary font-bold py-4 rounded-full hover:bg-app-quinary/20 transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-app-secondary text-white font-bold py-4 rounded-full hover:bg-app-primary transition-all shadow-lg shadow-app-secondary/20 active:scale-95"
          >
            Guardar Puesto
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPositionModal;
