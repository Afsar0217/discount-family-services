import { toast } from '@/components/ui/use-toast';

// Extend Window interface to include lastSMSSid
declare global {
  interface Window {
    lastSMSSid?: string;
  }
}

// Twilio configuration - these should be set in environment variables
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = import.meta.env.VITE_TWILIO_PHONE_NUMBER;
const TWILIO_MESSAGING_SERVICE_SID = import.meta.env.VITE_TWILIO_MESSAGING_SERVICE_SID;

// SMS message format (minimal for trial accounts, standard for paid accounts)
const SMS_MESSAGE_FORMAT = (import.meta.env.VITE_SMS_MESSAGE_FORMAT as 'minimal' | 'standard' | 'detailed') || 'minimal';

// Central phone number to receive all booking notifications
const CENTRAL_NOTIFICATION_PHONE = import.meta.env.VITE_CENTRAL_NOTIFICATION_PHONE;

// Vendor phone numbers mapping - stored in environment variables
const getVendorPhoneNumber = (vendorName: string): string | null => {
  // Clean the vendor name: remove periods, replace spaces with underscores, convert to uppercase
  const vendorKey = vendorName
    .replace(/\./g, '')          // Remove periods first
    .replace(/\s+/g, '_')        // Replace spaces with underscores
    .toUpperCase()               // Convert to uppercase
    .replace(/[^A-Z0-9_]/g, ''); // Remove any remaining special characters
    
  const envVarName = `VITE_VENDOR_${vendorKey}_PHONE`;
  const phoneNumber = import.meta.env[envVarName];
  
  console.log('Vendor mapping debug:', {
    vendorName,
    vendorKey,
    envVarName,
    phoneNumber,
    found: !!phoneNumber,
    allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_VENDOR_')).sort()
  });
  
  return phoneNumber || null;
};

interface BookingData {
  bookedBy: string;
  bookedFor: string;
  phone: string;
  service: string;
  vendor: string;
  category: string;
  subcategory: string | null;
  timestamp: string;
}

// Message format options for different account types
const createSMSMessage = (bookingData: BookingData, format: 'minimal' | 'standard' | 'detailed' = 'standard'): string => {
  switch (format) {
    case 'minimal':
      // Ultra-short for trial accounts (under 100 characters) - includes vendor info
      return `${bookingData.vendor}: ${bookingData.bookedBy} ${bookingData.phone} - ${bookingData.service}`;
    
    case 'standard':
      // Short but informative (under 160 characters) - includes vendor info
      return `${bookingData.vendor} Booking: ${bookingData.bookedBy} (${bookingData.phone}) for ${bookingData.service}. Please confirm.`;
    
    case 'detailed': {
      // Full details for paid accounts
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
    }
    
    default:
      return `New Booking: ${bookingData.bookedBy} (${bookingData.phone}) for ${bookingData.service}. Please confirm appointment.`;
  }
};

// ...existing code...

// Get notification phone numbers from .env (comma-separated)
const NOTIFICATION_PHONES = (import.meta.env.VITE_NOTIFICATION_PHONES as string)
  ?.split(',')
  .map(num => num.trim())
  .filter(Boolean);

// ...existing code...

export const sendSMSToVendor = async (bookingData: BookingData): Promise<boolean> => {
  try {
    // ...existing checks...

    if (!NOTIFICATION_PHONES || NOTIFICATION_PHONES.length === 0) {
      console.error('Notification phone numbers not configured');
      toast({
        title: 'SMS Configuration Error',
        description: 'Notification phone numbers are not configured.',
        variant: 'destructive'
      });
      return false;
    }

    const message = createSMSMessage(bookingData, SMS_MESSAGE_FORMAT);

    // Send SMS to all notification numbers
    const sendPromises = NOTIFICATION_PHONES.map(async (phone) => {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          MessagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
          To: phone,
          Body: message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Twilio API Error: ${errorData.message || response.statusText}`);
      }

      const smsResponse = await response.json();
      console.log(`SMS sent successfully to ${phone}:`, smsResponse.sid);
      return smsResponse.sid;
    });

    await Promise.all(sendPromises);

    toast({
      title: 'SMS Sent Successfully! 📱',
      description: `Booking notification sent to all registered numbers.`
    });

    return true;

  } catch (error) {
    // ...existing error handling...
    return false;
  }
};

// ...existing code...

// Test function to validate SMS configuration
export const testSMSConfiguration = (): boolean => {
  const isConfigured = !!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER);
  
  if (!isConfigured) {
    console.warn('SMS service not configured. Please set the following environment variables:');
    console.warn('- VITE_TWILIO_ACCOUNT_SID');
    console.warn('- VITE_TWILIO_AUTH_TOKEN');
    console.warn('- VITE_TWILIO_PHONE_NUMBER');
    console.warn('- VITE_VENDOR_[VENDOR_NAME]_PHONE for each vendor');
  }
  
  return isConfigured;
};

// Function to check SMS delivery status
export const checkSMSStatus = async (messageSid: string): Promise<Record<string, unknown> | null> => {
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages/${messageSid}.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch message status: ${response.statusText}`);
    }

    const messageData = await response.json();
    console.log('SMS Status Details:', {
      sid: messageData.sid,
      status: messageData.status,
      errorCode: messageData.error_code,
      errorMessage: messageData.error_message,
      to: messageData.to,
      from: messageData.from,
      dateCreated: messageData.date_created,
      dateSent: messageData.date_sent,
      dateUpdated: messageData.date_updated,
      price: messageData.price,
      priceUnit: messageData.price_unit
    });

    return messageData;
  } catch (error) {
    console.error('Error checking SMS status:', error);
    return null;
  }
};

// Enhanced SMS sending with status tracking
export const sendSMSWithTracking = async (bookingData: BookingData): Promise<boolean> => {
  const success = await sendSMSToVendor(bookingData);
  
  if (success) {
    // Wait a bit then check status
    setTimeout(async () => {
      // You would need to store the message SID from the previous call
      // This is just for demonstration
      console.log('You can check SMS status using the SID from the previous log');
    }, 5000);
  }
  
  return success;
};