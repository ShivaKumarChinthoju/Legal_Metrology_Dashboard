import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  ArrowRight,
  Bell,
  Settings,
  Eye
} from "lucide-react";

const SLAMonitoring = () => {
  const navigate = useNavigate();
  const slaData = [
    {
      category: "License Applications",
      total: 45,
      safe: 28,
      approaching: 12,
      breached: 5,
      avgProcessingTime: "12 days",
      slaLimit: "15 days"
    },
    {
      category: "Verification Requests", 
      total: 32,
      safe: 22,
      approaching: 8,
      breached: 2,
      avgProcessingTime: "5 days",
      slaLimit: "7 days"
    },
    {
      category: "Inspection Reports",
      total: 28,
      safe: 18,
      approaching: 7,
      breached: 3,
      avgProcessingTime: "8 days", 
      slaLimit: "10 days"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "breach",
      message: "5 license applications exceeded 15-day SLA",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      type: "approaching",
      message: "12 applications approaching deadline in 2 days",
      time: "4 hours ago", 
      priority: "medium"
    },
    {
      id: 3,
      type: "reminder",
      message: "3 inspection reports pending officer review",
      time: "6 hours ago",
      priority: "low"
    }
  ];

  const getSLAColor = (type: string) => {
    switch (type) {
      case "safe": return "bg-success text-success-foreground";
      case "approaching": return "bg-warning text-warning-foreground";
      case "breached": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-primary bg-primary/5";
      default: return "border-l-muted";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SLA Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">SLA Monitoring</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configure Alerts
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {slaData.map((item) => (
              <div key={item.category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{item.category}</h4>
                  <span className="text-sm text-muted-foreground">
                    {item.total} total
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getSLAColor("safe")}`}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {item.safe} Safe
                  </Badge>
                  <Badge className={`text-xs ${getSLAColor("approaching")}`}>
                    <Clock className="h-3 w-3 mr-1" />
                    {item.approaching} Approaching
                  </Badge>
                  <Badge className={`text-xs ${getSLAColor("breached")}`}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {item.breached} Breached
                  </Badge>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg: {item.avgProcessingTime}</span>
                  <span>SLA: {item.slaLimit}</span>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-success via-warning to-destructive h-2 rounded-full relative">
                    <div 
                      className="absolute left-0 top-0 h-2 bg-success rounded-l-full"
                      style={{ width: `${(item.safe / item.total) * 100}%` }}
                    />
                    <div 
                      className="absolute top-0 h-2 bg-warning"
                      style={{ 
                        left: `${(item.safe / item.total) * 100}%`,
                        width: `${(item.approaching / item.total) * 100}%` 
                      }}
                    />
                    <div 
                      className="absolute right-0 top-0 h-2 bg-destructive rounded-r-full"
                      style={{ width: `${(item.breached / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SLA Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">SLA Alerts</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
              <Eye className="h-4 w-4 mr-1" />
              View All Alerts
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 border-l-4 rounded-lg ${getAlertColor(alert.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {alert.type === "breach" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      {alert.type === "approaching" && <Clock className="h-4 w-4 text-warning" />}
                      {alert.type === "reminder" && <Bell className="h-4 w-4 text-primary" />}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          alert.priority === "high" ? "text-destructive" :
                          alert.priority === "medium" ? "text-warning" : "text-primary"
                        }`}
                      >
                        {alert.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/notifications')}>
              View All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAMonitoring;