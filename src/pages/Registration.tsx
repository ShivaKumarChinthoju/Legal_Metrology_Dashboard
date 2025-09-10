import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  MapPin, 
  IndianRupee,
  Building2,
  Truck,
  Scale,
  Package,
  Import,
  Store,
  Wrench,
  CheckCircle
} from "lucide-react";
import ApiServiceV1 from '@/Utils/ApiServiceV1';

const Registration = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [applicationList, setApplicationList] = useState([])

  const registrations = [
    { 
      id: "REG001", 
      businessName: "Krishna Trading Co.", 
      type: "weighbridge", 
      status: "approved", 
      applicationDate: "2024-12-10", 
      fee: 5000,
      district: "Krishna",
      workflow: "Certificate Generated"
    },
    { 
      id: "REG002", 
      businessName: "Guntur Petrol Station", 
      type: "petrolpump", 
      status: "inspector_review", 
      applicationDate: "2024-12-09", 
      fee: 7500,
      district: "Guntur",
      workflow: "Inspector Verification"
    },
    { 
      id: "REG003", 
      businessName: "Visakha Scales", 
      type: "scale", 
      status: "dc_approval", 
      applicationDate: "2024-12-08", 
      fee: 2500,
      district: "Visakhapatnam",
      workflow: "DC & JC Approval"
    },
    { 
      id: "REG004", 
      businessName: "Tirupati Packers", 
      type: "packer", 
      status: "payment_pending", 
      applicationDate: "2024-12-07", 
      fee: 3000,
      district: "Chittoor",
      workflow: "Payment Processing"
    },
    { 
      id: "REG005", 
      businessName: "Global Importers", 
      type: "importer", 
      status: "document_verification", 
      applicationDate: "2024-12-06", 
      fee: 4000,
      district: "Visakhapatnam",
      workflow: "Document Validation"
    }
  ];

  const businessTypeIcons = {
    weighbridge: Truck,
    petrolpump: Building2,
    scale: Scale,
    packer: Package,
    importer: Import,
    dealer: Store,
    repairer: Wrench
  };

  const businessTypeLabels = {
    weighbridge: "Weighbridge",
    petrolpump: "Petrol Pump",
    scale: "Scale",
    packer: "Packer",
    importer: "Importer",
    dealer: "Dealer",
    repairer: "Repairer"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'payment_pending': return 'bg-orange-100 text-orange-800';
      case 'inspector_review': return 'bg-blue-100 text-blue-800';
      case 'dc_approval': return 'bg-purple-100 text-purple-800';
      case 'document_verification': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    const matchesType = typeFilter === "all" || reg.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const registrationStats = {
    total: registrations.length,
    approved: registrations.filter(r => r.status === 'approved').length,
    pending: registrations.filter(r => r.status !== 'approved' && r.status !== 'rejected').length,
    rejected: registrations.filter(r => r.status === 'rejected').length
  };

   const fetchApplicationList = async () => {
      try {
        const response = await ApiServiceV1.get("/getapplications")
        if (response.status === 200) {
          setApplicationList(response.data.applications)
          return
        }
      } catch (error) {
  
        return error
      }
    }
  
    useEffect(() => {
      fetchApplicationList()
    }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Registration Management</h1>
            <p className="text-muted-foreground">
              Manage Legal Metrology business registrations and workflow
            </p>
          </div>
          <Button onClick={() => navigate('/registration/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Registration
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{registrationStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Registrations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{registrationStats.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{registrationStats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{registrationStats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Business Type Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(businessTypeLabels).map(([key, label]) => {
                const IconComponent = businessTypeIcons[key as keyof typeof businessTypeIcons];
                const count = registrations.filter(r => r.type === key).length;
                return (
                  <Card key={key} className="hover:shadow-md cursor-pointer" onClick={() => navigate(`/registration/new?type=${key}`)}>
                    <CardContent className="p-4 text-center">
                      <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold text-sm">{label}</h3>
                      <p className="text-xs text-muted-foreground">{count} registered</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="inspector_review">Inspector Review</SelectItem>
                  <SelectItem value="dc_approval">DC Approval</SelectItem>
                  <SelectItem value="payment_pending">Payment Pending</SelectItem>
                  <SelectItem value="document_verification">Document Verification</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Districts (26)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="srikakulam">Srikakulam</SelectItem>
                  <SelectItem value="vizianagaram">Vizianagaram</SelectItem>
                  <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                  <SelectItem value="east-godavari">East Godavari</SelectItem>
                  <SelectItem value="west-godavari">West Godavari</SelectItem>
                  <SelectItem value="krishna">Krishna</SelectItem>
                  <SelectItem value="guntur">Guntur</SelectItem>
                  <SelectItem value="prakasam">Prakasam</SelectItem>
                  <SelectItem value="nellore">Nellore</SelectItem>
                  <SelectItem value="chittoor">Chittoor</SelectItem>
                  <SelectItem value="kadapa">Kadapa</SelectItem>
                  <SelectItem value="anantapur">Anantapur</SelectItem>
                  <SelectItem value="kurnool">Kurnool</SelectItem>
                  <SelectItem value="potti-sriramulu-nellore">Potti Sriramulu Nellore</SelectItem>
                  <SelectItem value="sri-potti-sriramulu-nellore">Sri Potti Sriramulu Nellore</SelectItem>
                  <SelectItem value="alluri-sitharama-raju">Alluri Sitharama Raju</SelectItem>
                  <SelectItem value="anakapalli">Anakapalli</SelectItem>
                  <SelectItem value="kakinada">Kakinada</SelectItem>
                  <SelectItem value="konaseema">Konaseema</SelectItem>
                  <SelectItem value="eluru">Eluru</SelectItem>
                  <SelectItem value="ntr">NTR</SelectItem>
                  <SelectItem value="bapatla">Bapatla</SelectItem>
                  <SelectItem value="palnadu">Palnadu</SelectItem>
                  <SelectItem value="tirupati">Tirupati</SelectItem>
                  <SelectItem value="annamayya">Annamayya</SelectItem>
                  <SelectItem value="sri-sathya-sai">Sri Sathya Sai</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.entries(businessTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Applications ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration ID</TableHead>
                  <TableHead>Business Details</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Workflow Stage</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => {
                  const IconComponent = businessTypeIcons[registration.type as keyof typeof businessTypeIcons];
                  return (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{registration.businessName}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {registration.district}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {registration.applicationDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {businessTypeLabels[registration.type as keyof typeof businessTypeLabels]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(registration.status)}>
                          {registration.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{registration.workflow}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {registration.fee.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/registration/${registration.id}/details`)}>
                            <FileText className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/registration/${registration.id}/verify`)}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verify
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registration;