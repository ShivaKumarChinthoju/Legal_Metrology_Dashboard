import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Users, Building2, Target, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const DistrictAnalytics = () => {
  const navigate = useNavigate();

  const analyticsData = {
    overview: {
      totalDistricts: 13,
      activeInspectors: 81,
      avgSlaCompliance: 85,
      licensedEntities: 3527,
      monthlyGrowth: 12
    },
    districtPerformance: [
      { district: 'Hyderabad', compliance: 94, inspections: 138, target: 150, efficiency: 92 },
      { district: 'Visakhapatnam', compliance: 89, inspections: 115, target: 120, efficiency: 96 },
      { district: 'Vijayawada', compliance: 76, inspections: 72, target: 80, efficiency: 90 },
      { district: 'Guntur', compliance: 92, inspections: 58, target: 60, efficiency: 97 },
      { district: 'Kurnool', compliance: 68, inspections: 35, target: 40, efficiency: 88 }
    ],
    trends: {
      complianceGrowth: [78, 81, 83, 85, 87, 85],
      inspectionVolume: [420, 456, 482, 501, 523, 518],
      revenueGrowth: [185000, 198000, 210000, 225000, 238000, 245000]
    },
    zoneComparison: [
      { zone: 'Central', districts: 3, avgCompliance: 91, totalInspectors: 25 },
      { zone: 'North Coastal', districts: 4, avgCompliance: 87, totalInspectors: 18 },
      { zone: 'South Central', districts: 5, avgCompliance: 84, totalInspectors: 22 },
      { zone: 'Rayalaseema', districts: 4, avgCompliance: 79, totalInspectors: 16 }
    ]
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-success';
    if (compliance >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getComplianceBadge = (compliance: number) => {
    if (compliance >= 90) return <Badge className="bg-success/20 text-success border-success/30">Excellent</Badge>;
    if (compliance >= 75) return <Badge className="bg-warning/20 text-warning border-warning/30">Good</Badge>;
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Needs Improvement</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/districts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Districts
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">District Performance Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive performance analysis and trends
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{analyticsData.overview.totalDistricts}</div>
              <div className="text-sm text-muted-foreground">Total Districts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{analyticsData.overview.activeInspectors}</div>
              <div className="text-sm text-muted-foreground">Active Inspectors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{analyticsData.overview.avgSlaCompliance}%</div>
              <div className="text-sm text-muted-foreground">Avg SLA Compliance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{analyticsData.overview.licensedEntities.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Licensed Entities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">+{analyticsData.overview.monthlyGrowth}%</div>
              <div className="text-sm text-muted-foreground">Monthly Growth</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* District Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                District Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.districtPerformance.map((district) => (
                  <div key={district.district} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{district.district}</span>
                      {getComplianceBadge(district.compliance)}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Compliance: </span>
                        <span className={`font-semibold ${getComplianceColor(district.compliance)}`}>
                          {district.compliance}%
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Inspections: </span>
                        <span className="font-semibold">{district.inspections}/{district.target}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Efficiency: </span>
                        <span className="font-semibold">{district.efficiency}%</span>
                      </div>
                    </div>
                    <Progress value={district.compliance} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Zone-wise Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.zoneComparison.map((zone) => (
                  <div key={zone.zone} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{zone.zone} Zone</h4>
                      <Badge variant="outline">{zone.districts} Districts</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="text-lg font-bold text-primary">{zone.avgCompliance}%</div>
                        <div className="text-xs text-muted-foreground">Avg Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="text-lg font-bold text-success">{zone.totalInspectors}</div>
                        <div className="text-xs text-muted-foreground">Inspectors</div>
                      </div>
                    </div>
                    <Progress value={zone.avgCompliance} className="h-2 mt-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>6 months trend</span>
                  <span className="text-success">+7% improvement</span>
                </div>
                <div className="flex items-end justify-between h-20">
                  {analyticsData.trends.complianceGrowth.map((value, index) => (
                    <div
                      key={index}
                      className="bg-primary rounded-t"
                      style={{
                        height: `${(value / Math.max(...analyticsData.trends.complianceGrowth)) * 60}px`,
                        width: '12px'
                      }}
                    />
                  ))}
                </div>
                <div className="text-center text-2xl font-bold text-primary">
                  {analyticsData.trends.complianceGrowth[analyticsData.trends.complianceGrowth.length - 1]}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inspection Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly inspections</span>
                  <span className="text-success">+23% increase</span>
                </div>
                <div className="flex items-end justify-between h-20">
                  {analyticsData.trends.inspectionVolume.map((value, index) => (
                    <div
                      key={index}
                      className="bg-success rounded-t"
                      style={{
                        height: `${(value / Math.max(...analyticsData.trends.inspectionVolume)) * 60}px`,
                        width: '12px'
                      }}
                    />
                  ))}
                </div>
                <div className="text-center text-2xl font-bold text-success">
                  {analyticsData.trends.inspectionVolume[analyticsData.trends.inspectionVolume.length - 1].toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fee collection trend</span>
                  <span className="text-accent">+32% growth</span>
                </div>
                <div className="flex items-end justify-between h-20">
                  {analyticsData.trends.revenueGrowth.map((value, index) => (
                    <div
                      key={index}
                      className="bg-accent rounded-t"
                      style={{
                        height: `${(value / Math.max(...analyticsData.trends.revenueGrowth)) * 60}px`,
                        width: '12px'
                      }}
                    />
                  ))}
                </div>
                <div className="text-center text-2xl font-bold text-accent">
                  ₹{(analyticsData.trends.revenueGrowth[analyticsData.trends.revenueGrowth.length - 1] / 1000).toFixed(0)}K
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-success">Positive Trends</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Overall compliance improved by 7% over 6 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Hyderabad and Guntur consistently exceed targets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Revenue collection increased by 32%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-warning">Areas for Improvement</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Kurnool and Vijayawada need additional inspector support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Rayalaseema zone shows lower compliance rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Training programs needed for rural districts</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default DistrictAnalytics;