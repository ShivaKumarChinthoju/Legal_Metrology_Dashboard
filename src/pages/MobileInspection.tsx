import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Clock, 
  User, 
  Building, 
  CheckCircle,
  AlertTriangle,
  Plus,
  Navigation,
  Save,
  Upload,
  FileText,
  Video,
  Image,
  Phone,
  MessageSquare,
  Signature,
  Shield,
  QrCode,
  Fingerprint,
  Eye,
  Play,
  Download,
  X,
  CheckSquare,
  MapPin as GPS,
  Wifi,
  Signal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const MobileInspection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState("start");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [networkStatus, setNetworkStatus] = useState({ online: true, strength: 'strong' });
  const [verificationStatus, setVerificationStatus] = useState({
    identity: false,
    business: false,
    location: false,
    equipment: false
  });
  
  const [inspectionData, setInspectionData] = useState({
    businessName: "Kumar Electronics",
    address: "MG Road, Visakhapatnam",
    inspector: "Ravi Kumar",
    inspectorId: "INS001",
    startTime: new Date().toLocaleTimeString(),
    inspectionId: "MOB-INS-" + Date.now(),
    checklist: [
      { id: 1, item: "Business License Verification", checked: false, required: true, evidence: [] },
      { id: 2, item: "Weighing Scale Calibration Check", checked: false, required: true, evidence: [] },
      { id: 3, item: "Equipment Serial Number Verification", checked: false, required: true, evidence: [] },
      { id: 4, item: "Measurement Accuracy Test", checked: false, required: true, evidence: [] },
      { id: 5, item: "Safety Compliance Inspection", checked: false, required: true, evidence: [] },
      { id: 6, item: "Record Maintenance Review", checked: false, required: false, evidence: [] },
      { id: 7, item: "Staff Training Verification", checked: false, required: false, evidence: [] },
      { id: 8, item: "Customer Complaint Records", checked: false, required: false, evidence: [] }
    ],
    photos: [],
    videos: [],
    documents: [],
    notes: "",
    geoTagged: false,
    mobileVerified: false,
    digitalSignature: null
  });

  const [capturedMedia, setCapturedMedia] = useState([
    { id: 1, type: 'photo', name: 'Business_License.jpg', timestamp: '10:15 AM', geoTagged: true, checklistItem: 1 },
    { id: 2, type: 'video', name: 'Scale_Calibration_Process.mp4', timestamp: '10:20 AM', geoTagged: true, checklistItem: 2 },
    { id: 3, type: 'photo', name: 'Equipment_Serial_Numbers.jpg', timestamp: '10:25 AM', geoTagged: true, checklistItem: 3 },
    { id: 4, type: 'document', name: 'Previous_Inspection_Report.pdf', timestamp: '10:30 AM', geoTagged: false, checklistItem: 6 },
    { id: 5, type: 'photo', name: 'Safety_Equipment_Check.jpg', timestamp: '10:35 AM', geoTagged: true, checklistItem: 5 },
    { id: 6, type: 'photo', name: 'Staff_Training_Certificates.jpg', timestamp: '10:40 AM', geoTagged: false, checklistItem: 7 }
  ]);

  // Inspector Start Page State
  const [inspectorReady, setInspectorReady] = useState(false);
  const [preFlightChecks, setPreFlightChecks] = useState({
    deviceReady: false,
    locationEnabled: false,
    cameraAccess: false,
    networkConnected: false,
    batteryLevel: 85
  });

  const handleChecklistChange = (id: number) => {
    setInspectionData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
    
    if (inspectionData.checklist.find(item => item.id === id)?.checked === false) {
      toast({
        title: "Checklist Item Completed",
        description: "Don't forget to add evidence for this item.",
      });
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setInspectionData(prev => ({ ...prev, geoTagged: true }));
          setVerificationStatus(prev => ({ ...prev, location: true }));
          setPreFlightChecks(prev => ({ ...prev, locationEnabled: true }));
          toast({
            title: "Location Captured",
            description: `GPS coordinates verified and saved.`,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to capture GPS location. Please try again.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          setPreFlightChecks(prev => ({ ...prev, cameraAccess: true }));
          // Simulate photo capture
          const newPhoto = {
            id: Date.now(),
            type: 'photo',
            name: `Inspection_Photo_${Date.now()}.jpg`,
            timestamp: new Date().toLocaleTimeString(),
            geoTagged: !!currentLocation,
            checklistItem: null
          };
          setCapturedMedia(prev => [...prev, newPhoto]);
          toast({
            title: "Photo Captured",
            description: "Photo saved with GPS coordinates.",
          });
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          toast({
            title: "Camera Error",
            description: "Unable to access camera. Please check permissions.",
            variant: "destructive"
          });
        });
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleVideoCapture = () => {
    videoRef.current?.click();
  };

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const newMedia = {
        id: Date.now() + Math.random(),
        type: file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'photo' : 'document',
        name: file.name,
        timestamp: new Date().toLocaleTimeString(),
        geoTagged: !!currentLocation,
        checklistItem: null
      };
      setCapturedMedia(prev => [...prev, newMedia]);
    });
    toast({
      title: `${files.length} file(s) uploaded`,
      description: "Evidence added to inspection.",
    });
  };

  const removeMedia = (id: number) => {
    setCapturedMedia(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Evidence removed",
      description: "File removed from inspection.",
    });
  };

  const verifyMobileNumber = () => {
    // Simulate mobile verification
    setTimeout(() => {
      setInspectionData(prev => ({ ...prev, mobileVerified: true }));
      setVerificationStatus(prev => ({ ...prev, identity: true }));
      toast({
        title: "Mobile Verified",
        description: "Inspector identity verified via SMS OTP.",
      });
    }, 2000);
  };

  const performDeviceChecks = () => {
    // Simulate device checks
    setPreFlightChecks(prev => ({ ...prev, deviceReady: true, networkConnected: navigator.onLine }));
    getLocation();
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          setPreFlightChecks(prev => ({ ...prev, cameraAccess: true }));
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => setPreFlightChecks(prev => ({ ...prev, cameraAccess: false })));
    }
  };

  const startInspectionFlow = () => {
    if (Object.values(preFlightChecks).every(check => check === true || typeof check === 'number')) {
      setInspectorReady(true);
      setActiveTab("checklist");
      toast({
        title: "Inspection Started",
        description: "All systems ready. Begin inspection process.",
      });
    } else {
      toast({
        title: "Pre-flight Check Failed",
        description: "Please complete all device checks before starting.",
        variant: "destructive"
      });
    }
  };

  const completedItems = inspectionData.checklist.filter(item => item.checked).length;
  const requiredItems = inspectionData.checklist.filter(item => item.required).length;
  const completedRequired = inspectionData.checklist.filter(item => item.required && item.checked).length;
  const progress = (completedItems / inspectionData.checklist.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-4 space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Mobile Inspection</h1>
            <p className="text-muted-foreground">Inspector: {inspectionData.inspector} | ID: {inspectionData.inspectionId}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={networkStatus.online ? "default" : "destructive"}>
              <Wifi className="h-3 w-3 mr-1" />
              {networkStatus.online ? "Online" : "Offline"}
            </Badge>
            <Badge variant={inspectionData.geoTagged ? "default" : "outline"}>
              <GPS className="h-3 w-3 mr-1" />
              {inspectionData.geoTagged ? "GPS" : "No GPS"}
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="start">Start</TabsTrigger>
            <TabsTrigger value="checklist" disabled={!inspectorReady}>Checklist</TabsTrigger>
            <TabsTrigger value="verification" disabled={!inspectorReady}>Verify</TabsTrigger>
            <TabsTrigger value="evidence" disabled={!inspectorReady}>Evidence</TabsTrigger>
            <TabsTrigger value="complete" disabled={!inspectorReady}>Complete</TabsTrigger>
          </TabsList>

          {/* Inspector Start Page */}
          <TabsContent value="start" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Inspector Start Page
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Inspection Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Business:</span> {inspectionData.businessName}</p>
                      <p><span className="font-medium">Address:</span> {inspectionData.address}</p>
                      <p><span className="font-medium">Inspector:</span> {inspectionData.inspector}</p>
                      <p><span className="font-medium">ID:</span> {inspectionData.inspectionId}</p>
                      <p><span className="font-medium">Started:</span> {inspectionData.startTime}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Pre-Flight Checks</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Device Ready</span>
                        {preFlightChecks.deviceReady ? 
                          <CheckCircle className="h-4 w-4 text-success" /> : 
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Location Access</span>
                        {preFlightChecks.locationEnabled ? 
                          <CheckCircle className="h-4 w-4 text-success" /> : 
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Camera Access</span>
                        {preFlightChecks.cameraAccess ? 
                          <CheckCircle className="h-4 w-4 text-success" /> : 
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Network Connected</span>
                        {preFlightChecks.networkConnected ? 
                          <CheckCircle className="h-4 w-4 text-success" /> : 
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Battery Level</span>
                        <span className="text-sm font-medium">{preFlightChecks.batteryLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={performDeviceChecks} variant="outline">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Run Device Checks
                  </Button>
                  <Button onClick={startInspectionFlow} disabled={!Object.values(preFlightChecks).every(check => check === true || typeof check === 'number')}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Inspection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inspection Checklist Tab */}
          <TabsContent value="checklist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Inspection Checklist Progress</span>
                  <span className="text-sm font-normal">
                    {completedItems}/{inspectionData.checklist.length} completed
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Required: {completedRequired}/{requiredItems}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inspection Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inspectionData.checklist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={item.checked}
                          onCheckedChange={() => handleChecklistChange(item.id)}
                        />
                        <div>
                          <p className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                            {item.item}
                          </p>
                          {item.required && (
                            <Badge variant="outline" className="text-xs mt-1">Required</Badge>
                          )}
                        </div>
                      </div>
                      {item.checked ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : item.required ? (
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      ) : null}
                    </div>
                    <div className="ml-8 text-sm text-muted-foreground">
                      Evidence attached: {capturedMedia.filter(media => media.checklistItem === item.id).length} files
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mobile Verification Tab */}
          <TabsContent value="verification" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5" />
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Mobile Number Verification</span>
                    {verificationStatus.identity ? 
                      <CheckCircle className="h-5 w-5 text-success" /> : 
                      <Button size="sm" onClick={verifyMobileNumber}>
                        <Phone className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    }
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Inspector ID</Label>
                    <Input value={inspectionData.inspectorId} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Inspector Name</Label>
                    <Input value={inspectionData.inspector} disabled />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Business Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input value={inspectionData.businessName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Verification</Label>
                    <Input value={inspectionData.address} disabled />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => setVerificationStatus(prev => ({ ...prev, business: true }))}
                    disabled={verificationStatus.business}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {verificationStatus.business ? "Verified" : "Scan QR Code"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GPS className="h-5 w-5" />
                    Location Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentLocation ? (
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Latitude:</span> {currentLocation.lat.toFixed(6)}</p>
                      <p><span className="font-medium">Longitude:</span> {currentLocation.lng.toFixed(6)}</p>
                      <p><span className="font-medium">Accuracy:</span> ±5 meters</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No location data available</p>
                  )}
                  <Button className="w-full" onClick={getLocation}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Capture GPS Location
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Equipment Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Equipment Status</Label>
                    <Select onValueChange={() => setVerificationStatus(prev => ({ ...prev, equipment: true }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="working">All Equipment Working</SelectItem>
                        <SelectItem value="issues">Minor Issues Found</SelectItem>
                        <SelectItem value="major">Major Issues Found</SelectItem>
                        <SelectItem value="non-functional">Equipment Non-functional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => setVerificationStatus(prev => ({ ...prev, equipment: true }))}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Verify Equipment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Evidence Upload Tab */}
          <TabsContent value="evidence" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Captured Evidence ({capturedMedia.length} files)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {capturedMedia.map((media) => (
                      <div key={media.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {media.type === 'photo' && <Image className="h-5 w-5 text-blue-500" />}
                            {media.type === 'video' && <Video className="h-5 w-5 text-red-500" />}
                            {media.type === 'document' && <FileText className="h-5 w-5 text-green-500" />}
                            <span className="font-medium text-sm">{media.type.toUpperCase()}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => removeMedia(media.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium">{media.name}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{media.timestamp}</span>
                          {media.geoTagged && <span className="flex items-center gap-1"><GPS className="h-3 w-3" />GPS</span>}
                        </div>
                        {media.checklistItem && (
                          <Badge variant="outline" className="text-xs">
                            Linked to Item #{media.checklistItem}
                          </Badge>
                        )}
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Capture Evidence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" onClick={startCamera}>
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleVideoCapture}>
                      <Video className="h-4 w-4 mr-2" />
                      Record Video
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleFileUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button variant="outline" className="w-full" onClick={getLocation}>
                      <Navigation className="h-4 w-4 mr-2" />
                      Tag Location
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add detailed inspection notes..."
                      value={inspectionData.notes}
                      onChange={(e) => setInspectionData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*,application/pdf,.doc,.docx"
              onChange={onFileUpload}
              className="hidden"
            />
            <input
              type="file"
              ref={videoRef}
              accept="video/*"
              onChange={onFileUpload}
              className="hidden"
            />
          </TabsContent>

          {/* Complete Inspection Tab */}
          <TabsContent value="complete" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Inspection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">{completedItems}</p>
                    <p className="text-sm text-muted-foreground">Items Completed</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">{capturedMedia.length}</p>
                    <p className="text-sm text-muted-foreground">Evidence Files</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">{Object.values(verificationStatus).filter(Boolean).length}</p>
                    <p className="text-sm text-muted-foreground">Verifications</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
                    <p className="text-sm text-muted-foreground">Progress</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Final Notes</h3>
                  <Textarea
                    placeholder="Add final inspection summary and recommendations..."
                    value={inspectionData.notes}
                    onChange={(e) => setInspectionData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1" 
                    disabled={completedRequired < requiredItems}
                    onClick={() => {
                      toast({
                        title: "Inspection Saved",
                        description: "Inspection saved as draft. You can continue later.",
                      });
                      navigate('/inspections');
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button 
                    className="flex-1"
                    disabled={completedRequired < requiredItems}
                    onClick={() => {
                      toast({
                        title: "Inspection Completed",
                        description: "Inspection completed successfully and sent for review.",
                      });
                      navigate('/inspections');
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Inspection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MobileInspection;