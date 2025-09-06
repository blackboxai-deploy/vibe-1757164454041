"use client";

import { useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import { LocationMap } from "@/components/location-map";
import { SearchHistory } from "@/components/search-history";
import { LocationResult } from "@/components/location-result";
import { PrivacyNotice } from "@/components/privacy-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<LocationData[]>([]);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  const handleSearch = async (phoneNumber: string) => {
    setIsLoading(true);
    setSearchResults(null);

    try {
      const response = await fetch('/api/track-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearchHistory(prev => [data, ...prev.slice(0, 9)]);
      } else {
        throw new Error('Failed to track location');
      }
    } catch (error) {
      console.error('Location tracking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">LocationTracker</h1>
              <Badge variant="outline" className="text-xs">DEMO</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPrivacyNotice(true)}
            >
              Privacy & Legal
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Phone Number Location Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstration of location tracking concepts with educational information about real-world limitations and legal requirements.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>Educational Demo:</strong> This application uses simulated data for demonstration purposes. 
              Real location tracking requires special permissions and legal authorization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Phone Number Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PhoneInput 
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
                
                <Separator />
                
                <SearchHistory 
                  history={searchHistory}
                  onSelectHistory={setSearchResults}
                />
              </CardContent>
            </Card>

            {/* Educational Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>1. Network Query:</strong> Simulates carrier network database lookup
                </div>
                <div>
                  <strong>2. Cell Tower Triangulation:</strong> Demonstrates location approximation methods
                </div>
                <div>
                  <strong>3. Legal Verification:</strong> Shows authorization requirement checks
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <strong className="text-blue-900">Note:</strong> Real tracking requires court orders, emergency services authorization, or user consent.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Location Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Location Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationMap 
                    locationData={searchResults}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>

              {/* Search Results */}
              {searchResults && (
                <LocationResult data={searchResults} />
              )}

              {/* Getting Started */}
              {!searchResults && !isLoading && (
                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <div className="space-y-4">
                        <div className="text-lg">Enter a phone number to see how location tracking works</div>
                        <div className="text-sm">
                          Try these example numbers:
                          <div className="mt-2 space-x-2">
                            <Badge variant="secondary">+1-555-0123</Badge>
                            <Badge variant="secondary">+44-20-7946-0958</Badge>
                            <Badge variant="secondary">+33-1-42-86-83-26</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Privacy Notice Modal */}
      <PrivacyNotice 
        isOpen={showPrivacyNotice}
        onClose={() => setShowPrivacyNotice(false)}
      />
    </div>
  );
}