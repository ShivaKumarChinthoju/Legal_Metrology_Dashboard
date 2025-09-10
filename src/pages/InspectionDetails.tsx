import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  User, 
  Building, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Camera,
  Download,
  Printer,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";

const InspectionDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get inspection details from URL params or use default
  const inspectionId = searchParams.get('id') || 'INS001';
  
  // Mock data based on ID
  const inspection = {
    id: inspectionId,
    businessName: "Kumar Electronics",
    businessType: "Electronics & Weighing Equipment Dealer",
    licenseNumber: "LM-AP-2024-001234",
    address: "MG Road, Visakhapatnam, Andhra Pradesh - 530001",
    inspector: "Ravi Kumar",
    inspectorId: "INS-001",
    inspectorPhone: "+91 9876543210",
    inspectorEmail: "ravi.kumar@ap.gov.in",
    scheduledDate: "2024-01-15",
    scheduledTime: "10:00 AM",
    startTime: "10:15 AM",
    endTime: "12:30 PM",
    duration: "2h 15m",
    type: "Weighing Scale Verification",
    priority: "High",
    status: "Completed",
    complianceStatus: "Fully Compliant",
    nextInspectionDate: "2025-01-15",
    businessContact: {
      name: "Rajesh Kumar",
      designation: "Owner",
      phone: "+91 9876543211",
      email: "rajesh@kumarelectronics.com"
    },
    measurements: [
      {
        equipment: "Digital Scale - Model DS100",
        serialNumber: "DS100-2023-001",
        reading: "999.8g",
        standard: "1000g ±2g",
        deviation: "-0.2g",
        status: "Pass",
        calibrationDate: "2024-01-10"
      },
      {
        equipment: "Platform Scale - Model PS500",
        serialNumber: "PS500-2023-045",
        reading: "49.95kg",
        standard: "50kg ±50g",
        deviation: "-0.05kg",
        status: "Pass",
        calibrationDate: "2024-01-10"
      },
      {
        equipment: "Precision Balance - Model PB1000",
        serialNumber: "PB1000-2023-012",
        reading: "500.02g",
        standard: "500g ±1g",
        deviation: "+0.02g",
        status: "Pass",
        calibrationDate: "2024-01-10"
      }
    ],
    findings: [
      "All weighing instruments are within acceptable tolerance limits",
      "Calibration certificates are current and valid",
      "Equipment maintenance records are properly maintained",
      "Verification marks are clearly visible and intact",
      "Staff demonstrated proper usage procedures"
    ],
    issues: [],
    recommendations: [
      "Continue regular maintenance schedule",
      "Ensure verification marks remain visible",
      "Update calibration before expiry date"
    ],
    photos: [
      "Scale verification process",
      "Calibration certificates",
      "Verification marks",
      "Equipment serial numbers",
      "Overall facility view"
    ],
    documents: [
      "Inspection Report - INS001.pdf",
      "Calibration Certificates.pdf",
      "Previous Inspection Records.pdf",
      "Compliance Certificate.pdf"
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'pass': return 'bg-success text-success-foreground';
      case 'fail': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 md:p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Inspection Details</h1>
            <p className="text-muted-foreground">
              Inspection ID: {inspection.id}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <Card className={`border-l-4 ${getPriorityColor(inspection.priority)}`}>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(inspection.status)}>{inspection.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="font-medium">{inspection.priority}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compliance</p>
                <Badge className={getStatusColor('pass')}>{inspection.complianceStatus}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{inspection.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-medium">{inspection.businessName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Business Type</p>
                    <p className="font-medium">{inspection.businessType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">License Number</p>
                    <p className="font-medium">{inspection.licenseNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <div>
                      <p className="font-medium">{inspection.businessContact.name}</p>
                      <p className="text-sm text-muted-foreground">{inspection.businessContact.designation}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </p>
                  <p className="font-medium">{inspection.address}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </p>
                    <p className="font-medium">{inspection.businessContact.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </p>
                    <p className="font-medium">{inspection.businessContact.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Measurements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Measurements & Calibration Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspection.measurements.map((measurement, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium">{measurement.equipment}</p>
                          <p className="text-sm text-muted-foreground">S/N: {measurement.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reading / Standard</p>
                          <p className="font-medium">{measurement.reading} / {measurement.standard}</p>
                          <p className="text-sm text-muted-foreground">Deviation: {measurement.deviation}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(measurement.status)}>
                            {measurement.status === 'Pass' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {measurement.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Findings & Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Findings & Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-success mb-2">Key Findings</h4>
                  <ul className="space-y-1">
                    {inspection.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {inspection.recommendations.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-warning mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {inspection.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inspector Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Inspector Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">{inspection.inspector}</p>
                  <p className="text-sm text-muted-foreground">ID: {inspection.inspectorId}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {inspection.inspectorPhone}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {inspection.inspectorEmail}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="font-medium">{inspection.scheduledDate}</p>
                    <p className="text-sm text-muted-foreground">{inspection.scheduledTime}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Actual</p>
                    <p className="font-medium">{inspection.startTime} - {inspection.endTime}</p>
                    <p className="text-sm text-muted-foreground">Duration: {inspection.duration}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Next Inspection</p>
                  <p className="font-medium">{inspection.nextInspectionDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Evidence - Photos, Videos, Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Evidence & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photos */}
                <div>
                  <h4 className="font-medium mb-2">Photographs ({inspection.photos.length})</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {inspection.photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center relative group cursor-pointer">
                        <div className="text-center p-2">
                          <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">{photo}</p>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                          <Download className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Videos */}
                <div>
                  <h4 className="font-medium mb-2">Videos (3)</h4>
                  <div className="space-y-2">
                    {[
                      "Calibration_Process_Video.mp4",
                      "Equipment_Demonstration.mp4", 
                      "Safety_Compliance_Check.mp4"
                    ].map((video, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                          <svg className="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7L8 5z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{video}</p>
                          <p className="text-xs text-muted-foreground">Duration: 2:45 | Size: 15.2 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Compliance Documents */}
                <div>
                  <h4 className="font-medium mb-2">Compliance Documents (4)</h4>
                  <div className="space-y-2">
                    {[
                      "Calibration_Certificate_2024.pdf",
                      "License_Verification_Report.pdf",
                      "Safety_Compliance_Certificate.pdf",
                      "Equipment_Specifications.pdf"
                    ].map((document, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{document}</p>
                          <p className="text-xs text-muted-foreground">PDF Document | 2.3 MB</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {inspection.documents.map((document, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{document}</span>
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

export default InspectionDetails;