import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

const WeeklyInspections = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [inspectorFilter, setInspectorFilter] = useState("all");

  // Mock data for the week
  const weeklyData = {
    weekStart: "Dec 16, 2024",
    weekEnd: "Dec 22, 2024",
    totalInspections: 28,
    completedInspections: 22,
    pendingInspections: 6,
    complianceRate: 89,
    totalRevenue: 245000
  };

  const dailyBreakdown = [
    { day: "Monday", date: "Dec 16", scheduled: 6, completed: 5, pending: 1, revenue: 45000 },
    { day: "Tuesday", date: "Dec 17", scheduled: 4, completed: 4, pending: 0, revenue: 38000 },
    { day: "Wednesday", date: "Dec 18", scheduled: 5, completed: 3, pending: 2, revenue: 32000 },
    { day: "Thursday", date: "Dec 19", scheduled: 7, completed: 6, pending: 1, revenue: 55000 },
    { day: "Friday", date: "Dec 20", scheduled: 4, completed: 2, pending: 2, revenue: 28000 },
    { day: "Saturday", date: "Dec 21", scheduled: 2, completed: 2, pending: 0, revenue: 25000 },
    { day: "Sunday", date: "Dec 22", scheduled: 0, completed: 0, pending: 0, revenue: 0 }
  ];

  const inspectorWeeklyPerformance = [
    {
      name: "Rajesh Kumar",
      scheduled: 8,
      completed: 7,
      pending: 1,
      complianceRate: 92,
      revenue: 85000,
      districts: ["Krishna", "Guntur"]
    },
    {
      name: "Priya Sharma",
      scheduled: 7,
      completed: 6,
      pending: 1,
      complianceRate: 88,
      revenue: 72000,
      districts: ["Guntur", "Prakasam"]
    },
    {
      name: "Suresh Reddy",
      scheduled: 9,
      completed: 7,
      pending: 2,
      complianceRate: 95,
      revenue: 68000,
      districts: ["Krishna", "West Godavari"]
    },
    {
      name: "Amit Patel",
      scheduled: 4,
      completed: 2,
      pending: 2,
      complianceRate: 85,
      revenue: 20000,
      districts: ["Visakhapatnam"]
    }
  ];

  const weeklyInspections = [
    {
      id: 1,
      day: "Monday",
      date: "Dec 16",
      businessName: "Krishna Trading Co.",
      inspector: "Rajesh Kumar",
      type: "Routine",
      status: "Completed",
      district: "Krishna",
      time: "09:00 AM"
    },
    {
      id: 2,
      day: "Monday",
      date: "Dec 16",
      businessName: "Guntur Metals",
      inspector: "Priya Sharma",
      type: "Compliance",
      status: "Completed",
      district: "Guntur",
      time: "02:00 PM"
    },
    {
      id: 3,
      day: "Tuesday",
      date: "Dec 17",
      businessName: "Vijayawada Scales",
      inspector: "Suresh Reddy",
      type: "Follow-up",
      status: "Completed",
      district: "Krishna",
      time: "11:30 AM"
    },
    {
      id: 4,
      day: "Wednesday",
      date: "Dec 18",
      businessName: "Visakha Industries",
      inspector: "Amit Patel",
      type: "Annual",
      status: "Pending",
      district: "Visakhapatnam",
      time: "10:00 AM"
    },
    {
      id: 5,
      day: "Thursday",
      date: "Dec 19",
      businessName: "Tirupati Systems",
      inspector: "Rajesh Kumar",
      type: "Renewal",
      status: "Completed",
      district: "Chittoor",
      time: "03:00 PM"
    }
  ];

  const getCompletionRate = (completed: number, scheduled: number) => {
    return scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Pending':
        return 'destructive';
      case 'In Progress':
        return 'secondary';
      default:
        return 'outline';
    }
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
              <h1 className="text-3xl font-bold text-foreground">Weekly Inspections</h1>
              <p className="text-muted-foreground">
                Week of {weeklyData.weekStart} - {weeklyData.weekEnd}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={inspectorFilter} onValueChange={setInspectorFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by inspector" />
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
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{weeklyData.totalInspections}</div>
              <div className="text-sm text-muted-foreground">Total Inspections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{weeklyData.completedInspections}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">{weeklyData.pendingInspections}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{weeklyData.complianceRate}%</div>
              <div className="text-sm text-muted-foreground">Compliance Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">₹{(weeklyData.totalRevenue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Breakdown */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyBreakdown.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-semibold">{day.day}</div>
                          <div className="text-sm text-muted-foreground">{day.date}</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{day.scheduled}</div>
                            <div className="text-xs text-muted-foreground">Scheduled</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{day.completed}</div>
                            <div className="text-xs text-muted-foreground">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">{day.pending}</div>
                            <div className="text-xs text-muted-foreground">Pending</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{(day.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">
                          {getCompletionRate(day.completed, day.scheduled)}% Complete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inspector Performance */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Inspector Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspectorWeeklyPerformance.map((inspector, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">{inspector.name}</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Scheduled: {inspector.scheduled}</div>
                        <div>Completed: {inspector.completed}</div>
                        <div>Pending: {inspector.pending}</div>
                        <div>Rate: {inspector.complianceRate}%</div>
                      </div>
                      <div className="mt-2 text-sm font-medium">
                        Revenue: ₹{(inspector.revenue / 1000).toFixed(0)}K
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        Districts: {inspector.districts.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Inspections List */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Inspections Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyInspections.map((inspection) => (
                <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-semibold">{inspection.day}</div>
                      <div className="text-sm text-muted-foreground">{inspection.date}</div>
                    </div>
                    <div>
                      <div className="font-semibold">{inspection.businessName}</div>
                      <div className="text-sm text-muted-foreground">
                        {inspection.inspector} • {inspection.district} • {inspection.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{inspection.type}</Badge>
                    <Badge variant={getStatusColor(inspection.status) as any}>
                      {inspection.status}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/inspection-details?id=${inspection.id}`)}>
                      View
                    </Button>
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

export default WeeklyInspections;