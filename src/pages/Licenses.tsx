import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Map, IndianRupee, Navigation } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import LicenseMap from "@/components/LicenseMap";

const licenseData = [
  {
    id: "LIC001",
    applicant: "Rajesh Kumar",
    type: "Dealer License",
    district: "Visakhapatnam",
    status: "approved",
    dateApplied: "2024-01-15",
    validUntil: "2026-01-15",
    feeStatus: "paid"
  },
  {
    id: "LIC002", 
    applicant: "Priya Industries",
    type: "Manufacturer License",
    district: "Hyderabad",
    status: "pending",
    dateApplied: "2024-01-20",
    validUntil: "-",
    feeStatus: "pending"
  },
  {
    id: "LIC003",
    applicant: "Srinivas Repairs",
    type: "Repairer License", 
    district: "Guntur",
    status: "expired",
    dateApplied: "2022-03-10",
    validUntil: "2024-03-10",
    feeStatus: "paid"
  },
  {
    id: "LIC004",
    applicant: "Modern Weighing Solutions",
    type: "Dealer License",
    district: "Vijayawada",
    status: "rejected",
    dateApplied: "2024-01-25",
    validUntil: "-",
    feeStatus: "refunded"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-success/20 text-success border-success/30"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
    case "pending":
      return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    case "rejected":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
    case "expired":
      return <Badge className="bg-muted text-muted-foreground"><AlertTriangle className="w-3 h-3 mr-1" />Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Licenses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showMap, setShowMap] = useState(false);

  const allDistricts = [
    "Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Annamayya", "Bapatla", 
    "Chittoor", "East Godavari", "Eluru", "Guntur", "Kakinada", "Konaseema", 
    "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", 
    "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Srikakulam", 
    "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ];

  const openGoogleMapsNavigation = (district: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${encodeURIComponent(district + ', Andhra Pradesh, India')}`;
        window.open(url, '_blank');
      }, () => {
        // Fallback if geolocation fails
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(district + ', Andhra Pradesh, India')}`;
        window.open(url, '_blank');
      });
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(district + ', Andhra Pradesh, India')}`;
      window.open(url, '_blank');
    }
  };

  // Remove this section and add LicenseMap component instead

  const filteredLicenses = licenseData.filter(license => {
    return (
      license.applicant.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDistrict === "" || selectedDistrict === "all" || license.district === selectedDistrict) &&
      (selectedStatus === "" || selectedStatus === "all" || license.status === selectedStatus)
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <LicenseMap isOpen={showMap} onClose={() => setShowMap(false)} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">License Management</h1>
          <p className="text-muted-foreground">Manage license applications and renewals</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
          New License Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">-5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
            <div className="h-4 w-4 rounded-full bg-gradient-primary"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>License Database</CardTitle>
          <CardDescription>Search and filter license applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by applicant name or license ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {allDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Licenses ({licenseData.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({licenseData.filter(l => l.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({licenseData.filter(l => l.status === 'approved').length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({licenseData.filter(l => l.status === 'rejected').length})</TabsTrigger>
              <TabsTrigger value="expired">Expired ({licenseData.filter(l => l.status === 'expired').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">{license.id}</TableCell>
                      <TableCell>{license.applicant}</TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.district}</TableCell>
                      <TableCell>{getStatusBadge(license.status)}</TableCell>
                      <TableCell>{license.validUntil}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/licenses/${license.id}/details`)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowMap(true)}>
                            <Map className="h-4 w-4 mr-1" />
                            Map
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openGoogleMapsNavigation(license.district)}>
                            <Navigation className="h-4 w-4 mr-1" />
                            Navigate
                          </Button>
                          {license.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-success hover:bg-success/90">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.filter(l => l.status === 'pending').map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">{license.id}</TableCell>
                      <TableCell>{license.applicant}</TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.district}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/licenses/${license.id}/details`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.filter(l => l.status === 'approved').map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">{license.id}</TableCell>
                      <TableCell>{license.applicant}</TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.district}</TableCell>
                      <TableCell>{license.validUntil}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/licenses/${license.id}/details`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="rejected" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.filter(l => l.status === 'rejected').map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">{license.id}</TableCell>
                      <TableCell>{license.applicant}</TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.district}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/licenses/${license.id}/details`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="expired" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Expired On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.filter(l => l.status === 'expired').map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">{license.id}</TableCell>
                      <TableCell>{license.applicant}</TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.district}</TableCell>
                      <TableCell>{license.validUntil}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/licenses/${license.id}/details`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Footer />
    </div>
  );
}