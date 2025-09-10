import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  MapPin, 
  Camera, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  FileCheck,
  Navigation,
  Upload
} from "lucide-react";

const InspectorDashboard = () => {
  const navigate = useNavigate();

  const todayInspections = [
    { id: "INS001", business: "Krishna Trading Co.", type: "Weighbridge", location: "Vijayawada", time: "10:00 AM", status: "pending" },
    { id: "INS002", business: "Guntur Metals Ltd.", type: "Scale", location: "Guntur", time: "2:00 PM", status: "in_progress" },
    { id: "INS003", business: "Visakha Industries", type: "Petrol Pump", location: "Visakhapatnam", time: "4:00 PM", status: "scheduled" },
  ];

  const verifications = [
    { id: "VER001", business: "Tirupati Scales", expected: "50kg", observed: "49.8kg", status: "completed" },
    { id: "VER002", business: "Kadapa Instruments", expected: "100L", observed: "99.5L", status: "pending_review" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inspector Dashboard</h1>
            <p className="text-muted-foreground">
              Manage inspections, verifications, and field activities
            </p>
          </div>
          <Button onClick={() => navigate('/inspection/mobile')}>
            <Camera className="h-4 w-4 mr-2" />
            Mobile Inspection App
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Today's Inspections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-muted-foreground">Completed This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-muted-foreground">Pending Verifications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">87%</div>
              <div className="text-sm text-muted-foreground">Compliance Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Inspections */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayInspections.map(inspection => (
                <Card key={inspection.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ClipboardList className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{inspection.business}</h3>
                          <p className="text-sm text-muted-foreground">{inspection.type} • {inspection.time}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span className="text-xs">{inspection.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(inspection.status)}>
                          {inspection.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/inspection/${inspection.id}/start`)}>
                            <Navigation className="h-3 w-3 mr-1" />
                            Navigate
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/inspection/${inspection.id}/checklist`)}>
                            Start
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verifications.map(verification => (
                <Card key={verification.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{verification.business}</h3>
                          <p className="text-sm text-muted-foreground">
                            Expected: {verification.expected} • Observed: {verification.observed}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Auto-error: {Math.abs(parseFloat(verification.expected) - parseFloat(verification.observed)).toFixed(1)}% variance
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(verification.status)}>
                          {verification.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" onClick={() => navigate(`/verification/${verification.id}/evidence`)}>
                            <Upload className="h-3 w-3 mr-1" />
                            Upload Evidence
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mobile Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20" onClick={() => navigate('/inspection/checklist')}>
            <div className="text-center">
              <ClipboardList className="h-6 w-6 mx-auto mb-2" />
              <span>Inspection Checklist</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20" onClick={() => navigate('/verification/mobile')}>
            <div className="text-center">
              <FileCheck className="h-6 w-6 mx-auto mb-2" />
              <span>Mobile Verification</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20" onClick={() => navigate('/gps/capture')}>
            <div className="text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2" />
              <span>GPS Capture</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboard;