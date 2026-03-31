export type ContractType =
  | 'Normal'
  | 'Honorarios'
  | 'Home office'
  | 'Operador tractocamion'
  | 'Trabajador con vehiculo asignado';

export interface LegalDocument {
  id: number;
  name: string;
  contractType: ContractType;
  version: string;
  templateVariables?: string[];
  uploadedAt: string;
  updatedAt: string;
  uploadedBy: string;
  fileSize: string;
  status: 'active' | 'inactive';
}

export interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<LegalDocument, 'id'>) => void;
}
