import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Filter
} from "lucide-react";

const RevenueReport = () => {
  const navigate = useNavigate();

  const revenueData = [
    { district: 'Vijayawada', licenses: 45, inspections: 28, penalties: 12, total: 85000 },
    { district: 'Visakhapatnam', licenses: 52, inspections: 35, penalties: 8, total: 95000 },
    { district: 'Guntur', licenses: 38, inspections: 22, penalties: 15, total: 75000 },
    { district: 'Tirupati', licenses: 30, inspections: 18, penalties: 6, total: 54000 },
    { district: 'Kadapa', licenses: 25, inspections: 15, penalties: 10, total: 50000 },
  ];

  const monthlyRevenue = [
    { month: 'Jan', amount: 285000 },
    { month: 'Feb', amount: 310000 },
    { month: 'Mar', amount: 295000 },
    { month: 'Apr', amount: 320000 },
    { month: 'May', amount: 345000 },
    { month: 'Jun', amount: 359000 },
  ];

  const revenueStreams = [
    { type: 'License Fees', amount: 180000, percentage: 50 },
    { type: 'Inspection Fees', amount: 108000, percentage: 30 },
    { type: 'Penalty Collections', amount: 72000, percentage: 20 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Revenue Report</h1>
              <p className="text-muted-foreground">Track revenue streams and collections</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">₹359,000</div>
              <div className="text-sm text-muted-foreground">Total Revenue (June)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">190</div>
              <div className="text-sm text-muted-foreground">New Licenses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">118</div>
              <div className="text-sm text-muted-foreground">Inspection Fees</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">51</div>
              <div className="text-sm text-muted-foreground">Penalties Collected</div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStreams.map(stream => (
                <div key={stream.type} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{stream.type}</h3>
                    <p className="text-sm text-muted-foreground">{stream.percentage}% of total revenue</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{stream.amount.toLocaleString()}</div>
                    <div className="w-24 bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${stream.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* District Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>District-wise Revenue Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map(district => (
                <Card key={district.district} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{district.district}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>{district.licenses} licenses</span>
                        <span>{district.inspections} inspections</span>
                        <span>{district.penalties} penalties</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{district.total.toLocaleString()}</div>
                      <Badge variant="outline">This Month</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {monthlyRevenue.map(month => (
                <div key={month.month} className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">{month.month}</div>
                  <div className="font-bold">₹{(month.amount / 1000)}K</div>
                  <div className="w-full bg-muted rounded-full h-20 relative">
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-full"
                      style={{ height: `${(month.amount / 400000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueReport;