import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Users, Building2, Target, Download, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AIReportGenerator from "./AIReportGenerator";
import { useState } from "react";

const zoneData = {
  central: {
    name: "Central Zone",
    districts: ["Hyderabad", "Rangareddy", "Medchal-Malkajgiri"],
    totalInspectors: 25,
    avgCompliance: 91,
    licensedEntities: 2847,
    monthlyTarget: 280,
    monthlyAchieved: 265,
    coordinates: [
      { name: "Hyderabad", lat: 17.3850, lng: 78.4867, inspectors: 12, entities: 1247, compliance: 94 },
      { name: "Rangareddy", lat: 17.2403, lng: 78.1077, inspectors: 8, entities: 892, compliance: 89 },
      { name: "Medchal-Malkajgiri", lat: 17.6242, lng: 78.4815, inspectors: 5, entities: 708, compliance: 86 }
    ]
  },
  north_coastal: {
    name: "North Coastal Zone", 
    districts: ["Visakhapatnam", "Vizianagaram", "Srikakulam", "East Godavari"],
    totalInspectors: 18,
    avgCompliance: 87,
    licensedEntities: 1956,
    monthlyTarget: 200,
    monthlyAchieved: 182,
    coordinates: [
      { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185, inspectors: 8, entities: 892, compliance: 89 },
      { name: "Vizianagaram", lat: 18.1167, lng: 83.4000, inspectors: 4, entities: 456, compliance: 85 },
      { name: "Srikakulam", lat: 18.2949, lng: 83.8938, inspectors: 3, entities: 312, compliance: 83 },
      { name: "East Godavari", lat: 17.0005, lng: 81.8040, inspectors: 3, entities: 296, compliance: 91 }
    ]
  },
  south_central: {
    name: "South Central Zone",
    districts: ["Vijayawada", "Guntur", "Krishna", "West Godavari", "Prakasam"],
    totalInspectors: 22,
    avgCompliance: 84,
    licensedEntities: 2134,
    monthlyTarget: 240,
    monthlyAchieved: 218,
    coordinates: [
      { name: "Vijayawada", lat: 16.5062, lng: 80.6480, inspectors: 6, entities: 634, compliance: 76 },
      { name: "Guntur", lat: 16.3067, lng: 80.4365, inspectors: 5, entities: 456, compliance: 92 },
      { name: "Krishna", lat: 16.1755, lng: 81.3311, inspectors: 4, entities: 389, compliance: 88 },
      { name: "West Godavari", lat: 16.7593, lng: 81.1127, inspectors: 4, entities: 378, compliance: 82 },
      { name: "Prakasam", lat: 15.7942, lng: 79.6947, inspectors: 3, entities: 277, compliance: 79 }
    ]
  },
  rayalaseema: {
    name: "Rayalaseema Zone",
    districts: ["Kurnool", "Anantapur", "Chittoor", "Kadapa"],
    totalInspectors: 16,
    avgCompliance: 79,
    licensedEntities: 1456,
    monthlyTarget: 160,
    monthlyAchieved: 142,
    coordinates: [
      { name: "Kurnool", lat: 15.8281, lng: 78.0373, inspectors: 4, entities: 298, compliance: 68 },
      { name: "Anantapur", lat: 14.6819, lng: 77.6006, inspectors: 5, entities: 387, compliance: 82 },
      { name: "Chittoor", lat: 13.2172, lng: 79.1003, inspectors: 4, entities: 445, compliance: 85 },
      { name: "Kadapa", lat: 14.4673, lng: 78.8242, inspectors: 3, entities: 326, compliance: 81 }
    ]
  }
};

export default function ZoneMap() {
  const navigate = useNavigate();
  const { zoneName } = useParams();
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  
  const zone = zoneName ? zoneData[zoneName as keyof typeof zoneData] : null;

  if (!zone) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Zone Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested zone could not be found.</p>
            <Button onClick={() => navigate('/districts')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Districts
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGenerateReport = () => {
    setShowReportGenerator(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/districts')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{zone.name}</h1>
            <p className="text-muted-foreground">Regional performance and district management</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Zone Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Districts</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zone.districts.length}</div>
            <p className="text-xs text-muted-foreground">Active districts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inspectors</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zone.totalInspectors}</div>
            <p className="text-xs text-muted-foreground">Field officers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licensed Entities</CardTitle>
            <Building2 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zone.licensedEntities.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zone.avgCompliance}%</div>
            <p className="text-xs text-muted-foreground">Zone average</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle>Zone District Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
            
            {/* Simulated map points */}
            {zone.coordinates.map((district, index) => (
              <div
                key={district.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg min-w-48">
                      <h4 className="font-semibold">{district.name}</h4>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
                        <div>Inspectors: {district.inspectors}</div>
                        <div>Entities: {district.entities}</div>
                        <div>Compliance: {district.compliance}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-foreground">{zone.name} Districts</h3>
              <p className="text-muted-foreground">Hover over points for district details</p>
            </div>
          </div>
          
          {/* Map Attribution */}
          <div className="mt-2 text-xs text-muted-foreground text-right">
            Powered by Garudalytics Smart Mapping | © OpenStreetMap contributors
          </div>
        </CardContent>
      </Card>

      {/* District Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>District Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zone.coordinates.map((district) => (
              <div key={district.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">{district.name}</h4>
                    <p className="text-sm text-muted-foreground">{district.inspectors} inspectors • {district.entities} entities</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{district.compliance}%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                  <div className="w-24">
                    <Progress value={district.compliance} className="h-2" />
                  </div>
                  <Badge variant={district.compliance > 85 ? "default" : district.compliance > 75 ? "secondary" : "destructive"}>
                    {district.compliance > 85 ? "Good" : district.compliance > 75 ? "Average" : "Poor"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Report Generator */}
      {showReportGenerator && (
        <AIReportGenerator
          title="Zone Performance Report"
          description="AI-powered zone analysis and insights"
        />
      )}
    </div>
  );
}