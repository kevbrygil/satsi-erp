import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';

export const DashboardLayout = ({ children, pageTitle }: { children: React.ReactNode; pageTitle?: string }) => {
  return (
    <div className="flex h-screen bg-[#DFEBEF] md:bg-[#E1EDF2] overflow-hidden font-inter">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full md:ml-[240px]">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-y-auto mt-[80px] p-4 md:p-8 pb-[100px] md:pb-8 bg-[#E1EDF2]">
          <div className="max-w-[1280px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
