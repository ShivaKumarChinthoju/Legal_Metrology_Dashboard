import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InlineDistrictMapProps {
  onBack: () => void;
}

const InlineDistrictMap = ({ onBack }: InlineDistrictMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentLayerRef = useRef<L.TileLayer | null>(null);
  const [selectedLayer, setSelectedLayer] = useState('osm');

  // District data with coordinates
  const districts = [
    { name: "Krishna", lat: 16.1755, lng: 80.9803, applications: 324, revenue: "₹8.2L", sla: 94 },
    { name: "Guntur", lat: 16.3067, lng: 80.4365, applications: 289, revenue: "₹6.8L", sla: 89 },
    { name: "Vijayawada", lat: 16.5062, lng: 80.6480, applications: 267, revenue: "₹7.1L", sla: 92 },
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185, applications: 198, revenue: "₹5.4L", sla: 87 },
    { name: "Tirupati", lat: 13.6288, lng: 79.4192, applications: 156, revenue: "₹4.2L", sla: 91 },
    { name: "Anantapur", lat: 14.6819, lng: 77.6006, applications: 134, revenue: "₹3.8L", sla: 88 },
    { name: "Chittoor", lat: 13.2172, lng: 79.1003, applications: 112, revenue: "₹3.2L", sla: 85 },
    { name: "Kurnool", lat: 15.8281, lng: 78.0373, applications: 98, revenue: "₹2.9L", sla: 86 },
  ];

  const layerOptions = {
    osm: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([16.5062, 80.6480], 7);
    mapInstanceRef.current = map;

    // Add initial tile layer
    const initialLayer = L.tileLayer(layerOptions.osm.url, {
      attribution: layerOptions.osm.attribution
    }).addTo(map);
    currentLayerRef.current = initialLayer;

    // Add markers for each district
    districts.forEach(district => {
      const marker = L.marker([district.lat, district.lng]).addTo(map);
      
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-semibold text-lg text-gray-800 mb-2">${district.name}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Applications:</strong> ${district.applications}</p>
            <p><strong>Revenue:</strong> ${district.revenue}</p>
            <p><strong>SLA:</strong> ${district.sla}%</p>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    // Add custom footer
    const footerControl = new L.Control({ position: 'bottomright' });
    footerControl.onAdd = function() {
      const div = L.DomUtil.create('div', 'map-footer');
      div.innerHTML = '<div style="background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #666;">© Garudalytics Smart Mapping | Powered by Garudalytics</div>';
      return div;
    };
    footerControl.addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleLayerChange = (value: string) => {
    setSelectedLayer(value);
    
    if (mapInstanceRef.current && currentLayerRef.current) {
      // Remove current layer
      mapInstanceRef.current.removeLayer(currentLayerRef.current);
      
      // Add new layer
      const layerConfig = layerOptions[value as keyof typeof layerOptions];
      const newLayer = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution
      }).addTo(mapInstanceRef.current);
      
      currentLayerRef.current = newLayer;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <Select value={selectedLayer} onValueChange={handleLayerChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="osm">OpenStreetMap</SelectItem>
              <SelectItem value="satellite">Satellite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="h-[600px]">
        <CardHeader>
          <CardTitle>District Performance Map</CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div ref={mapRef} className="w-full h-full rounded-b-lg overflow-hidden" style={{ maxHeight: "calc(600px - 80px)" }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineDistrictMap;