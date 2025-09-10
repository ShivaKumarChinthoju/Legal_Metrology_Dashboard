import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Users, 
  Building2, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Edit,
  BarChart3,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const districtData = [
  {
    id: "D001",
    name: "Hyderabad",
    zone: "Central",
    controller: "Dr. Rajesh Kumar",
    inspectors: 12,
    licensedEntities: 1247,
    monthlyTarget: 150,
    monthlyAchieved: 138,
    slaCompliance: 94,
    status: "active",
    population: "10.5M",
    area: "650 sq km"
  },
  {
    id: "D002", 
    name: "Visakhapatnam",
    zone: "North Coastal",
    controller: "Mrs. Priya Sharma",
    inspectors: 8,
    licensedEntities: 892,
    monthlyTarget: 120,
    monthlyAchieved: 115,
    slaCompliance: 89,
    status: "active",
    population: "2.2M",
    area: "681 sq km"
  },
  {
    id: "D003",
    name: "Vijayawada", 
    zone: "South Central",
    controller: "Mr. Suresh Reddy",
    inspectors: 6,
    licensedEntities: 634,
    monthlyTarget: 80,
    monthlyAchieved: 72,
    slaCompliance: 76,
    status: "needs_attention",
    population: "1.7M",
    area: "61 sq km"
  },
  {
    id: "D004",
    name: "Guntur",
    zone: "South Central", 
    controller: "Mrs. Lakshmi Devi",
    inspectors: 5,
    licensedEntities: 456,
    monthlyTarget: 60,
    monthlyAchieved: 58,
    slaCompliance: 92,
    status: "active",
    population: "0.7M",
    area: "168 sq km"
  },
  {
    id: "D005",
    name: "Kurnool",
    zone: "Rayalaseema",
    controller: "Mr. Venkat Rao",
    inspectors: 4,
    licensedEntities: 298,
    monthlyTarget: 40,
    monthlyAchieved: 35,
    slaCompliance: 68,
    status: "underperforming",
    population: "0.5M", 
    area: "2109 sq km"
  }
];

const zoneStats = [
  { zone: "Central", districts: 3, totalInspectors: 25, avgCompliance: 91 },
  { zone: "North Coastal", districts: 4, totalInspectors: 18, avgCompliance: 87 },
  { zone: "South Central", districts: 5, totalInspectors: 22, avgCompliance: 84 },
  { zone: "Rayalaseema", districts: 4, totalInspectors: 16, avgCompliance: 79 }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/20 text-success border-success/30"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
    case "needs_attention":
      return <Badge className="bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1" />Needs Attention</Badge>;
    case "underperforming":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/30"><AlertTriangle className="w-3 h-3 mr-1" />Underperforming</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Districts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredDistricts = districtData.filter(district => {
    return (
      (district.name.toLowerCase().includes(searchTerm.toLowerCase()) || district.controller.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedZone === "" || selectedZone === "all" || district.zone === selectedZone) &&
      (selectedStatus === "" || selectedStatus === "all" || district.status === selectedStatus)
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">District Management</h1>
          <p className="text-muted-foreground">Monitor district performance and resource allocation</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
          <MapPin className="h-4 w-4 mr-2" />
          Add New District
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Districts</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">Across 4 zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Inspectors</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81</div>
            <p className="text-xs text-muted-foreground">Field officers deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg SLA Compliance</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licensed Entities</CardTitle>
            <Building2 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,527</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="districts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="districts">District Overview</TabsTrigger>
          <TabsTrigger value="zones">Zone Management</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>District Directory</CardTitle>
              <CardDescription>Comprehensive district management and monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search districts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="North Coastal">North Coastal</SelectItem>
                    <SelectItem value="South Central">South Central</SelectItem>
                    <SelectItem value="Rayalaseema">Rayalaseema</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="needs_attention">Needs Attention</SelectItem>
                    <SelectItem value="underperforming">Underperforming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Controller</TableHead>
                    <TableHead>Resources</TableHead>
                    <TableHead>Monthly Performance</TableHead>
                    <TableHead>SLA Compliance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDistricts.map((district) => (
                    <TableRow key={district.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{district.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {district.population} • {district.area}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{district.zone}</TableCell>
                      <TableCell>{district.controller}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{district.inspectors} Inspectors</div>
                          <div className="text-muted-foreground">{district.licensedEntities} Entities</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{district.monthlyAchieved}/{district.monthlyTarget}</span>
                            <span>{Math.round((district.monthlyAchieved / district.monthlyTarget) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(district.monthlyAchieved / district.monthlyTarget) * 100} 
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-medium">{district.slaCompliance}%</div>
                          <Progress value={district.slaCompliance} className="h-2 mt-1" />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(district.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/districts/${district.id}/details`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/districts/${district.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/districts/${district.id}/analytics`)}
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zone Management</CardTitle>
              <CardDescription>Regional administration and resource distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {zoneStats.map((zone) => (
                  <Card key={zone.zone}>
                    <CardHeader>
                      <CardTitle className="text-lg">{zone.zone} Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">{zone.districts}</div>
                            <div className="text-xs text-muted-foreground">Districts</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-success">{zone.totalInspectors}</div>
                            <div className="text-xs text-muted-foreground">Inspectors</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-accent">{zone.avgCompliance}%</div>
                            <div className="text-xs text-muted-foreground">Avg Compliance</div>
                          </div>
                        </div>
                        <Progress value={zone.avgCompliance} className="h-3" />
                        <Button variant="outline" className="w-full" onClick={() => navigate(`/zones/${zone.zone.toLowerCase().replace(' ', '_').replace(' ', '_')}/map`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Zone Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>District-wise performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Performance Dashboard</h3>
                <p className="text-muted-foreground mb-4">Detailed analytics and performance comparison charts</p>
                <Button onClick={() => navigate('/districts/analytics')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}