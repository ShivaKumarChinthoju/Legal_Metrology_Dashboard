import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Settings,
  Send
} from "lucide-react";
import { toast } from "sonner";

const GenerateReport = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [districts, setDistricts] = useState<string[]>([]);
  const [format, setFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { value: 'performance', label: 'Performance Report', description: 'Inspector performance and productivity' },
    { value: 'compliance', label: 'Compliance Analytics', description: 'District-wise compliance rates' },
    { value: 'revenue', label: 'Revenue Report', description: 'Revenue streams and collections' },
    { value: 'inspection', label: 'Inspection Summary', description: 'Inspection activities and outcomes' },
    { value: 'violations', label: 'Violations Report', description: 'Common violations and trends' },
  ];

  const districtOptions = ['Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati', 'Kadapa', 'All Districts'];

  const handleDistrictChange = (district: string, checked: boolean) => {
    setDistricts(prev => 
      checked ? [...prev, district] : prev.filter(d => d !== district)
    );
  };

  const generateReport = async () => {
    if (!reportType || !dateRange) {
      toast.error("Please select report type and date range");
      return;
    }

    setGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      toast.success("Report generated successfully!");
      // In real app, would download the file here
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Generate Report</h1>
            <p className="text-muted-foreground">Create custom reports and analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTypes.map(type => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      reportType === type.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setReportType(type.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{type.label}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {reportType === type.value && (
                        <Badge>Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last_week">Last Week</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                      <SelectItem value="last_quarter">Last Quarter</SelectItem>
                      <SelectItem value="last_year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Districts</label>
                  <div className="space-y-2">
                    {districtOptions.map(district => (
                      <div key={district} className="flex items-center space-x-2">
                        <Checkbox
                          id={district}
                          checked={districts.includes(district)}
                          onCheckedChange={(checked) => handleDistrictChange(district, checked as boolean)}
                        />
                        <label htmlFor={district} className="text-sm">{district}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Output Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Report Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportType ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium">
                        {reportTypes.find(t => t.value === reportType)?.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {dateRange ? dateRange.replace('_', ' ') : 'No date range selected'}
                      </div>
                    </div>
                    
                    {districts.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">Districts:</div>
                        <div className="flex flex-wrap gap-1">
                          {districts.map(district => (
                            <Badge key={district} variant="outline" className="text-xs">
                              {district}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Format: {format.toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Select a report type to see preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={generateReport}
                  disabled={generating || !reportType || !dateRange}
                  className="w-full"
                >
                  {generating ? (
                    <>
                      <Settings className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;