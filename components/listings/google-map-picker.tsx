"use client";

import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';

interface GoogleMapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

export function GoogleMapPicker({ onLocationSelect }: GoogleMapPickerProps) {
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);

  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    setMarker(e.latLng);

    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ location: e.latLng });
      
      if (result.results[0]) {
        onLocationSelect({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          address: result.results[0].formatted_address
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  }, [onLocationSelect]);

  return (
    <Card className="p-0 overflow-hidden">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={13}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </LoadScript>
    </Card>
  );
}