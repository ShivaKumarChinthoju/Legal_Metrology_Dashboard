import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  IndianRupee, 
  TrendingUp, 
  Calendar,
  Target
} from "lucide-react";

const RevenueCards = () => {
  const revenueData = [
    {
      title: "License Revenue",
      amount: "₹12.4L",
      target: "₹15L",
      progress: 83,
      change: "+8.2%",
      period: "This Month",
      icon: IndianRupee,
      color: "text-success"
    },
    {
      title: "Verification Fees", 
      amount: "₹8.7L",
      target: "₹10L", 
      progress: 87,
      change: "+12.5%",
      period: "This Month",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Penalty Collection",
      amount: "₹3.2L",
      target: "₹4L",
      progress: 80,
      change: "+15.3%", 
      period: "This Month",
      icon: TrendingUp,
      color: "text-warning"
    },
    {
      title: "Annual Target",
      amount: "₹145L",
      target: "₹180L",
      progress: 81,
      change: "+6.8%",
      period: "YTD Progress",
      icon: Calendar,
      color: "text-government-green"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {revenueData.map((item) => (
        <Card key={item.title} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`h-5 w-5 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold text-foreground">{item.amount}</div>
                <div className={`text-sm font-medium ${item.color}`}>
                  {item.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: {item.target}</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
              
              <p className="text-xs text-muted-foreground">
                {item.period}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RevenueCards;