import DashboardLayout from '../Layout/DashboardLayout';

const salesProducts = [
  { name: 'Macbook Pro', quantity: 2, price: '2999 AZN', date: '20.09.2024' },
  { name: 'Macbook Air', quantity: 4, price: '1499 AZN', date: '19.09.2024' },
  {
    name: 'Iphone 15 Pro',
    quantity: 15,
    price: '3999 AZN',
    date: '18.09.2024',
  },
  {
    name: 'Iphone 15 Pro Max',
    quantity: 10,
    price: '4499 AZN',
    date: '18.09.2024',
  },
  { name: 'Iphone 15', quantity: 12, price: '1999 AZN', date: '17.09.2024' },
];

const hrEmployees = [
  {
    name: 'Parviz Aslanov',
    position: 'UI Dizayner',
    startDate: '20.11.2023',
    salary: '1700 AZN',
    avatar: 'https://i.pravatar.cc/40?img=11',
  },
  {
    name: 'Seving Aslanova',
    position: 'UX Dizayner',
    startDate: '19.02.2023',
    salary: '1200 AZN',
    avatar: 'https://i.pravatar.cc/40?img=12',
  },
  {
    name: 'Ceyhun Aslanov',
    position: 'React Developer',
    startDate: '18.05.2024',
    salary: '3999 AZN',
    avatar: 'https://i.pravatar.cc/40?img=13',
  },
  {
    name: 'Ayla Mammadova',
    position: 'UX resacher itern',
    startDate: '18.07.2024',
    salary: '400 AZN',
    avatar: 'https://i.pravatar.cc/40?img=14',
  },
  {
    name: 'Orxan Hüseyinov',
    position: 'Mühasib',
    startDate: '17.09.2022',
    salary: '2000 AZN',
    avatar: 'https://i.pravatar.cc/40?img=15',
  },
];

const warehouseProducts = [
  {
    name: 'Iphone 14',
    code: 'ELEC-1001',
    quantity: 15,
    supplyDate: '20.11.2023',
  },
  {
    name: 'Samsung S24',
    code: 'ELEC-1002',
    quantity: 20,
    supplyDate: '20.11.2023',
  },
  {
    name: 'Black M Jacket',
    code: 'CLOTH-BLK-M',
    quantity: 20,
    supplyDate: '20.10.2023',
  },
  {
    name: 'Black L Jacket',
    code: 'CLOTH-BLK-L',
    quantity: 20,
    supplyDate: '20.10.2023',
  },
  {
    name: 'Armani Perfume',
    code: 'COSM-ARM-202',
    quantity: 30,
    supplyDate: '20.11.2023',
  },
];

const hrDeptStats = [
  { name: 'Marketing', count: 186, percent: '62.5%', color: '#02437B' },
  { name: 'Proqram Taminatı', count: 75, percent: '25%', color: '#4CC9F0' },
  { name: 'Digar', count: 37, percent: '12.5%', color: '#B8D8E8' },
];

const warehouseCatStats = [
  { name: 'Electronics', percent: '60%', color: '#FF6B35' },
  { name: 'Clothing', percent: '25%', color: '#4CC9F0' },
  { name: 'Cosmetics', percent: '15%', color: '#FFC2A0' },
];

const buildDonutSegments = (segments: { percent: number; color: string }[]) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  return segments.map((seg) => {
    const dash = (seg.percent / 100) * circumference;
    const gap = circumference - dash;
    const dashOffset = -cumulative;
    cumulative += dash;
    return { color: seg.color, dash, gap, dashOffset };
  });
};

const MiniDonutChart = ({
  segments,
}: {
  segments: { percent: number; color: string }[];
}) => {
  const precomputed = buildDonutSegments(segments);
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
      {precomputed.map((seg, i) => (
        <circle
          key={i}
          cx="80"
          cy="80"
          r={60}
          fill="none"
          stroke={seg.color}
          strokeWidth="28"
          strokeDasharray={`${seg.dash} ${seg.gap}`}
          strokeDashoffset={seg.dashOffset}
        />
      ))}
    </svg>
  );
};

