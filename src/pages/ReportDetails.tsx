import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Calendar, MapPin, FileText, Share, Eye, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import apGovtLogo from '@/assets/ap-govt-logo.png';
import garudalyticsLogo from '@/assets/garudalytics-logo.png';
import reportQRCode from '@/assets/report-qr-code.png';
import jsPDF from 'jspdf';

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const report = {
    id: "RPT-001",
    title: "Monthly Inspection Report",
    type: "Inspection",
    status: "completed",
    date: "2024-01-28",
    district: "Visakhapatnam",
    description: "Comprehensive monthly inspection summary with compliance metrics and performance analysis",
    generatedBy: "System Administrator",
    approvedBy: "District Controller",
    totalPages: 45,
    fileSize: "2.4 MB",
    summary: {
      totalInspections: 156,
      completedInspections: 142,
      pendingInspections: 14,
      complianceRate: 91.2,
      averageScore: 8.7,
      keyFindings: [
        "Overall compliance rate improved by 5% compared to last month",
        "23 businesses received certification upgrades",
        "4 critical violations identified and resolved",
        "Implementation of new digital verification process shows 15% efficiency gain"
      ]
    },
    metrics: {
      inspection_efficiency: 94,
      business_compliance: 91,
      license_renewals: 87,
      fee_collection: 96
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    
    // Header with logos
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, 220, 50, 'F');
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('GOVERNMENT OF ANDHRA PRADESH', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Legal Metrology Department', 105, 30, { align: 'center' });
    doc.setFontSize(16);
    doc.text(report.title, 105, 45, { align: 'center' });

    // Report content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    let yPos = 70;
    doc.text(`Report ID: ${report.id}`, 20, yPos);
    yPos += 10;
    doc.text(`District: ${report.district}`, 20, yPos);
    yPos += 10;
    doc.text(`Generated Date: ${report.date}`, 20, yPos);
    yPos += 10;
    doc.text(`Status: ${report.status}`, 20, yPos);
    yPos += 20;

    // Summary section
    doc.setFont('helvetica', 'bold');
    doc.text('EXECUTIVE SUMMARY', 20, yPos);
    yPos += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Inspections: ${report.summary.totalInspections}`, 20, yPos);
    yPos += 10;
    doc.text(`Completed: ${report.summary.completedInspections}`, 20, yPos);
    yPos += 10;
    doc.text(`Compliance Rate: ${report.summary.complianceRate}%`, 20, yPos);
    yPos += 10;
    doc.text(`Average Score: ${report.summary.averageScore}/10`, 20, yPos);
    yPos += 20;

    // Key findings
    doc.setFont('helvetica', 'bold');
    doc.text('KEY FINDINGS', 20, yPos);
    yPos += 15;
    
    doc.setFont('helvetica', 'normal');
    report.summary.keyFindings.forEach((finding, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${finding}`, 170);
      lines.forEach((line: string) => {
        doc.text(line, 20, yPos);
        yPos += 7;
      });
      yPos += 3;
    });

    // Footer
    doc.setFontSize(10);
    doc.text('© Government of Andhra Pradesh | Powered by Garudalytics', 105, 280, { align: 'center' });
    
    doc.save(`${report.id}-${report.title.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Report Details</h1>
            <p className="text-muted-foreground">
              {report.title} - {report.id}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={downloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Report Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={apGovtLogo} alt="AP Government" className="h-12 w-12" />
                <div>
                  <h2 className="text-xl font-bold">{report.title}</h2>
                  <p className="text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img src={reportQRCode} alt="QR Code" className="h-10 w-10" />
                <img src={garudalyticsLogo} alt="Garudalytics" className="h-12 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Report ID</h4>
                  <p className="text-lg font-medium">{report.id}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Report Type</h4>
                  <Badge variant="secondary">{report.type}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">District</h4>
                  <p className="text-lg">{report.district}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Status</h4>
                  <Badge className="bg-success/20 text-success border-success/30">
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Generated By</h4>
                  <p>{report.generatedBy}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Approved By</h4>
                  <p>{report.approvedBy}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Total Pages</h4>
                  <p>{report.totalPages}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">File Size</h4>
                  <p>{report.fileSize}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h4 className="font-semibold mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(report.metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-sm capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-semibold text-lg">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-primary/10 rounded">
                    <div className="text-2xl font-bold text-primary">{report.summary.totalInspections}</div>
                    <div className="text-xs text-muted-foreground">Total Inspections</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded">
                    <div className="text-2xl font-bold text-success">{report.summary.completedInspections}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-3 bg-accent/10 rounded">
                    <div className="text-2xl font-bold text-accent">{report.summary.complianceRate}%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                  <div className="p-3 bg-warning/10 rounded">
                    <div className="text-2xl font-bold text-warning">{report.summary.averageScore}</div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.summary.keyFindings.map((finding, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>{finding}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Generated on {report.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{report.district} District</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full" onClick={downloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
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

export default ReportDetails;