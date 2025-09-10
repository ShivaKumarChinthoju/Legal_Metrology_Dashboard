import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  PieChart,
  Download,
  Filter
} from "lucide-react";

const ComplianceAnalytics = () => {
  const navigate = useNavigate();

  const complianceData = [
    { district: 'Vijayawada', total: 150, compliant: 135, rate: 90 },
    { district: 'Visakhapatnam', total: 180, compliant: 162, rate: 90 },
    { district: 'Guntur', total: 120, compliant: 102, rate: 85 },
    { district: 'Tirupati', total: 90, compliant: 72, rate: 80 },
    { district: 'Kadapa', total: 75, compliant: 56, rate: 75 },
  ];

  const violationTypes = [
    { type: 'Expired License', count: 25, severity: 'high' },
    { type: 'Calibration Issues', count: 18, severity: 'medium' },
    { type: 'Missing Documentation', count: 15, severity: 'low' },
    { type: 'Safety Violations', count: 12, severity: 'high' },
    { type: 'Record Keeping', count: 8, severity: 'medium' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Compliance Analytics</h1>
              <p className="text-muted-foreground">Monitor compliance rates across districts</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground">Overall Compliance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">615</div>
              <div className="text-sm text-muted-foreground">Total Inspections</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">78</div>
              <div className="text-sm text-muted-foreground">Non-Compliant</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
            </CardContent>
          </Card>
        </div>

        {/* District Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              District-wise Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceData.map(district => (
                <div key={district.district} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{district.district}</h3>
                    <p className="text-sm text-muted-foreground">
                      {district.compliant} of {district.total} compliant
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{district.rate}%</div>
                    <Badge variant={district.rate >= 85 ? "default" : "secondary"}>
                      {district.rate >= 85 ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${district.rate >= 85 ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${district.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Violation Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Common Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {violationTypes.map(violation => (
                <div key={violation.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{violation.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{violation.count} cases</span>
                    <Badge className={getSeverityColor(violation.severity)}>
                      {violation.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Compliance Trends (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4 text-center">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                const rates = [82, 85, 88, 87, 89, 87];
                return (
                  <div key={month} className="space-y-2">
                    <div className="text-sm text-muted-foreground">{month}</div>
                    <div className="text-lg font-bold">{rates[index]}%</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${rates[index]}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceAnalytics;