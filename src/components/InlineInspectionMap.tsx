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

interface InlineInspectionMapProps {
  onBack: () => void;
}

const InlineInspectionMap = ({ onBack }: InlineInspectionMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentLayerRef = useRef<L.TileLayer | null>(null);
  const [selectedLayer, setSelectedLayer] = useState('osm');

  // Inspection locations
  const inspections = [
    { id: "INS001", businessName: "Kumar Electronics", lat: 17.7231, lng: 83.3013, status: "scheduled", priority: "high" },
    { id: "INS002", businessName: "Sri Venkatesh Fuel Station", lat: 16.3067, lng: 80.4365, status: "in-progress", priority: "medium" },
    { id: "INS003", businessName: "Modern Weighing Systems", lat: 16.1755, lng: 80.9803, status: "completed", priority: "low" },
    { id: "INS004", businessName: "Rajesh Traders", lat: 16.5062, lng: 80.6480, status: "pending", priority: "high" },
    { id: "INS005", businessName: "Golden Scales Pvt Ltd", lat: 13.6288, lng: 79.4192, status: "scheduled", priority: "medium" },
    { id: "INS006", businessName: "Precision Instruments", lat: 14.6819, lng: 77.6006, status: "completed", priority: "low" },
    { id: "INS007", businessName: "Metro Weighbridge", lat: 13.2172, lng: 79.1003, status: "in-progress", priority: "high" },
    { id: "INS008", businessName: "Quality Measures Ltd", lat: 15.8281, lng: 78.0373, status: "pending", priority: "medium" },
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

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "completed": return "green";
      case "in-progress": return "blue";
      case "scheduled": return "orange";
      case "pending": return "red";
      default: return "gray";
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

    // Add markers for each inspection
    inspections.forEach(inspection => {
      const markerColor = getMarkerColor(inspection.status);
      
      // Create custom icon based on status
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([inspection.lat, inspection.lng], { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h3 class="font-semibold text-lg text-gray-800 mb-2">${inspection.businessName}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>ID:</strong> ${inspection.id}</p>
            <p><strong>Status:</strong> <span class="capitalize">${inspection.status.replace('-', ' ')}</span></p>
            <p><strong>Priority:</strong> <span class="capitalize">${inspection.priority}</span></p>
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
          Back to Inspections
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
        <CardHeader className="pb-2">
          <CardTitle>Inspection Locations Map</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Completed ({inspections.filter(i => i.status === 'completed').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>In Progress ({inspections.filter(i => i.status === 'in-progress').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Scheduled ({inspections.filter(i => i.status === 'scheduled').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Pending ({inspections.filter(i => i.status === 'pending').length})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div ref={mapRef} className="w-full h-full rounded-b-lg" />
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineInspectionMap;