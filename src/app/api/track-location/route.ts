import { NextRequest, NextResponse } from 'next/server';

interface LocationRequest {
  phoneNumber: string;
}

interface LocationResponse {
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

// Mock location data for different phone number patterns
const MOCK_LOCATIONS: { [key: string]: Omit<LocationResponse, 'phoneNumber' | 'timestamp'> } = {
  // US Numbers
  '+1': {
    location: {
      latitude: 40.7829,
      longitude: -73.9654,
      accuracy: 150,
      address: '350 5th Ave',
      city: 'New York',
      country: 'United States'
    },
    carrier: {
      name: 'Verizon Wireless',
      network: '5G',
      type: 'Mobile'
    },
    legal: {
      authorized: false,
      source: 'Simulated Demo Data'
    }
  },
  // UK Numbers
  '+44': {
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      accuracy: 200,
      address: '10 Downing Street',
      city: 'London',
      country: 'United Kingdom'
    },
    carrier: {
      name: 'EE Limited',
      network: '4G LTE',
      type: 'Mobile'
    },
    legal: {
      authorized: false,
      source: 'Simulated Demo Data'
    }
  },
  // French Numbers
  '+33': {
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      accuracy: 120,
      address: 'Champs-Élysées',
      city: 'Paris',
      country: 'France'
    },
    carrier: {
      name: 'Orange France',
      network: '5G',
      type: 'Mobile'
    },
    legal: {
      authorized: false,
      source: 'Simulated Demo Data'
    }
  },
  // German Numbers
  '+49': {
    location: {
      latitude: 52.5200,
      longitude: 13.4050,
      accuracy: 180,
      address: 'Brandenburg Gate',
      city: 'Berlin',
      country: 'Germany'
    },
    carrier: {
      name: 'Deutsche Telekom',
      network: '5G',
      type: 'Mobile'
    },
    legal: {
      authorized: false,
      source: 'Simulated Demo Data'
    }
  },
  // Default fallback
  'default': {
    location: {
      latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
      accuracy: Math.floor(Math.random() * 400) + 100,
      address: 'Market Street',
      city: 'San Francisco',
      country: 'United States'
    },
    carrier: {
      name: 'AT&T Mobility',
      network: '4G LTE',
      type: 'Mobile'
    },
    legal: {
      authorized: false,
      source: 'Simulated Demo Data'
    }
  }
};

function validatePhoneNumber(phoneNumber: string): boolean {
  // Remove all non-digit characters except + at the beginning
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // Check if it starts with + and has 10-15 digits total
  if (cleanNumber.startsWith('+')) {
    const digits = cleanNumber.slice(1);
    return digits.length >= 10 && digits.length <= 15 && /^\d+$/.test(digits);
  }
  
  return false;
}

function getCountryCode(phoneNumber: string): string {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // Extract country code patterns
  if (cleanNumber.startsWith('+1')) return '+1';
  if (cleanNumber.startsWith('+44')) return '+44';
  if (cleanNumber.startsWith('+33')) return '+33';
  if (cleanNumber.startsWith('+49')) return '+49';
  if (cleanNumber.startsWith('+81')) return '+81';
  if (cleanNumber.startsWith('+86')) return '+86';
  if (cleanNumber.startsWith('+91')) return '+91';
  if (cleanNumber.startsWith('+61')) return '+61';
  if (cleanNumber.startsWith('+55')) return '+55';
  if (cleanNumber.startsWith('+7')) return '+7';
  
  return 'default';
}

function addLocationVariation(baseLocation: any): any {
  // Add small random variations to make each search unique
  const latVariation = (Math.random() - 0.5) * 0.01; // ~1km variation
  const lngVariation = (Math.random() - 0.5) * 0.01;
  const accuracyVariation = Math.floor(Math.random() * 100) + 50; // 50-150m variation
  
  return {
    ...baseLocation,
    location: {
      ...baseLocation.location,
      latitude: baseLocation.location.latitude + latVariation,
      longitude: baseLocation.location.longitude + lngVariation,
      accuracy: accuracyVariation
    }
  };
}

async function simulateNetworkDelay(): Promise<void> {
  // Simulate realistic network query delay
  const delay = Math.random() * 2000 + 1000; // 1-3 seconds
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LocationRequest = await request.json();
    const { phoneNumber } = body;

    // Validate input
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please include country code (e.g., +1-555-123-4567)' },
        { status: 400 }
      );
    }

    // Simulate network query delay
    await simulateNetworkDelay();

    // Get country code and corresponding mock data
    const countryCode = getCountryCode(phoneNumber);
    const baseLocationData = MOCK_LOCATIONS[countryCode] || MOCK_LOCATIONS['default'];
    
    // Add variations to make each search unique
    const locationData = addLocationVariation(baseLocationData);

    // Create response
    const response: LocationResponse = {
      phoneNumber,
      timestamp: new Date().toISOString(),
      ...locationData
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Location tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error during location lookup' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to track location.' },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to track location.' },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to track location.' },
    { status: 405 }
  );
}