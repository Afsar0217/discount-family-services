// Test Twilio Authentication
export const testTwilioAuth = async () => {
  const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error('Missing Twilio credentials');
    return false;
  }

  try {
    // Test authentication by fetching account info
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
      }
    });

    console.log('Auth Test Response Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Twilio Authentication Successful!');
      console.log('Account Status:', data.status);
      console.log('Account Type:', data.type);
      return true;
    } else {
      const errorData = await response.json();
      console.error('❌ Twilio Authentication Failed:');
      console.error('Status:', response.status);
      console.error('Error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('❌ Network error testing Twilio auth:', error);
    return false;
  }
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testTwilioAuth = testTwilioAuth;
}