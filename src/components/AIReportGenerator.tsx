import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  FileBarChart, 
  Download, 
  Clock, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface AIReportGeneratorProps {
  title?: string;
  description?: string;
}

const AIReportGenerator = ({ 
  title = "AI Report Generation", 
  description = "Generate intelligent insights and automated reports"
}: AIReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportType, setReportType] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'monthly',
      name: 'Monthly Summary',
      description: 'Auto-generated monthly insights',
      icon: FileBarChart,
      color: 'text-primary'
    },
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'KPI analysis & recommendations',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      id: 'risk',
      name: 'Risk Assessment',
      description: 'Compliance & risk analysis',
      icon: AlertCircle,
      color: 'text-warning'
    },
    {
      id: 'predictive',
      name: 'Predictive Analysis',
      description: 'Future trend forecasting',
      icon: Brain,
      color: 'text-accent'
    }
  ];

  const handleGenerateReport = async (type: string) => {
    setIsGenerating(true);
    setReportType(type);
    setProgress(0);

    // Simulate AI report generation with progress updates
    const progressSteps = [
      { step: 20, message: "Analyzing data patterns..." },
      { step: 40, message: "Processing AI algorithms..." },
      { step: 60, message: "Generating insights..." },
      { step: 80, message: "Compiling report..." },
      { step: 100, message: "Report generated successfully!" }
    ];

    for (const { step } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step);
    }

    // Auto-download when 100% complete
    if (progress === 100) {
      setTimeout(() => {
        // Simulate file download
        const reportName = reportTypes.find(r => r.id === type)?.name || 'Custom Report';
        
        // Create dummy Excel content
        const csvContent = `Report Type,${reportName}\nGenerated On,${new Date().toLocaleString()}\nTotal Records,1250\nStatus,Completed\n\nDetailed Data:\nID,Business Name,Status,Revenue\n1,Krishna Trading Co.,Active,₹2.5L\n2,Guntur Metals Ltd.,Pending,₹1.8L\n3,Vijayawada Scales,Approved,₹3.2L`;
        
        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 500);
    }

    // Reset after completion
    setTimeout(() => {
      setIsGenerating(false);
      setProgress(0);
      setReportType(null);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>{title}</span>
          <Badge variant="secondary">
            <Zap className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="space-y-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <h3 className="font-medium mb-2">
                Generating {reportTypes.find(r => r.id === reportType)?.name}...
              </h3>
              <Progress value={progress} className="w-full mb-2" />
              <p className="text-sm text-muted-foreground">
                {progress === 20 && "Analyzing data patterns..."}
                {progress === 40 && "Processing AI algorithms..."}
                {progress === 60 && "Generating insights..."}
                {progress === 80 && "Compiling report..."}
                {progress === 100 && (
                  <span className="text-success flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Report generated successfully!
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <Card 
                    key={report.id}
                    className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer group"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${report.color} group-hover:scale-110 transition-transform`} />
                      <h3 className="font-medium mb-1">{report.name}</h3>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={() => handleGenerateReport('custom')}>
                <Brain className="h-4 w-4 mr-2" />
                Generate Custom Report
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Auto-Reports
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Templates
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIReportGenerator;