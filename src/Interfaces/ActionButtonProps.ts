import type { ReactNode } from 'react';

export interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'quinary';
  className?: string;
  hideLabelMobile?: boolean;
}
