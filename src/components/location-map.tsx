"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface LocationData {
  phoneNumber: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    address: string;
    city: string;
    country: string;
  };
  carrier: {
    name: string;
    network: string;
    type: string;
  };
  timestamp: string;
  legal: {
    authorized: boolean;
    source: string;
  };
}

interface LocationMapProps {
  locationData: LocationData | null;
  isLoading: boolean;
}

export function LocationMap({ locationData, isLoading }: LocationMapProps) {
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  useEffect(() => {
    // Get user's current location for reference
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.warn("Unable to access user location");
        }
      );
    }
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy <= 100) return "text-green-600 bg-green-50 border-green-200";
    if (accuracy <= 500) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getAccuracyDescription = (accuracy: number): string => {
    if (accuracy <= 100) return "High Precision";
    if (accuracy <= 500) return "Medium Precision";
    return "Low Precision";
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <div className="text-lg font-medium text-gray-700">Tracking Location...</div>
            <div className="text-sm text-gray-500">
              Querying carrier networks and cell towers
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 rounded-full relative">
              <div className="absolute inset-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Interactive Location Map</h3>
            <p className="text-sm text-gray-600">
              Enter a phone number to see simulated location tracking results with accuracy indicators and carrier information.
            </p>
          </div>
          {userLocation && (
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <div className="text-xs text-gray-500 mb-1">Your Current Location (Reference)</div>
              <div className="font-mono text-sm text-gray-800">
                {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const distance = userLocation 
    ? calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        locationData.location.latitude, 
        locationData.location.longitude
      )
    : null;

  return (
    <div className="space-y-4">
      {/* Map Visualization */}
      <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border relative overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Location Marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Accuracy Circle */}
            <div 
              className="absolute border-2 border-blue-400 bg-blue-100 bg-opacity-30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${Math.min(locationData.location.accuracy / 5, 200)}px`,
                height: `${Math.min(locationData.location.accuracy / 5, 200)}px`,
                left: '50%',
                top: '50%'
              }}
            ></div>
            
            {/* Location Pin */}
            <div className="relative z-10 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-1 bg-red-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Coordinate Grid Overlay */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded p-2 text-xs font-mono">
          <div>Lat: {locationData.location.latitude.toFixed(6)}</div>
          <div>Lng: {locationData.location.longitude.toFixed(6)}</div>
        </div>

        {/* Accuracy Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant="outline" 
            className={`${getAccuracyColor(locationData.location.accuracy)} font-medium`}
          >
            ±{locationData.location.accuracy}m • {getAccuracyDescription(locationData.location.accuracy)}
          </Badge>
        </div>
      </div>

      {/* Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Address Info */}
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Address</div>
              <div className="text-sm text-gray-900">{locationData.location.address}</div>
              <div className="text-sm text-gray-600">
                {locationData.location.city}, {locationData.location.country}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carrier Info */}
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Network</div>
              <div className="text-sm text-gray-900">{locationData.carrier.name}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {locationData.carrier.network}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {locationData.carrier.type}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distance Info */}
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Reference</div>
              {distance !== null ? (
                <>
                  <div className="text-sm text-gray-900">
                    {distance.toFixed(1)} km from you
                  </div>
                  <div className="text-xs text-gray-500">
                    Based on your current location
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">
                  Enable location to see distance
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Tracked Device Location</span>
          <div className="w-3 h-3 border-2 border-blue-400 rounded-full ml-4"></div>
          <span>Accuracy Range</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            if (userLocation) {
              const url = `https://www.google.com/maps/@${locationData.location.latitude},${locationData.location.longitude},15z`;
              window.open(url, '_blank');
            }
          }}
        >
          View in Google Maps
        </Button>
      </div>
    </div>
  );
}