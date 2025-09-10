import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  TrendingUp,
  Brain,
  Target,
  AlertCircle,
  Download,
  Calendar,
  Filter,
  Zap,
  TrendingDown,
  Eye,
  FileBarChart,
  Users,
  Clock,
  MapPin,
  Activity,
  Building,
  FileCheck
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import apGovtLogo from '@/assets/ap-govt-logo.png';
import garudalyticsLogo from '@/assets/garudalytics-logo.png';
import reportQRCode from '@/assets/report-qr-code.png';
import apDistrictsMap from '@/assets/ap-districts-map.png';
import AIReportGenerator from '@/components/AIReportGenerator';
import VerificationInspectionDashboard from '@/components/VerificationInspectionDashboard';
import LicenseRegistrationDashboard from '@/components/LicenseRegistrationDashboard';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const monthlyData = [
    { month: 'Jan', applications: 120, approved: 95, revenue: 240000 },
    { month: 'Feb', applications: 135, approved: 108, revenue: 280000 },
    { month: 'Mar', applications: 148, approved: 125, revenue: 320000 },
    { month: 'Apr', applications: 142, approved: 119, revenue: 295000 },
    { month: 'May', applications: 156, approved: 132, revenue: 340000 },
    { month: 'Jun', applications: 164, approved: 141, revenue: 380000 },
  ];

  const districtData = [
    { name: 'Visakhapatnam', value: 35, color: '#16a34a' },
    { name: 'Guntur', value: 28, color: '#eab308' },
    { name: 'Krishna', value: 22, color: '#3b82f6' },
    { name: 'West Godavari', value: 15, color: '#f97316' },
  ];

  const applicationTypes = [
    { type: 'Weighing Scale', count: 45, percentage: 38 },
    { type: 'Fuel Pump', count: 32, percentage: 27 },
    { type: 'Gas Meter', count: 25, percentage: 21 },
    { type: 'Other', count: 16, percentage: 14 },
  ];

  const aiInsights = [
    {
      title: "Processing Time Anomaly",
      description: "Weighing scale applications taking 2.3x longer than normal in Krishna district",
      severity: "high",
      recommendation: "Review officer workload and consider redistribution",
      confidence: 92,
      trend: "increasing",
      impact: "High processing delays affecting SLA compliance"
    },
    {
      title: "Revenue Optimization",
      description: "Fuel pump verifications show 15% revenue increase potential",
      severity: "medium", 
      recommendation: "Focus inspection efforts on fuel pump compliance",
      confidence: 87,
      trend: "stable",
      impact: "Potential revenue increase of ₹2.8L monthly"
    },
    {
      title: "Seasonal Pattern Detected",
      description: "Application submissions increase by 23% during harvest season",
      severity: "low",
      recommendation: "Prepare additional resources for Oct-Dec period",
      confidence: 96,
      trend: "seasonal",
      impact: "Resource planning optimization needed"
    },
    {
      title: "Inspector Efficiency Gap",
      description: "Performance variance of 35% detected between top and bottom performers",
      severity: "medium",
      recommendation: "Implement targeted training programs",
      confidence: 89,
      trend: "stable",
      impact: "Standardization needed for consistent service delivery"
    },
    {
      title: "Compliance Risk Alert",
      description: "3 districts showing declining compliance rates over past 2 months",
      severity: "high",
      recommendation: "Immediate intervention required in Nellore, Kurnool, Anantapur",
      confidence: 94,
      trend: "declining",
      impact: "Regulatory compliance at risk"
    }
  ];

  const performanceMetrics = [
    { metric: "Avg Processing Time", value: "8.5 days", target: "7 days", status: "warning", change: "+12%" },
    { metric: "SLA Compliance", value: "87%", target: "90%", status: "warning", change: "-3%" },
    { metric: "Approval Rate", value: "84%", target: "80%", status: "success", change: "+4%" },
    { metric: "Revenue Target", value: "81%", target: "75%", status: "success", change: "+6%" },
    { metric: "Digital Adoption", value: "73%", target: "80%", status: "warning", change: "+18%" },
    { metric: "Customer Satisfaction", value: "4.2/5", target: "4.0/5", status: "success", change: "+5%" }
  ];

  const predictiveData = [
    { month: 'Jul', predicted: 178, actual: 164 },
    { month: 'Aug', predicted: 185, actual: 179 },
    { month: 'Sep', predicted: 192, actual: 188 },
    { month: 'Oct', predicted: 210, actual: null },
    { month: 'Nov', predicted: 228, actual: null },
    { month: 'Dec', predicted: 245, actual: null },
  ];

  const inspectorEfficiency = [
    { name: 'Quality', ravi: 85, lakshmi: 92, suresh: 88 },
    { name: 'Speed', ravi: 78, lakshmi: 95, suresh: 90 },
    { name: 'Compliance', ravi: 90, lakshmi: 89, suresh: 95 },
    { name: 'Communication', ravi: 82, lakshmi: 91, suresh: 87 },
    { name: 'Documentation', ravi: 88, lakshmi: 94, suresh: 92 },
  ];

  const complianceData = [
    { district: 'Visakhapatnam', current: 94, target: 90, trend: 'up' },
    { district: 'Guntur', current: 89, target: 90, trend: 'stable' },
    { district: 'Krishna', current: 92, target: 90, trend: 'up' },
    { district: 'West Godavari', current: 87, target: 90, trend: 'down' },
    { district: 'Nellore', current: 82, target: 90, trend: 'down' },
    { district: 'Kurnool', current: 79, target: 90, trend: 'down' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-primary bg-primary/5";
      default: return "border-l-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full">
      {/* Report Header with Logos */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img src={apGovtLogo} alt="Government of Andhra Pradesh" className="h-16 w-16" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Government of Andhra Pradesh</h1>
              <p className="text-sm text-muted-foreground">Legal Metrology Department - Comprehensive Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Powered by</p>
              <p className="font-medium">Garudalytics Portal</p>
            </div>
            <img src={garudalyticsLogo} alt="Garudalytics" className="h-16 w-16" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center">
            <img src={reportQRCode} alt="Report QR Code" className="h-20 w-20 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Scan for verification</p>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Enhanced Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              District-wise performance monitoring with AI insights
            </p>
          </div>
          <div className="text-center">
            <img src={apDistrictsMap} alt="AP Districts Map" className="h-20 w-32 mx-auto mb-2 rounded" />
            <p className="text-xs text-muted-foreground">26 Districts Coverage</p>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Verification & Inspection</span>
          </TabsTrigger>
          <TabsTrigger value="licensing" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Licenses & Registration</span>
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2 md:space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {performanceMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{metric.metric}</p>
                    <div className="flex items-center space-x-1">
                      <Target className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                      {metric.change && (
                        <span className={`text-xs font-medium ${
                          metric.change.startsWith('+') && metric.status === 'success' ? 'text-success' :
                          metric.change.startsWith('-') ? 'text-destructive' : 'text-warning'
                        }`}>
                          {metric.change}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Monthly Application Trends</span>
                  <Badge variant="secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    AI Enhanced
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="hsl(var(--primary))" name="Applications" />
                    <Bar dataKey="approved" fill="hsl(var(--success))" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Predictive Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Predictive Trends</span>
                  <Badge variant="secondary">
                    <Activity className="h-3 w-3 mr-1" />
                    93% Accuracy
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={predictiveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      value ? value : 'Predicted', 
                      name === 'predicted' ? 'AI Prediction' : 'Actual'
                    ]} />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      name="Actual Data"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(var(--accent))' }}
                      name="AI Prediction"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Revenue Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value?.toLocaleString()}`, 'Revenue']} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Inspector Performance Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Inspector Efficiency Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={inspectorEfficiency}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Ravi Kumar"
                      dataKey="ravi"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Lakshmi Prasad"
                      dataKey="lakshmi"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success))"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Suresh Babu"
                      dataKey="suresh"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent))"
                      fillOpacity={0.2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Verification & Inspection Tab */}
        <TabsContent value="verification">
          <VerificationInspectionDashboard />
        </TabsContent>

        {/* Licenses & Registration Tab */}
        <TabsContent value="licensing">
          <LicenseRegistrationDashboard />
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          {/* AI Insights Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <Card key={index} className={`border-l-4 ${getSeverityColor(insight.severity)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {insight.confidence}% confidence
                      </Badge>
                      <p className="text-xs text-muted-foreground">{insight.trend}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Recommendation:</strong> {insight.recommendation}
                    </div>
                    <div className="text-sm">
                      <strong>Impact:</strong> {insight.impact}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <AIReportGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;