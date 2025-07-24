/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { sendSMSToVendor } from '@/services/smsService';
import { API_ENDPOINTS } from '@/config/api';

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
      'హాస్పిటల్స్': [
        { 
          name: "Lullu Children's Hospital-లులు పిల్లల హాస్పిటల్", 
          vendor: 'Dr. Rao Hospital',
          location: 'అమ్మ హాస్పిటల్ పక్కన , సిరిసిల్ల',
          phone: '9876543210',
          discounts: [
            'OP🩺 - 99-/Only',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'LAB tests🔬(excluding outsourced) - 30%'
          ]
        },
        { 
          name: "Aditya Neuro & Ortho-ఆదిత్య న్యూరో & ఆర్థో", 
          vendor: 'Dr. Venkatesh Hospital',
          location: 'Sircilla',
          phone: '9876543210',
          discounts: [
            'OP🩺 - 99-/Only',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'Pharmacy - 10%'
          ]
        },
        { 
          name: "Life Hospital-లైఫ్ హాస్పిటల్", 
          vendor: 'Dr. Latha Hospital',
          location: 'Opposite Municipal Office, Sircilla',
          phone: '9876543210',
          discounts: [
            'OP🩺 - 99-/Only',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'LAB tests🔬(excluding outsourced) - 30%',
            'Pharmacy - 10%'
          ]
        },
        { 
          name: "Amrutha Hospital-అమృత పిల్లల హాస్పిటల్", 
          vendor: 'Dr. Akhila Hospital',
          location: 'Sircilla',
          phone: '7799663223',
          discounts: [
            'OP🩺 - 99-/Only',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'LAB tests🔬(excluding outsourced) - 30%'
          ]
        },
        { 
          name: "Chandana Chest Hospital-చందన చెస్ట్ హాస్పిటల్", 
          vendor: 'Dr. Chandana Hospital',
          location: 'Sircilla',
          phone: '7799663223',
          discounts: [
            'OP🩺 - 99-/Only',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'LAB tests🔬(excluding outsourced) - 30%'
          ]
        },
        { 
          name: "Sri Siddi Vinayaka E.N.T Hospital-శ్రీ సిద్ది వినాయక E.N.T హాస్పిటల్", 
          vendor: 'Dr. Sai Shankar Hospital',
          location: '3-2-84/1, Near Old Bus Stand,Sircilla, Rajanna Sircilla, 505301',
          phone: '7799663223',
          discounts: [
            'OP🩺 - 100 OFF%',
            'IP Billing🛏️(excluding: consumables, pharmacy & surgicals) - 25%',
            'LAB tests🔬(excluding outsourced) - 30%'
          ]
        },
        { 
          name: "Vihaana Multispeciality Dental Care-విహానా మల్టీస్పెషాలిటీ డెంటల్ కేర్", 
          vendor: 'Dr. Vikram Hospital',
          location: 'Karimnagar - Sircilla Rd, near OLD BUS STAND, Shanti Nagar, Sircilla, Telangana 505301',
          phone: '7799663223',
          discounts: [
            'OP🩺 - 99-/Only',
            'Demtal Care - 25% to 30%',
            'Laser Flop Surgery(excluding outsourced) - 40%'
          ]
        },
        { 
          name: "Vinayaka Dental Care-వినాయక డెంటల్ కేర్ -women docter", 
          vendor: 'Dr. Akhila Hospital',
          location: 'opposite Collage Ground, in manasa hospital, Sircilla, Telangana 505301',
          phone: '7799663223',
          discounts: [
            'OP🩺 - FREE',
            'Laser Flop Surgery(excluding outsourced) - 40%',
            'LAB tests🔬(excluding outsourced) - 30%'
          ]
        },
        { 
          name: "ShivaSai Optics-శివసాయి కళ్ళ హాస్పిటల్", 
          vendor: 'Dr. Akhila Hospital',
          location: 'opposite Old Bus Stand, Sircilla, Telangana 505301',
          phone: '7799663223',
          discounts: [
            'Glasses - start Just -649',
            'eye check up - FREE',
            'Branded Glasses - 25% to 30%'
          ]
        },
      ],
      'మెడికల్': [
        { 
          name: 'Sri Siddi Vinayaka Medical store-శ్రీ సిద్ది వినాయక మెడికల్ స్టోర్', 
          vendor: 'Pharmacy Venkat',
          location: 'Near Old Bus Stand,Sircilla, Rajanna Sircilla, 505301',
          phone: '9876543211',
          discounts: [
            'Ethical Medicine - 23%',
            'Personal Care & Hygiene - 10 to 15%',
            'Medical Devices & Accessories - 20 to 50%'
          ]
        }
      ],
      'లేబొరేటరీ': [
        { 
          name: 'Laboratory', 
          vendor: 'Sudha Diagnostics',
          location: 'Hospital Road, Karimnagar',
          phone: '9876543212',
          discounts: [
            '20% on blood tests',
            'Special Tests - 25%',
            'Packages - 40%'
          ]
        }
      ]
    }
  },
  Banking: {
    services: [
      { 
        name: 'HDFC క్రెడిట్ కార్డ్', 
        vendor: 'SBI Cards Center',
        location: 'Bus Stand',
        phone: '7799663223',
        discounts: [
          '10% EMI offers',
          '₹1000 bonus',
          '15% lounge access'
        ]
      },
      { 
        name: 'లోన్స్', 
        vendor: 'HDFC Loan Point',
        location: 'discountmithra',
        phone: '7799663223',
        discounts: [
          '5% processing fee off',
          'Quick processing in 24 hours',
          '15% service offer'
        ]
      },
      { 
        name: 'డెబిట్ & క్రెడిట్స్', 
        vendor: 'Muthoot Finance',
        location: 'discountmithra',
        phone: '9876543215',
        discounts: [
          'Instant cash against gold',
          'Flexible repayment options',
          '15% service offer'
        ]
      }
    ]
  },
  Shopping: {
    services: [
      { 
        name: 'Vishala Shopping Mall', 
        vendor: 'Clothing',
        location: 'Near Gandi chowk',
        phone: '9876543216',
        discounts: [
          '30% off on branded clothing',
          'Buy 2 Get 1 Free offers',
          'Seasonal sale discounts'
        ]
      },
      { 
        name: 'Reliance Trends', 
        vendor: 'Clothing',
        location: 'Near Old Bus stand',
        phone: '9876543217',
        discounts: [
          '7% discount on Cash Vochers',
          'Online Discount Coupons'
        ]
      },
      { 
        name: 'MAX Fashion Online', 
        vendor: 'Electronics',
        location: 'www.maxfashion.in',
        phone: '9876543218',
        discounts: [
          '10% Extra discount',
          'EMI options available'
        ]
      },
      { 
        name: 'Reliance Jio Mart', 
        vendor: 'Electronics',
        location: 'www.jiomart.com',
        phone: '9876543218',
        discounts: [
          '4% Extra discount',
          'EMI options available',
          'Free delivery above ₹199'
        ]
      },
      { 
        name: 'Zepto', 
        vendor: 'Online Delivery',
        location: 'www.zeptonow.com',
        phone: '9876543219',
        discounts: [
          '10% Extra discount',
          '10-minute delivery',
          'Fresh groceries guaranteed'
        ]
      },
      { 
        name: 'Skechers', 
        vendor: 'Footwear',
        location: 'www.skechers.in',
        phone: '9876543220',
        discounts: [
          '10% Extra discount',
          'Comfortable walking shoes',
          'Athletic footwear collection'
        ]
      },
      { 
        name: 'Jockey Online', 
        vendor: 'Clothing',
        location: 'www.jockey.in',
        phone: '9876543221',
        discounts: [
          '10% Extra discount',
          'Premium innerwear collection',
          'Free shipping above ₹799'
        ]
      },
      { 
        name: 'Boat', 
        vendor: 'Electronics',
        location: 'www.boat-lifestyle.com',
        phone: '9876543222',
        discounts: [
          '5% Extra discount',
          'Audio accessories',
          '1-year warranty'
        ]
      },
      { 
        name: "Men's Fashion Store", 
        vendor: 'Clothing',
        location: 'Coming Soon',
        phone: '9876543223',
        discounts: [
          '10% Extra discount',
          '15% on accessories',
          'Festival deals'
        ]
      },
      { 
        name: 'Premium Cloth Store', 
        vendor: 'Clothing',
        location: 'Coming Soon',
        phone: '9876543224',
        discounts: [
          '10% Extra discount',
          '15% on accessories',
          '20% Bulk Orders'
        ]
      }
    ]
  },
  Food: {
    services: [
      { 
        name: 'Zomato', 
        vendor: 'Online Food Delivery',
        location: 'Www.Zomato.com',
        phone: '9876543219',
        discounts: [
          '20% off on first order',
          'Monthly subscription discount',
          'Free home delivery'
        ]
      },
      { 
        name: 'KFC', 
        vendor: 'Fast Food',
        location: 'KFC',
        phone: '9876543220',
        discounts: [
          'Buy 1 Get 1 Free on burgers',
          'Family pack offers'
        ]
      },
      { 
        name: 'McDonalds', 
        vendor: 'Fast Food',
        location: 'McDonalds',
        phone: '9876543221',
        discounts: [
          'Free fries with any meal',
          'Buy 3 Get 1 Free'
        ] 
      },
      { 
        name: '7 Arts Restaurant', 
        vendor: 'Restaurant',
        location: 'Gandhi Nagar',
        phone: '9876543222',
        discounts: [
          'Party discounts',
          '10% off on family meals',
          'Free dessert with every meal'
        ] 
      },
      { 
        name: 'Ice House', 
        vendor: 'Ice Cream Parlor',
        location: 'Gandhi Nagar',
        phone: '9876543223',
        discounts: [
          'Buy 1 Get 1 Free on scoops',
          '20% off on family packs',
          'Premium ice cream flavors'
        ] 
      },
      { 
        name: 'Shankar Pani Puri', 
        vendor: 'Fast Food',
        location: 'Shivaalayam',
        phone: '9876543224',
        discounts: [
          '15% bill discount',
          'Free pani puri with every order',
          'Special combo offers'
        ] 
      }
    ]
  },
  Automobile: {
    services: [
      { 
        name: 'Car Repair Pro', 
        vendor: 'Auto Care',
        location: 'Old Petrol Bunk',
        phone: '9876543222',
        discounts: [
          '20% on labor',
          'Genuine spare parts only',
          '20% off on regular service'
        ]
      },
      { 
        name: 'Bike Repair Hub', 
        vendor: 'Bike Masters',
        location: 'Near College',
        phone: '9876543223',
        discounts: [
          'Interior and exterior cleaning',
          'Parts discount - 10%',
          'Eco-friendly products used'
        ]
      },
      { 
        name: 'Vasavi Auto Mobiles', 
        vendor: 'Battery Services',
        location: 'Karimnagar Road',
        phone: '9876543224',
        discounts: [
          'Free battery testing'
        ]
      },
      { 
        name: 'Sri Manjunatha Hydraulic Water Servicing Center', 
        vendor: 'Hydraulic Services',
        location: 'Srinagar Colony, Karimnagar Road',
        phone: '9876543225',
        discounts: [
          'Free hydraulic testing',
          '10% off on repairs',
          'Quality hydraulic services'
        ]
      },
      { 
        name: 'Sridurga Battery', 
        vendor: 'Battery Services',
        location: 'Chandrampet Hanuman Temple Chowrasta, Karimnagar Road, Sircilla',
        phone: '9876543226',
        discounts: [
          '35% Discount on Amaron Battery (with exchange)',
          'Free battery testing',
          'Genuine battery warranty'
        ]
      },
      { 
        name: 'Engine Carbon Cleaning Service', 
        vendor: 'Engine Services',
        location: 'Coming Soon',
        phone: '9876543227',
        discounts: [
          'Free engine carbon cleaning',
          'Improved fuel efficiency',
          'Professional engine care'
        ]
      }
    ]
  },
  Fresh: {
    services: [
      { 
        name: 'Rice Depo', 
        vendor: 'Rice & Pulses',
        location: 'Market',
        phone: '9876543225',
        discounts: [
          '100 OFF on 25KG Bag, Door Delivery 50 OFF on 25Kg Bag',
          'Organic produce available'
        ]
      },
      { 
        name: 'Daily Veggie Market', 
        vendor: 'Vegetables & Fruits',
        location: 'ప్రతి రోజు వాట్సాప్ ద్వారా వివరాలు తెలియజేస్తాము',
        phone: '9876543226',
        discounts: [
          '20% on veggies🥕',
          'Monthly subscription offers'
        ]
      },
      { 
        name: 'Fresh Mutton Shop', 
        vendor: 'Meat & Poultry',
        location: 'Soon',
        phone: '9876543227',
        discounts: [
          '₹50 off/kg',
          'Free delivery on orders above ₹500'
        ]
      },
      { 
        name: 'Fresh Fish Shop', 
        vendor: 'Seafood',
        location: 'Soon',
        phone: '9876543227',
        discounts: [
          '₹50 off/kg-Fish🐟',
          'Free delivery on orders above ₹500'
        ]
      },
      { 
        name: 'Fresh Chicken Shop', 
        vendor: 'Meat & Poultry',
        location: 'Soon',
        phone: '9876543227',
        discounts: [
          '₹50 off/kg',
          '₹30 off/kg-Party orders',
          'Free delivery on orders above ₹500'
        ]
      },
      { 
        name: 'Milk & More', 
        vendor: 'Dairy Products',
        location: 'Soon',
        phone: '9876543227',
        discounts: [
          '5% milk discount🥛',
          'Free delivery on orders above ₹500',
          'Organic dairy products'
        ]
      }
    ]
  },
  Salon: {
    services: [
      { 
        name: 'Hairzone (Men & Women)', 
        vendor: 'Men & Women',
        location: 'Gandhi Nagar',
        phone: '9876543228',
        discounts: [
          '25% haircut',
          '30% parlour services',
          'Student discounts available'
        ]
      },
      { 
        name: 'Parlour and boutique', 
        vendor: 'Beauty Services',
        location: 'Children Plaza, Karimnagar',
        phone: '9876543229',
        discounts: [
          '20% haircut',
          '30% parlour services',
          'Student discounts available'
        ]
      }
    ]
  },
  Laundry: {
    services: [
      { 
        name: 'CleanZone Laundry', 
        vendor: 'Professional Laundry Services',
        location: 'ShanthiNagar Road',
        phone: '7799663223',
        discounts: [
          '20% on dry cleaning',
          'Free delivery',
          'Monthly plans'
        ]
      },
      { 
        name: 'Wash Express', 
        vendor: 'Quick Laundry Services',
        location: 'Soon',
        phone: '7799663223',
        discounts: [
          '15% wash/iron',
          'Free delivery'
        ]
      }
    ]
  },
  Education: {
    services: [
      { 
        name: 'Online Skill Development', 
        vendor: 'Skill Academy',
        location: 'Online',
        phone: '7799663223',
        discounts: [
          '100+Free Courses with Certigication',
          'Free Trial Classes'
        ]
      },
      { 
        name: 'Sircilla High School', 
        vendor: 'Schooling',
        location: 'Soon',
        phone: '7799663223',
        discounts: [
          '10% fee discount',
          'Free books for first 100 students',
          'Scholarships available'
        ]
      },
      { 
        name: 'Sircilla Inter College', 
        vendor: 'Schooling',
        location: 'Soon',
        phone: '7799663223',
        discounts: [
          '10% fee discount',
          'Free study materials',
          'Career guidance'
        ]
      },
      { 
        name: 'Sircilla Degree College', 
        vendor: 'Schooling',
        location: 'Soon',
        phone: '7799663223',
        discounts: [
          '20% fee discount',
          'Placement assistance',
          'Library access'
        ]
      }
    ]
  },
  Travels: {
    services: [
      { 
        name: 'Sircilla Travels', 
        vendor: 'Local Travel Agency',
        location: 'Old Bus Stand',
        phone: '7799663223',
        discounts: [
          '10% off on local tours',
          'Free pickup and drop'
        ]
      },
      { 
        name: 'Holiday Plannerz', 
        vendor: 'Travel Agency',
        location: 'Main Road',
        phone: '7799663223',
        discounts: [
          '15% off on international trips',
          '15% on trips',
          'Free travel guide'
        ]
      },
      { 
        name: 'City Cab Services', 
        vendor: 'Local Cab Service',
        location: 'Gandhi Nagar',
        phone: '7799663223',
        discounts: [
          'Round-trip deals',
          '10% off on first ride',
          '24/7 service available'
        ]
      }
    ]
  },
  Construction: {
    services: [
      { 
        name: 'BuildPro Materials', 
        vendor: 'Construction Services',
        location: 'Main Road',
        phone: '7799663223',
        discounts: [
          'Free consultation',
          '10% off on first project'
        ]
      },
      { 
        name: 'HomeFix Contractors', 
        vendor: 'Home Renovation',
        location: 'Gandhi Nagar',
        phone: '7799663223',
        discounts: [
          '15% off on home renovations',
          'Free design consultation'
        ]
      },
      { 
        name: 'Tiles World', 
        vendor: 'Tiles & Flooring',
        location: 'Gandhi Nagar',
        phone: '7799663223',
        discounts: [
          '15% tiles discounts',
          'Free installation',
          'Quality materials'
        ]
      }
    ]
  },
  Bar: {
    services: [
      { 
        name: 'Sri Vinayaka Bar& Restaurant', 
        vendor: 'Bar & Restaurant',
        location: 'Gopal Nagar,Sircilla',
        phone: '7799663223',
        discounts: [
          '5% discount on Bar',
          '10% on food',
          'Happy hour specials'
        ]
      }
    ]
  },
  Tailor: {
    services: [
      { 
        name: 'Perfect Stitch - Men', 
        vendor: 'Tailoring Services',
        location: 'Shanthinagar',
        phone: '7799663223',
        discounts: [
          '20% off on first order',
          'Free fitting session'
        ]
      }
    ]
  },
  Events: {
    services: [
      { 
        name: 'Discountmithra Dream Events', 
        vendor: 'Event Management',
        location: 'Sircilla,505301',
        phone: '7799663223',
        discounts: [
          '10% off on first event booking',
          'Free consultation'
        ]
      },
      { 
        name: 'Grand Flower Decoration', 
        vendor: 'Decoration Services',
        location: 'Gandhi Nagar',
        phone: '7799663223',
        discounts: [
          '15% off on party decorations',
          'Free setup for first 5 bookings',
          '20% Wedding decor'
        ]
      },
      { 
        name: 'Catering Deals', 
        vendor: 'Catering Services',
        location: 'Gandhi Nagar',
        phone: '7799663223',
        discounts: [
          '10% Catering deal',
          '15% on party orders',
          'Free tasting session'
        ]
      }
    ]
  },
  GiftArticles: {
    services: [
      { 
        name: 'Gift Gallery', 
        vendor: 'Gift Shop',
        location: 'Main Street',
        phone: '7799663223',
        discounts: [
          '10% off on first purchase',
          'Free gift wrapping'
        ]
      },
      { 
        name: 'Artisan Gifts', 
        vendor: 'Handmade Gifts',
        location: 'City Center',
        phone: '7799663223',
        discounts: [
          '15% off on handmade items',
          'Custom gift options available'
        ]
      }
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

    await fetch(API_ENDPOINTS.BOOKINGS, {
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
              <div className="text-center text-sm text-gray-600">
                Booking for: <Badge variant="secondary">{selectedMember}</Badge>
              </div>
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
            <div className="text-center text-sm text-gray-600">
              Booking for: <Badge variant="secondary">{selectedMember}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service: any, index: number) => {
              const bookingKey = `${service.name}-${service.vendor}`;
              const isLoading = loadingBookings.has(bookingKey);
              
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-blue-600 mb-1">{service.name}</h3>
                        <Badge variant="secondary" className="mb-2">{service.vendor}</Badge>
                        {service.location && (
                          <p className="text-sm text-gray-600">
                            <strong>Location:</strong> {service.location}
                          </p>
                        )}
                        {service.phone && (
                          <p className="text-sm text-gray-600">
                            <strong>Phone:</strong> <span className="text-green-600">{service.phone}</span>
                          </p>
                        )}
                        {service.discounts && service.discounts.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Discounts:</p>
                            <ul className="list-disc ml-4 text-sm text-gray-600">
                              {service.discounts.map((discount: string, i: number) => (
                                <li key={i}>{discount}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
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