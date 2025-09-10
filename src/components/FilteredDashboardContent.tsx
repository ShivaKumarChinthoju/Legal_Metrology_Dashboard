import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "@/components/DashboardCard";
import { 
  Scale, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Building2,
  Calendar,
  MapPin,
  Target,
  Clock
} from "lucide-react";
import { FilterState } from './DashboardFilters';

interface FilteredDashboardContentProps {
  filters: FilterState;
}

const FilteredDashboardContent = ({ filters }: FilteredDashboardContentProps) => {
  // Generate dynamic data based on filters
  const getFilteredData = () => {
    const isFiltered = filters.district !== 'all' || 
                      filters.mandal !== 'all' || 
                      filters.officer !== 'all' ||
                      filters.startDate || 
                      filters.endDate;

    if (!isFiltered) {
      return {
        title: "Andhra Pradesh State Overview",
        subtitle: "All Districts Performance",
        metrics: {
          applications: "1,247",
          approved: "1,089",
          pending: "158",
          revenue: "₹24.3L",
          inspectors: "245",
          businesses: "14,567",
          inspections: "672"
        },
        performance: {
          slaCompliance: 87.3,
          revenueTarget: 83.8,
          inspectionRate: 91.2
        }
      };
    }

    // District-specific data
    if (filters.district !== 'all') {
      const districtName = filters.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return {
        title: `${districtName} District Performance`,
        subtitle: "Real-time District Analytics",
        metrics: {
          applications: "142",
          approved: "128",
          pending: "14",
          revenue: "₹3.2L",
          inspectors: "18",
          businesses: "1,456",
          inspections: "67"
        },
        performance: {
          slaCompliance: 89.5,
          revenueTarget: 76.4,
          inspectionRate: 94.1
        }
      };
    }

    // Officer-specific data
    if (filters.officer !== 'all') {
      const officerName = filters.officer.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return {
        title: `${officerName} Performance`,
        subtitle: "Individual Officer Analytics",
        metrics: {
          applications: "48",
          approved: "44",
          pending: "4",
          revenue: "₹1.1L",
          inspectors: "6",
          businesses: "487",
          inspections: "23"
        },
        performance: {
          slaCompliance: 91.7,
          revenueTarget: 88.2,
          inspectionRate: 95.8
        }
      };
    }

    return {
      title: "Filtered Performance Overview",
      subtitle: "Custom Filter Results",
      metrics: {
        applications: "324",
        approved: "289",
        pending: "35",
        revenue: "₹7.8L",
        inspectors: "42",
        businesses: "3,234",
        inspections: "156"
      },
      performance: {
        slaCompliance: 85.2,
        revenueTarget: 81.3,
        inspectionRate: 89.7
      }
    };
  };

  const data = getFilteredData();

  return (
    <div className="space-y-6">
      {/* Performance Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{data.title}</CardTitle>
              <p className="text-muted-foreground">{data.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {filters.district !== 'all' && (
                <Badge variant="secondary">
                  <MapPin className="h-3 w-3 mr-1" />
                  {filters.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              )}
              {filters.officer !== 'all' && (
                <Badge variant="secondary">
                  <Users className="h-3 w-3 mr-1" />
                  {filters.officer.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              )}
              {(filters.startDate || filters.endDate) && (
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  Custom Period
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SLA Compliance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SLA Compliance</span>
                <span className="text-sm font-bold">{data.performance.slaCompliance}%</span>
              </div>
              <Progress value={data.performance.slaCompliance} className="h-2" />
            </div>

            {/* Revenue Target */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Revenue Target</span>
                <span className="text-sm font-bold">{data.performance.revenueTarget}%</span>
              </div>
              <Progress value={data.performance.revenueTarget} className="h-2" />
            </div>

            {/* Inspection Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Inspection Rate</span>
                <span className="text-sm font-bold">{data.performance.inspectionRate}%</span>
              </div>
              <Progress value={data.performance.inspectionRate} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtered Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Applications"
          value={data.metrics.applications}
          description="Current period"
          icon={Scale}
          trend={{ value: "+12.3%", isPositive: true }}
        />
        <DashboardCard
          title="Approved Applications"
          value={data.metrics.approved}
          description="High approval rate"
          icon={FileCheck}
          trend={{ value: "+5.2%", isPositive: true }}
        />
        <DashboardCard
          title="Pending Reviews"
          value={data.metrics.pending}
          description="Awaiting action"
          icon={AlertTriangle}
          trend={{ value: "-8.1%", isPositive: true }}
        />
        <DashboardCard
          title="Revenue Collected"
          value={data.metrics.revenue}
          description="Current period"
          icon={TrendingUp}
          trend={{ value: "+18.7%", isPositive: true }}
        />
      </div>

      {/* Additional Filtered Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Active Inspectors"
          value={data.metrics.inspectors}
          description="Field officers"
          icon={Users}
        />
        <DashboardCard
          title="Registered Businesses"
          value={data.metrics.businesses}
          description="Licensed entities"
          icon={Building2}
          trend={{ value: "+3.2%", isPositive: true }}
        />
        <DashboardCard
          title="Scheduled Inspections"
          value={data.metrics.inspections}
          description="Current period"
          icon={Calendar}
          trend={{ value: "+8.9%", isPositive: true }}
        />
      </div>

      {/* Real-time Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Applications Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Applications</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-blue-200 rounded">
                    <div className="h-2 w-12 bg-blue-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Processing</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-orange-200 rounded">
                    <div className="h-2 w-10 bg-orange-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-green-200 rounded">
                    <div className="h-2 w-14 bg-green-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inspection Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Inspection Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed Today</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-green-200 rounded">
                    <div className="h-2 w-15 bg-green-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scheduled</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-blue-200 rounded">
                    <div className="h-2 w-13 bg-blue-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">81%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Compliance Rate</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-purple-200 rounded">
                    <div className="h-2 w-14 bg-purple-600 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">89%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FilteredDashboardContent;