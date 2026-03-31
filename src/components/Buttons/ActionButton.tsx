import React from 'react';
import type { ActionButtonProps } from '@interfaces/ActionButtonProps';

const ActionButton = ({
  label,
  onClick,
  icon,
  variant = 'primary',
  className = '',
  hideLabelMobile = false,
}: ActionButtonProps) => {
  const baseStyles = 'flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm transition-all font-bold text-sm h-10';
  
  const variants = {
    primary: 'bg-app-secondary text-white hover:bg-app-secondary/90',
    secondary: 'bg-white border border-app-quinary/50 text-app-secondary hover:bg-app-quinary/30',
    quinary: 'bg-app-quinary text-app-primary hover:bg-app-quinary/80',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className={hideLabelMobile ? 'hidden sm:inline' : ''}>{label}</span>
    </button>
  );
};

export default ActionButton;
