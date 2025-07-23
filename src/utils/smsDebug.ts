// SMS Debug Utility
export const debugTwilioCredentials = () => {
  const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
  const TWILIO_MESSAGING_SERVICE_SID = import.meta.env.VITE_TWILIO_MESSAGING_SERVICE_SID;
  const SMS_ENABLED = import.meta.env.VITE_SMS_ENABLED;

  console.log('=== SMS DEBUG INFO ===');
  console.log('SMS_ENABLED:', SMS_ENABLED);
  console.log('TWILIO_ACCOUNT_SID exists:', !!TWILIO_ACCOUNT_SID);
  console.log('TWILIO_ACCOUNT_SID format:', TWILIO_ACCOUNT_SID ? 
    (TWILIO_ACCOUNT_SID.startsWith('AC') ? 'Valid format (AC...)' : 'Invalid format (should start with AC)') : 
    'Not set');
  console.log('TWILIO_AUTH_TOKEN exists:', !!TWILIO_AUTH_TOKEN);
  console.log('TWILIO_AUTH_TOKEN length:', TWILIO_AUTH_TOKEN ? TWILIO_AUTH_TOKEN.length : 0);
  console.log('TWILIO_MESSAGING_SERVICE_SID exists:', !!TWILIO_MESSAGING_SERVICE_SID);
  console.log('TWILIO_MESSAGING_SERVICE_SID format:', TWILIO_MESSAGING_SERVICE_SID ? 
    (TWILIO_MESSAGING_SERVICE_SID.startsWith('MG') ? 'Valid format (MG...)' : 'Invalid format (should start with MG)') : 
    'Not set');
  
  // Test basic auth encoding
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
    const authString = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    console.log('Auth string length:', authString.length);
    console.log('Auth string preview:', authString.substring(0, 20) + '...');
  }
  
  console.log('=== END DEBUG INFO ===');
};

// Call this function to debug
if (typeof window !== 'undefined') {
  (window as any).debugTwilioCredentials = debugTwilioCredentials;
}