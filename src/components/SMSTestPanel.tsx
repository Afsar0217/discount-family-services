import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { testSMSConfiguration, sendSMSToVendor } from '@/services/smsService';

const SMSTestPanel: React.FC = () => {
  const [isConfigured, setIsConfigured] = useState(testSMSConfiguration());
  const [isTesting, setIsTesting] = useState(false);

  const handleTestSMS = async () => {
    setIsTesting(true);
    
    const testBookingData = {
      bookedBy: 'Test User',
      bookedFor: 'Test Family Member',
      phone: '+919876543210',
      service: 'Test Service',
      vendor: 'Dr. Rao Hospital', // Using a vendor from our data
      category: 'Healthcare',
      subcategory: 'హాస్పిటల్స్',
      timestamp: new Date().toISOString()
    };

    try {
      await sendSMSToVendor(testBookingData);
    } catch (error) {
      console.error('Test SMS failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCheckConfig = () => {
    setIsConfigured(testSMSConfiguration());
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-center">SMS Configuration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant={isConfigured ? 'default' : 'destructive'}>
            {isConfigured ? '✅ SMS Configured' : '❌ SMS Not Configured'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleCheckConfig}
            variant="outline"
            className="w-full"
          >
            🔍 Check Configuration
          </Button>
          
          <Button 
            onClick={handleTestSMS}
            disabled={!isConfigured || isTesting}
            className="w-full"
          >
            {isTesting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Test SMS...
              </>
            ) : (
              '📱 Send Test SMS'
            )}
          </Button>
        </div>
        
        {!isConfigured && (
          <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
            <p className="font-medium">Setup Required:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Create .env file from .env.example</li>
              <li>Add Twilio credentials</li>
              <li>Add vendor phone numbers</li>
              <li>Restart development server</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SMSTestPanel;