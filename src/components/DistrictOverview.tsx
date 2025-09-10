import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface DistrictOverviewProps {
  onViewMap?: () => void;
}

const DistrictOverview = ({ onViewMap }: DistrictOverviewProps) => {
  const districts = [
    {
      name: "Visakhapatnam",
      applications: 234,
      approved: 189,
      pending: 32,
      rejected: 13,
      revenue: "₹4.2L",
      slaCompliance: 87,
      inspections: 45
    },
    {
      name: "Guntur", 
      applications: 198,
      approved: 156,
      pending: 28,
      rejected: 14,
      revenue: "₹3.8L",
      slaCompliance: 92,
      inspections: 38
    },
    {
      name: "Krishna",
      applications: 167,
      approved: 142,
      pending: 18,
      rejected: 7,
      revenue: "₹3.1L", 
      slaCompliance: 94,
      inspections: 31
    },
    {
      name: "West Godavari",
      applications: 145,
      approved: 118,
      pending: 22,
      rejected: 5,
      revenue: "₹2.9L",
      slaCompliance: 89,
      inspections: 28
    }
  ];

  const getSLAColor = (compliance: number) => {
    if (compliance >= 90) return "text-success";
    if (compliance >= 80) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">District Performance</CardTitle>
            <Button variant="outline" size="sm" onClick={onViewMap}>
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {districts.map((district, index) => (
            <div key={district.name} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{district.name}</h4>
                    <p className="text-sm text-muted-foreground">{district.applications} total applications</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{district.revenue}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-semibold text-success">{district.approved}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-warning">{district.pending}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">{district.inspections}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Inspections</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className={`h-4 w-4 ${getSLAColor(district.slaCompliance)}`} />
                    <span className={`font-semibold ${getSLAColor(district.slaCompliance)}`}>
                      {district.slaCompliance}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">SLA</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {Math.round((district.approved / district.applications) * 100)}% Approval Rate
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getSLAColor(district.slaCompliance)}`}
                >
                  SLA Compliance: {district.slaCompliance}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistrictOverview;