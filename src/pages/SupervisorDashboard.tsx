import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  BarChart3,
  Clock,
  IndianRupee,
  Calendar,
  ClipboardList
} from "lucide-react";
import { toast } from "sonner";

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  const performanceData = [
    { inspector: "Rajesh Kumar", inspections: 25, compliance: 92, pending: 3 },
    { inspector: "Priya Sharma", inspections: 20, compliance: 88, pending: 5 },
    { inspector: "Suresh Reddy", inspections: 18, compliance: 95, pending: 2 },
  ];

  const pendingReviews = [
    { id: "REV001", business: "ABC Traders", inspector: "Rajesh Kumar", type: "License Renewal", priority: "high", submitted: "2 hours ago" },
    { id: "REV002", business: "XYZ Industries", inspector: "Priya Sharma", type: "Compliance Check", priority: "medium", submitted: "1 day ago" },
    { id: "REV003", business: "Sunrise Enterprises", inspector: "Suresh Reddy", type: "Violation Report", priority: "high", submitted: "3 hours ago" },
  ];

  const pendingApprovals = [
    { id: "APP001", type: "Weighbridge Registration", business: "Krishna Trading", inspector: "Rajesh Kumar", priority: "high" },
    { id: "APP002", type: "Scale Verification", business: "Guntur Metals", inspector: "Priya Sharma", priority: "medium" },
    { id: "APP003", type: "Petrol Pump License", business: "Visakha Industries", inspector: "Suresh Reddy", priority: "high" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReview = (id: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    toast.success(`Review ${actionText} successfully`);
    
    // In real app, would update the backend here
    console.log(`Review ${id} ${actionText}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Supervisor Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor performance and review inspection cases
            </p>
          </div>
          <Button onClick={() => navigate('/performance-reports')}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance Reports
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Active Inspectors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">63</div>
              <div className="text-sm text-muted-foreground">Inspections This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">10</div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">92%</div>
              <div className="text-sm text-muted-foreground">Avg Compliance</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map(review => (
                <Card key={review.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-orange-500" />
                        <div>
                          <h3 className="font-semibold">{review.business}</h3>
                          <p className="text-sm text-muted-foreground">
                            Inspector: {review.inspector} • {review.type}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted: {review.submitted}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority.toUpperCase()}
                        </Badge>
                        <div className="mt-2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReview(review.id, 'reject')}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleReview(review.id, 'approve')}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Inspection Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => navigate('/schedule-inspection')}>
                <Clock className="h-4 w-4 mr-2" />
                Schedule New Inspection
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/today-inspections')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Today's Inspections
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/weekly-inspections')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Weekly Inspections
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/monthly-inspections')}>
                <FileText className="h-4 w-4 mr-2" />
                Monthly Inspections
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => navigate('/performance-reports')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Performance Reports
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/compliance-analytics')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Compliance Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/revenue-report')}>
                <IndianRupee className="h-4 w-4 mr-2" />
                Revenue Reports
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/inspector-analytics')}>
                <Users className="h-4 w-4 mr-2" />
                Inspector Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/generate-report')}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;