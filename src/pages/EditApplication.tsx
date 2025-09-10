import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, FileText, Building, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const EditApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const [formData, setFormData] = useState({
    businessName: 'Krishna Trading Co.',
    applicationType: 'new_license',
    licenseType: 'weighing_instruments',
    selectedTradeType: 'kirana_general_stores',
    businessType: 'retail_markets',
    ownerName: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh@krishnatrading.com',
    address: '123 Main Street, Vijayawada, Krishna District',
    district: 'krishna',
    description: 'Application for new weighing instruments license for retail operations',
    priority: 'high'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Application updated successfully!", {
      description: "Your changes have been saved."
    });
    navigate('/applications');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(`/applications/${id}/details`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Application</h1>
            <p className="text-muted-foreground">
              Update application details - {id}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationType">Application Type *</Label>
                    <Select value={formData.applicationType} onValueChange={(value) => handleInputChange('applicationType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select application type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new_license">New License</SelectItem>
                        <SelectItem value="renewal">License Renewal</SelectItem>
                        <SelectItem value="modification">License Modification</SelectItem>
                        <SelectItem value="inspection">Inspection Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseType">License Type *</Label>
                    <Select value={formData.licenseType} onValueChange={(value) => handleInputChange('licenseType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weighing_instruments">Weighing Instruments</SelectItem>
                        <SelectItem value="measuring_instruments">Measuring Instruments</SelectItem>
                        <SelectItem value="packaged_commodities">Packaged Commodities</SelectItem>
                        <SelectItem value="precious_metals">Precious Metals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance_services">Finance & Services</SelectItem>
                        <SelectItem value="retail_markets">Retail & Markets</SelectItem>
                        <SelectItem value="industries_mills">Industries & Mills</SelectItem>
                        <SelectItem value="fuel_energy_utilities">Fuel, Energy & Utilities</SelectItem>
                        <SelectItem value="food_dairy">Food & Dairy</SelectItem>
                        <SelectItem value="agriculture_fertilizers">Agriculture & Fertilizers</SelectItem>
                        <SelectItem value="consumer_goods_lifestyle">Consumer Goods & Lifestyle</SelectItem>
                        <SelectItem value="liquor_beverages">Liquor & Beverages</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about your application..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business & Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter business name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner/Contact Person *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@domain.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <SelectItem value="krishna">Krishna</SelectItem>
                      <SelectItem value="guntur">Guntur</SelectItem>
                      <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                      <SelectItem value="chittoor">Chittoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
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
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(`/applications/${id}/details`)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditApplication;