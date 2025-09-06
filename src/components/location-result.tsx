"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

interface LocationResultProps {
  data: LocationData;
}

export function LocationResult({ data }: LocationResultProps) {
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const downloadReport = () => {
    const report = {
      searchDetails: {
        phoneNumber: data.phoneNumber,
        timestamp: data.timestamp,
        legal: data.legal
      },
      locationData: data.location,
      carrierInfo: data.carrier,
      disclaimer: "This is simulated data for demonstration purposes only. Real location tracking requires proper legal authorization."
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `location-report-${data.phoneNumber.replace(/[^\d]/g, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Location Results</span>
              <Badge 
                variant={data.legal.authorized ? "default" : "destructive"}
                className="text-xs"
              >
                {data.legal.authorized ? "Authorized" : "Demo Only"}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Phone: {data.phoneNumber} • {formatTimestamp(data.timestamp)}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={downloadReport}>
            Download Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Information */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Location Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Coordinates</label>
                <div 
                  className="text-sm font-mono bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => copyToClipboard(`${data.location.latitude}, ${data.location.longitude}`)}
                  title="Click to copy"
                >
                  {data.location.latitude.toFixed(6)}, {data.location.longitude.toFixed(6)}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Accuracy</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={
                      data.location.accuracy <= 100 
                        ? "text-green-700 border-green-300" 
                        : data.location.accuracy <= 500 
                        ? "text-yellow-700 border-yellow-300" 
                        : "text-red-700 border-red-300"
                    }
                  >
                    ±{data.location.accuracy} meters
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {data.location.accuracy <= 100 ? "High" : data.location.accuracy <= 500 ? "Medium" : "Low"} precision
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <div className="text-sm text-gray-900 mt-1">
                  <div>{data.location.address}</div>
                  <div className="text-gray-600">{data.location.city}, {data.location.country}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Carrier Information */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Carrier & Network</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Carrier</label>
              <div className="text-sm font-medium text-gray-900 mt-1">{data.carrier.name}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Network Type</label>
              <div className="mt-1">
                <Badge variant="secondary">{data.carrier.network}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Connection</label>
              <div className="mt-1">
                <Badge variant="outline">{data.carrier.type}</Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Legal & Source Information */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Legal Information</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Authorization Status</div>
                <div className="text-xs text-gray-500 mt-1">Required for real-world tracking</div>
              </div>
              <Badge 
                variant={data.legal.authorized ? "default" : "secondary"}
              >
                {data.legal.authorized ? "Authorized" : "Demo Mode"}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Data Source</div>
              <div className="text-sm text-gray-900 mt-1">{data.legal.source}</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Technical Details */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Technical Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <strong>Tracking Method:</strong> Cell Tower Triangulation
            </div>
            <div>
              <strong>Query Time:</strong> {formatTimestamp(data.timestamp)}
            </div>
            <div>
              <strong>Data Freshness:</strong> Real-time (simulated)
            </div>
            <div>
              <strong>Confidence Level:</strong> {
                data.location.accuracy <= 100 ? "High (95%)" : 
                data.location.accuracy <= 500 ? "Medium (80%)" : 
                "Low (60%)"
              }
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="text-sm font-medium text-amber-800 mb-1">Educational Demonstration</h5>
              <p className="text-sm text-amber-700">
                This is simulated location data for educational purposes only. Real phone number location tracking 
                requires legal authorization, court orders, emergency services status, or explicit user consent. 
                Unauthorized tracking is illegal in most jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}