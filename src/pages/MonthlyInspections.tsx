import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Target
} from "lucide-react";

const MonthlyInspections = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("december_2024");
  const [inspectorFilter, setInspectorFilter] = useState("all");

  // Mock data for the month
  const monthlyData = {
    month: "December 2024",
    totalInspections: 164,
    completedInspections: 148,
    pendingInspections: 16,
    complianceRate: 90.2,
    totalRevenue: 1450000,
    targetAchievement: 92.3,
    averageInspectionTime: 2.8
  };

  const weeklyBreakdown = [
    { week: "Week 1", dates: "Dec 1-7", scheduled: 42, completed: 40, pending: 2, revenue: 380000, compliance: 92 },
    { week: "Week 2", dates: "Dec 8-14", scheduled: 38, completed: 35, pending: 3, revenue: 320000, compliance: 88 },
    { week: "Week 3", dates: "Dec 15-21", scheduled: 45, completed: 42, pending: 3, revenue: 425000, compliance: 91 },
    { week: "Week 4", dates: "Dec 22-28", scheduled: 39, completed: 31, pending: 8, revenue: 325000, compliance: 89 }
  ];

  const inspectorMonthlyPerformance = [
    {
      name: "Rajesh Kumar",
      scheduled: 45,
      completed: 42,
      pending: 3,
      complianceRate: 92,
      revenue: 485000,
      districts: ["Krishna", "Guntur"],
      avgTime: 2.5,
      trend: "up",
      targetAchievement: 95.6
    },
    {
      name: "Priya Sharma",
      scheduled: 38,
      completed: 35,
      pending: 3,
      complianceRate: 88,
      revenue: 420000,
      districts: ["Guntur", "Prakasam"],
      avgTime: 3.1,
      trend: "up",
      targetAchievement: 87.5
    },
    {
      name: "Suresh Reddy",
      scheduled: 52,
      completed: 50,
      pending: 2,
      complianceRate: 95,
      revenue: 365000,
      districts: ["Krishna", "West Godavari"],
      avgTime: 2.2,
      trend: "stable",
      targetAchievement: 98.1
    },
    {
      name: "Amit Patel",
      scheduled: 29,
      completed: 21,
      pending: 8,
      complianceRate: 85,
      revenue: 180000,
      districts: ["Visakhapatnam", "Vizianagaram"],
      avgTime: 3.5,
      trend: "down",
      targetAchievement: 72.4
    }
  ];

  const districtPerformance = [
    { district: "Krishna", inspections: 58, compliance: 93, revenue: 520000, inspectors: 2 },
    { district: "Guntur", inspections: 42, compliance: 89, revenue: 445000, inspectors: 2 },
    { district: "Visakhapatnam", inspections: 31, compliance: 85, revenue: 285000, inspectors: 1 },
    { district: "Prakasam", inspections: 18, compliance: 91, revenue: 125000, inspectors: 1 },
    { district: "West Godavari", inspections: 15, compliance: 94, revenue: 75000, inspectors: 1 }
  ];

  const monthlyTrends = [
    { metric: "Total Inspections", current: 164, previous: 152, change: 7.9 },
    { metric: "Compliance Rate", current: 90.2, previous: 88.5, change: 1.9 },
    { metric: "Revenue Generated", current: 1450000, previous: 1320000, change: 9.8 },
    { metric: "Avg Inspection Time", current: 2.8, previous: 3.1, change: -9.7 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-yellow-600 rounded-full" />;
    }
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-yellow-600";
  };

  const getPerformanceColor = (achievement: number) => {
    if (achievement >= 95) return "text-green-600";
    if (achievement >= 85) return "text-blue-600";
    if (achievement >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/supervisor-dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Monthly Inspections</h1>
              <p className="text-muted-foreground">
                Comprehensive monthly performance analysis - {monthlyData.month}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="december_2024">December 2024</SelectItem>
                <SelectItem value="november_2024">November 2024</SelectItem>
                <SelectItem value="october_2024">October 2024</SelectItem>
                <SelectItem value="september_2024">September 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{monthlyData.totalInspections}</div>
              <div className="text-sm text-muted-foreground">Total Inspections</div>
              <div className="text-xs text-green-600 mt-1">+7.9% from last month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{monthlyData.complianceRate}%</div>
              <div className="text-sm text-muted-foreground">Compliance Rate</div>
              <div className="text-xs text-green-600 mt-1">+1.9% from last month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">₹{(monthlyData.totalRevenue / 100000).toFixed(1)}L</div>
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
              <div className="text-xs text-green-600 mt-1">+9.8% from last month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{monthlyData.targetAchievement}%</div>
              <div className="text-sm text-muted-foreground">Target Achievement</div>
              <div className="text-xs text-blue-600 mt-1">Above target</div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">{trend.metric}</div>
                  <div className="text-2xl font-bold mt-1">
                    {trend.metric === "Revenue Generated" 
                      ? `₹${(trend.current / 100000).toFixed(1)}L`
                      : trend.metric === "Avg Inspection Time"
                      ? `${trend.current}h`
                      : trend.metric === "Compliance Rate"
                      ? `${trend.current}%`
                      : trend.current
                    }
                  </div>
                  <div className={`text-sm mt-1 ${getChangeColor(trend.change)}`}>
                    {trend.change > 0 ? '+' : ''}{trend.change}% vs last month
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyBreakdown.map((week, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">{week.week}</div>
                        <div className="text-sm text-muted-foreground">{week.dates}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{(week.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">{week.compliance}% compliance</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{week.scheduled}</div>
                        <div className="text-muted-foreground">Scheduled</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{week.completed}</div>
                        <div className="text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-600">{week.pending}</div>
                        <div className="text-muted-foreground">Pending</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* District Performance */}
          <Card>
            <CardHeader>
              <CardTitle>District Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtPerformance.map((district, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold">{district.district}</div>
                      <div className="text-sm text-muted-foreground">{district.inspectors} inspector(s)</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-bold">{district.inspections}</div>
                        <div className="text-muted-foreground">Inspections</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{district.compliance}%</div>
                        <div className="text-muted-foreground">Compliance</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-600">₹{(district.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspector Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Inspector Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspectorMonthlyPerformance.map((inspector, index) => (
                <Card key={index} className="hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{inspector.name}</h3>
                            {getTrendIcon(inspector.trend)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Districts: {inspector.districts.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getPerformanceColor(inspector.targetAchievement)}`}>
                          {inspector.targetAchievement}%
                        </div>
                        <div className="text-sm text-muted-foreground">Target Achievement</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{inspector.scheduled}</div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{inspector.completed}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{inspector.complianceRate}%</div>
                        <div className="text-sm text-muted-foreground">Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">₹{(inspector.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{inspector.avgTime}h</div>
                        <div className="text-sm text-muted-foreground">Avg Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyInspections;