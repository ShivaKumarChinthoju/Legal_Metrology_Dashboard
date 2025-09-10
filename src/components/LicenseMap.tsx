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

interface LicenseMapProps {
  isOpen: boolean;
  onClose: () => void;
}

const LicenseMap = ({ isOpen, onClose }: LicenseMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // License locations with status-based data
  const licenses = [
    { 
      id: "LIC001", 
      businessName: "Krishna Trading Co.", 
      lat: 16.1755, 
      lng: 80.9803, 
      status: "active", 
      type: "Dealer License",
      validUntil: "2026-01-15"
    },
    { 
      id: "LIC002", 
      businessName: "Guntur Metals Ltd.", 
      lat: 16.3067, 
      lng: 80.4365, 
      status: "inactive", 
      type: "Manufacturer License",
      validUntil: "2024-03-10"
    },
    { 
      id: "LIC003", 
      businessName: "Vijayawada Scales", 
      lat: 16.5062, 
      lng: 80.6480, 
      status: "expired", 
      type: "Repairer License",
      validUntil: "2024-01-20"
    },
    { 
      id: "LIC004", 
      businessName: "Visakha Industries", 
      lat: 17.6868, 
      lng: 83.2185, 
      status: "approved", 
      type: "Dealer License",
      validUntil: "2026-06-15"
    },
    { 
      id: "LIC005", 
      businessName: "Tirupati Weighing Systems", 
      lat: 13.6288, 
      lng: 79.4192, 
      status: "active", 
      type: "Manufacturer License",
      validUntil: "2025-12-31"
    },
  ];

  const getMarkerColor = (status: string) => {
    switch (status) {
      case "active": return "green";
      case "approved": return "blue";
      case "inactive": return "orange";
      case "expired": return "red";
      default: return "gray";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "🟢 Active";
      case "approved": return "🔵 Approved";
      case "inactive": return "🟡 Inactive";
      case "expired": return "🔴 Expired";
      default: return "⚪ Unknown";
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

    // Add markers for each license
    licenses.forEach(license => {
      const markerColor = getMarkerColor(license.status);
      
      // Create custom icon based on status
      const customIcon = L.divIcon({
        className: 'custom-license-marker',
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([license.lat, license.lng], { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <h3 class="font-semibold text-lg text-gray-800 mb-2">${license.businessName}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>License ID:</strong> ${license.id}</p>
            <p><strong>Type:</strong> ${license.type}</p>
            <p><strong>Status:</strong> ${getStatusBadge(license.status)}</p>
            <p><strong>Valid Until:</strong> ${license.validUntil}</p>
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
      <Card className="w-full max-w-6xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>License Management Map</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="mb-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Active Licenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Approved Licenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Inactive Licenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Expired Licenses</span>
            </div>
          </div>
          <div ref={mapRef} className="w-full flex-1 rounded-b-lg overflow-hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseMap;