import type { ReactNode } from 'react';

export interface HeaderItem {
  label: string;
  className?: string;
}

export interface DataTableProps {
  children: ReactNode;
  headers: HeaderItem[];
  emptyMessage?: string;
  isEmpty?: boolean;
  className?: string;
}
