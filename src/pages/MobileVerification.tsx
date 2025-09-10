import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Save, Scale, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const MobileVerification = () => {
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState({
    expected: '',
    observed: '',
    tolerance: '2', // percentage
  });
  const [photos, setPhotos] = useState<string[]>([]);

  const calculateVariance = () => {
    if (!measurements.expected || !measurements.observed) return null;
    const expected = parseFloat(measurements.expected);
    const observed = parseFloat(measurements.observed);
    return Math.abs(((observed - expected) / expected) * 100).toFixed(2);
  };

  const isWithinTolerance = () => {
    const variance = calculateVariance();
    return variance ? parseFloat(variance) <= parseFloat(measurements.tolerance) : false;
  };

  const handleSubmit = () => {
    if (!measurements.expected || !measurements.observed) {
      toast.error("Please enter both expected and observed values");
      return;
    }

    const variance = calculateVariance();
    const withinTolerance = isWithinTolerance();
    
    toast.success(
      withinTolerance 
        ? "Verification passed - within tolerance" 
        : "Verification failed - exceeds tolerance"
    );
    navigate('/inspector-dashboard');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Mobile Verification</h1>
            <p className="text-muted-foreground">Real-time measurement verification</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Weight/Measure Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Expected Value</label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={measurements.expected}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, expected: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Observed Value</label>
                <Input
                  type="number"
                  placeholder="e.g., 49.8"
                  value={measurements.observed}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, observed: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tolerance (%)</label>
              <Input
                type="number"
                value={measurements.tolerance}
                onChange={(e) => setMeasurements(prev => ({ ...prev, tolerance: e.target.value }))}
              />
            </div>

            {calculateVariance() && (
              <Card className={`border-2 ${isWithinTolerance() ? 'border-green-500' : 'border-red-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Variance: {calculateVariance()}%</p>
                      <p className="text-sm text-muted-foreground">
                        Tolerance: ±{measurements.tolerance}%
                      </p>
                    </div>
                    <Badge variant={isWithinTolerance() ? "default" : "destructive"}>
                      {isWithinTolerance() ? "PASS" : "FAIL"}
                      {!isWithinTolerance() && <AlertTriangle className="h-3 w-3 ml-1" />}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium">Photo Evidence</label>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Scale Reading</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Equipment</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Camera className="h-6 w-6 mb-2" />
                  <span className="text-xs">Certificate</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Submit Verification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileVerification;