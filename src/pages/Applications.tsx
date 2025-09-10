import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  MoreHorizontal,
  Plus,
  Grid,
  List,
  Edit
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "table">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extended dummy data with more applications
  const applications = [
    { id: "AP001", businessName: "Krishna Trading Co.", type: "New License", status: "pending", date: "2024-12-10", applicant: "Rajesh Kumar", district: "Krishna", priority: "high", phone: "+91 9876543210" },
    { id: "AP002", businessName: "Guntur Metals Ltd.", type: "Renewal", status: "approved", date: "2024-12-09", applicant: "Priya Sharma", district: "Guntur", priority: "medium", phone: "+91 9876543211" },
    { id: "AP003", businessName: "Vijayawada Scales", type: "Modification", status: "under_review", date: "2024-12-08", applicant: "Suresh Reddy", district: "Krishna", priority: "low", phone: "+91 9876543212" },
    { id: "AP004", businessName: "Visakha Industries", type: "New License", status: "pending", date: "2024-12-11", applicant: "Amit Patel", district: "Visakhapatnam", priority: "high", phone: "+91 9876543213" },
    { id: "AP005", businessName: "Tirupati Weighing Systems", type: "Inspection Request", status: "rejected", date: "2024-12-07", applicant: "Lakshmi Devi", district: "Chittoor", priority: "medium", phone: "+91 9876543214" },
    { id: "AP006", businessName: "Kadapa Instruments", type: "New License", status: "approved", date: "2024-12-06", applicant: "Venkat Rao", district: "Kadapa", priority: "low", phone: "+91 9876543215" },
    { id: "AP007", businessName: "Nellore Traders", type: "Renewal", status: "pending", date: "2024-12-12", applicant: "Saritha Reddy", district: "Nellore", priority: "medium", phone: "+91 9876543216" },
    { id: "AP008", businessName: "Kurnool Scales", type: "Modification", status: "approved", date: "2024-12-05", applicant: "Ravi Kumar", district: "Kurnool", priority: "high", phone: "+91 9876543217" },
    { id: "AP009", businessName: "Anantapur Metals", type: "New License", status: "expired", date: "2024-11-28", applicant: "Ramesh Babu", district: "Anantapur", priority: "low", phone: "+91 9876543218" },
    { id: "AP010", businessName: "Prakasam Instruments", type: "Inspection Request", status: "under_review", date: "2024-12-04", applicant: "Kavitha Rani", district: "Prakasam", priority: "medium", phone: "+91 9876543219" },
    { id: "AP011", businessName: "West Godavari Trade", type: "Renewal", status: "expired", date: "2024-11-20", applicant: "Mohan Krishna", district: "West Godavari", priority: "high", phone: "+91 9876543220" },
    { id: "AP012", businessName: "East Godavari Scales", type: "New License", status: "pending", date: "2024-12-13", applicant: "Sita Rama", district: "East Godavari", priority: "medium", phone: "+91 9876543221" }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesDistrict = districtFilter === "all" || app.district.toLowerCase() === districtFilter;
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesDistrict && matchesPriority;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'under_review':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const exportApplications = () => {
    const csvContent = [
      ['Application ID', 'Business Name', 'Type', 'Status', 'Applicant', 'District', 'Date', 'Priority', 'Phone'].join(','),
      ...filteredApplications.map(app => [
        app.id,
        app.businessName,
        app.type,
        app.status,
        app.applicant,
        app.district,
        app.date,
        app.priority,
        app.phone
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applications-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatusCounts = {
    pending: applications.filter(app => app.status === 'pending').length,
    under_review: applications.filter(app => app.status === 'under_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    expired: applications.filter(app => app.status === 'expired').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
            <p className="text-muted-foreground">
              Manage and track all legal metrology applications
            </p>
          </div>
          <Button onClick={() => navigate('/applications/new')}>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate('/applications/pending')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{StatusCounts.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate('/applications/under-review')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{StatusCounts.under_review}</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate('/applications/approved')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{StatusCounts.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate('/applications/rejected')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{StatusCounts.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate('/applications/expired')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{StatusCounts.expired}</div>
              <div className="text-sm text-muted-foreground">Expired</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by application ID, business name, or applicant..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Districts (26)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="srikakulam">Srikakulam</SelectItem>
                  <SelectItem value="vizianagaram">Vizianagaram</SelectItem>
                  <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                  <SelectItem value="east godavari">East Godavari</SelectItem>
                  <SelectItem value="west godavari">West Godavari</SelectItem>
                  <SelectItem value="krishna">Krishna</SelectItem>
                  <SelectItem value="guntur">Guntur</SelectItem>
                  <SelectItem value="prakasam">Prakasam</SelectItem>
                  <SelectItem value="nellore">Nellore</SelectItem>
                  <SelectItem value="chittoor">Chittoor</SelectItem>
                  <SelectItem value="kadapa">Kadapa</SelectItem>
                  <SelectItem value="anantapur">Anantapur</SelectItem>
                  <SelectItem value="kurnool">Kurnool</SelectItem>
                  <SelectItem value="alluri sitharama raju">Alluri Sitharama Raju</SelectItem>
                  <SelectItem value="anakapalli">Anakapalli</SelectItem>
                  <SelectItem value="kakinada">Kakinada</SelectItem>
                  <SelectItem value="konaseema">Konaseema</SelectItem>
                  <SelectItem value="eluru">Eluru</SelectItem>
                  <SelectItem value="ntr">NTR</SelectItem>
                  <SelectItem value="bapatla">Bapatla</SelectItem>
                  <SelectItem value="palnadu">Palnadu</SelectItem>
                  <SelectItem value="tirupati">Tirupati</SelectItem>
                  <SelectItem value="annamayya">Annamayya</SelectItem>
                  <SelectItem value="sri sathya sai">Sri Sathya Sai</SelectItem>
                  <SelectItem value="parvathipuram manyam">Parvathipuram Manyam</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" onClick={exportApplications}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Display */}
        <Card>
          <CardHeader>
            <CardTitle>All Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "list" ? (
              <div className="space-y-4">
                {paginatedApplications.map((application) => (
                  <Card key={application.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(application.status)}
                              <span className="font-semibold text-lg">{application.businessName}</span>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {application.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Badge variant={getPriorityColor(application.priority) as any}>
                              {application.priority.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">ID:</span>
                              <span className="font-medium">{application.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Applicant:</span>
                              <span>{application.applicant}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">District:</span>
                              <span>{application.district}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Date:</span>
                              <span>{application.date}</span>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Type:</span> {application.type} | 
                            <span className="font-medium ml-2">Phone:</span> {application.phone}
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigate(`/applications/${application.id}/details`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Verify application', application.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Verify Application
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/applications/${application.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Application
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              const element = document.createElement('a');
                              element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(application, null, 2))}`;
                              element.download = `application-${application.id}.json`;
                              element.click();
                            }}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.businessName}</TableCell>
                      <TableCell>{application.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.applicant}</TableCell>
                      <TableCell>{application.district}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(application.priority) as any}>
                          {application.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm px-3 py-1 bg-muted rounded">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No applications found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Applications;