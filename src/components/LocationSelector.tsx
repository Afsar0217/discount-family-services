import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  onBack: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelect, onBack }) => {
  const handleSircillaSelect = () => {
    onLocationSelect('Sircilla');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center px-4 sm:px-6">
          <div className="text-3xl sm:text-4xl mb-2">📍</div>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Select Your Location
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Choose your preferred service location</p>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Sircilla Block */}
            <div 
              onClick={handleSircillaSelect}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Card className="h-full border-2 border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="text-4xl sm:text-6xl mb-4">🏛️</div>
                  <h3 className="text-lg sm:text-2xl font-bold text-green-800 mb-2">Sircilla</h3>
                  <p className="text-sm sm:text-base text-green-600 mb-4">Full services available</p>
                  <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Available Now
                  </Badge>
                  <div className="mt-4 text-xs sm:text-sm text-green-700">
                    Click to continue with Sircilla services
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Karimnagar Block */}
            <div className="group">
              <Card className="h-full border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 shadow-lg opacity-75 cursor-not-allowed">
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="text-4xl sm:text-6xl mb-4 grayscale">🏢</div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-600 mb-2">Karimnagar</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">Services expansion in progress</p>
                  <Badge className="bg-gray-400 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Coming Soon
                  </Badge>
                  <div className="mt-4 text-xs sm:text-sm text-gray-500">
                    We're working to bring services to this location
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center pt-4 sm:pt-6">
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
            >
              ← Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSelector;