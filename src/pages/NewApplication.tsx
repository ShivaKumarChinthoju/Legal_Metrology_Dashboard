import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, FileText, Building, User, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const NewApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicationType: '',
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    businessType: '',
    licenseType: '',
    selectedTradeType: '',
    description: '',
    documents: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Application submitted successfully!", {
      description: "Your application will be reviewed within 5-7 business days."
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
          <Button variant="outline" onClick={() => navigate('/applications')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Application</h1>
            <p className="text-muted-foreground">
              Submit a new legal metrology application
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

                <div className="space-y-2">
                  <Label htmlFor="selectedTradeType">Select Trade Type *</Label>
                  <Select value={formData.selectedTradeType} onValueChange={(value) => handleInputChange('selectedTradeType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trade type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Finance & Services</div>
                      <SelectItem value="banks">Banks</SelectItem>
                      <SelectItem value="bullion_precious_stones_pawn_brokers">Bullion Precious Stones & Pawn Brokers</SelectItem>
                      <SelectItem value="railway_stations_airlines_postal_services">Railway Stations / Airlines / Postal Services</SelectItem>
                      <SelectItem value="mls_points">MLS Points</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Retail & Markets</div>
                      <SelectItem value="kirana_general_stores">Kirana & General Stores</SelectItem>
                      <SelectItem value="super_markets">Super Markets</SelectItem>
                      <SelectItem value="shopping_malls">Shopping Malls</SelectItem>
                      <SelectItem value="fp_shops">F.P Shops</SelectItem>
                      <SelectItem value="weekly_bazars_shandies">Weekly Bazars Shandies</SelectItem>
                      <SelectItem value="whole_sale_dealers">Whole Sale Dealers</SelectItem>
                      <SelectItem value="regulated_markets">Regulated Markets</SelectItem>
                      <SelectItem value="sweet_shops">Sweet Shops</SelectItem>
                      <SelectItem value="vegetables_fruits">Vegetables & Fruits</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Industries & Mills</div>
                      <SelectItem value="cotton_ginning_mills">Cotton and Ginning Mills</SelectItem>
                      <SelectItem value="crusher_stone_chips">Crusher Stone Chips</SelectItem>
                      <SelectItem value="oil_mills">Oil Mills</SelectItem>
                      <SelectItem value="rice_mills">Rice Mills</SelectItem>
                      <SelectItem value="roller_flour_mills">Roller Flour Mills</SelectItem>
                      <SelectItem value="cement_industries">Cement, Industries</SelectItem>
                      <SelectItem value="steel_traders">Steel Traders</SelectItem>
                      <SelectItem value="sugar_khandsari">Sugar & Khandsari</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Fuel, Energy & Utilities</div>
                      <SelectItem value="auto_fare_meters">Auto Fare Meters</SelectItem>
                      <SelectItem value="dispensing_pumps">Dispensing Pumps</SelectItem>
                      <SelectItem value="electrical_items">Electrical Items</SelectItem>
                      <SelectItem value="lp_gas_kerosene_dealers">L.P Gas, Kerosene Dealers</SelectItem>
                      <SelectItem value="weigh_bridges">Weigh Bridges</SelectItem>
                      <SelectItem value="tank_trucks">Tank Trucks</SelectItem>
                      <SelectItem value="mineral_water_packaged_drinking_water">Mineral Water & Packaged Drinking Water</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Food & Dairy</div>
                      <SelectItem value="fish_poultry_meat">Fish, Poultry & Meat</SelectItem>
                      <SelectItem value="milk_dairy_products">Milk & Other Dairy Products</SelectItem>
                      <SelectItem value="ice_creams">Ice Creams</SelectItem>
                      <SelectItem value="cool_drinks">Cool Drinks Like</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Agriculture & Fertilizers</div>
                      <SelectItem value="fertilizers">Fertilizers</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Consumer Goods & Lifestyle</div>
                      <SelectItem value="textiles_readymade_garments">Textiles & Readymade Garments</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="note_books_stationary">Note Books / Stationary</SelectItem>
                      <SelectItem value="tobacco_cigarette">Tobacco & Cigarette</SelectItem>
                      <SelectItem value="imported_packages">Imported Packages</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Liquor & Beverages</div>
                      <SelectItem value="spirituous_liquor_beer">Spirituous Liquor including Beer</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Other</div>
                      <SelectItem value="cooperative_stores">Co-operative Stores</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* Business Information */}
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
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Finance & Services</div>
                      <SelectItem value="finance_services">Finance & Services</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Retail & Markets</div>
                      <SelectItem value="retail_markets">Retail & Markets</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Industries & Mills</div>
                      <SelectItem value="industries_mills">Industries & Mills</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Fuel, Energy & Utilities</div>
                      <SelectItem value="fuel_energy_utilities">Fuel, Energy & Utilities</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Food & Dairy</div>
                      <SelectItem value="food_dairy">Food & Dairy</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Agriculture & Fertilizers</div>
                      <SelectItem value="agriculture_fertilizers">Agriculture & Fertilizers</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Consumer Goods & Lifestyle</div>
                      <SelectItem value="consumer_goods_lifestyle">Consumer Goods & Lifestyle</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Liquor & Beverages</div>
                      <SelectItem value="liquor_beverages">Liquor & Beverages</SelectItem>
                      
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Other</div>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <SelectItem value="alluri_sitharama_raju">Alluri Sitharama Raju</SelectItem>
                      <SelectItem value="anakapalli">Anakapalli</SelectItem>
                      <SelectItem value="anantapur">Anantapur</SelectItem>
                      <SelectItem value="annamayya">Annamayya</SelectItem>
                      <SelectItem value="bapatla">Bapatla</SelectItem>
                      <SelectItem value="chittoor">Chittoor</SelectItem>
                      <SelectItem value="east_godavari">East Godavari</SelectItem>
                      <SelectItem value="eluru">Eluru</SelectItem>
                      <SelectItem value="guntur">Guntur</SelectItem>
                      <SelectItem value="kakinada">Kakinada</SelectItem>
                      <SelectItem value="konaseema">Konaseema</SelectItem>
                      <SelectItem value="krishna">Krishna</SelectItem>
                      <SelectItem value="kurnool">Kurnool</SelectItem>
                      <SelectItem value="nandyal">Nandyal</SelectItem>
                      <SelectItem value="ntr">NTR</SelectItem>
                      <SelectItem value="palnadu">Palnadu</SelectItem>
                      <SelectItem value="parvathipuram_manyam">Parvathipuram Manyam</SelectItem>
                      <SelectItem value="prakasam">Prakasam</SelectItem>
                      <SelectItem value="sri_potti_sriramulu_nellore">Sri Potti Sriramulu Nellore</SelectItem>
                      <SelectItem value="sri_sathya_sai">Sri Sathya Sai</SelectItem>
                      <SelectItem value="srikakulam">Srikakulam</SelectItem>
                      <SelectItem value="tirupati">Tirupati</SelectItem>
                      <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                      <SelectItem value="vizianagaram">Vizianagaram</SelectItem>
                      <SelectItem value="west_godavari">West Godavari</SelectItem>
                      <SelectItem value="ysr_kadapa">YSR Kadapa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Required Documents</Label>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc1" />
                      <label htmlFor="doc1">Business Registration Certificate</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc2" />
                      <label htmlFor="doc2">PAN Card</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc3" />
                      <label htmlFor="doc3">Address Proof</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc4" />
                      <label htmlFor="doc4">Equipment Specifications</label>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Input type="file" multiple className="hidden" id="file-upload" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" type="button">
                      Choose Files
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Max file size: 10MB. Supported formats: PDF, JPG, PNG
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and confirm that the information provided is accurate.
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <Button variant="outline" type="button" onClick={() => navigate('/applications')}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default NewApplication;