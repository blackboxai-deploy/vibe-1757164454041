"use client";

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

interface SearchHistoryProps {
  history: LocationData[];
  onSelectHistory: (data: LocationData) => void;
}

export function SearchHistory({ history, onSelectHistory }: SearchHistoryProps) {
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getCountryFlag = (country: string): string => {
    const flags: { [key: string]: string } = {
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'Russia': '🇷🇺',
      'Spain': '🇪🇸',
      'Italy': '🇮🇹',
      'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪'
    };
    return flags[country] || '🌍';
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all search history?')) {
      // This would typically clear the history in the parent component
      // For now, we'll just show the confirmation
      console.log('History cleared');
    }
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <div className="space-y-2">
              <div className="text-sm">No searches yet</div>
              <div className="text-xs">
                Your recent location searches will appear here
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search History</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearHistory}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => onSelectHistory(item)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <div className="space-y-2">
                  {/* Phone Number & Time */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {item.phoneNumber}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getCountryFlag(item.location.country)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-700 truncate">
                        {item.location.city}, {item.location.country}
                      </div>
                    </div>
                  </div>

                  {/* Carrier & Accuracy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.carrier.name}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.location.accuracy <= 100 
                            ? "text-green-700 border-green-300" 
                            : item.location.accuracy <= 500 
                            ? "text-yellow-700 border-yellow-300" 
                            : "text-red-700 border-red-300"
                        }`}
                      >
                        ±{item.location.accuracy}m
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400">
                      Click to view
                    </div>
                  </div>
                </div>
              </button>
              {index < history.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>

        {/* History Stats */}
        {history.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{history.length} search{history.length !== 1 ? 'es' : ''}</span>
              <span>Last 10 results shown</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}