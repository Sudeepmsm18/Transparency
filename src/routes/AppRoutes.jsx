import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { CctvManagementPage } from "../pages/CctvManagementPage";
import { VisitorManagementPage } from "../pages/VisitorManagementPage";
import { SecurityPage } from "../pages/SecurityPage";
import { PaymentsPage } from "../pages/PaymentsPage";
import { ExpensesPage } from "../pages/ExpensesPage";
import { AnnouncementsPage } from "../pages/AnnouncementsPage";
import { 
  InfrastructurePage, PatrolsPage, 
  VehiclesPage, AssociationPage, 
  ServicesPage, 
  ReportsPage, SettingsPage 
} from "../pages/Stubs";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="cctv" element={<CctvManagementPage />} />
        <Route path="infrastructure" element={<InfrastructurePage />} />
        <Route path="visitors" element={<VisitorManagementPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="patrols" element={<PatrolsPage />} />
        <Route path="association" element={<AssociationPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
