import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Download,
  Calendar
} from "lucide-react";

const PerformanceReports = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("this_month");
  const [inspectorFilter, setInspectorFilter] = useState("all");

  const performanceData = [
    {
      inspector: "Rajesh Kumar",
      totalInspections: 45,
      completedInspections: 42,
      pendingInspections: 3,
      complianceRate: 92,
      avgTimePerInspection: 2.5,
      penaltiesIssued: 8,
      revenueCollected: 125000,
      rating: 4.5,
      trend: "up"
    },
    {
      inspector: "Priya Sharma",
      totalInspections: 38,
      completedInspections: 35,
      pendingInspections: 3,
      complianceRate: 88,
      avgTimePerInspection: 3.1,
      penaltiesIssued: 12,
      revenueCollected: 180000,
      rating: 4.2,
      trend: "up"
    },
    {
      inspector: "Suresh Reddy",
      totalInspections: 52,
      completedInspections: 50,
      pendingInspections: 2,
      complianceRate: 95,
      avgTimePerInspection: 2.2,
      penaltiesIssued: 6,
      revenueCollected: 95000,
      rating: 4.8,
      trend: "stable"
    },
    {
      inspector: "Amit Patel",
      totalInspections: 29,
      completedInspections: 26,
      pendingInspections: 3,
      complianceRate: 85,
      avgTimePerInspection: 3.5,
      penaltiesIssued: 15,
      revenueCollected: 210000,
      rating: 3.9,
      trend: "down"
    }
  ];

  const overallStats = {
    totalInspectors: 4,
    totalInspections: 164,
    avgComplianceRate: 90,
    totalRevenue: 610000,
    avgRating: 4.35
  };

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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
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
              <h1 className="text-3xl font-bold text-foreground">Performance Reports</h1>
              <p className="text-muted-foreground">
                Inspector performance analytics and metrics
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_quarter">This Quarter</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={inspectorFilter} onValueChange={setInspectorFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select inspector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Inspectors</SelectItem>
              <SelectItem value="rajesh_kumar">Rajesh Kumar</SelectItem>
              <SelectItem value="priya_sharma">Priya Sharma</SelectItem>
              <SelectItem value="suresh_reddy">Suresh Reddy</SelectItem>
              <SelectItem value="amit_patel">Amit Patel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{overallStats.totalInspectors}</div>
              <div className="text-sm text-muted-foreground">Active Inspectors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{overallStats.totalInspections}</div>
              <div className="text-sm text-muted-foreground">Total Inspections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{overallStats.avgComplianceRate}%</div>
              <div className="text-sm text-muted-foreground">Avg Compliance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">₹{(overallStats.totalRevenue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">⭐ {overallStats.avgRating}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Details */}
        <Card>
          <CardHeader>
            <CardTitle>Inspector Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((inspector, index) => (
                <Card key={index} className="hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{inspector.inspector}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{inspector.totalInspections} Total</Badge>
                            <Badge variant="secondary">{inspector.completedInspections} Completed</Badge>
                            {inspector.pendingInspections > 0 && (
                              <Badge variant="destructive">{inspector.pendingInspections} Pending</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          {getTrendIcon(inspector.trend)}
                          <span className={`text-2xl font-bold ${getRatingColor(inspector.rating)}`}>
                            {inspector.rating}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/inspector/${inspector.inspector}/details`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{inspector.complianceRate}%</div>
                        <div className="text-sm text-muted-foreground">Compliance Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{inspector.avgTimePerInspection}h</div>
                        <div className="text-sm text-muted-foreground">Avg Time/Inspection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{inspector.penaltiesIssued}</div>
                        <div className="text-sm text-muted-foreground">Penalties Issued</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">₹{(inspector.revenueCollected / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">Revenue Generated</div>
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

export default PerformanceReports;