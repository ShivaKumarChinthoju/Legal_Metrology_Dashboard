import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const ScheduledInspections = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState("all");

  const inspections = [
    {
      id: 1,
      businessName: "Krishna Trading Co.",
      address: "Main Road, Machilipatnam",
      inspector: "Rajesh Kumar",
      date: "2024-12-16",
      time: "10:00 AM",
      type: "Routine",
      status: "Scheduled",
      district: "Krishna",
      priority: "Medium"
    },
    {
      id: 2,
      businessName: "Guntur Metals Ltd.",
      address: "Industrial Area, Guntur",
      inspector: "Priya Sharma",
      date: "2024-12-16",
      time: "2:00 PM",
      type: "Compliance Check",
      status: "In Progress",
      district: "Guntur",
      priority: "High"
    },
    {
      id: 3,
      businessName: "Vijayawada Scales",
      address: "Commercial Street, Vijayawada",
      inspector: "Suresh Reddy",
      date: "2024-12-17",
      time: "11:30 AM",
      type: "Follow-up",
      status: "Scheduled",
      district: "Krishna",
      priority: "High"
    },
    {
      id: 4,
      businessName: "Visakha Industries",
      address: "Port Area, Visakhapatnam",
      inspector: "Amit Patel",
      date: "2024-12-17",
      time: "9:00 AM",
      type: "Routine",
      status: "Completed",
      district: "Visakhapatnam",
      priority: "Low"
    },
    {
      id: 5,
      businessName: "Tirupati Weighing Systems",
      address: "Temple Street, Tirupati",
      inspector: "Rajesh Kumar",
      date: "2024-12-18",
      time: "3:00 PM",
      type: "Renewal Inspection",
      status: "Scheduled",
      district: "Chittoor",
      priority: "Medium"
    }
  ];

  const filteredInspections = inspections.filter(inspection => {
    const matchesStatus = statusFilter === "all" || inspection.status.toLowerCase().replace(" ", "_") === statusFilter;
    return matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Routine':
        return 'default';
      case 'Compliance Check':
        return 'secondary';
      case 'Follow-up':
        return 'destructive';
      case 'Renewal Inspection':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scheduled Inspections</h1>
            <p className="text-muted-foreground">
              Manage and track scheduled field inspections
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
              <CardContent className="pt-0">
                <div className="mt-4 space-y-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inspections List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredInspections.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {inspection.businessName}
                        </h3>
                        <Badge variant={getStatusColor(inspection.status) as any}>
                          {inspection.status}
                        </Badge>
                        <Badge variant={getPriorityColor(inspection.priority) as any}>
                          {inspection.priority}
                        </Badge>
                        <Badge variant={getTypeColor(inspection.type) as any}>
                          {inspection.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{inspection.address}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{inspection.district} District</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span>Inspector: {inspection.inspector}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>{inspection.date}</span>
                            <Clock className="h-4 w-4 ml-4 mr-2" />
                            <span>{inspection.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/inspection-details?id=${inspection.id}&business=${encodeURIComponent(inspection.businessName)}&address=${encodeURIComponent(inspection.address)}&inspector=${encodeURIComponent(inspection.inspector)}`)}
                      >
                        View Details
                      </Button>
                      {inspection.status === 'Scheduled' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => navigate(`/start-inspection?id=${inspection.id}&business=${encodeURIComponent(inspection.businessName)}&address=${encodeURIComponent(inspection.address)}&inspector=${encodeURIComponent(inspection.inspector)}`)}
                        >
                          Start Inspection
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredInspections.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No inspections found</h3>
                  <p className="text-muted-foreground">
                    No inspections match the current filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScheduledInspections;