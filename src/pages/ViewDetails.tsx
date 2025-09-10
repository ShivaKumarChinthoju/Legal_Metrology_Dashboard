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
  Mail,
  Star,
  Shield
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";

const ViewDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get type and ID from URL params
  const type = searchParams.get('type') || 'application';
  const id = searchParams.get('id') || '001';

  // Mock data based on type
  const getDetailsByType = (type: string, id: string) => {
    switch (type) {
      case 'application':
        return {
          title: `Application ${id}`,
          subtitle: 'License Application Details',
          data: {
            applicationNumber: `APP-${id}`,
            businessName: "Kumar Electronics Pvt Ltd",
            applicantName: "Rajesh Kumar",
            applicationDate: "2024-01-15",
            status: "Under Review",
            licenseType: "Weighing & Measuring Equipment Dealer",
            businessType: "Electronics & Hardware",
            address: "MG Road, Visakhapatnam, AP - 530001",
            phone: "+91 9876543210",
            email: "rajesh@kumarelectronics.com",
            documents: [
              "Business Registration Certificate",
              "GST Registration",
              "Identity Proof",
              "Address Proof",
              "Bank Details"
            ],
            fees: {
              applicationFee: "₹5,000",
              inspectionFee: "₹2,000",
              licenseFee: "₹10,000",
              total: "₹17,000",
              paidAmount: "₹5,000",
              balance: "₹12,000"
            }
          }
        };
      case 'license':
        return {
          title: `License ${id}`,
          subtitle: 'License Details',
          data: {
            licenseNumber: `LIC-${id}`,
            businessName: "Modern Weighing Systems",
            holderName: "Priya Sharma",
            issueDate: "2023-06-15",
            expiryDate: "2025-06-14",
            status: "Active",
            licenseType: "Weighing Equipment Manufacturer",
            category: "Class A - Precision Instruments",
            address: "Industrial Area, Krishna District, AP",
            phone: "+91 9876543211",
            email: "priya@modernweighing.com",
            conditions: [
              "Annual calibration mandatory",
              "Quarterly inspection required",
              "Maintain calibration records",
              "Display license prominently"
            ],
            violations: []
          }
        };
      case 'business':
        return {
          title: `Business ${id}`,
          subtitle: 'Business Entity Details',
          data: {
            businessId: `BUS-${id}`,
            businessName: "Guntur Scales & Instruments",
            ownerName: "Suresh Reddy",
            registrationDate: "2020-03-10",
            businessType: "Scale Repair & Calibration Services",
            category: "Service Provider",
            address: "Commercial Street, Guntur, AP",
            phone: "+91 9876543212",
            email: "suresh@gunturscales.com",
            licenses: [
              "LIC-001 - Repair License (Active)",
              "LIC-002 - Calibration License (Active)"
            ],
            inspections: [
              "INS-001 - 2024-01-10 (Completed)",
              "INS-002 - 2023-10-15 (Completed)",
              "INS-003 - 2023-07-20 (Completed)"
            ],
            compliance: "Fully Compliant"
          }
        };
      case 'inspector':
        return {
          title: `Inspector ${id}`,
          subtitle: 'Inspector Profile',
          data: {
            inspectorId: `INS-${id}`,
            name: "Ravi Kumar",
            designation: "Senior Legal Metrology Inspector",
            department: "Legal Metrology Department, AP",
            joinDate: "2015-08-01",
            experience: "8+ years",
            phone: "+91 9876543213",
            email: "ravi.kumar@ap.gov.in",
            specializations: [
              "Weighing Scale Verification",
              "Fuel Pump Calibration",
              "Electronic Meter Testing"
            ],
            performance: {
              inspectionsCompleted: 245,
              averageRating: 4.8,
              complianceRate: "95%",
              efficiency: "92%"
            },
            certifications: [
              "Legal Metrology Certification - Grade A",
              "Electronic Calibration Specialist",
              "Quality Management System Auditor"
            ]
          }
        };
      default:
        return {
          title: 'Details',
          subtitle: 'Record Details',
          data: {}
        };
    }
  };

  const details = getDetailsByType(type, id);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'under review':
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'expired':
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{details.title}</h1>
            <p className="text-muted-foreground">{details.subtitle}</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {type === 'application' && <FileText className="h-5 w-5" />}
                  {type === 'license' && <Shield className="h-5 w-5" />}
                  {type === 'business' && <Building className="h-5 w-5" />}
                  {type === 'inspector' && <User className="h-5 w-5" />}
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(details.data).slice(0, 8).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      {key === 'status' ? (
                        <Badge className={getStatusColor(value as string)}>
                          {value as string}
                        </Badge>
                      ) : (
                        <p className="font-medium">{value as string}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {(details.data.documents || details.data.licenses || details.data.specializations) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {details.data.documents && "Documents"}
                    {details.data.licenses && "Licenses"}
                    {details.data.specializations && "Specializations"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(details.data.documents || details.data.licenses || details.data.specializations || []).map((item: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{item}</span>
                        {details.data.documents && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance/Financial Information */}
            {(details.data.performance || details.data.fees) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {details.data.performance && "Performance Metrics"}
                    {details.data.fees && "Fee Structure"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(details.data.performance || details.data.fees || {}).map(([key, value]) => (
                      <div key={key} className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-lg font-semibold">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {details.data.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{details.data.phone}</span>
                  </div>
                )}
                {details.data.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{details.data.email}</span>
                  </div>
                )}
                {details.data.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{details.data.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Status & Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {details.data.status && (
                  <div>
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <Badge className={getStatusColor(details.data.status)}>
                      {details.data.status}
                    </Badge>
                  </div>
                )}
                {details.data.issueDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-medium">{details.data.issueDate}</p>
                  </div>
                )}
                {details.data.expiryDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">{details.data.expiryDate}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetails;