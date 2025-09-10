import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Calendar, MapPin, User, Building, Phone, Mail, Download, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import AIReportGenerator from "@/components/AIReportGenerator";

const LicenseDetails = () => {
  const navigate = useNavigate();
  const { licenseId } = useParams();

  const licenseData = {
    id: licenseId || "LIC001",
    applicant: "Rajesh Kumar",
    businessName: "Krishna Trading Co.",
    type: "Dealer License",
    district: "Krishna",
    status: "approved",
    dateApplied: "2024-01-15",
    validUntil: "2026-01-15",
    feeStatus: "paid",
    amount: "₹15,000"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Licenses
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">License Details</h1>
            <p className="text-muted-foreground">License {licenseData.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>License Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License ID</label>
                  <p className="font-medium">{licenseData.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="font-medium">{licenseData.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Applicant</label>
                  <p className="font-medium">{licenseData.applicant}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business</label>
                  <p className="font-medium">{licenseData.businessName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status & Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge className="bg-success/20 text-success border-success/30">Approved</Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fee Amount</label>
                <p className="text-2xl font-bold">{licenseData.amount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <AIReportGenerator 
          title="License AI Analysis"
          description="Generate AI-powered insights for this license"
        />
      </div>
      <Footer />
    </div>
  );
};

export default LicenseDetails;