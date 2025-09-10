import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, User, MapPin, Phone, Mail, Calendar, Building, Download, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const application = {
    id: "AP001",
    businessName: "Krishna Trading Co.",
    type: "New License",
    status: "pending",
    date: "2024-12-10",
    applicant: "Rajesh Kumar",
    district: "Krishna",
    priority: "high",
    phone: "+91 9876543210",
    email: "rajesh@krishnatrading.com",
    address: "123 Main Street, Vijayawada, Krishna District",
    businessType: "Retail & Markets",
    licenseType: "Weighing Instruments",
    selectedTradeType: "Kirana & General Stores",
    description: "Application for new weighing instruments license for retail operations",
    documents: ["business_registration.pdf", "pan_card.pdf", "address_proof.pdf"]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/applications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Application Details</h1>
            <p className="text-muted-foreground">
              {application.businessName} - {application.id}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/applications/${id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Information
                </CardTitle>
                {getStatusBadge(application.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Application ID</h4>
                  <p className="text-lg font-medium">{application.id}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Application Type</h4>
                  <p className="text-lg">{application.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">License Type</h4>
                  <p className="text-lg">{application.licenseType}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Trade Type</h4>
                  <p className="text-lg">{application.selectedTradeType}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Business Type</h4>
                  <p className="text-lg">{application.businessType}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Priority</h4>
                  <Badge variant={application.priority === 'high' ? 'destructive' : 'secondary'}>
                    {application.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
                <p>{application.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Business Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Applicant Name</h4>
                  <p className="font-medium">{application.applicant}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{application.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{application.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm">{application.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Business Name</h4>
                  <p className="font-medium">{application.businessName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">District</h4>
                  <p>{application.district}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Applied on {application.date}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{doc}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationDetails;