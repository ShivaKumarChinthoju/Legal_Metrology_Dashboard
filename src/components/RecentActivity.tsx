import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, FileText, Map } from "lucide-react";
import { useState } from "react";
import InlineDistrictMap from "./InlineDistrictMap";

const RecentActivity = () => {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <div className="space-y-4">
        <InlineDistrictMap onBack={() => setShowMap(false)} />
      </div>
    );
  }
  const activities = [
    {
      id: 1,
      title: "Scale Verification Completed",
      description: "Digital weighing scale - Shop ID: WS001",
      time: "2 hours ago",
      status: "completed",
      type: "verification",
    },
    {
      id: 2,
      title: "OCR Document Processed",
      description: "Certificate extraction - Batch ID: DOC234",
      time: "4 hours ago",
      status: "processing",
      type: "document",
    },
    {
      id: 3,
      title: "Inspection Scheduled",
      description: "Fuel pump calibration - Station ID: FP456",
      time: "6 hours ago",
      status: "pending",
      type: "inspection",
    },
    {
      id: 4,
      title: "Digital Signature Applied",
      description: "Compliance certificate - Ref: CERT789",
      time: "1 day ago",
      status: "completed",
      type: "signature",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "processing":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "verification":
        return CheckCircle;
      case "document":
        return FileText;
      case "inspection":
        return AlertCircle;
      case "signature":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Applications
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowMap(true)}>
            <Map className="h-4 w-4 mr-2" />
            View Map
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusColor(activity.status)}`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;