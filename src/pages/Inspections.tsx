import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon,
  MapPin,
  User,
  ClipboardCheck,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  Navigation,
  FileText,
  Plus,
  Filter,
  Map,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import Footer from "@/components/Footer";
import InlineInspectionMap from "@/components/InlineInspectionMap";
import apGovtLogo from '@/assets/ap-govt-logo.png';
import garudalyticsLogo from '@/assets/garudalytics-logo.png';
import reportQRCode from '@/assets/report-qr-code.png';
import apDistrictsMap from '@/assets/ap-districts-map.png';

const Inspections = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("today");
  const [showInspectionMap, setShowInspectionMap] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleStartInspection = () => {
    // Simulate camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Camera started successfully
          console.log('Camera started');
          // Stop the stream after starting (just for demo)
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
        });
    }
  };

  // Show inline map when requested
  if (showInspectionMap) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-6 flex-1">
          <InlineInspectionMap onBack={() => setShowInspectionMap(false)} />
        </div>
        <Footer />
      </div>
    );
  }

  const generateReport = (inspection: any) => {
    const doc = new jsPDF();
    
    // Create a more professional header
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, 220, 50, 'F');
    
    // Add Government of AP Logo placeholder (in real implementation, you'd convert image to base64)
    doc.setFillColor(0, 128, 0);
    doc.circle(35, 25, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('AP GOVT', 30, 28);
    
    // Add Garudalytics Logo placeholder
    doc.setFillColor(0, 100, 200);
    doc.circle(185, 25, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('GLYTICS', 177, 28);
    
    // Main Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.text('LEGAL METROLOGY INSPECTION REPORT', 105, 25, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12);
    doc.text('Government of Andhra Pradesh', 105, 35, { align: 'center' });
    doc.text('Powered by Garudalytics Portal', 105, 42, { align: 'center' });
    
    // Report metadata section
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 55, 170, 25, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Report Generated:', 25, 65);
    doc.text(new Date().toLocaleString(), 25, 72);
    
    doc.text('Report ID:', 140, 65);
    doc.text('RPT-' + inspection.id + '-' + Date.now().toString().slice(-6), 140, 72);
    
    // QR Code section (placeholder)
    doc.setFillColor(0, 0, 0);
    doc.rect(25, 85, 25, 25, 'F');
    doc.setFillColor(255, 255, 255);
    // Create QR pattern
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if((i + j) % 2 === 0) {
          doc.setFillColor(0, 0, 0);
          doc.rect(27 + i*4, 87 + j*4, 3, 3, 'F');
        }
      }
    }
    
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text('QR Code for Digital Verification', 55, 95);
    doc.text('Scan to verify report authenticity', 55, 102);
    
    // Location Map placeholder
    doc.setFillColor(220, 240, 220);
    doc.rect(140, 85, 40, 25, 'F');
    doc.setTextColor(0, 100, 0);
    doc.text('LOCATION MAP', 150, 98);
    
    // Inspection details section
    doc.setFillColor(250, 250, 250);
    doc.rect(20, 120, 170, 60, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('INSPECTION DETAILS', 25, 135);
    
    doc.setFontSize(10);
    const details = [
      ['Inspection ID:', inspection.id],
      ['Business Name:', inspection.businessName],
      ['Type of Inspection:', inspection.type],
      ['Business Address:', inspection.address],
      ['Inspector Name:', inspection.inspector],
      ['Inspection Date:', new Date().toLocaleDateString()],
      ['Inspection Time:', inspection.time],
      ['Priority Level:', inspection.priority.toUpperCase()]
    ];
    
    let yPos = 145;
    details.forEach(([label, value]) => {
      doc.setFont(undefined, 'bold');
      doc.text(label, 25, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(value, 85, yPos);
      yPos += 7;
    });
    
    // Findings section
    doc.setFillColor(255, 255, 240);
    doc.rect(20, 190, 170, 50, 'F');
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('INSPECTION FINDINGS & COMPLIANCE', 25, 205);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const findings = [
      '✓ All weighing scales are properly calibrated and verified',
      '✓ License documents are current and valid',
      '✓ Compliance with Legal Metrology Act 2009 confirmed',
      '✓ Measurement standards meet prescribed accuracy limits',
      '✓ Record maintenance is satisfactory'
    ];
    
    yPos = 215;
    findings.forEach(finding => {
      doc.text(finding, 25, yPos);
      yPos += 6;
    });
    
    // Compliance status
    doc.setFillColor(220, 255, 220);
    doc.rect(20, 250, 80, 20, 'F');
    doc.setFont(undefined, 'bold');
    doc.text('COMPLIANCE STATUS: APPROVED', 25, 262);
    
    // Next inspection date
    doc.setFillColor(255, 248, 220);
    doc.rect(110, 250, 80, 20, 'F');
    const nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    doc.text('NEXT INSPECTION: ' + nextDate.toLocaleDateString(), 115, 262);
    
    // Footer with logos and signatures
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 275, 220, 25, 'F');
    
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('This report is digitally generated and verified by:', 20, 285);
    doc.text('Government of Andhra Pradesh, Legal Metrology Department', 20, 291);
    doc.text('© 2025 Garudalytics Portal & Government of Andhra Pradesh', 20, 297);
    
    // Digital signature placeholders
    doc.text('Digital Signature:', 130, 285);
    doc.text('Inspector: ________________', 130, 291);
    doc.text('Authorized by: ____________', 130, 297);
    
    const reportFileName = 'inspection-report-' + inspection.id + '-' + new Date().toLocaleDateString().replace(/\//g, '-') + '.pdf';
    doc.save(reportFileName);
  };

  const allInspections = [
    {
      id: "INS001",
      businessName: "Kumar Electronics",
      type: "Weighing Scale Verification",
      address: "MG Road, Visakhapatnam",
      time: "10:00 AM",
      status: "scheduled",
      inspector: "Ravi Kumar",
      priority: "high",
      date: "2024-01-15"
    },
    {
      id: "INS002",
      businessName: "Sri Venkatesh Fuel Station",
      type: "Fuel Pump Calibration",
      address: "NH-5, Guntur",
      time: "02:30 PM", 
      status: "in-progress",
      inspector: "Lakshmi Prasad",
      priority: "medium",
      date: "2024-01-15"
    },
    {
      id: "INS003",
      businessName: "Modern Weighing Systems",
      type: "Annual Compliance Check",
      address: "Industrial Area, Krishna",
      time: "04:00 PM",
      status: "completed",
      inspector: "Suresh Babu",
      priority: "low",
      date: "2024-01-15"
    },
    {
      id: "INS004",
      businessName: "Rajesh Traders",
      type: "License Renewal Inspection",
      address: "Commercial Street, Vijayawada",
      time: "09:30 AM",
      status: "pending",
      inspector: "Priya Sharma",
      priority: "high",
      date: "2024-01-16"
    },
    {
      id: "INS005",
      businessName: "Golden Scales Pvt Ltd",
      type: "Periodic Calibration",
      address: "Tech Park, Tirupati",
      time: "11:00 AM",
      status: "scheduled",
      inspector: "Ravi Kumar",
      priority: "medium",
      date: "2024-01-16"
    }
  ];

  const getFilteredInspections = (period: string) => {
    const today = "2024-01-15";
    
    switch (period) {
      case "today":
        return allInspections.filter(i => i.date === today);
      case "weekly":
        return allInspections.filter(i => ["2024-01-15", "2024-01-16", "2024-01-17"].includes(i.date));
      case "monthly":
        return allInspections;
      default:
        return allInspections;
    }
  };

  const getStatusFilteredInspections = (inspections: any[]) => {
    if (statusFilter === "all") return inspections;
    return inspections.filter(i => i.status === statusFilter);
  };

  const upcomingInspections = [
    {
      date: "2024-01-16",
      count: 5,
      types: ["Weighing Scale", "Fuel Pump", "Gas Meter"]
    },
    {
      date: "2024-01-17", 
      count: 3,
      types: ["Meter Calibration", "License Verification"]
    },
    {
      date: "2024-01-18",
      count: 7,
      types: ["Compliance Check", "Renewal Inspection"]
    }
  ];

  const inspectorPerformance = [
    {
      name: "Ravi Kumar",
      assigned: 12,
      completed: 10,
      pending: 2,
      efficiency: 83,
      avgTime: "2.5 hrs"
    },
    {
      name: "Lakshmi Prasad", 
      assigned: 15,
      completed: 14,
      pending: 1,
      efficiency: 93,
      avgTime: "2.1 hrs"
    },
    {
      name: "Suresh Babu",
      assigned: 8,
      completed: 8,
      pending: 0,
      efficiency: 100,
      avgTime: "1.8 hrs"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive";
      case "medium": return "border-l-warning";
      case "low": return "border-l-success";
      default: return "border-l-muted";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inspection Management</h1>
            <p className="text-muted-foreground">
              Schedule, track, and manage field inspections
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => navigate('/scheduled-inspections')}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Scheduled Inspections
            </Button>
            <Button onClick={() => navigate('/schedule-inspection')}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Inspection
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowInspectionMap(true)}>
            <Map className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Inspections</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">6</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-primary">1</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

        {/* Schedule Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today's Schedule (3)</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Schedule (5)</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Schedule (15)</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Inspections (8)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                {renderInspectionCards(getStatusFilteredInspections(getFilteredInspections("today")))}
              </div>
              <div className="xl:col-span-1">
                {renderSidebar()}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                {renderInspectionCards(getStatusFilteredInspections(getFilteredInspections("weekly")))}
              </div>
              <div className="xl:col-span-1">
                {renderSidebar()}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                {renderInspectionCards(getStatusFilteredInspections(getFilteredInspections("monthly")))}
              </div>
              <div className="xl:col-span-1">
                {renderSidebar()}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Schedule New Inspection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Date</label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Time</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">02:00 PM</SelectItem>
                              <SelectItem value="15:00">03:00 PM</SelectItem>
                              <SelectItem value="16:00">04:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Assign Inspector</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose inspector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ravi-kumar">Ravi Kumar</SelectItem>
                              <SelectItem value="lakshmi-prasad">Lakshmi Prasad</SelectItem>
                              <SelectItem value="suresh-babu">Suresh Babu</SelectItem>
                              <SelectItem value="priya-sharma">Priya Sharma</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Inspection Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weighing-scale">Weighing Scale Verification</SelectItem>
                              <SelectItem value="fuel-pump">Fuel Pump Calibration</SelectItem>
                              <SelectItem value="compliance">Annual Compliance Check</SelectItem>
                              <SelectItem value="renewal">License Renewal Inspection</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full" onClick={() => navigate('/schedule-inspection')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule Inspection
                        </Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Business Details</label>
                        <Input placeholder="Business name" className="mb-2" />
                        <Input placeholder="Address" className="mb-2" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="krishna">Krishna</SelectItem>
                            <SelectItem value="guntur">Guntur</SelectItem>
                            <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                            <SelectItem value="chittoor">Chittoor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">All Scheduled Inspections</h3>
                  {renderInspectionCards(getStatusFilteredInspections(allInspections))}
                </div>
              </div>
              <div className="xl:col-span-1">
                {renderSidebar()}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );

  function renderInspectionCards(inspections: any[]) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspections.map((inspection) => (
                  <div key={inspection.id} className={`border-l-4 ${getPriorityColor(inspection.priority)} p-4 bg-card rounded-lg border border-border`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{inspection.id}</span>
                          <Badge className={`text-xs ${getStatusColor(inspection.status)}`}>
                            {inspection.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{inspection.businessName}</h4>
                        <p className="text-sm text-muted-foreground">{inspection.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{inspection.time}</p>
                        <Badge variant="outline" className={`text-xs mt-1 ${
                          inspection.priority === 'high' ? 'text-destructive border-destructive' :
                          inspection.priority === 'medium' ? 'text-warning border-warning' :
                          'text-success border-success'
                        }`}>
                          {inspection.priority} priority
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {inspection.address}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        {inspection.inspector}
                      </div>
                    </div>

                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                       <Button variant="outline" size="sm" onClick={() => handleNavigate(inspection.address)} className="w-full sm:w-auto">
                         <Navigation className="h-4 w-4 mr-2" />
                         Navigate
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         onClick={() => navigate(`/inspection-details?id=${inspection.id}&business=${encodeURIComponent(inspection.businessName)}&address=${encodeURIComponent(inspection.address)}&inspector=${encodeURIComponent(inspection.inspector)}`)}
                         className="w-full sm:w-auto"
                       >
                         <Eye className="h-4 w-4 mr-2" />
                         View Details
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         onClick={() => navigate(`/start-inspection?id=${inspection.id}&business=${encodeURIComponent(inspection.businessName)}&address=${encodeURIComponent(inspection.address)}&inspector=${encodeURIComponent(inspection.inspector)}`)}
                         className="w-full sm:w-auto"
                       >
                         <Camera className="h-4 w-4 mr-2" />
                         Start Inspection
                       </Button>
                       <Button variant="outline" size="sm" onClick={() => generateReport(inspection)} className="w-full sm:w-auto">
                         <FileText className="h-4 w-4 mr-2" />
                         Report
                       </Button>
                     </div>
                  </div>
                ))}
              </div>
          </CardContent>
      </Card>
    );
  }

  function renderSidebar() {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                if (selectedDate) {
                  navigate('/scheduled-inspections');
                }
              }}
              className="rounded-md border w-full [&_table]:w-full [&_td]:text-center [&_th]:text-center"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingInspections.map((day, index) => (
                <div key={index} className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50" 
                     onClick={() => navigate('/scheduled-inspections')}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{day.date}</p>
                    <Badge variant="secondary">{day.count} inspections</Badge>
                  </div>
                  <div className="space-y-1">
                    {day.types.map((type, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        • {type}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspector Performance */}
        <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Inspector Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectorPerformance.map((inspector) => (
                  <div key={inspector.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{inspector.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {inspector.completed}/{inspector.assigned} completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${
                          inspector.efficiency >= 90 ? 'bg-success text-success-foreground' :
                          inspector.efficiency >= 80 ? 'bg-warning text-warning-foreground' :
                          'bg-destructive text-destructive-foreground'
                        }`}>
                          {inspector.efficiency}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Avg: {inspector.avgTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Inspections;