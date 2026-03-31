import { useState, useRef, type ReactNode } from 'react';
import type { UploadDocumentModalProps, ContractType } from '@interfaces/LegalDocumentProps';

const CONTRACT_TYPES: ContractType[] = [
  'Normal',
  'Honorarios',
  'Home office',
  'Operador tractocamion',
  'Trabajador con vehiculo asignado',
];

const inputClass =
  'w-full border border-app-quinary rounded-xl px-4 py-3 text-app-primary text-sm outline-none focus:ring-2 focus:ring-app-secondary/30 bg-[#F5F9FB] transition-all';
const labelClass = 'text-sm font-semibold text-app-secondary mb-1 block';

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const UploadDocumentModal = ({ isOpen, onClose, onSave }: UploadDocumentModalProps) => {
  const [name, setName] = useState('');
  const [contractType, setContractType] = useState<ContractType>('Normal');
  const [version, setVersion] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [fileName, setFileName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const reset = () => {
    setName('');
    setContractType('Normal');
    setVersion('');
    setUploadedBy('');
    setStatus('active');
    setFileName('');
    setTags([]);
    setTagInput('');
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (!name) setName(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSave = () => {
    if (!name || !version || !uploadedBy) return;

    const now = new Date().toISOString().split('T')[0];
    onSave({
      name,
      contractType,
      version,
      templateVariables: tags,
      uploadedAt: now,
      updatedAt: now,
      uploadedBy,
      fileSize: '—',
      status,
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[500px] p-8 md:p-10 relative max-h-[90vh] overflow-y-auto border border-app-quinary/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-app-secondary">Subir documento</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 group">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:text-gray-600 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-app-quinary rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-app-secondary/50 hover:bg-[#F5F9FB] transition-colors"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-app-secondary/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-semibold text-app-secondary">
              {fileName ? fileName : 'Haga clic para seleccionar archivo base (Word/PDF)'}
            </p>
            <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
          </div>

          <Field label="Nombre del documento">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Ej: Contrato Normal v2"
            />
          </Field>

          <Field label="Tipo de contrato">
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value as ContractType)}
              className={inputClass}
            >
              {CONTRACT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          {/* New Field: Template Variables / Tags */}
          <Field label="Variables del documento (Tags)">
            <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] border border-app-quinary rounded-xl p-2 bg-[#F5F9FB]">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-app-secondary/10 text-app-secondary px-2.5 py-1 rounded-full text-xs font-bold border border-app-secondary/20">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                className="bg-transparent text-sm text-app-primary outline-none flex-1 min-w-[120px]"
                placeholder={tags.length === 0 ? "Ej: sueldo (presione Enter)" : "Más variables..."}
              />
            </div>
            <p className="text-[10px] text-app-secondary/50 italic ml-1">Escriba una variable y presione Enter. Estas se usarán como campos editables en los contratos.</p>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Versión">
              <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className={inputClass} placeholder="Ej: v1.0" />
            </Field>
            <Field label="Subido por">
              <input type="text" value={uploadedBy} onChange={(e) => setUploadedBy(e.target.value)} className={inputClass} placeholder="RH Admin" />
            </Field>
          </div>

          <Field label="Estado de disponibilidad">
            <div className="flex gap-3">
              {(['active', 'inactive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    status === s
                      ? s === 'active'
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-red-400 text-white border-red-400'
                      : 'bg-white text-app-secondary border-app-quinary hover:bg-gray-100'
                  }`}
                >
                  {s === 'active' ? 'Activo (Disponible)' : 'Inactivo (Borrador)'}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="flex gap-4 mt-10">
          <button onClick={onClose} className="flex-1 bg-white border border-app-quinary text-app-secondary font-bold py-4 rounded-full hover:bg-app-quinary/20 transition-all">Cancelar</button>
          <button onClick={handleSave} className="flex-1 bg-app-secondary text-white font-bold py-4 rounded-full hover:bg-app-primary transition-all shadow-lg shadow-app-secondary/20">Guardar Plantilla</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
