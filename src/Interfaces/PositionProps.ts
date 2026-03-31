export interface Position {
  id: number;
  name: string;
  department: string;
  activities: string;
  status: 'active' | 'inactive';
}

export interface AddPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (position: Omit<Position, 'id'>) => void;
}
