import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DashboardFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onRefresh: () => void;
}

export interface FilterState {
  district: string;
  mandal: string;
  officer: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const DashboardFilters = ({ onFiltersChange, onRefresh }: DashboardFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    district: 'all',
    mandal: 'all',
    officer: 'all',
    startDate: undefined,
    endDate: undefined
  });

  // Andhra Pradesh Districts (26 districts)
  const districts = [
    'All Districts',
    'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna',
    'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam',
    'Vizianagaram', 'West Godavari', 'YSR Kadapa', 'Annamayya',
    'Sri Sathya Sai', 'NTR', 'Konaseema', 'Dr. B.R. Ambedkar Konaseema',
    'Eluru', 'Tirupati', 'Chittor', 'Nandyal', 'Parvathipuram Manyam',
    'Alluri Sitharama Raju', 'Anakapalli', 'Kakinada'
  ];

  // Sample Mandals (this should be dynamic based on selected district)
  const mandals = [
    'All Mandals',
    'Anantapur Urban', 'Guntur Urban', 'Visakhapatnam Urban',
    'Tirupati Urban', 'Nellore Urban', 'Kakinada Urban',
    'Eluru Urban', 'Ongole Urban', 'Chittoor Urban'
  ];

  // Officers with their designations and counts
  const officers = [
    'All Officers',
    // ACs (25 Assistant Controllers)
    'AC - Anantapur', 'AC - Chittoor', 'AC - East Godavari', 'AC - Guntur', 'AC - Krishna',
    'AC - Kurnool', 'AC - Nellore', 'AC - Prakasam', 'AC - Srikakulam', 'AC - Visakhapatnam',
    'AC - Vizianagaram', 'AC - West Godavari', 'AC - YSR Kadapa', 'AC - Annamayya',
    'AC - Sri Sathya Sai', 'AC - NTR', 'AC - Konaseema', 'AC - Eluru', 'AC - Tirupati',
    'AC - Chittor', 'AC - Nandyal', 'AC - Parvathipuram Manyam', 'AC - Alluri Sitharama Raju',
    'AC - Anakapalli', 'AC - Kakinada',
    
    // ILMs (56 Inspector Legal Metrology)
    'ILM - Zone 1', 'ILM - Zone 2', 'ILM - Zone 3', 'ILM - Zone 4', 'ILM - Zone 5',
    'ILM - Zone 6', 'ILM - Zone 7', 'ILM - Zone 8', 'ILM - Zone 9', 'ILM - Zone 10',
    // ... (would include all 56)
    
    // DCs (10 Deputy Controllers)
    'DC - North Region', 'DC - South Region', 'DC - East Region', 'DC - West Region',
    'DC - Central Region', 'DC - Coastal Region', 'DC - Rayalaseema Region',
    'DC - Special Projects', 'DC - Urban Areas', 'DC - Rural Areas',
    
    // JCs (4 Joint Controllers)
    'JC - Andhra Pradesh North', 'JC - Andhra Pradesh South',
    'JC - Andhra Pradesh East', 'JC - Andhra Pradesh West',
    
    // State CLM (1 Controller Legal Metrology)
    'CLM - Andhra Pradesh State'
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      district: 'all',
      mandal: 'all',
      officer: 'all',
      startDate: undefined,
      endDate: undefined
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Dashboard Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* District Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">District</label>
            <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district, index) => (
                  <SelectItem key={index} value={index === 0 ? 'all' : district.toLowerCase().replace(/\s+/g, '-')}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mandal Filter (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mandal <span className="text-muted-foreground">(Optional)</span></label>
            <Select value={filters.mandal} onValueChange={(value) => handleFilterChange('mandal', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Mandal" />
              </SelectTrigger>
              <SelectContent>
                {mandals.map((mandal, index) => (
                  <SelectItem key={index} value={index === 0 ? 'all' : mandal.toLowerCase().replace(/\s+/g, '-')}>
                    {mandal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Officer Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Officer</label>
            <Select value={filters.officer} onValueChange={(value) => handleFilterChange('officer', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Officer" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {officers.map((officer, index) => (
                  <SelectItem key={index} value={index === 0 ? 'all' : officer.toLowerCase().replace(/\s+/g, '-')}>
                    {officer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Refresh Button */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Actions</label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onRefresh} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => handleFilterChange('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => handleFilterChange('endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-end">
          <Button variant="ghost" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;