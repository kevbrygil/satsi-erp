export interface Contract {
  id: number;
  employeeId: number;
  employeeName: string;
  legalDocumentId: number;
  legalDocumentName: string;
  signedDocumentUrl?: string;
  startDate: string;
  endDate?: string;
}

export interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: Omit<Contract, 'id'>) => void;
}
