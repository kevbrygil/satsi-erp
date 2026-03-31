import DashboardLayout from '../Layout/DashboardLayout';

const tableData = [
  { nombre: 'Macbook Pro', categoria: 'Electronics', codigo: 'ELEC-1001', cantidad: 2, precio: '2999 AZN', fecha: '20.09.2024' },
  { nombre: 'Macbook Air', categoria: 'Electronics', codigo: 'ELEC-1002', cantidad: 4, precio: '1499 AZN', fecha: '19.09.2024' },
  { nombre: 'Iphone 15 Pro', categoria: 'Electronics', codigo: 'CLOTH-BLK-M', cantidad: 5, precio: '3999 AZN', fecha: '18.09.2024' },
  { nombre: 'Iphone 15 Pro Max', categoria: 'Electronics', codigo: 'CLOTH-BLK-L', cantidad: 10, precio: '4499 AZN', fecha: '18.09.2024' },
  { nombre: 'Iphone 15', categoria: 'Electronics', codigo: 'COSM-ARM-202', cantidad: 12, precio: '1999 AZN', fecha: '17.09.2024' }
];

const SalesScreen = () => {
  return (
    <DashboardLayout pageTitle="Ventas">
      <div className="flex flex-col gap-10">
        
        {/* CHART SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-[22px] font-bold text-app-secondary">Reporte de ventas</h2>
            <button className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-app-quinary/50 hover:bg-gray-50 transition-colors font-semibold text-app-secondary text-sm">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              Filtro
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-app-quinary/30 w-full relative">
            <div className="flex justify-end mb-6">
              <div className="flex gap-4 sm:gap-6 text-sm font-semibold text-app-secondary">
                <button className="hover:text-app-primary">1S</button>
                <button className="text-app-tertiary">1M</button>
                <button className="hover:text-app-primary">3M</button>
                <button className="text-[#4CC9F0]">1Y</button>
              </div>
            </div>

            <div className="relative w-full h-[240px] md:h-[320px] flex items-end">
              <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-xs text-slate-400 font-medium pb-8 w-10">
                <span>$80k</span>
                <span>$60k</span>
                <span>$40k</span>
                <span>$20k</span>
              </div>
              <div className="flex-1 ml-10 relative h-full">
                <div className="absolute inset-0 flex flex-col justify-between pb-8">
                  <div className="w-full h-px bg-slate-100"></div>
                  <div className="w-full h-px bg-slate-100"></div>
                  <div className="w-full h-px bg-slate-100"></div>
                  <div className="w-full h-px bg-slate-100"></div>
                </div>
                
                <div className="absolute inset-0 bottom-8 z-10 w-full h-full flex items-end">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="chart-bg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#02437B" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#02437B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,20 L20,40 L40,35 L60,40 L80,15 L100,25 L100,100 L0,100 Z"
                      fill="url(#chart-bg)"
                    />
                  </svg>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs font-semibold text-app-primary pt-3 mt-1">
                  <span>18</span>
                  <span className="hidden sm:inline">20</span>
                  <span>22</span>
                  <span className="hidden sm:inline">24</span>
                  <span>26</span>
                  <span className="hidden sm:inline">28</span>
                  <span>30</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABLE SECTION */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl md:text-[22px] font-bold text-app-secondary">Producto vendido</h2>
            <div className="flex items-center gap-3 self-end">
              <button className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-app-quinary/50 hover:bg-gray-50 transition-colors font-semibold text-app-secondary text-sm">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                </svg>
                Ordenar
              </button>
              <button className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-app-quinary/50 hover:bg-gray-50 transition-colors font-semibold text-app-secondary text-sm">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                Filtro
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-app-quinary/30 w-full overflow-hidden">
            <div className="w-full overflow-x-auto pb-4">
              <table className="w-full text-left border-collapse" style={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}>
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-app-secondary/80 font-bold border-b border-app-quinary pb-3">
                    <th className="px-5 py-4 pb-6">NOMBRE</th>
                    <th className="px-5 py-4 pb-6 hidden md:table-cell">CATEGORIA</th>
                    <th className="px-5 py-4 pb-6 hidden lg:table-cell">CÓDIGO</th>
                    <th className="px-5 py-4 pb-6">CANTIDAD</th>
                    <th className="px-5 py-4 pb-6">PRECIO</th>
                    <th className="px-5 py-4 pb-6">FECHA</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] md:text-[15px] font-semibold text-app-primary">
                  {tableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 1 ? 'bg-[#D8E9F0]/60' : 'bg-transparent'}>
                      <td className="px-5 py-4 rounded-l-[1.5rem] whitespace-nowrap">{row.nombre}</td>
                      <td className="px-5 py-4 hidden md:table-cell whitespace-nowrap">{row.categoria}</td>
                      <td className="px-5 py-4 hidden lg:table-cell whitespace-nowrap">{row.codigo}</td>
                      <td className="px-5 py-4">{row.cantidad}</td>
                      <td className="px-5 py-4 whitespace-nowrap">{row.precio}</td>
                      <td className="px-5 py-4 rounded-r-[1.5rem] whitespace-nowrap">{row.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-6 px-4 font-semibold text-sm text-app-secondary">
              <div className="flex gap-4">
                <button className="hover:text-app-primary px-1">{'<'}</button>
                <button className="bg-app-secondary text-white w-7 h-7 flex flex-col justify-center items-center rounded-lg shadow-sm">1</button>
                <button className="hover:bg-app-quinary w-7 h-7 flex flex-col justify-center items-center rounded-lg">2</button>
                <button className="hover:bg-app-quinary w-7 h-7 sm:flex flex-col justify-center items-center rounded-lg hidden">3</button>
                <button className="hover:bg-app-quinary w-7 h-7 sm:flex flex-col justify-center items-center rounded-lg hidden">4</button>
                <span className="w-7 h-7 flex flex-col justify-center items-center">...</span>
                <button className="hover:bg-app-quinary w-7 h-7 flex flex-col justify-center items-center rounded-lg">10</button>
                <button className="hover:text-app-primary px-1">{'>'}</button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span>Mostrar</span>
                <div className="bg-app-secondary text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm">
                  5
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </DashboardLayout>
  );
};

export default SalesScreen;
