import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Download, Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterAndExportProps {
  onExport?: () => void;
  onNotifications?: () => void;
  filters?: {
    status?: string;
    district?: string;
    onStatusChange?: (value: string) => void;
    onDistrictChange?: (value: string) => void;
  };
}

const FilterAndExport = ({ onExport, onNotifications, filters }: FilterAndExportProps) => {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      const data = "Application ID,Type,Status,District,Date\nAP001,License,Approved,Krishna,2024-01-15\nAP002,Inspection,Pending,Guntur,2024-01-16";
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dashboard-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      {filters && (
        <>
          <Select value={filters.status} onValueChange={filters.onStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.district} onValueChange={filters.onDistrictChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="krishna">Krishna</SelectItem>
              <SelectItem value="guntur">Guntur</SelectItem>
              <SelectItem value="vijayawada">Vijayawada</SelectItem>
              <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onNotifications}>
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default FilterAndExport;