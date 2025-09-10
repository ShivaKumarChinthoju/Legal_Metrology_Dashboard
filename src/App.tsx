import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Index from "./pages/Index";
import Applications from "./pages/Applications";
import Inspections from "./pages/Inspections";
import Analytics from "./pages/Analytics";
import Licenses from "./pages/Licenses";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Districts from "./pages/Districts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import InspectorDetails from "./pages/InspectorDetails";
import BusinessDetails from "./pages/BusinessDetails";
import ScheduledInspections from "./pages/ScheduledInspections";
import ScheduleInspection from "./pages/ScheduleInspection";
import NewApplication from "./pages/NewApplication";
import ApplicationDetails from "./pages/ApplicationDetails";
import EditApplication from "./pages/EditApplication";
import LicenseDetails from "./pages/LicenseDetails";
import ReportDetails from "./pages/ReportDetails";
import EditRolePermissions from "./pages/EditRolePermissions";
import DistrictAnalytics from "./pages/DistrictAnalytics";
import MeesevaDashboard from "./pages/MeesevaDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import InspectorDashboard from "./pages/InspectorDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import PerformanceReports from "./pages/PerformanceReports";
import TodayInspections from "./pages/TodayInspections";
import WeeklyInspections from "./pages/WeeklyInspections";
import MonthlyInspections from "./pages/MonthlyInspections";
import RegistrationForm from "./pages/RegistrationForm";
import Registration from "./pages/Registration";
import Verification from "./pages/Verification";
import Inspection from "./pages/Inspection";
import UserDetails from "./pages/UserDetails";
import UserActions from "./pages/UserActions";
import AddNewUser from "./pages/AddNewUser";
import ZoneDetails from "./pages/ZoneDetails";
import ZoneMap from "./components/ZoneMap";
import Profile from "./pages/Profile";
import ApplicationStatus from "./pages/ApplicationStatus";
import StartInspection from "./pages/StartInspection";
import InspectionDetails from "./pages/InspectionDetails";
import ViewDetails from "./pages/ViewDetails";
import MobileInspection from "./pages/MobileInspection";
import InspectionChecklist from "./pages/InspectionChecklist";
import MobileVerification from "./pages/MobileVerification";
import GPSCapture from "./pages/GPSCapture";
import UploadEvidence from "./pages/UploadEvidence";
import ComplianceAnalytics from "./pages/ComplianceAnalytics";
import RevenueReport from "./pages/RevenueReport";
import InspectorAnalytics from "./pages/InspectorAnalytics";
import GenerateReport from "./pages/GenerateReport";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Support from "./pages/Support";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/meeseva-dashboard" element={
            <ProtectedRoute>
              <MeesevaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/customer-dashboard" element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/applicant-dashboard" element={
            <ProtectedRoute>
              <ApplicantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/inspector-dashboard" element={
            <ProtectedRoute>
              <InspectorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/supervisor-dashboard" element={
            <ProtectedRoute>
              <SupervisorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/registration/new" element={
            <ProtectedRoute>
              <RegistrationForm />
            </ProtectedRoute>
          } />
          <Route path="/registration" element={
            <ProtectedRoute>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <DashboardHeader />
                    <main className="flex-1 overflow-auto">
                      <Registration />
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          } />
          <Route path="/verification" element={
            <ProtectedRoute>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <DashboardHeader />
                    <main className="flex-1 overflow-auto">
                      <Verification />
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          } />
          <Route path="/inspection" element={
            <ProtectedRoute>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <DashboardHeader />
                    <main className="flex-1 overflow-auto">
                      <Inspection />
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <ProtectedRoute>
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <DashboardHeader />
                    <main className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/applications" element={<Applications />} />
                        <Route path="/licenses" element={<Licenses />} />
                        <Route path="/inspections" element={<Inspections />} />
                        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddNewUser />} />
        <Route path="/districts" element={<Districts />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/alerts" element={<Notifications />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/inspectors" element={<InspectorDetails />} />
                        <Route path="/businesses" element={<BusinessDetails />} />
        <Route path="/scheduled-inspections" element={<ScheduledInspections />} />
        <Route path="/schedule-inspection" element={<ScheduleInspection />} />
        <Route path="/start-inspection" element={<StartInspection />} />
        <Route path="/inspection-details" element={<InspectionDetails />} />
        <Route path="/view-details" element={<ViewDetails />} />
        <Route path="/mobile-inspection" element={<MobileInspection />} />
        <Route path="/inspection/mobile" element={<MobileInspection />} />
                        <Route path="/applications/new" element={<NewApplication />} />
                        <Route path="/applications/:id/details" element={<ApplicationDetails />} />
                        <Route path="/applications/:id/edit" element={<EditApplication />} />
                        <Route path="/applications/:status" element={<ApplicationStatus />} />
        <Route path="/reports/:id/details" element={<ReportDetails />} />
        <Route path="/users/roles/:role/edit" element={<EditRolePermissions />} />
        <Route path="/districts/analytics" element={<DistrictAnalytics />} />
        <Route path="/users/:userId/details" element={<UserDetails />} />
        <Route path="/users/:userId/actions" element={<UserActions />} />
        <Route path="/licenses/:licenseId/details" element={<LicenseDetails />} />
        <Route path="/districts/:districtId/details" element={<DistrictAnalytics />} />
        <Route path="/districts/:districtId/edit" element={<DistrictAnalytics />} />
        <Route path="/districts/:districtId/analytics" element={<DistrictAnalytics />} />
        <Route path="/zones/:zoneId/details" element={<ZoneDetails />} />
        <Route path="/zones/:zoneName/map" element={<ZoneMap />} />
        <Route path="/performance-reports" element={<PerformanceReports />} />
        <Route path="/today-inspections" element={<TodayInspections />} />
        <Route path="/weekly-inspections" element={<WeeklyInspections />} />
        <Route path="/monthly-inspections" element={<MonthlyInspections />} />
        
        {/* Inspector Tools */}
        <Route path="/inspection/checklist" element={<InspectionChecklist />} />
        <Route path="/inspection/:id/checklist" element={<InspectionChecklist />} />
        <Route path="/verification/mobile" element={<MobileVerification />} />
        <Route path="/gps/capture" element={<GPSCapture />} />
        <Route path="/verification/:id/evidence" element={<UploadEvidence />} />
        
        {/* Analytics & Reports */}
        <Route path="/compliance-analytics" element={<ComplianceAnalytics />} />
        <Route path="/revenue-report" element={<RevenueReport />} />
        <Route path="/inspector-analytics" element={<InspectorAnalytics />} />
        <Route path="/generate-report" element={<GenerateReport />} />
        
        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
