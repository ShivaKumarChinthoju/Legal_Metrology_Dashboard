import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, FileText, Clock, CheckCircle, XCircle, Download } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: "APP001",
      type: "Weighing Scale License",
      businessName: "My Shop",
      status: "approved",
      submittedDate: "2024-11-15",
      approvedDate: "2024-11-20",
      validUntil: "2026-11-20",
      licenseNumber: "WS/2024/001",
      shopAddress: "123 Main Street, Vijayawada"
    },
    {
      id: "APP002",
      type: "Fuel Pump Verification",
      businessName: "Gas Station",
      status: "pending",
      submittedDate: "2024-12-01",
      approvedDate: null,
      validUntil: null,
      licenseNumber: null,
      shopAddress: "456 Highway Road, Krishna"
    },
    {
      id: "APP003",
      type: "Gas Meter Calibration",
      businessName: "Restaurant",
      status: "under_review",
      submittedDate: "2024-12-10",
      approvedDate: null,
      validUntil: null,
      licenseNumber: null,
      shopAddress: "789 Food Street, Guntur"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/20 text-success border-success/30"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "under_review":
        return <Badge className="bg-primary/20 text-primary border-primary/30"><FileText className="w-3 h-3 mr-1" />Under Review</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    return app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Portal</h1>
          <p className="text-muted-foreground">Track your applications and licenses</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/login')}>
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Total submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Licenses</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Active licenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Under processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <div className="h-4 w-4 rounded-full bg-gradient-primary"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* My Applications & Licenses */}
      <Card>
        <CardHeader>
          <CardTitle>My Applications & Licenses</CardTitle>
          <p className="text-muted-foreground">Track your license applications and view active licenses</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={() => navigate('/new-application')}>
              New Application
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>License Type</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell>{application.type}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.businessName}</div>
                      <div className="text-sm text-muted-foreground">{application.shopAddress}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    {application.status === "approved" ? (
                      <div>
                        <div className="text-sm font-medium">Valid until: {application.validUntil}</div>
                        <div className="text-xs text-muted-foreground">License: {application.licenseNumber}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Pending approval</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {application.status === "approved" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;