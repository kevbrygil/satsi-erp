import React from 'react';
import type { SearchInputProps } from '@interfaces/SearchInputProps';

const SearchInput = ({ value, onChange, placeholder = 'Buscar...' }: SearchInputProps) => {
  return (
    <div className="relative h-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full bg-white border border-app-quinary/50 rounded-full py-2 pl-9 pr-4 text-sm font-semibold text-app-primary placeholder:text-app-secondary/40 focus:outline-none focus:ring-2 focus:ring-app-secondary/20 w-32 sm:w-48 transition-all"
      />
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-app-secondary/40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773z" />
      </svg>
    </div>
  );
};

export default SearchInput;
