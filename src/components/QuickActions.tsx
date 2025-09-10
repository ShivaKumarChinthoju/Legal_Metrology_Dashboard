import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Scan, 
  FileText, 
  Calendar, 
  Shield, 
  Search, 
  Upload 
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "OCR Verification",
      description: "AI-powered document scanning",
      icon: Scan,
      action: "scan",
    },
    {
      title: "New Inspection",
      description: "Schedule equipment inspection",
      icon: Calendar,
      action: "inspect",
    },
    {
      title: "Generate Report",
      description: "Create compliance reports",
      icon: FileText,
      action: "report",
    },
    {
      title: "Digital Signing",
      description: "eSign documents securely",
      icon: Shield,
      action: "sign",
    },
    {
      title: "Search Records",
      description: "Find verification history",
      icon: Search,
      action: "search",
    },
    {
      title: "Upload Documents",
      description: "Add certification files",
      icon: Upload,
      action: "upload",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary transition-colors"
            >
              <action.icon className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;