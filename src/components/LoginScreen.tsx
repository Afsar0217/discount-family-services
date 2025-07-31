/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { validateLogin } from '@/services/googleSheetsService';

interface LoginScreenProps {
  onLoginSuccess: (familyData: any) => void;
  onBack: () => void;
}



const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onBack }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    try {
      const result = await validateLogin(phone, password);
      
      if (result.success && result.familyData) {
        toast({ 
          title: 'Login successful!', 
          description: 'Welcome to your VIP family dashboard' 
        });
        onLoginSuccess(result.familyData);
      } else {
        toast({ 
          title: 'Login failed', 
          description: result.error || 'Invalid phone number or password', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      toast({ 
        title: 'Login error', 
        description: 'Unable to connect to the server. Please check your internet connection and try again.', 
        variant: 'destructive' 
      });
      console.error('Login error:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">VIP ఫ్యామిలీ Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              📱 Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="border-2 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
              🔑 Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-2 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleLogin}
              disabled={loading || !phone || !password}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 sm:py-3 shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              {loading ? 'Logging in...' : '🔓 Login'}
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50 text-sm sm:text-base"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;