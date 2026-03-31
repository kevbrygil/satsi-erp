import { useState } from 'react';
import type { PaginationProps } from '@interfaces/PaginationProps';

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20],
}: PaginationProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between mt-6 px-4 font-semibold text-xs text-app-secondary flex-wrap gap-4">
      {/* Navigation */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="hover:text-app-primary"
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${
              currentPage === page
                ? 'bg-app-secondary text-white shadow-sm'
                : 'hover:bg-app-quinary'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="hover:text-app-primary"
        >
          {'>'}
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2 relative">
        <span>Mostrar</span>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="bg-app-secondary text-white px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-all hover:bg-app-secondary/90 shadow-sm"
        >
          {pageSize}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {showMenu && (
          <div className="absolute bottom-8 right-0 bg-white border border-app-quinary shadow-lg rounded-lg overflow-hidden z-[50] min-w-[60px]">
            {pageSizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => {
                  onPageSizeChange(size);
                  setShowMenu(false);
                }}
                className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-app-quinary transition-colors ${
                  pageSize === size ? 'text-app-secondary' : 'text-app-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
