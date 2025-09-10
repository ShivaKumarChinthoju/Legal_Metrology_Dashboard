import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  FileText,
  Upload,
  X,
  Plus
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const StartInspection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inspectionData, setInspectionData] = useState({
    status: 'in-progress',
    startTime: new Date().toLocaleTimeString(),
    notes: '',
    findings: '',
    complianceStatus: '',
    photosRequired: 5,
    photosTaken: 0
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [measurements, setMeasurements] = useState([
    { item: 'Scale 1', reading: '', standard: '±2g', status: 'pending' },
    { item: 'Scale 2', reading: '', standard: '±5g', status: 'pending' },
    { item: 'Pump 1', reading: '', standard: '±0.5%', status: 'pending' }
  ]);

  // Get inspection details from URL params or default data
  const inspectionId = searchParams.get('id') || 'INS001';
  const businessName = searchParams.get('business') || 'Kumar Electronics';
  const address = searchParams.get('address') || 'MG Road, Visakhapatnam';
  const inspector = searchParams.get('inspector') || 'Ravi Kumar';

  const handlePhotoCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          toast({
            title: "Camera Access Granted",
            description: "You can now take photos for the inspection."
          });
          // In real implementation, would open camera interface
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
          toast({
            title: "Camera Access Denied",
            description: "Please allow camera access to take inspection photos.",
            variant: "destructive"
          });
        });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setPhotos(prev => [...prev, ...files].slice(0, 5));
      setInspectionData(prev => ({
        ...prev,
        photosTaken: Math.min(prev.photosTaken + files.length, 5)
      }));
      toast({
        title: "Photos Added",
        description: `${files.length} photo(s) added to inspection.`
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setInspectionData(prev => ({
      ...prev,
      photosTaken: prev.photosTaken - 1
    }));
  };

  const updateMeasurement = (index: number, reading: string) => {
    setMeasurements(prev => prev.map((item, i) => 
      i === index ? { ...item, reading, status: reading ? 'completed' : 'pending' } : item
    ));
  };

  const completeInspection = () => {
    const allMeasurementsTaken = measurements.every(m => m.reading);
    const allPhotosRequired = inspectionData.photosTaken >= inspectionData.photosRequired;
    
    if (!allMeasurementsTaken) {
      toast({
        title: "Incomplete Measurements",
        description: "Please complete all required measurements.",
        variant: "destructive"
      });
      return;
    }

    if (!allPhotosRequired) {
      toast({
        title: "Insufficient Photos",
        description: `Please take at least ${inspectionData.photosRequired} photos.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Inspection Completed",
      description: "Inspection has been completed and report generated.",
    });
    
    navigate('/scheduled-inspections');
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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Start Inspection</h1>
            <p className="text-muted-foreground">
              Inspection ID: {inspectionId}
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Status: {inspectionData.status}
          </Badge>
        </div>

        {/* Inspection Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Inspection Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <p className="text-foreground font-medium">{businessName}</p>
            </div>
            <div className="space-y-2">
              <Label>Inspector</Label>
              <p className="text-foreground font-medium">{inspector}</p>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <p className="text-muted-foreground">{address}</p>
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <p className="text-muted-foreground">{inspectionData.startTime}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Measurements Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Measurements & Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {measurements.map((measurement, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{measurement.item}</p>
                    <p className="text-sm text-muted-foreground">Standard: {measurement.standard}</p>
                  </div>
                  <Input
                    placeholder="Enter reading"
                    value={measurement.reading}
                    onChange={(e) => updateMeasurement(index, e.target.value)}
                    className="w-full sm:w-32"
                  />
                  <Badge variant={measurement.status === 'completed' ? 'default' : 'secondary'}>
                    {measurement.status === 'completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                    {measurement.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos ({inspectionData.photosTaken}/{inspectionData.photosRequired})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handlePhotoCapture} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">{photo.name}</span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {Array.from({ length: 5 - photos.length }).map((_, index) => (
                  <div key={`placeholder-${index}`} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                    <Plus className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Inspection Notes & Findings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Inspection Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any observations or notes..."
                  value={inspectionData.notes}
                  onChange={(e) => setInspectionData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="findings">Key Findings</Label>
                <Textarea
                  id="findings"
                  placeholder="Enter key findings and observations..."
                  value={inspectionData.findings}
                  onChange={(e) => setInspectionData(prev => ({ ...prev, findings: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compliance">Compliance Status</Label>
              <Select value={inspectionData.complianceStatus} onValueChange={(value) => setInspectionData(prev => ({ ...prev, complianceStatus: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compliance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliant">Fully Compliant</SelectItem>
                  <SelectItem value="minor-issues">Minor Issues Found</SelectItem>
                  <SelectItem value="major-issues">Major Issues Found</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate('/scheduled-inspections')}>
            Save as Draft
          </Button>
          <Button onClick={completeInspection} className="bg-success hover:bg-success/90">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Inspection
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartInspection;