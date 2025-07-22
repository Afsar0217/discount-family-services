import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { checkSMSStatus } from '@/services/smsService';

const SMSDebugPanel: React.FC = () => {
  const [messageSid, setMessageSid] = useState('');
  const [testPhone, setTestPhone] = useState('+917013110173');
  const [testMessage, setTestMessage] = useState('Test message from DiscountMithra');
  const [messageFormat, setMessageFormat] = useState<'minimal' | 'standard' | 'detailed'>('minimal');
  const [statusResult, setStatusResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample booking data for testing different message formats
  const sampleBookingData = {
    bookedBy: 'John Doe',
    bookedFor: 'John Doe',
    phone: '+917013110173',
    service: 'Hair Cut',
    vendor: 'Men & Women',
    category: 'Salon',
    subcategory: 'Hair',
    timestamp: new Date().toISOString()
  };

  // Function to create message based on format (copied from smsService)
  const createSMSMessage = (bookingData: typeof sampleBookingData, format: 'minimal' | 'standard' | 'detailed' = 'standard'): string => {
    switch (format) {
      case 'minimal':
        return `${bookingData.vendor}: ${bookingData.bookedBy} ${bookingData.phone} - ${bookingData.service}`;
      
      case 'standard':
        return `${bookingData.vendor} Booking: ${bookingData.bookedBy} (${bookingData.phone}) for ${bookingData.service}. Please confirm.`;
      
      case 'detailed':
        const bookingTime = new Date(bookingData.timestamp).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        return `🔔 New Booking Alert!

📋 Service: ${bookingData.service}
👤 Customer: ${bookingData.bookedBy}
📞 Phone: ${bookingData.phone}
👨‍👩‍👧‍👦 For: ${bookingData.bookedFor}
📅 Booked: ${bookingTime}
📂 Category: ${bookingData.category}${bookingData.subcategory ? ` > ${bookingData.subcategory}` : ''}

Please contact the customer to confirm the appointment.

- DiscountMithra Team`;
      
      default:
        return `New Booking: ${bookingData.bookedBy} (${bookingData.phone}) for ${bookingData.service}. Please confirm appointment.`;
    }
  };

  const handleCheckStatus = async () => {
    if (!messageSid.trim()) {
      alert('Please enter a message SID');
      return;
    }

    setIsLoading(true);
    try {
      const result = await checkSMSStatus(messageSid.trim());
      setStatusResult(result);
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestSMS = async () => {
    setIsLoading(true);
    try {
      const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
      const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
      const TWILIO_MESSAGING_SERVICE_SID = import.meta.env.VITE_TWILIO_MESSAGING_SERVICE_SID;
      const CENTRAL_NOTIFICATION_PHONE = import.meta.env.VITE_CENTRAL_NOTIFICATION_PHONE;

      // Use central notification phone if available, otherwise use testPhone
      const phoneToUse = CENTRAL_NOTIFICATION_PHONE || testPhone;

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
          To: phoneToUse,
          Body: testMessage
        })
      });

      const result = await response.json();
      console.log('Test SMS Result:', result);
      
      if (result.sid) {
        setMessageSid(result.sid);
        alert(`Test SMS sent! SID: ${result.sid}`);
      } else {
        alert(`Error: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending test SMS:', error);
      alert('Error sending test SMS');
    } finally {
      setIsLoading(false);
    }
  };

  const getLastSMSSid = () => {
    if (window.lastSMSSid) {
      setMessageSid(window.lastSMSSid);
    } else {
      alert('No recent SMS SID found');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🔍 SMS Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message Format Preview */}
        <div className="space-y-2">
          <Label>Message Format Preview</Label>
          <div className="grid grid-cols-1 gap-2">
            {(['minimal', 'standard', 'detailed'] as const).map((format) => {
              const message = createSMSMessage(sampleBookingData, format);
              return (
                <div key={format} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold capitalize">{format}</span>
                    <span className="text-sm text-gray-500">{message.length} chars</span>
                  </div>
                  <div className="text-sm bg-gray-50 p-2 rounded whitespace-pre-wrap">
                    {message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr />

        {/* Test SMS Section */}
        <div className="space-y-2">
          <Label htmlFor="testPhone">Test Phone Number</Label>
          <Input
            id="testPhone"
            value={testPhone}
            onChange={(e) => setTestPhone(e.target.value)}
            placeholder="+917013110173"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testMessage">Test Message</Label>
          <Textarea
            id="testMessage"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter test message"
            rows={3}
          />
        </div>

        <Button 
          onClick={sendTestSMS} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Send Test SMS'}
        </Button>

        <hr />

        {/* Status Check Section */}
        <div className="space-y-2">
          <Label htmlFor="messageSid">Message SID</Label>
          <div className="flex gap-2">
            <Input
              id="messageSid"
              value={messageSid}
              onChange={(e) => setMessageSid(e.target.value)}
              placeholder="SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <Button onClick={getLastSMSSid} variant="outline">
              Get Last
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleCheckStatus} 
          disabled={isLoading || !messageSid.trim()}
          className="w-full"
          variant="outline"
        >
          {isLoading ? 'Checking...' : 'Check SMS Status'}
        </Button>

        {/* Status Result */}
        {statusResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">SMS Status Result:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(statusResult, null, 2)}
            </pre>
            
            <div className="mt-2 space-y-1">
              <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${
                statusResult.status === 'delivered' ? 'bg-green-200 text-green-800' :
                statusResult.status === 'failed' ? 'bg-red-200 text-red-800' :
                statusResult.status === 'sent' ? 'bg-blue-200 text-blue-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>{statusResult.status}</span></div>
              
              {statusResult.error_code && (
                <div><strong>Error Code:</strong> {statusResult.error_code}</div>
              )}
              
              {statusResult.error_message && (
                <div><strong>Error Message:</strong> {statusResult.error_message}</div>
              )}
              
              <div><strong>Price:</strong> {statusResult.price} {statusResult.price_unit}</div>
            </div>
          </div>
        )}

        {/* Troubleshooting Tips */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">🛠️ Troubleshooting Tips:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>If using Twilio trial account, verify the phone number in Twilio Console</li>
            <li>Check if your phone can receive international SMS</li>
            <li>Ensure the phone number format is correct (+91xxxxxxxxxx)</li>
            <li>Check Twilio account balance and SMS limits</li>
            <li>Look for SMS in spam/junk folder</li>
            <li>Try sending to a different phone number</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SMSDebugPanel;