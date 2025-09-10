import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  IndianRupee,
  Calendar,
  Download
} from "lucide-react";
import ApiServiceV1 from '@/Utils/ApiServiceV1';

const ApplicantDashboard = () => {
  const navigate = useNavigate();

  const myApplications = [
    { id: "AP001", type: "Weighbridge Registration", status: "under_review", date: "2024-12-10", fee: "₹5,000" },
    { id: "AP003", type: "Scale Verification", status: "approved", date: "2024-12-08", fee: "₹2,500" },
    { id: "AP005", type: "Petrol Pump License", status: "pending", date: "2024-12-07", fee: "₹7,500" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'under_review': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

 

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applicant Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your applications and track status
            </p>
          </div>
          <Button onClick={() => navigate('/registration/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Services */}
        <Card>
          <CardHeader>
            <CardTitle>Available Registration Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Weighbridge", fee: "₹5,000", duration: "15 days" },
                { name: "Petrol Pump", fee: "₹7,500", duration: "20 days" },
                { name: "Scale", fee: "₹2,500", duration: "10 days" },
                { name: "Packer", fee: "₹3,000", duration: "12 days" },
                { name: "Importer", fee: "₹4,000", duration: "18 days" },
                { name: "Dealer", fee: "₹2,000", duration: "8 days" },
                { name: "Repairer", fee: "₹1,500", duration: "7 days" }
              ].map(service => (
                <Card key={service.name} className="hover:shadow-md cursor-pointer" onClick={() => navigate(`/registration/new?type=${service.name.toLowerCase()}`)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="h-3 w-3" />
                        <span>{service.fee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Applications */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.map(app => (
                <Card key={app.id} className="hover:shadow-md cursor-pointer" onClick={() => navigate(`/applications/${app.id}/details`)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(app.status)}
                        <div>
                          <h3 className="font-semibold">{app.type}</h3>
                          <p className="text-sm text-muted-foreground">ID: {app.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <p className="text-sm mt-1">{app.date}</p>
                        <p className="text-sm text-muted-foreground">{app.fee}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20" onClick={() => navigate('/verification/track')}>
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2" />
              <span>Track Verification</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20" onClick={() => navigate('/payment/history')}>
            <div className="text-center">
              <IndianRupee className="h-6 w-6 mx-auto mb-2" />
              <span>Payment History</span>
            </div>
          </Button>
          <Button variant="outline" className="h-20" onClick={() => navigate('/certificates')}>
            <div className="text-center">
              <Download className="h-6 w-6 mx-auto mb-2" />
              <span>Download Certificates</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;