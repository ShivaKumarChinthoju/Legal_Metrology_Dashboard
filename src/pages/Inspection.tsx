import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  MapPin, 
  Camera, 
  Video,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Navigation,
  Upload,
  IndianRupee
} from "lucide-react";

const Inspection = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState({
    equipmentAvailable: false,
    calibrationValid: false,
    displayClear: false,
    structuralIntegrity: false,
    safetyMeasures: false,
    recordsMaintained: false,
    complianceNoticed: false
  });

  const [location, setLocation] = useState({ lat: 17.3850, lng: 78.4867 });
  const [notes, setNotes] = useState("");

  const inspections = [
    { 
      id: "INS001", 
      business: "Krishna Trading Co.", 
      type: "Weighbridge", 
      status: "completed", 
      result: "compliant",
      date: "2024-12-10",
      inspector: "Rajesh Kumar",
      location: "Vijayawada, Krishna"
    },
    { 
      id: "INS002", 
      business: "Guntur Petrol Station", 
      type: "Fuel Dispenser", 
      status: "in_progress", 
      result: "pending",
      date: "2024-12-10",
      inspector: "Priya Sharma",
      location: "Guntur"
    },
    { 
      id: "INS003", 
      business: "Visakha Industries", 
      type: "Scale", 
      status: "scheduled", 
      result: "pending",
      date: "2024-12-11",
      inspector: "Suresh Reddy",
      location: "Visakhapatnam"
    },
    { 
      id: "INS004", 
      business: "Non-Compliant Store", 
      type: "Scale", 
      status: "completed", 
      result: "non_compliant",
      date: "2024-12-09",
      inspector: "Rajesh Kumar",
      location: "Guntur"
    }
  ];

  const violations = [
    { 
      id: "VIO001", 
      business: "Non-Compliant Store", 
      violation: "Improper calibration", 
      penalty: 5000, 
      status: "penalty_issued",
      inspectionId: "INS004"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'non_compliant': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleChecklistChange = (key: string, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [key]: checked }));
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const inspectionStats = {
    total: inspections.length,
    completed: inspections.filter(i => i.status === 'completed').length,
    compliant: inspections.filter(i => i.result === 'compliant').length,
    nonCompliant: inspections.filter(i => i.result === 'non_compliant').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inspection Management</h1>
            <p className="text-muted-foreground">
              Mobile inspection app with checklist, geo-tagging, and evidence capture
            </p>
          </div>
          <Button onClick={() => navigate('/inspection/mobile')}>
            <ClipboardList className="h-4 w-4 mr-2" />
            Mobile Inspection
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{inspectionStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Inspections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{inspectionStats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{inspectionStats.compliant}</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{inspectionStats.nonCompliant}</div>
              <div className="text-sm text-muted-foreground">Non-Compliant</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="checklist">Mobile Checklist</TabsTrigger>
            <TabsTrigger value="inspections">Inspection History</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inspection Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Inspection Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'equipmentAvailable', label: 'All required equipment available' },
                    { key: 'calibrationValid', label: 'Valid calibration certificates' },
                    { key: 'displayClear', label: 'Display readings clear and visible' },
                    { key: 'structuralIntegrity', label: 'Structural integrity maintained' },
                    { key: 'safetyMeasures', label: 'Safety measures in place' },
                    { key: 'recordsMaintained', label: 'Proper records maintained' },
                    { key: 'complianceNoticed', label: 'Compliance notices displayed' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={checklist[item.key as keyof typeof checklist]}
                        onCheckedChange={(checked) => handleChecklistChange(item.key, checked as boolean)}
                      />
                      <label htmlFor={item.key} className="text-sm font-medium">
                        {item.label}
                      </label>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Inspector Notes</label>
                    <Textarea
                      placeholder="Add inspection notes and observations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <Button className="w-full">
                    Complete Inspection
                  </Button>
                </CardContent>
              </Card>

              {/* GPS & Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">GPS Location</label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={`${location.lat}, ${location.lng}`} 
                        readOnly 
                      />
                      <Button variant="outline" onClick={captureLocation}>
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Photo Evidence</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <Camera className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-xs">Take Photo</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <Video className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-xs">Record Video</span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Documents</label>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Inspection Summary</h4>
                    <div className="text-sm space-y-1">
                      <div>Checklist Items: {Object.values(checklist).filter(Boolean).length}/7 completed</div>
                      <div>Location: GPS captured</div>
                      <div>Evidence: 0 files uploaded</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inspections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Inspections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspections.map(inspection => (
                    <Card key={inspection.id} className="hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ClipboardList className="h-8 w-8 text-primary" />
                            <div>
                              <h3 className="font-semibold">{inspection.business}</h3>
                              <p className="text-sm text-muted-foreground">{inspection.type}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {inspection.location}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              {getResultIcon(inspection.result)}
                              <Badge className={getResultColor(inspection.result)}>
                                {inspection.result.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <Badge className={getStatusColor(inspection.status)}>
                              {inspection.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{inspection.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="violations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Violations & Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {violations.map(violation => (
                    <Card key={violation.id} className="hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                            <div>
                              <h3 className="font-semibold">{violation.business}</h3>
                              <p className="text-sm text-muted-foreground">{violation.violation}</p>
                              <p className="text-xs text-muted-foreground">
                                Inspection: {violation.inspectionId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <IndianRupee className="h-4 w-4" />
                              <span className="font-semibold">{violation.penalty.toLocaleString()}</span>
                            </div>
                            <Badge className="bg-red-100 text-red-800">
                              PENALTY ISSUED
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inspection Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md">
                    <CardContent className="p-4">
                      <Camera className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-center">Photo Evidence</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        INS001 - Equipment Photos
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-md">
                    <CardContent className="p-4">
                      <Video className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-center">Video Evidence</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        INS002 - Inspection Process
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-md">
                    <CardContent className="p-4">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-center">Documents</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        INS003 - Compliance Certificates
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Inspection;