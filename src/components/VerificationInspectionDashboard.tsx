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
  Download
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { cn } from "@/lib/utils";

interface FilterState {
  district: string;
  mandal: string;
  officer: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const VerificationInspectionDashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    district: 'all',
    mandal: 'all',
    officer: 'all',
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

  const mandals = [
    'All Mandals', 'Rajam', 'Narasannapeta', 'Palasa', 'Tekkali', 'Amadalavalasa',
    'Srikakulam', 'Etcherla', 'Laveru', 'Kotabommali', 'Ranasthalam'
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

  const verificationStats = {
    totalFee: 2850000,
    stampingFee: 1650000,
    compoundingFee: 480000,
    totalCases: 1247,
    certificatesIssued: 1089,
    withinSLA: 892,
    beyondSLA: 197
  };

  const districtPerformance = [
    { district: 'Visakhapatnam', approved: 156, rejected: 12, pending: 28, slaCompliance: 94, revenue: 485000 },
    { district: 'Guntur', approved: 142, rejected: 18, pending: 35, slaCompliance: 89, revenue: 420000 },
    { district: 'Krishna', approved: 128, rejected: 15, pending: 42, slaCompliance: 87, revenue: 390000 },
    { district: 'Kurnool', approved: 98, rejected: 22, pending: 55, slaCompliance: 82, revenue: 298000 },
    { district: 'Chittoor', approved: 115, rejected: 9, pending: 31, slaCompliance: 91, revenue: 365000 },
    { district: 'Nellore', approved: 89, rejected: 28, pending: 48, slaCompliance: 78, revenue: 268000 }
  ];

  const slaHeatmapData = [
    { district: 'Visakhapatnam', zone: 'North', risk: 'low', daysToSLA: 12, officer: 'ILM - Visakhapatnam' },
    { district: 'Guntur', zone: 'Central', risk: 'medium', daysToSLA: 6, officer: 'AC - Guntur' },
    { district: 'Kurnool', zone: 'South', risk: 'high', daysToSLA: 2, officer: 'DC - Kurnool' },
    { district: 'Krishna', zone: 'Central', risk: 'medium', daysToSLA: 5, officer: 'ILM - Krishna' }
  ];

  const progressData = [
    { category: 'Registered', value: 1247, color: 'hsl(var(--primary))' },
    { category: 'Compounding', value: 158, color: 'hsl(var(--warning))' },
    { category: 'Pending', value: 89, color: 'hsl(var(--destructive))' }
  ];

  const monthlyTrends = [
    { month: 'Jan', verifications: 145, revenue: 485000, sla: 89 },
    { month: 'Feb', verifications: 152, revenue: 520000, sla: 91 },
    { month: 'Mar', verifications: 168, revenue: 575000, sla: 87 },
    { month: 'Apr', verifications: 159, revenue: 540000, sla: 93 },
    { month: 'May', verifications: 174, revenue: 595000, sla: 88 },
    { month: 'Jun', verifications: 189, revenue: 645000, sla: 92 }
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
          <h1 className="text-3xl font-bold text-foreground">Verification & Inspection Analytics</h1>
          <p className="text-muted-foreground">Real-time performance monitoring and analytics</p>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <label className="text-sm font-medium mb-2 block">Mandal (Optional)</label>
              <Select value={filters.mandal} onValueChange={(value) => handleFilterChange('mandal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Mandal" />
                </SelectTrigger>
                <SelectContent>
                  {mandals.map(mandal => (
                    <SelectItem key={mandal} value={mandal.toLowerCase().replace(/\s+/g, '-')}>
                      {mandal}
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
                    {filters.startDate ? format(filters.startDate, "PPP") : "Pick date"}
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
                    {filters.endDate ? format(filters.endDate, "PPP") : "Pick date"}
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
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">Total Verification Fee</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{verificationStats.totalFee.toLocaleString()}</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Stamping: ₹{verificationStats.stampingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Compounding: ₹{verificationStats.compoundingFee.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">Total Cases</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{verificationStats.totalCases.toLocaleString()}</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Certificates Issued: {verificationStats.certificatesIssued}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">SLA Performance</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round((verificationStats.withinSLA / (verificationStats.withinSLA + verificationStats.beyondSLA)) * 100)}%
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-success">Within SLA: {verificationStats.withinSLA}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-destructive">Beyond SLA: {verificationStats.beyondSLA}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-success mr-2" />
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">+12.5%</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Verifications up 8.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              District Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
                <Bar dataKey="rejected" fill="hsl(var(--destructive))" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Verification Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="verifications" stroke="hsl(var(--primary))" />
                <Line type="monotone" dataKey="sla" stroke="hsl(var(--success))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SLA Heat Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              SLA Risk Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slaHeatmapData.map((item, index) => (
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
                    <p className="font-medium">{item.daysToSLA} days</p>
                    <p className="text-sm text-muted-foreground">to SLA breach</p>
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

export default VerificationInspectionDashboard;