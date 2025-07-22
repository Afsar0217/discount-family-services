/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { sendSMSToVendor } from '@/services/smsService';

interface ServicesListProps {
  category: string;
  subcategory: string | null;
  onSubcategorySelect: (subcategory: string) => void;
  onBack: () => void;
  familyData: any;
  selectedMember: string;
}

const servicesData = {
  Healthcare: {
    subcategories: ['హాస్పిటల్స్', 'మెడికల్', 'లేబొరేటరీ'],
    services: {
      'హాస్పిటల్స్': [{ name: 'శ్రీ సాయి హాస్పిటల్', vendor: 'Dr. Rao Hospital' }],
      'మెడికల్': [{ name: 'రాజు మెడికల్స్', vendor: 'Pharmacy Raju' }],
      'లేబొరేటరీ': [{ name: 'హైటెక్ ల్యాబ్', vendor: 'Sudha Diagnostics' }]
    }
  },
  Banking: {
    services: [
      { name: 'క్రెడిట్ కార్డ్', vendor: 'SBI Cards Center' },
      { name: 'లోన్స్', vendor: 'HDFC Loan Point' },
      { name: 'Gold Loan', vendor: 'Muthoot Finance' }
    ]
  },
  Shopping: {
    services: [
      { name: 'Trendz Mall', vendor: 'Clothing' },
      { name: 'Siricilla Handloom', vendor: 'Sarees' },
      { name: 'Mega Mart', vendor: 'Electronics' }
    ]
  },
  Food: {
    services: [
      { name: 'Annapurna Tiffins', vendor: 'Breakfast' },
      { name: 'Spicy House', vendor: 'Biryani' },
      { name: 'Juice Junction', vendor: 'Fresh Juices' }
    ]
  },
  Automobile: {
    services: [
      { name: 'Bike Servicing', vendor: 'Hero Service Hub' },
      { name: 'Car Wash', vendor: 'Clean Carz' },
      { name: 'Battery Check', vendor: 'Amaron Express' }
    ]
  },
  Fresh: {
    services: [
      { name: 'Rythu Bazaar', vendor: 'Veggies' },
      { name: 'Milk Point', vendor: 'Milk & Curd' },
      { name: 'Fresh Fruits Hub', vendor: 'Fruits Only' }
    ]
  },
  Salon: {
    services: [
      { name: 'Trendy Looks', vendor: 'Men & Women' },
      { name: 'Kids Cuts', vendor: 'Kids Only' },
      { name: 'Glam Studio', vendor: 'Women Beauty' }
    ]
  }
};

const ServicesList: React.FC<ServicesListProps> = ({ 
  category, 
  subcategory, 
  onSubcategorySelect, 
  onBack, 
  familyData,
  selectedMember
}) => {
  const categoryData = servicesData[category as keyof typeof servicesData];
  const [loadingBookings, setLoadingBookings] = useState<Set<string>>(new Set());
  
  // ...existing code...
const handleBooking = async (serviceName: string, vendorName: string) => {
  const bookingKey = `${serviceName}-${vendorName}`;
  
  // Prevent multiple simultaneous bookings for the same service
  if (loadingBookings.has(bookingKey)) {
    return;
  }

  // Add to loading state
  setLoadingBookings(prev => new Set(prev).add(bookingKey));

  try {
    const bookingData = {
      bookedBy: familyData.members[0], // Person who logged in
      bookedFor: selectedMember, // Person for whom service is booked
      phone: familyData.phone,
      service: serviceName,
      vendor: vendorName,
      category,
      subcategory,
      timestamp: new Date().toISOString()
    };
    
    // Show initial booking confirmation
    toast({
      title: 'Booking Confirmed! 🎉',
      description: `Service ${serviceName} booked for ${selectedMember}. Notifying vendor...`
    });
    
    console.log('Booking data:', bookingData);
    
    // Send SMS to vendor
    const smsSuccess = await sendSMSToVendor(bookingData);

    await fetch('http://localhost:4000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    // --- ADD THIS BLOCK ---
    if (smsSuccess) {
      // Save booking to backend


      // Additional success message for SMS
      setTimeout(() => {
        toast({
          title: 'Vendor Notified! 📱',
          description: `${vendorName} will contact you shortly to confirm the appointment.`
        });
      }, 1000);
    }
    // --- END BLOCK ---

  } catch (error) {
    console.error('Booking error:', error);
    toast({
      title: 'Booking Error ❌',
      description: 'There was an issue processing your booking. Please try again.',
      variant: 'destructive'
    });
  } finally {
    // Remove from loading state
    setLoadingBookings(prev => {
      const newSet = new Set(prev);
      newSet.delete(bookingKey);
      return newSet;
    });
  }
};
// ...existing code...

  // Show subcategories for Healthcare
  if (category === 'Healthcare' && !subcategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                🏥 Healthcare Subcategories
              </CardTitle>
              <p className="text-center text-sm text-gray-600">
                Booking for: <Badge variant="secondary">{selectedMember}</Badge>
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {'subcategories' in categoryData && categoryData.subcategories?.map((sub) => (
                <Button
                  key={sub}
                  onClick={() => onSubcategorySelect(sub)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {sub}
                </Button>
              ))}
              <Button onClick={onBack} variant="outline" className="w-full border-2 mt-4">
                ← Back to Categories
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show services
  let services: { name: string; vendor: string }[] = [];
  if (subcategory) {
    services = categoryData.services?.[subcategory as keyof typeof categoryData.services] || [];
  } else if (Array.isArray(categoryData.services)) {
    services = categoryData.services;
  } else if (typeof categoryData.services === 'object' && categoryData.services !== null) {
    // For Healthcare, flatten all subcategory arrays into one array
    services = Object.values(categoryData.services).flat();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              {subcategory ? `${subcategory} Services` : `${category} Services`}
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              Booking for: <Badge variant="secondary">{selectedMember}</Badge>
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service: any, index: number) => {
              const bookingKey = `${service.name}-${service.vendor}`;
              const isLoading = loadingBookings.has(bookingKey);
              
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <Badge variant="secondary">{service.vendor}</Badge>
                      </div>
                      <Button
                        onClick={() => handleBooking(service.name, service.vendor)}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Booking...
                          </>
                        ) : (
                          'Book Now'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <Button onClick={onBack} variant="outline" className="w-full border-2 mt-4">
              ← Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesList;