import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const GPSCapture = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const getCurrentLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setTimestamp(new Date().toLocaleString());
        setLoading(false);
        toast.success("Location captured successfully");
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to get location: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSubmit = () => {
    if (!location) {
      toast.error("Please capture location first");
      return;
    }

    toast.success("GPS coordinates saved successfully");
    navigate('/inspector-dashboard');
  };

  const openInMaps = () => {
    if (location) {
      const url = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">GPS Capture</h1>
            <p className="text-muted-foreground">Record inspection location coordinates</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!location && !loading && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No location captured yet</p>
                <Button onClick={getCurrentLocation}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Current Location
                </Button>
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-4" />
                <p>Capturing location...</p>
              </div>
            )}

            {location && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Latitude</label>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {location.latitude.toFixed(6)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Longitude</label>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {location.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Accuracy</label>
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-muted rounded-md font-mono text-sm flex-1">
                      ±{location.accuracy.toFixed(0)} meters
                    </div>
                    <Badge variant={location.accuracy < 10 ? "default" : "secondary"}>
                      {location.accuracy < 10 ? "High" : "Medium"} Precision
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Timestamp</label>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {timestamp}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={getCurrentLocation} disabled={loading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Location
                  </Button>
                  <Button variant="outline" onClick={openInMaps}>
                    <Navigation className="h-4 w-4 mr-2" />
                    View in Maps
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!location}>
            <Save className="h-4 w-4 mr-2" />
            Save GPS Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GPSCapture;