const SalesLineChart = () => (
  <div className="relative w-full h-[200px] flex items-end">
    <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-xs text-slate-400 font-medium pb-8 w-10">
      <span>$100k</span>
      <span>$80k</span>
      <span>$60k</span>
      <span>$40k</span>
      <span>$20k</span>
      <span>$0</span>
    </div>
    <div className="flex-1 ml-10 relative h-full">
      <div className="absolute inset-0 flex flex-col justify-between pb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-px bg-slate-100" />
        ))}
      </div>
      <div className="absolute inset-0 bottom-8 z-10 w-full h-full flex items-end">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100">
          <defs>
            <linearGradient id="dash-chart-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#02437B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#02437B" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,55 L20,35 L40,55 L60,20 L80,45 L100,25 L100,100 L0,100 Z"
            fill="url(#dash-chart-bg)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs font-semibold text-app-primary pt-3">
        <span>18</span>
        <span>20</span>
        <span>22</span>
        <span>24</span>
        <span>26</span>
        <span>28</span>
        <span>30</span>
      </div>
    </div>
  </div>
);

const SimplePagination = () => (
  <div className="flex items-center gap-2 text-sm font-semibold text-app-secondary mt-4">
    <button className="px-1 hover:text-app-primary">{'<'}</button>
    <button className="bg-app-secondary text-white w-7 h-7 flex items-center justify-center rounded-lg shadow-sm">
      1
    </button>
    {[2, 3, 4].map((p) => (
      <button
        key={p}
        className="hover:bg-app-quinary w-7 h-7 flex items-center justify-center rounded-lg">
        {p}
      </button>
    ))}
    <span>...</span>
    <button className="hover:bg-app-quinary w-7 h-7 flex items-center justify-center rounded-lg">
      10
    </button>
    <button className="px-1 hover:text-app-primary">{'>'}</button>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl md:text-2xl font-bold text-app-secondary mb-5">
    {title}
  </h2>
);

const DashboardScreen = () => {
  return (
    <DashboardLayout pageTitle="Inicio">
      <div className="flex flex-col gap-10">
        {/* Welcome */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-app-secondary">
          Bienvenido, Ana!
        </h1>

        {/* ── SALES ── */}
        <section>
          <SectionTitle title="Ventas" />

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: 'Total Ventas',
                value: '$100.000',
                sub: '1 mes',
              },
              {
                label: 'Total de Productos Vendidos',
                value: '3400',
                sub: '1 mes',
              },
              {
                label: 'Mejor Categoría Vendida',
                value: 'Electronics',
                sub: '1 mes',
              },
              {
                label: 'Mejor Producto Vendido',
                value: 'Iphone 15 Pro',
                sub: '1 mes',
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-5 shadow-sm border border-app-quinary/30">
                <p className="text-xs text-app-secondary/70 font-semibold mb-2 leading-tight">
                  {card.label}
                </p>
                <p className="text-xl md:text-2xl font-extrabold text-app-primary leading-tight">
                  {card.value}
                </p>
                <p className="text-xs text-app-secondary/60 mt-1">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Table + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30">
              <div className="w-full overflow-x-auto">
                <table
                  className="w-full text-left"
                  style={{
                    borderSpacing: '0 6px',
                    borderCollapse: 'separate',
                  }}>
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-app-secondary/80 font-bold">
                      <th className="px-3 py-3 pb-5">PRODUCTO</th>
                      <th className="px-3 py-3 pb-5 hidden sm:table-cell">
                        CANTIDAD
                      </th>
                      <th className="px-3 py-3 pb-5">PRECIO</th>
                      <th className="px-3 py-3 pb-5 hidden sm:table-cell">
                        FECHA
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] font-semibold text-app-primary">
                    {salesProducts.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 1 ? 'bg-[#D8E9F0]/60' : ''}>
                        <td className="px-3 py-3 rounded-l-xl whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell">
                          {row.quantity}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          {row.price}
                        </td>
                        <td className="px-3 py-3 rounded-r-xl hidden sm:table-cell whitespace-nowrap">
                          {row.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <SimplePagination />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30">
              <div className="flex justify-end gap-4 mb-4 text-sm font-semibold text-app-secondary">
                {['1S', '1M', '3M', '1A'].map((t, i) => (
                  <button
                    key={t}
                    className={
                      i === 1 ? 'text-[#4CC9F0]' : 'hover:text-app-primary'
                    }>
                    {t}
                  </button>
                ))}
              </div>
              <SalesLineChart />
            </div>
          </div>
        </section>

        {/* ── HUMAN RESOURCES ── */}
        <section>
          <SectionTitle title="Recursos Humanos" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30">
              <div className="w-full overflow-x-auto">
                <table
                  className="w-full text-left"
                  style={{
                    borderSpacing: '0 6px',
                    borderCollapse: 'separate',
                  }}>
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-app-secondary/80 font-bold">
                      <th className="px-3 py-3 pb-5">NOMBRE</th>
                      <th className="px-3 py-3 pb-5 hidden sm:table-cell">
                        POSICIÓN
                      </th>
                      <th className="px-3 py-3 pb-5 hidden md:table-cell">
                        FECHA INICIO
                      </th>
                      <th className="px-3 py-3 pb-5">SALARIO</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] font-semibold text-app-primary">
                    {hrEmployees.map((emp, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 1 ? 'bg-[#D8E9F0]/60' : ''}>
                        <td className="px-3 py-3 rounded-l-xl">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <img
                              src={emp.avatar}
                              alt={emp.name}
                              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                            />
                            <span className="truncate max-w-[100px] md:max-w-none">
                              {emp.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell whitespace-nowrap">
                          {emp.position}
                        </td>
                        <td className="px-3 py-3 hidden md:table-cell whitespace-nowrap">
                          {emp.startDate}
                        </td>
                        <td className="px-3 py-3 rounded-r-xl whitespace-nowrap">
                          {emp.salary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <SimplePagination />
                <div className="flex items-center gap-2 text-sm font-semibold text-app-secondary">
                  <span>Mostrar</span>
                  <div className="bg-app-secondary text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm text-xs">
                    5
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Donut */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30 flex flex-col items-center">
              <div className="relative w-[180px] h-[180px]">
                <MiniDonutChart
                  segments={[
                    { percent: 62.5, color: '#02437B' },
                    { percent: 25, color: '#4CC9F0' },
                    { percent: 12.5, color: '#B8D8E8' },
                  ]}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-app-secondary/70 font-semibold leading-tight">
                    Numero total
                    <br />
                    De empleados
                  </span>
                  <span className="text-3xl font-extrabold text-app-primary">
                    300
                  </span>
                </div>
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-app-secondary/70 font-bold text-xs uppercase">
                    <th className="text-left pb-2">Departamento</th>
                    <th className="text-center pb-2">Numero de empleados</th>
                    <th className="text-right pb-2">%</th>
                  </tr>
                </thead>
                <tbody>
                  {hrDeptStats.map((d) => (
                    <tr
                      key={d.name}
                      className="text-app-primary font-semibold text-sm">
                      <td className="py-1.5 flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: d.color }}
                        />
                        <span className="truncate max-w-[120px]">{d.name}</span>
                      </td>
                      <td className="text-center py-1.5">{d.count}</td>
                      <td className="text-right py-1.5">{d.percent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WAREHOUSE ── */}
        <section>
          <SectionTitle title="Almacén" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30">
              <div className="w-full overflow-x-auto">
                <table
                  className="w-full text-left"
                  style={{
                    borderSpacing: '0 6px',
                    borderCollapse: 'separate',
                  }}>
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-app-secondary/80 font-bold">
                      <th className="px-3 py-3 pb-5">NOMBRE</th>
                      <th className="px-3 py-3 pb-5 hidden sm:table-cell">
                        CODIGO
                      </th>
                      <th className="px-3 py-3 pb-5">CANTIDAD</th>
                      <th className="px-3 py-3 pb-5 hidden sm:table-cell">
                        HISTORIAL DE SUMINISTRO
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] font-semibold text-app-primary">
                    {warehouseProducts.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 1 ? 'bg-[#D8E9F0]/60' : ''}>
                        <td className="px-3 py-3 rounded-l-xl whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell whitespace-nowrap">
                          {row.code}
                        </td>
                        <td className="px-3 py-3">{row.quantity}</td>
                        <td className="px-3 py-3 rounded-r-xl hidden sm:table-cell whitespace-nowrap">
                          {row.supplyDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <SimplePagination />
                <div className="flex items-center gap-2 text-sm font-semibold text-app-secondary">
                  <span>Mostrar</span>
                  <div className="bg-app-secondary text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm text-xs">
                    5
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse category donut */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-app-quinary/30 flex flex-col items-center">
              <div className="relative w-[180px] h-[180px]">
                <MiniDonutChart
                  segments={[
                    { percent: 60, color: '#FF6B35' },
                    { percent: 25, color: '#4CC9F0' },
                    { percent: 15, color: '#FFC2A0' },
                  ]}
                />
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-app-secondary/70 font-bold text-xs uppercase">
                    <th className="text-left pb-2">Categoría</th>
                    <th className="text-right pb-2">%</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouseCatStats.map((c) => (
                    <tr
                      key={c.name}
                      className="text-app-primary font-semibold text-sm">
                      <td className="py-1.5 flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: c.color }}
                        />
                        {c.name}
                      </td>
                      <td className="text-right py-1.5">{c.percent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardScreen;
