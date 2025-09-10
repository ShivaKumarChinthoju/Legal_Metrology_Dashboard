import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InspectionMapProps {
  isOpen: boolean;
  onClose: () => void;
}

const InspectionMap = ({ isOpen, onClose }: InspectionMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Inspection locations
  const inspections = [
    { id: "INS001", businessName: "Kumar Electronics", lat: 17.7231, lng: 83.3013, status: "scheduled", priority: "high" },
    { id: "INS002", businessName: "Sri Venkatesh Fuel Station", lat: 16.3067, lng: 80.4365, status: "in-progress", priority: "medium" },
    { id: "INS003", businessName: "Modern Weighing Systems", lat: 16.1755, lng: 80.9803, status: "completed", priority: "low" },
    { id: "INS004", businessName: "Rajesh Traders", lat: 16.5062, lng: 80.6480, status: "pending", priority: "high" },
    { id: "INS005", businessName: "Golden Scales Pvt Ltd", lat: 13.6288, lng: 79.4192, status: "scheduled", priority: "medium" },
  ];

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
    if (!isOpen || !mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([16.5062, 80.6480], 7);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Powered by <a href="#" style="color: #0066cc;">Garudalytics Smart Mapping</a> | © Garudalytics'
    }).addTo(map);

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
        <div class="p-2">
          <h3 class="font-semibold text-lg">${inspection.businessName}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>ID:</strong> ${inspection.id}</p>
            <p><strong>Status:</strong> <span class="capitalize">${inspection.status.replace('-', ' ')}</span></p>
            <p><strong>Priority:</strong> <span class="capitalize">${inspection.priority}</span></p>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inspection Locations Map</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Pending</span>
            </div>
          </div>
          <div ref={mapRef} className="w-full h-full rounded-b-lg overflow-hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionMap;