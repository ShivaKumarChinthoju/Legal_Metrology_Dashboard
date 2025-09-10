import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building, MapPin, Phone, Calendar, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const BusinessDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");

  const businesses = [
    {
      id: 1,
      name: "Krishna Trading Co.",
      type: "Wholesale",
      licenseNumber: "LM001234",
      district: "Krishna",
      address: "Main Road, Machilipatnam",
      phone: "+91 9876543210",
      status: "Active",
      registrationDate: "2023-01-15",
      expiryDate: "2025-01-15",
      lastInspection: "2024-11-20",
      revenue: "₹2.8L"
    },
    {
      id: 2,
      name: "Guntur Metals Ltd.",
      type: "Manufacturing",
      licenseNumber: "LM001235",
      district: "Guntur",
      address: "Industrial Area, Guntur",
      phone: "+91 9876543211",
      status: "Active",
      registrationDate: "2022-08-10",
      expiryDate: "2024-08-10",
      lastInspection: "2024-12-01",
      revenue: "₹5.2L"
    },
    {
      id: 3,
      name: "Vijayawada Scales",
      type: "Retail",
      licenseNumber: "LM001236",
      district: "Krishna",
      address: "Commercial Street, Vijayawada",
      phone: "+91 9876543212",
      status: "Expired",
      registrationDate: "2021-05-22",
      expiryDate: "2024-05-22",
      lastInspection: "2024-05-15",
      revenue: "₹1.4L"
    },
    {
      id: 4,
      name: "Visakha Industries",
      type: "Manufacturing",
      licenseNumber: "LM001237",
      district: "Visakhapatnam",
      address: "Port Area, Visakhapatnam",
      phone: "+91 9876543213",
      status: "Active",
      registrationDate: "2023-03-12",
      expiryDate: "2025-03-12",
      lastInspection: "2024-11-28",
      revenue: "₹3.6L"
    },
    {
      id: 5,
      name: "Tirupati Weighing Systems",
      type: "Service",
      licenseNumber: "LM001238",
      district: "Chittoor",
      address: "Temple Street, Tirupati",
      phone: "+91 9876543214",
      status: "Pending Renewal",
      registrationDate: "2022-12-05",
      expiryDate: "2024-12-05",
      lastInspection: "2024-11-25",
      revenue: "₹1.8L"
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || business.status.toLowerCase().replace(" ", "_") === statusFilter;
    const matchesDistrict = districtFilter === "all" || business.district.toLowerCase() === districtFilter;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Expired':
        return 'destructive';
      case 'Pending Renewal':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Registered Businesses</h1>
            <p className="text-muted-foreground">
              Manage licensed business entities and their compliance status
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search businesses or license numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending_renewal">Pending Renewal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="krishna">Krishna</SelectItem>
                  <SelectItem value="guntur">Guntur</SelectItem>
                  <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                  <SelectItem value="chittoor">Chittoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{business.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{business.type}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(business.status) as any}>
                    {business.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-foreground">License:</span>
                    <span className="ml-2 text-muted-foreground">{business.licenseNumber}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{business.district}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{business.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-sm font-semibold text-foreground">{business.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-2">
                    <div className="text-sm font-semibold text-blue-600">{business.expiryDate}</div>
                    <div className="text-xs text-muted-foreground">Expires</div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Reg: {business.registrationDate}
                    </div>
                    <div>
                      Last: {business.lastInspection}
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No businesses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BusinessDetails;