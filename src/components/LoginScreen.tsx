/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface LoginScreenProps {
  onLoginSuccess: (familyData: any) => void;
  onBack: () => void;
}

const familyData = {
  '8247556370': { password: 'vengala', members: ['అనిల్', 'లావణ్య', 'సంజీవ్', 'స్వర్ణమాల్య'] },
  '8688208088': { password: 'anil', members: ['అనిల్', 'అంజలి'] },
  '7799663223': { password: 'anjali', members: ['అంజలి', 'పప్పీ'] },
  '9618617232': { password: 'lolapu', members: ['రంజిత్', 'హరీష్'] }
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onBack }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    const family = familyData[phone as keyof typeof familyData];
    
    if (family && family.password === password) {
      toast({ title: 'Login successful!', description: 'Welcome to your VIP family dashboard' });
      onLoginSuccess({ phone, members: family.members });
    } else {
      toast({ title: 'Login failed', description: 'Invalid phone number or password', variant: 'destructive' });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">VIP ఫ్యామిలీ Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
              className="border-2 focus:border-purple-500"
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
              className="border-2 focus:border-purple-500"
            />
          </div>
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleLogin}
              disabled={loading || !phone || !password}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {loading ? 'Logging in...' : '🔓 Login'}
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50"
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