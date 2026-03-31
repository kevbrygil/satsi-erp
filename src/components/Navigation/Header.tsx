interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'Dashboard' }: HeaderProps) => {
  return (
    <header className="h-[80px] bg-app-secondary text-white flex items-center justify-between px-6 md:px-10 fixed top-0 left-0 md:left-[240px] right-0 z-10 w-full md:w-[calc(100%-240px)] shadow-md">
      <h2 className="text-xl md:text-[22px] font-bold tracking-wide min-w-[120px]">{title}</h2>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-[460px] mx-4 relative">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full bg-[#E2EEF4] text-[#003865] placeholder:text-[#003865]/60 h-11 px-5 rounded-full outline-none focus:ring-2 focus:ring-white/50 text-[15px]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#003865]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-6">
        {/* Mobile Search Icon */}
        <button className="md:hidden">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>

        {/* Notification Bell */}
        <button className="relative hover:opacity-80 transition-opacity">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-1.5 rounded-full transition-colors">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-[15px] font-semibold leading-tight">Ana Mendoza</span>
            <span className="text-[13px] text-white/70">seving@gmail.com</span>
          </div>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hidden lg:block opacity-70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
