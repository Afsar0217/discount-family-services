/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Vite built-in environment variables
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  
  // Twilio Configuration
  readonly VITE_TWILIO_ACCOUNT_SID: string
  readonly VITE_TWILIO_AUTH_TOKEN: string
  readonly VITE_TWILIO_PHONE_NUMBER: string
  readonly VITE_TWILIO_MESSAGING_SERVICE_SID: string
  readonly VITE_SMS_MESSAGE_FORMAT: 'minimal' | 'standard' | 'detailed'
  readonly VITE_CENTRAL_NOTIFICATION_PHONE: string
  
  // Vendor Phone Numbers - Healthcare
  readonly VITE_VENDOR_DR_RAO_HOSPITAL_PHONE: string
  readonly VITE_VENDOR_PHARMACY_RAJU_PHONE: string
  readonly VITE_VENDOR_SUDHA_DIAGNOSTICS_PHONE: string
  
  // Vendor Phone Numbers - Banking
  readonly VITE_VENDOR_SBI_CARDS_CENTER_PHONE: string
  readonly VITE_VENDOR_HDFC_LOAN_POINT_PHONE: string
  readonly VITE_VENDOR_MUTHOOT_FINANCE_PHONE: string
  
  // Vendor Phone Numbers - Shopping
  readonly VITE_VENDOR_CLOTHING_PHONE: string
  readonly VITE_VENDOR_SAREES_PHONE: string
  readonly VITE_VENDOR_ELECTRONICS_PHONE: string
  
  // Vendor Phone Numbers - Food
  readonly VITE_VENDOR_BREAKFAST_PHONE: string
  readonly VITE_VENDOR_BIRYANI_PHONE: string
  readonly VITE_VENDOR_FRESH_JUICES_PHONE: string
  
  // Vendor Phone Numbers - Automobile
  readonly VITE_VENDOR_HERO_SERVICE_HUB_PHONE: string
  readonly VITE_VENDOR_CLEAN_CARZ_PHONE: string
  readonly VITE_VENDOR_AMARON_EXPRESS_PHONE: string
  
  // Vendor Phone Numbers - Fresh
  readonly VITE_VENDOR_VEGGIES_PHONE: string
  readonly VITE_VENDOR_MILK_CURD_PHONE: string
  readonly VITE_VENDOR_FRUITS_ONLY_PHONE: string
  
  // Vendor Phone Numbers - Salon
  readonly VITE_VENDOR_MEN_WOMEN_PHONE: string
  readonly VITE_VENDOR_KIDS_ONLY_PHONE: string
  readonly VITE_VENDOR_WOMEN_BEAUTY_PHONE: string
  
  // Dynamic vendor phone numbers (for any vendor)
  readonly [key: `VITE_VENDOR_${string}_PHONE`]: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global window extensions for debugging
declare global {
  interface Window {
    lastSMSSid?: string;
  }
}