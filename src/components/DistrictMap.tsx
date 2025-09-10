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

interface DistrictMapProps {
  isOpen: boolean;
  onClose: () => void;
}

const DistrictMap = ({ isOpen, onClose }: DistrictMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // District data with coordinates
  const districts = [
    { name: "Krishna", lat: 16.1755, lng: 80.9803, applications: 324, revenue: "₹8.2L", sla: 94 },
    { name: "Guntur", lat: 16.3067, lng: 80.4365, applications: 289, revenue: "₹6.8L", sla: 89 },
    { name: "Vijayawada", lat: 16.5062, lng: 80.6480, applications: 267, revenue: "₹7.1L", sla: 92 },
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185, applications: 198, revenue: "₹5.4L", sla: 87 },
    { name: "Tirupati", lat: 13.6288, lng: 79.4192, applications: 156, revenue: "₹4.2L", sla: 91 },
  ];

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([16.5062, 80.6480], 7);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Powered by <a href="#" style="color: #0066cc;">Garudalytics Smart Mapping</a> | © Garudalytics'
    }).addTo(map);

    // Add markers for each district
    districts.forEach(district => {
      const marker = L.marker([district.lat, district.lng]).addTo(map);
      
      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-lg">${district.name}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Applications:</strong> ${district.applications}</p>
            <p><strong>Revenue:</strong> ${district.revenue}</p>
            <p><strong>SLA:</strong> ${district.sla}%</p>
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
          <CardTitle>District Performance Map</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div ref={mapRef} className="w-full h-full rounded-b-lg overflow-hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictMap;