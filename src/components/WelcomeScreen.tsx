import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeScreenProps {
  onLoginClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 px-4 sm:px-6">
            <div className="text-4xl sm:text-6xl mb-4">🎉</div>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Welcome to DiscountMithra
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 sm:space-y-6 px-4 sm:px-6">
            <div className="text-base sm:text-lg text-gray-700">
              <p className="font-medium">VIP ఫ్యామిలీగా మీరు లాగిన్ అవ్వండి</p>
            </div>
            <Button 
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 text-base sm:text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              size="lg"
            >
              🔐 VIP ఫ్యామిలీ Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeScreen;