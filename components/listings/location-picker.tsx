"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect(position.coords.latitude, position.coords.longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <Card className="p-4 bg-muted/50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium mb-1">Location on Map</h3>
          <p className="text-sm text-muted-foreground">
            Pin your exact location on the map
          </p>
        </div>
        <button
          onClick={handleGetLocation}
          disabled={isLoading}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <MapPin className="h-4 w-4" />
          <span>{isLoading ? "Getting location..." : "Get current location"}</span>
        </button>
      </div>
    </Card>
  );
}