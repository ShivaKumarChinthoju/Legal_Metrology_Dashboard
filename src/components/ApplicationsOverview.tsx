import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Download,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: string;
  applicantName: string;
  type: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected" | "under-review";
  district: string;
  feeStatus: "paid" | "pending" | "waived";
  slaStatus: "safe" | "approaching" | "breached";
}

const ApplicationsOverview = () => {
  const applications: Application[] = [
    {
      id: "APP001",
      applicantName: "Raj Traders Pvt Ltd",
      type: "Weighing Scale License",
      dateSubmitted: "2024-01-15",
      status: "pending",
      district: "Visakhapatnam",
      feeStatus: "paid",
      slaStatus: "approaching"
    },
    {
      id: "APP002", 
      applicantName: "Kumar Industries",
      type: "Fuel Pump Verification",
      dateSubmitted: "2024-01-14",
      status: "approved",
      district: "Guntur",
      feeStatus: "paid",
      slaStatus: "safe"
    },
    {
      id: "APP003",
      applicantName: "Sri Venkatesh Stores",
      type: "Meter Calibration",
      dateSubmitted: "2024-01-12",
      status: "under-review",
      district: "Krishna",
      feeStatus: "pending",
      slaStatus: "breached"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success text-success-foreground";
      case "rejected": return "bg-destructive text-destructive-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "under-review": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSLAColor = (slaStatus: string) => {
    switch (slaStatus) {
      case "safe": return "text-success";
      case "approaching": return "text-warning";
      case "breached": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSLAIcon = (slaStatus: string) => {
    switch (slaStatus) {
      case "safe": return CheckCircle;
      case "approaching": return Clock;
      case "breached": return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => {
            const SLAIcon = getSLAIcon(app.slaStatus);
            return (
              <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-sm">{app.id}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(app.status)}`}
                      >
                        {app.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SLAIcon className={`h-4 w-4 ${getSLAColor(app.slaStatus)}`} />
                      <span className={`text-xs ${getSLAColor(app.slaStatus)}`}>
                        SLA {app.slaStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-sm text-muted-foreground">{app.type}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>District: {app.district}</span>
                    <span>Submitted: {app.dateSubmitted}</span>
                    <Badge variant="outline" className={app.feeStatus === 'paid' ? 'text-success' : 'text-warning'}>
                      Fee {app.feeStatus}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Send Back</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsOverview;