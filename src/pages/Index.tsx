import React, { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import ApplicationsOverview from "@/components/ApplicationsOverview";
import DistrictOverview from "@/components/DistrictOverview";
import RevenueCards from "@/components/RevenueCards";
import SLAMonitoring from "@/components/SLAMonitoring";
import FilterAndExport from "@/components/FilterAndExport";
import SearchBar from "@/components/SearchBar";
import InlineDistrictMap from "@/components/InlineDistrictMap";
import DashboardFilters, { FilterState } from "@/components/DashboardFilters";
import FilteredDashboardContent from "@/components/FilteredDashboardContent";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { 
  Scale, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Building2,
  Calendar,
  IndianRupee
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [showDistrictMap, setShowDistrictMap] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    district: 'all',
    mandal: 'all',
    officer: 'all',
    startDate: undefined,
    endDate: undefined
  });

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    // Simulate data refresh
    window.location.reload();
  };

  const handleExport = () => {
    // Export dashboard data
    const data = "Metric,Value,Description\nTotal Applications,1247,This month\nApproved Applications,1089,87.3% approval rate\nPending Reviews,158,Awaiting action\nRevenue Collected,₹24.3L,Monthly target: ₹29L";
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-metrics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleNotifications = () => {
    navigate('/notifications');
  };

  if (showDistrictMap) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-6 flex-1">
          <InlineDistrictMap onBack={() => setShowDistrictMap(false)} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Legal Metrology Management System
        </p>
      </div>

      {/* Dashboard Filters */}
      <DashboardFilters 
        onFiltersChange={handleFiltersChange}
        onRefresh={handleRefresh}
      />

      {/* Controls */}
      <FilterAndExport 
        onExport={handleExport}
        onNotifications={handleNotifications}
      />

      {/* Search Bar */}
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search applications, businesses, or inspectors..."
      />

      {/* Filtered Dashboard Content */}
      <FilteredDashboardContent filters={filters} />

      {/* Revenue Cards */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Financial Overview</h2>
        <RevenueCards />
      </div>

      {/* SLA Monitoring */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">SLA Compliance</h2>
        <SLAMonitoring />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ApplicationsOverview />
        <DistrictOverview onViewMap={() => setShowDistrictMap(true)} />
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;