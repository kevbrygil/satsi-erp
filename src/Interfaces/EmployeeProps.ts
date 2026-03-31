export interface EmployeeAddress {
  street: string;
  neighborhood: string;
  postalCode: string;
  municipality: string;
}

export interface Employee {
  id: number;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  position: string;
  socialSecurityNumber: string;
  rfc: string;
  curp: string;
  weeklySalary: string;
  infonavitCredit: string;
  startDate: string;
  endDate?: string;
  fiscalAddress: EmployeeAddress;
  documentationUrl?: string;
}

export interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id'>) => void;
}
