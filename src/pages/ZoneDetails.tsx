import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, MapPin, Users, Building, TrendingUp, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";

const ZoneDetails = () => {
  const navigate = useNavigate();
  const { zoneId } = useParams();

  const zoneData = {
    id: zoneId,
    name: "Coastal Zone A",
    region: "Eastern Andhra Pradesh",
    districts: ["Visakhapatnam", "East Godavari", "West Godavari", "Krishna"],
    supervisor: "Ramesh Naidu",
    totalBusinesses: 1847,
    activeInspectors: 23,
    pendingInspections: 67,
    completedThisMonth: 234,
    complianceRate: 91.2,
    lastUpdated: "2024-12-16"
  };

  const districtStats = [
    { district: "Visakhapatnam", businesses: 567, inspectors: 8, compliance: 94.5, pending: 12 },
    { district: "East Godavari", businesses: 423, inspectors: 6, compliance: 89.2, pending: 18 },
    { district: "West Godavari", businesses: 398, inspectors: 5, compliance: 88.7, pending: 21 },
    { district: "Krishna", businesses: 459, inspectors: 4, compliance: 92.1, pending: 16 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/districts')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Districts
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{zoneData.name}</h1>
              <p className="text-muted-foreground">{zoneData.region}</p>
            </div>
          </div>
        </div>

        {/* Zone Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
              <Building className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{zoneData.totalBusinesses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered entities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Inspectors</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{zoneData.activeInspectors}</div>
              <p className="text-xs text-muted-foreground">Field officers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{zoneData.complianceRate}%</div>
              <p className="text-xs text-muted-foreground">Average across zone</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
              <Calendar className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{zoneData.pendingInspections}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Zone Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>District Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District</TableHead>
                    <TableHead>Businesses</TableHead>
                    <TableHead>Inspectors</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {districtStats.map((district) => (
                    <TableRow key={district.district}>
                      <TableCell className="font-medium">{district.district}</TableCell>
                      <TableCell>{district.businesses}</TableCell>
                      <TableCell>{district.inspectors}</TableCell>
                      <TableCell>
                        <Badge variant={district.compliance >= 90 ? "default" : "secondary"}>
                          {district.compliance}%
                        </Badge>
                      </TableCell>
                      <TableCell>{district.pending}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zone Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Zone Supervisor</label>
                <p className="text-sm">{zoneData.supervisor}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Districts Covered</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {zoneData.districts.map((district) => (
                    <Badge key={district} variant="outline" className="text-xs">
                      {district}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Completed This Month</label>
                <p className="text-sm">{zoneData.completedThisMonth} inspections</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p className="text-sm">{zoneData.lastUpdated}</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Zone Map
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Generate Zone Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZoneDetails;