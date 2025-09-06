"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PhoneInputProps {
  onSearch: (phoneNumber: string) => void;
  isLoading: boolean;
}

export function PhoneInput({ onSearch, isLoading }: PhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  const validatePhoneNumber = (number: string): boolean => {
    // Remove all non-digit characters except + at the beginning
    const cleanNumber = number.replace(/[^\d+]/g, "");
    
    // Check if it starts with + and has 10-15 digits total
    if (cleanNumber.startsWith("+")) {
      const digits = cleanNumber.slice(1);
      return digits.length >= 10 && digits.length <= 15 && /^\d+$/.test(digits);
    }
    
    // For numbers without +, check if they have 10-11 digits
    return cleanNumber.length >= 10 && cleanNumber.length <= 11 && /^\d+$/.test(cleanNumber);
  };

  const detectCountry = (number: string): string | null => {
    const cleanNumber = number.replace(/[^\d+]/g, "");
    
    if (cleanNumber.startsWith("+1")) return "US/Canada";
    if (cleanNumber.startsWith("+44")) return "United Kingdom";
    if (cleanNumber.startsWith("+33")) return "France";
    if (cleanNumber.startsWith("+49")) return "Germany";
    if (cleanNumber.startsWith("+81")) return "Japan";
    if (cleanNumber.startsWith("+86")) return "China";
    if (cleanNumber.startsWith("+91")) return "India";
    if (cleanNumber.startsWith("+61")) return "Australia";
    if (cleanNumber.startsWith("+55")) return "Brazil";
    if (cleanNumber.startsWith("+7")) return "Russia";
    
    return null;
  };

  const formatPhoneNumber = (number: string): string => {
    // Remove all non-digit characters except + at the beginning
    let cleaned = number.replace(/[^\d+]/g, "");
    
    // If it doesn't start with +, assume it's a US number and add +1
    if (!cleaned.startsWith("+") && cleaned.length === 10) {
      cleaned = "+1" + cleaned;
    }
    
    // Format based on country code
    if (cleaned.startsWith("+1") && cleaned.length === 12) {
      return `+1-${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    
    if (cleaned.startsWith("+44")) {
      return cleaned.replace(/(\+44)(\d{2})(\d{4})(\d{4})/, "$1-$2-$3-$4");
    }
    
    if (cleaned.startsWith("+33")) {
      return cleaned.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3-$4-$5-$6");
    }
    
    // Default formatting for other numbers
    return cleaned.replace(/(\+\d{1,3})(\d{3,4})(\d{3,4})(\d{2,4})/, "$1-$2-$3-$4");
  };

  const handleInputChange = (value: string) => {
    setPhoneNumber(value);
    const valid = validatePhoneNumber(value);
    setIsValid(valid);
    setDetectedCountry(detectCountry(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && phoneNumber.trim()) {
      const formattedNumber = formatPhoneNumber(phoneNumber.trim());
      onSearch(formattedNumber);
    }
  };

  const exampleNumbers = [
    { number: "+1-555-0123", country: "US", label: "US Example" },
    { number: "+44-20-7946-0958", country: "UK", label: "UK Example" },
    { number: "+33-1-42-86-83-26", country: "FR", label: "France Example" },
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="phone-input">Phone Number</Label>
          <Input
            id="phone-input"
            type="tel"
            placeholder="+1-555-123-4567"
            value={phoneNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`mt-1 ${!isValid ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          
          {!isValid && phoneNumber && (
            <p className="text-sm text-red-600 mt-1">
              Please enter a valid phone number with country code
            </p>
          )}
          
          {detectedCountry && isValid && (
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="secondary" className="text-xs">
                Detected: {detectedCountry}
              </Badge>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!isValid || !phoneNumber.trim() || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Tracking Location...</span>
            </div>
          ) : (
            "Track Location"
          )}
        </Button>
      </form>

      {/* Example Numbers */}
      <Card>
        <CardContent className="pt-4">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Try These Examples:
          </Label>
          <div className="space-y-2">
            {exampleNumbers.map((example, index) => (
              <button
                key={index}
                onClick={() => handleInputChange(example.number)}
                className="w-full text-left p-2 rounded-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{example.number}</span>
                  <Badge variant="outline" className="text-xs">
                    {example.label}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Format Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>• Include country code (e.g., +1 for US/Canada)</div>
        <div>• Supported formats: +1-555-123-4567, +44 20 7946 0958</div>
        <div>• International numbers: +[country code][number]</div>
      </div>
    </div>
  );
}