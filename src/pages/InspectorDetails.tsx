import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Phone, Mail, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const InspectorDetails = () => {
  const navigate = useNavigate();

  const inspectors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      designation: "Senior Inspector",
      district: "Krishna",
      phone: "+91 9876543210",
      email: "rajesh.kumar@ap.gov.in",
      status: "Active",
      inspections: 45,
      pending: 3,
      completed: 42,
      joinDate: "2020-03-15",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Priya Sharma",
      designation: "Inspector",
      district: "Guntur",
      phone: "+91 9876543211",
      email: "priya.sharma@ap.gov.in",
      status: "Active",
      inspections: 38,
      pending: 2,
      completed: 36,
      joinDate: "2021-07-22",
      lastActivity: "1 hour ago"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      designation: "Inspector",
      district: "Visakhapatnam",
      phone: "+91 9876543212",
      email: "suresh.reddy@ap.gov.in",
      status: "On Leave",
      inspections: 29,
      pending: 0,
      completed: 29,
      joinDate: "2019-11-08",
      lastActivity: "3 days ago"
    }
  ];

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
            <h1 className="text-3xl font-bold text-foreground">Active Inspectors</h1>
            <p className="text-muted-foreground">
              Manage and monitor field inspection officers
            </p>
          </div>
        </div>

        {/* Inspector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectors.map((inspector) => (
            <Card key={inspector.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback>{inspector.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{inspector.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{inspector.designation}</p>
                  </div>
                  <Badge variant={inspector.status === 'Active' ? 'default' : 'secondary'}>
                    {inspector.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{inspector.district} District</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{inspector.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="truncate">{inspector.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-lg font-semibold text-foreground">{inspector.inspections}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-2">
                    <div className="text-lg font-semibold text-orange-600">{inspector.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 rounded-lg p-2">
                    <div className="text-lg font-semibold text-green-600">{inspector.completed}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined {inspector.joinDate}
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                      {inspector.lastActivity}
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InspectorDetails;