import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  IndianRupee, 
  Save,
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Phone
} from "lucide-react";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const businessType = searchParams.get('type') || 'weighbridge';

  const [formData, setFormData] = useState({
    businessType: businessType,
    businessName: '',
    ownerName: '',
    address: '',
    district: '',
    pincode: '',
    phone: '',
    email: '',
    gstNo: '',
    documents: {
      businessLicense: null as File | null,
      gstCertificate: null as File | null,
      addressProof: null as File | null,
      idProof: null as File | null,
    }
  });

  const businessTypes = [
    { value: 'weighbridge', label: 'Weighbridge', fee: 5000 },
    { value: 'petrolpump', label: 'Petrol Pump', fee: 7500 },
    { value: 'scale', label: 'Scale', fee: 2500 },
    { value: 'packer', label: 'Packer', fee: 3000 },
    { value: 'importer', label: 'Importer', fee: 4000 },
    { value: 'dealer', label: 'Dealer', fee: 2000 },
    { value: 'repairer', label: 'Repairer', fee: 1500 }
  ];

  const getCurrentBusinessType = () => {
    return businessTypes.find(type => type.value === formData.businessType);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: file }
    }));
  };

  const calculateFee = () => {
    const businessType = getCurrentBusinessType();
    const baseFee = businessType?.fee || 0;
    const processingFee = Math.round(baseFee * 0.02); // 2% processing fee
    const total = baseFee + processingFee;
    return { baseFee, processingFee, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.businessName || !formData.ownerName || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Generate application ID
    const applicationId = `AP${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Application Submitted",
      description: `Your application ${applicationId} has been submitted successfully`,
    });

    // Navigate to payment page
    navigate(`/payment?applicationId=${applicationId}&amount=${calculateFee().total}`);
  };

  const fees = calculateFee();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/applicant-dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Registration Application</h1>
            <p className="text-muted-foreground">
              Register your {getCurrentBusinessType()?.label} for Legal Metrology compliance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label} (₹{type.fee})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Enter business name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="gstNo">GST Number</Label>
                    <Input
                      id="gstNo"
                      value={formData.gstNo}
                      onChange={(e) => handleInputChange('gstNo', e.target.value)}
                      placeholder="Enter GST number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerName">Owner Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="Enter owner name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter complete business address"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="krishna">Krishna</SelectItem>
                          <SelectItem value="guntur">Guntur</SelectItem>
                          <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                          <SelectItem value="chittoor">Chittoor</SelectItem>
                          <SelectItem value="kadapa">Kadapa</SelectItem>
                          <SelectItem value="nellore">Nellore</SelectItem>
                          <SelectItem value="kurnool">Kurnool</SelectItem>
                          <SelectItem value="anantapur">Anantapur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter PIN code"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Document Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'businessLicense', label: 'Business License', required: true },
                    { key: 'gstCertificate', label: 'GST Certificate', required: false },
                    { key: 'addressProof', label: 'Address Proof', required: true },
                    { key: 'idProof', label: 'ID Proof', required: true },
                  ].map(doc => (
                    <div key={doc.key} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={doc.key}>
                          {doc.label} {doc.required && '*'}
                        </Label>
                        <Input
                          id={doc.key}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.key, file);
                          }}
                          className="mt-1"
                        />
                      </div>
                      {formData.documents[doc.key as keyof typeof formData.documents] && (
                        <FileText className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/applicant-dashboard')}>
                  Save as Draft
                </Button>
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            </form>
          </div>

          {/* Fee Calculation Sidebar */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Fee Calculation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Registration Fee:</span>
                    <span className="font-medium">₹{fees.baseFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Fee (2%):</span>
                    <span className="font-medium">₹{fees.processingFee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{fees.total}</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Processing time: 15-20 working days</p>
                  <p>• Includes site inspection</p>
                  <p>• Certificate validity: 5 years</p>
                  <p>• QR-enabled digital certificate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;