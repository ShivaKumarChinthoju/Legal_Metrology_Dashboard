import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarIcon,
  MapPin,
  Users,
  IndianRupee,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Filter,
  Download,
  Building,
  UserCheck,
  Activity
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart } from 'recharts';
import { cn } from "@/lib/utils";

interface FilterState {
  district: string;
  mandal: string;
  officer: string;
  applicationType: string;
  serviceType: string;
  slaStatus: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const LicenseRegistrationDashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    district: 'all',
    mandal: 'all',
    officer: 'all',
    applicationType: 'all',
    serviceType: 'all',
    slaStatus: 'all',
    startDate: undefined,
    endDate: undefined
  });

  // Mock data - in real app this would come from API based on filters
  const districts = [
    'All Districts', 'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool',
    'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari',
    'YSR Kadapa', 'Chittoor', 'Annamayya', 'Sri Potti Sriramulu Nellore', 'Bapatla',
    'Eluru', 'Dr. B.R. Ambedkar Konaseema', 'Kakinada', 'Alluri Sitharama Raju',
    'Manyam', 'Parvathipuram', 'Anakapalli', 'ASR District', 'Tirupati'
  ];

  const applicationTypes = [
    'All Types', 'Manufacturing', 'Repairing', 'Dealing', 
    'Registration of Manufacturer', 'Packer', 'Importer'
  ];

  const serviceTypes = [
    'All Services', 'Grant', 'Auto Renewal', 'Alteration'
  ];

  const slaStatuses = [
    'All', 'Within SLA', 'Beyond SLA'
  ];

  const officers = [
    'All Officers',
    // Assistant Controllers (25)
    'AC - Vijayawada', 'AC - Visakhapatnam', 'AC - Guntur', 'AC - Kurnool', 'AC - Tirupati',
    // ILMs (56) 
    'ILM - Srikakulam', 'ILM - Vizianagaram', 'ILM - Visakhapatnam Rural', 'ILM - East Godavari',
    // Deputy Controllers (10)
    'DC - Guntur', 'DC - Krishna', 'DC - Nellore', 'DC - Chittoor',
    // Joint Controllers (4)
    'JC - Visakhapatnam', 'JC - Vijayawada', 'JC - Kurnool', 'JC - Tirupati',
    // State Level
    'State CLM'
  ];

  const licenseStats = {
    totalApplications: 2456,
    totalApproved: 2089,
    totalFeeCollected: 4850000,
    withinSLA: 1842,
    beyondSLA: 614,
    approvalRate: 85
  };

  const applicationsByType = [
    { type: 'Manufacturing', received: 856, approved: 742, fee: 1850000 },
    { type: 'Repairing', received: 642, approved: 578, fee: 1250000 },
    { type: 'Dealing', received: 498, approved: 395, fee: 980000 },
    { type: 'Manufacturer Registration', received: 278, approved: 245, fee: 560000 },
    { type: 'Packer', received: 156, approved: 134, fee: 385000 },
    { type: 'Importer', received: 126, approved: 95, fee: 285000 }
  ];

  const serviceTypeBreakdown = [
    { service: 'Grant', applications: 1456, color: 'hsl(var(--primary))' },
    { service: 'Auto Renewal', applications: 845, color: 'hsl(var(--success))' },
    { service: 'Alteration', applications: 155, color: 'hsl(var(--warning))' }
  ];

  const districtPerformance = [
    { district: 'Visakhapatnam', received: 268, approved: 245, fee: 685000, sla: 92 },
    { district: 'Guntur', received: 245, approved: 218, fee: 625000, sla: 89 },
    { district: 'Krishna', received: 198, approved: 175, fee: 485000, sla: 88 },
    { district: 'Kurnool', received: 156, approved: 128, fee: 385000, sla: 82 },
    { district: 'Chittoor', received: 178, approved: 162, fee: 445000, sla: 91 },
    { district: 'Nellore', received: 134, approved: 115, fee: 335000, sla: 86 }
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 198, approved: 175, fee: 485000, sla: 89 },
    { month: 'Feb', applications: 215, approved: 192, fee: 525000, sla: 87 },
    { month: 'Mar', applications: 248, approved: 218, fee: 625000, sla: 91 },
    { month: 'Apr', applications: 235, approved: 205, fee: 585000, sla: 88 },
    { month: 'May', applications: 268, approved: 238, fee: 665000, sla: 90 },
    { month: 'Jun', applications: 285, approved: 258, fee: 715000, sla: 92 }
  ];

  const slaMonitoring = [
    { district: 'Kurnool', officer: 'AC - Kurnool', applications: 28, daysToSLA: 3, risk: 'high' },
    { district: 'Prakasam', officer: 'ILM - Prakasam', applications: 15, daysToSLA: 5, risk: 'medium' },
    { district: 'Vizianagaram', officer: 'DC - Vizianagaram', applications: 12, daysToSLA: 8, risk: 'low' },
    { district: 'Anantapur', officer: 'ILM - Anantapur', applications: 22, daysToSLA: 4, risk: 'high' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Licenses & Registration Analytics</h1>
          <p className="text-muted-foreground">Comprehensive licensing performance monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Comprehensive Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">District</label>
              <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map(district => (
                    <SelectItem key={district} value={district.toLowerCase().replace(/\s+/g, '-')}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Application Type</label>
              <Select value={filters.applicationType} onValueChange={(value) => handleFilterChange('applicationType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {applicationTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Service Type</label>
              <Select value={filters.serviceType} onValueChange={(value) => handleFilterChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(service => (
                    <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">SLA Status</label>
              <Select value={filters.slaStatus} onValueChange={(value) => handleFilterChange('slaStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="SLA Status" />
                </SelectTrigger>
                <SelectContent>
                  {slaStatuses.map(status => (
                    <SelectItem key={status} value={status.toLowerCase().replace(/\s+/g, '-')}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Officer</label>
              <Select value={filters.officer} onValueChange={(value) => handleFilterChange('officer', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Officer" />
                </SelectTrigger>
                <SelectContent>
                  {officers.map(officer => (
                    <SelectItem key={officer} value={officer.toLowerCase().replace(/\s+/g, '-')}>
                      {officer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? format(filters.startDate, "MMM d") : "Start"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.startDate}
                    onSelect={(date) => handleFilterChange('startDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate ? format(filters.endDate, "MMM d") : "End"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.endDate}
                    onSelect={(date) => handleFilterChange('endDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button variant="secondary" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{licenseStats.totalApplications.toLocaleString()}</p>
            <div className="mt-2 flex justify-between text-xs">
              <span>Received</span>
              <Badge variant="secondary">+12% this month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <p className="text-sm text-muted-foreground">Total Approved</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{licenseStats.totalApproved.toLocaleString()}</p>
            <div className="mt-2 flex justify-between text-xs">
              <span>Approval Rate: {licenseStats.approvalRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">Total Fee Collected</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{licenseStats.totalFeeCollected.toLocaleString()}</p>
            <div className="mt-2 flex justify-between text-xs">
              <span>Target Achievement: 96%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">SLA Compliance</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round((licenseStats.withinSLA / (licenseStats.withinSLA + licenseStats.beyondSLA)) * 100)}%
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-success">Within: {licenseStats.withinSLA}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-destructive">Beyond: {licenseStats.beyondSLA}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Performance by Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Performance by Application Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applicationsByType.map((app, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{app.type}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Received:</span>
                      <span className="font-medium">{app.received}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Approved:</span>
                      <span className="font-medium text-success">{app.approved}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Fee Collected:</span>
                      <span className="font-medium">₹{app.fee.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(app.approved / app.received) * 100} 
                      className="h-2 mt-2"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Application by Service Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceTypeBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="service" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="applications" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="hsl(var(--primary))" name="Applications" />
                <Line type="monotone" dataKey="sla" stroke="hsl(var(--success))" name="SLA %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* District Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              District Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {districtPerformance.map((district, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{district.district}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={district.sla >= 90 ? "default" : "destructive"}>
                        {district.sla}% SLA
                      </Badge>
                      <span className="text-sm">₹{district.fee.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-medium">{district.received}</div>
                      <div>Received</div>
                    </div>
                    <div className="text-center p-2 bg-success/10 rounded">
                      <div className="font-medium text-success">{district.approved}</div>
                      <div>Approved</div>
                    </div>
                    <div className="text-center p-2 bg-primary/10 rounded">
                      <div className="font-medium">{Math.round((district.approved/district.received)*100)}%</div>
                      <div>Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SLA Risk Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              SLA Risk Heat Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slaMonitoring.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Badge className={getRiskColor(item.risk)}>
                      {item.risk.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-medium">{item.district}</p>
                      <p className="text-sm text-muted-foreground">{item.officer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.applications} apps</p>
                    <p className="text-sm text-muted-foreground">{item.daysToSLA} days to SLA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LicenseRegistrationDashboard;