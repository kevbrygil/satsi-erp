import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/public/login';
import DashboardPage from './pages/protected/dashboard/index';
import VentasPage from './pages/protected/dashboard/sales';
import RHPage from './pages/protected/dashboard/hr';
import LegalDocumentsPage from './pages/protected/dashboard/legal-documents';
import ContractsPage from './pages/protected/dashboard/contracts';
import PositionsPage from './pages/protected/dashboard/positions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/ventas" element={<VentasPage />} />
        <Route path="/dashboard/rh" element={<RHPage />} />
        <Route
          path="/dashboard/documentos-legales"
          element={<LegalDocumentsPage />}
        />
        <Route path="/dashboard/contratos" element={<ContractsPage />} />
        <Route path="/dashboard/puestos" element={<PositionsPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
