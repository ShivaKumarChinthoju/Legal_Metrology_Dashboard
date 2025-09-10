import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Clock, CheckCircle, User, MapPin, Calendar, Eye, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";

interface Application {
  id: string;
  businessName: string;
  applicationType: string;
  status: string;
  submittedDate: string;
  district: string;
  applicant: string;
  phone: string;
  priority: string;
}

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const { status } = useParams<{ status: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dummy applications data
  const allApplications: Application[] = [
    // Pending applications
    { id: "AP001", businessName: "Krishna Trading Co.", applicationType: "New License", status: "pending", submittedDate: "2024-12-10", district: "Krishna", applicant: "Rajesh Kumar", phone: "+91 9876543210", priority: "high" },
    { id: "AP002", businessName: "Guntur Metals Ltd.", applicationType: "Renewal", status: "pending", submittedDate: "2024-12-11", district: "Guntur", applicant: "Priya Sharma", phone: "+91 9876543211", priority: "medium" },
    { id: "AP003", businessName: "Vijayawada Scales", applicationType: "Modification", status: "pending", submittedDate: "2024-12-12", district: "Krishna", applicant: "Suresh Reddy", phone: "+91 9876543212", priority: "low" },
    
    // Under Review applications
    { id: "AP004", businessName: "Visakha Industries", applicationType: "New License", status: "under_review", submittedDate: "2024-12-08", district: "Visakhapatnam", applicant: "Amit Patel", phone: "+91 9876543213", priority: "high" },
    { id: "AP005", businessName: "Tirupati Weighing", applicationType: "Inspection", status: "under_review", submittedDate: "2024-12-09", district: "Chittoor", applicant: "Lakshmi Devi", phone: "+91 9876543214", priority: "medium" },
    
    // Approved applications
    { id: "AP006", businessName: "Kadapa Instruments", applicationType: "New License", status: "approved", submittedDate: "2024-12-05", district: "Kadapa", applicant: "Venkat Rao", phone: "+91 9876543215", priority: "low" },
    { id: "AP007", businessName: "Nellore Traders", applicationType: "Renewal", status: "approved", submittedDate: "2024-12-06", district: "Nellore", applicant: "Saritha Reddy", phone: "+91 9876543216", priority: "medium" },
    { id: "AP008", businessName: "Kurnool Scales", applicationType: "Modification", status: "approved", submittedDate: "2024-12-07", district: "Kurnool", applicant: "Ravi Kumar", phone: "+91 9876543217", priority: "high" },
    
    // Rejected applications
    { id: "AP009", businessName: "Anantapur Metals", applicationType: "New License", status: "rejected", submittedDate: "2024-12-03", district: "Anantapur", applicant: "Ramesh Babu", phone: "+91 9876543218", priority: "low" },
    { id: "AP010", businessName: "Prakasam Instruments", applicationType: "Inspection", status: "rejected", submittedDate: "2024-12-04", district: "Prakasam", applicant: "Kavitha Rani", phone: "+91 9876543219", priority: "medium" },
    
    // Expired applications
    { id: "AP011", businessName: "West Godavari Trade", applicationType: "Renewal", status: "expired", submittedDate: "2024-11-15", district: "West Godavari", applicant: "Mohan Krishna", phone: "+91 9876543220", priority: "high" },
    { id: "AP012", businessName: "East Godavari Scales", applicationType: "New License", status: "expired", submittedDate: "2024-11-20", district: "East Godavari", applicant: "Sita Rama", phone: "+91 9876543221", priority: "medium" }
  ];

  const statusMap: { [key: string]: string } = {
    'pending': 'pending',
    'under-review': 'under_review', 
    'approved': 'approved',
    'rejected': 'rejected',
    'expired': 'expired'
  };

  const statusLabels: { [key: string]: string } = {
    'pending': 'Pending Applications',
    'under-review': 'Under Review',
    'approved': 'Approved Applications',
    'rejected': 'Rejected Applications',
    'expired': 'Expired Applications'
  };

  const statusColors: { [key: string]: string } = {
    'pending': 'bg-orange-100 text-orange-800',
    'under_review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'expired': 'bg-gray-100 text-gray-800'
  };

  const currentStatus = statusMap[status || 'pending'];
  const filteredApplications = allApplications.filter(app => {
    const matchesStatus = app.status === currentStatus;
    const matchesSearch = app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === "all" || app.district.toLowerCase() === districtFilter;
    
    return matchesStatus && matchesSearch && matchesDistrict;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'under_review':
        return <FileText className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  const exportData = () => {
    const csvContent = [
      ['Application ID', 'Business Name', 'Type', 'Status', 'Applicant', 'District', 'Date', 'Priority'].join(','),
      ...filteredApplications.map(app => [
        app.id,
        app.businessName,
        app.applicationType,
        app.status,
        app.applicant,
        app.district,
        app.submittedDate,
        app.priority
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${status}-applications.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {statusLabels[status || 'pending']}
            </h1>
            <p className="text-muted-foreground">
              {filteredApplications.length} applications found
            </p>
          </div>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <Input
                  placeholder="Search by business name, ID, or applicant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                  <SelectItem value="kadapa">Kadapa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
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
                      <Badge className={statusColors[application.status]}>
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
                        <span className="text-muted-foreground">Submitted:</span>
                        <span>{application.submittedDate}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Type:</span> {application.applicationType} | 
                      <span className="font-medium ml-2">Phone:</span> {application.phone}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {application.status === 'pending' && (
                      <Button size="sm">
                        Process
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
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
            </CardContent>
          </Card>
        )}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No applications found</h3>
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

export default ApplicationStatus;