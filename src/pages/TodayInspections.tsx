import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  MapPin,
  User,
  Building,
  Phone,
  AlertTriangle,
  CheckCircle,
  Timer,
  Play
} from "lucide-react";

const TodayInspections = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("all");

  const todayInspections = [
    {
      id: 1,
      businessName: "Krishna Trading Co.",
      address: "Main Road, Machilipatnam",
      inspector: "Rajesh Kumar",
      scheduledTime: "09:00 AM",
      actualStartTime: "09:15 AM",
      type: "Weighing Scale Verification",
      status: "Completed",
      district: "Krishna",
      priority: "Medium",
      contactNumber: "+91 98765 43210",
      duration: "2.5 hours",
      complianceStatus: "Compliant",
      estimatedDuration: "2 hours"
    },
    {
      id: 2,
      businessName: "Guntur Metals Ltd.",
      address: "Industrial Area, Guntur",
      inspector: "Priya Sharma",
      scheduledTime: "10:30 AM",
      actualStartTime: "10:30 AM",
      type: "Compliance Check",
      status: "In Progress",
      district: "Guntur",
      priority: "High",
      contactNumber: "+91 98765 43211",
      duration: "1.5 hours (ongoing)",
      complianceStatus: "Under Review",
      estimatedDuration: "3 hours"
    },
    {
      id: 3,
      businessName: "Vijayawada Scales",
      address: "Commercial Street, Vijayawada",
      inspector: "Suresh Reddy",
      scheduledTime: "2:00 PM",
      actualStartTime: null,
      type: "Annual Inspection",
      status: "Scheduled",
      district: "Krishna",
      priority: "High",
      contactNumber: "+91 98765 43212",
      duration: null,
      complianceStatus: "Pending",
      estimatedDuration: "2.5 hours"
    },
    {
      id: 4,
      businessName: "Tirupati Weighing Systems",
      address: "Temple Street, Tirupati",
      inspector: "Amit Patel",
      scheduledTime: "3:30 PM",
      actualStartTime: null,
      type: "Follow-up Inspection",
      status: "Scheduled",
      district: "Chittoor",
      priority: "Medium",
      contactNumber: "+91 98765 43213",
      duration: null,
      complianceStatus: "Pending",
      estimatedDuration: "1.5 hours"
    },
    {
      id: 5,
      businessName: "Visakha Port Scales",
      address: "Port Area, Visakhapatnam",
      inspector: "Rajesh Kumar",
      scheduledTime: "11:00 AM",
      actualStartTime: "11:45 AM",
      type: "Urgent Inspection",
      status: "Delayed",
      district: "Visakhapatnam",
      priority: "High",
      contactNumber: "+91 98765 43214",
      duration: null,
      complianceStatus: "Pending",
      estimatedDuration: "2 hours"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Scheduled':
        return 'outline';
      case 'Delayed':
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Timer className="h-4 w-4 text-blue-600" />;
      case 'Scheduled':
        return <Clock className="h-4 w-4 text-gray-600" />;
      case 'Delayed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const completedCount = todayInspections.filter(i => i.status === 'Completed').length;
  const inProgressCount = todayInspections.filter(i => i.status === 'In Progress').length;
  const scheduledCount = todayInspections.filter(i => i.status === 'Scheduled').length;
  const delayedCount = todayInspections.filter(i => i.status === 'Delayed').length;

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
              <h1 className="text-3xl font-bold text-foreground">Today's Inspections</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/schedule-inspection')}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <div className="text-2xl font-bold text-gray-600">{scheduledCount}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{delayedCount}</div>
              <div className="text-sm text-muted-foreground">Delayed</div>
            </CardContent>
          </Card>
        </div>

        {/* Inspections List */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Schedule for Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayInspections.map((inspection) => (
                <Card key={inspection.id} className="hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getStatusIcon(inspection.status)}
                          <h3 className="text-lg font-semibold">{inspection.businessName}</h3>
                          <Badge variant={getStatusColor(inspection.status) as any}>
                            {inspection.status}
                          </Badge>
                          <Badge variant={getPriorityColor(inspection.priority) as any}>
                            {inspection.priority}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{inspection.address}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{inspection.district} District</span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Inspector: {inspection.inspector}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{inspection.contactNumber}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Scheduled: {inspection.scheduledTime}</span>
                            </div>
                            {inspection.actualStartTime && (
                              <div className="flex items-center">
                                <Play className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Started: {inspection.actualStartTime}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Est. Duration: {inspection.estimatedDuration}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Type: </span>
                              <span className="text-xs">{inspection.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {inspection.status === 'Scheduled' && (
                          <Button size="sm" onClick={() => navigate(`/start-inspection?id=${inspection.id}`)}>
                            Start Inspection
                          </Button>
                        )}
                        {inspection.status === 'In Progress' && (
                          <Button size="sm" variant="secondary">
                            View Progress
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => navigate(`/inspection-details?id=${inspection.id}`)}>
                          View Details
                        </Button>
                        {inspection.status === 'Delayed' && (
                          <Button size="sm" variant="destructive">
                            Urgent Action
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {inspection.duration && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span>Duration: {inspection.duration}</span>
                          <span>Compliance: {inspection.complianceStatus}</span>
                        </div>
                      </div>
                    )}
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

export default TodayInspections;