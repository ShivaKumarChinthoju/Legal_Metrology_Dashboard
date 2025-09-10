import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Calculator, 
  Camera, 
  FileCheck, 
  AlertCircle,
  CheckCircle,
  Clock,
  QrCode,
  Download
} from "lucide-react";

const Verification = () => {
  const navigate = useNavigate();
  const [expectedValue, setExpectedValue] = useState("");
  const [observedValue, setObservedValue] = useState("");

  const verifications = [
    { 
      id: "VER001", 
      business: "Krishna Trading Co.", 
      type: "Weighbridge", 
      expected: "50kg", 
      observed: "49.8kg", 
      variance: "0.4%", 
      status: "completed",
      inspector: "Rajesh Kumar",
      date: "2024-12-10"
    },
    { 
      id: "VER002", 
      business: "Guntur Petrol Station", 
      type: "Fuel Dispenser", 
      expected: "10L", 
      observed: "9.95L", 
      variance: "0.5%", 
      status: "pending_review",
      inspector: "Priya Sharma",
      date: "2024-12-09"
    },
    { 
      id: "VER003", 
      business: "Tirupati Scales", 
      type: "Electronic Scale", 
      expected: "25kg", 
      observed: "25.1kg", 
      variance: "0.4%", 
      status: "completed",
      inspector: "Suresh Reddy",
      date: "2024-12-08"
    }
  ];

  const calculateError = () => {
    if (!expectedValue || !observedValue) return null;
    
    const expected = parseFloat(expectedValue);
    const observed = parseFloat(observedValue);
    
    if (isNaN(expected) || isNaN(observed) || expected === 0) return null;
    
    const variance = Math.abs(expected - observed);
    const percentage = (variance / expected) * 100;
    
    return {
      variance: variance.toFixed(2),
      percentage: percentage.toFixed(2),
      status: percentage <= 0.5 ? 'pass' : 'fail'
    };
  };

  const errorCalculation = calculateError();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Verification Management</h1>
            <p className="text-muted-foreground">
              Mobile verification app for expected vs observed values
            </p>
          </div>
          <Button onClick={() => navigate('/verification/mobile')}>
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile App
          </Button>
        </div>

        <Tabs defaultValue="mobile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mobile">Mobile Verification</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="space-y-6">
            {/* Mobile Verification Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Verification Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Value</label>
                    <Input
                      type="number"
                      placeholder="Enter expected measurement"
                      value={expectedValue}
                      onChange={(e) => setExpectedValue(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Observed Value</label>
                    <Input
                      type="number"
                      placeholder="Enter observed measurement"
                      value={observedValue}
                      onChange={(e) => setObservedValue(e.target.value)}
                    />
                  </div>

                  {errorCalculation && (
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h3 className="font-semibold mb-2">Auto-Error Calculation</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Variance:</span>
                          <span className="font-medium">{errorCalculation.variance} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentage:</span>
                          <span className="font-medium">{errorCalculation.percentage}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Result:</span>
                          <Badge className={errorCalculation.status === 'pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {errorCalculation.status === 'pass' ? 'PASS' : 'FAIL'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" disabled={!errorCalculation}>
                    Save Verification
                  </Button>
                </CardContent>
              </Card>

              {/* Evidence Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Evidence Upload
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Click to capture or upload verification photos
                    </p>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">GPS Location</label>
                    <div className="flex gap-2">
                      <Input placeholder="Latitude" readOnly value="17.3850" />
                      <Input placeholder="Longitude" readOnly value="78.4867" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Location automatically captured via GPS
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Submit Evidence
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Verification History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verifications.map(verification => (
                    <Card key={verification.id} className="hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileCheck className="h-8 w-8 text-primary" />
                            <div>
                              <h3 className="font-semibold">{verification.business}</h3>
                              <p className="text-sm text-muted-foreground">{verification.type}</p>
                              <p className="text-xs text-muted-foreground">
                                Inspector: {verification.inspector} • {verification.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm space-y-1">
                              <div>Expected: <span className="font-medium">{verification.expected}</span></div>
                              <div>Observed: <span className="font-medium">{verification.observed}</span></div>
                              <div>Variance: <span className="font-medium">{verification.variance}</span></div>
                            </div>
                            <Badge className={getStatusColor(verification.status)}>
                              {verification.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            {/* Verification Certificates */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {verifications.filter(v => v.status === 'completed').map(verification => (
                    <Card key={verification.id} className="hover:shadow-md">
                      <CardContent className="p-4 text-center">
                        <QrCode className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <h3 className="font-semibold">{verification.business}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{verification.type}</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Certificate ID: {verification.id}
                        </p>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <QrCode className="h-3 w-3 mr-1" />
                            View QR
                          </Button>
                          <Button size="sm" className="w-full">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Verification;