import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeScreenProps {
  onLoginClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome to DiscountMithra
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-lg text-gray-700">
              <div className="text-2xl mb-2">🫂</div>
              <p className="font-medium">VIP ఫ్యామిలీగా మీరు లాగిన్ అవ్వండి</p>
            </div>
            <div className="text-4xl">👇</div>
            <Button 
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
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