/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { sendSMSToVendor } from '@/services/smsService';
import { API_ENDPOINTS } from '@/config/api';
import { BookingConfirmationDialog } from '@/components/BookingConfirmationDialog';

interface ServicesListProps {
  category: string;
  subcategory: string | null;
  onSubcategorySelect: (subcategory: string) => void;
  onBack: () => void;
  familyData: any;
  selectedMember: string;
  selectedLocation?: string;
}

const servicesData = {
  Healthcare: {
    subcategories: ['Hospitals', 'Pharmacy', 'Laboratory'],
    services: {
      'Hospitals': [
        { 
          name: "🏥 లులు పిల్లల హాస్పిటల్ (Lullu Children's Hospital)", 
          vendor: 'Dr. Rao Hospital',
          location: 'సిద్ధులవాడ, సిరిసిల్ల – 505301',
          phone: '9876543210',
          discounts: [
            '✅ ఓపీ ఫీజు (OP Consultation) 🩺 – ₹100 తగ్గింపు',
            "✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 25% డిస్కౌంట్\n(గమనిక: Consumables, Pharmacy & Surgical items కు వర్తించదు)",
            "✅ ల్యాబ్ టెస్టులు (LAB Tests) 🔬 – 25% డిస్కౌంట్\n(గమనిక: Outsourced పరీక్షలకు వర్తించదు)",
            '✅ ఫార్మసీ (Pharmacy) 💊 – 10% డిస్కౌంట్'
          ]
        },
        { 
          name: "🏥 ఆదిత్య న్యూరో & ఆర్థో (Aditya Neuro & Ortho)", 
          vendor: 'Dr. Venkatesh Hospital',
          location: '📍 లొకేషన్: సిద్ధులవాడ, సిరిసిల్ల',
          phone: '8247556370',
          discounts: [
            '❌ ఓపీ (OP Consultation) 🩺 – డిస్కౌంట్ లేదు (Fast Treatment మాత్రమే అందుబాటులో ఉంటుంది)',
            '✅ ల్యాబ్ టెస్టులు (LAB Tests) 🔬 – 20% డిస్కౌంట్\n(గమనిక: Outsourced పరీక్షలకు వర్తించదు)',
            '✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 20% డిస్కౌంట్\n(గమనిక: Consumables, Pharmacy & Surgical Items కి వర్తించదు)',
            '✅ ఫార్మసీ (Pharmacy) 💊 – 10% డిస్కౌంట్'
          ]
        },
        { 
          name: "🏥 లైఫ్ హాస్పిటల్ (Life Hospital)", 
          vendor: 'Dr. Latha Hospital',
          location: ' మునిసిపల్ ఆఫీస్ ఎదురు, సిరిసిల్ల',
          phone: '9705021177',
          discounts: [
            '✅ ఓపీ కన్సల్టేషన్ (OP) 🩺 – ₹99 తగ్గింపు',
            '✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 20% డిస్కౌంట్\n(గమనిక: Consumables, Pharmacy & Surgical items‌కు వర్తించదు)',
            '✅ ల్యాబ్ పరీక్షలు (LAB Tests) 🔬 – 20% డిస్కౌంట్\n(గమనిక: Outsourced టెస్టులకు వర్తించదు)',
            '✅ ఫార్మసీ (Pharmacy) 💊 – 10% డిస్కౌంట్'
          ]
        },
        { 
          name: "🏥 అమృత పిల్లల హాస్పిటల్ (Amrutha Hospital)", 
          vendor: 'Dr. Akhila Hospital',
          location: 'వాణి నర్సింగ్ హోమ్ పక్కన, సిరిసిల్ల',
          phone: '9440282662',
          discounts: [
            '✅ ఓపీ కన్సల్టేషన్ (OP) 🩺 – ₹150 తగ్గింపు',
            '✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 40% డిస్కౌంట్\n(గమనిక: Consumables, Pharmacy & Surgical items కు వర్తించదు)',
            '✅ ల్యాబ్ పరీక్షలు (LAB Tests) 🔬 – 40% డిస్కౌంట్\n(గమనిక: Outsourced టెస్టులకు వర్తించదు)',
            '❌ ఫార్మసీ (Pharmacy) 💊 – డిస్కౌంట్ లేదు'
          ]
        },
        { 
          name: "🏥 చందన చెస్ట్ హాస్పిటల్ (Chandana Chest Hospital)", 
          vendor: 'Dr. Chandana Hospital',
          location: 'వాణి నర్సింగ్ హోమ్ పక్కన, సిరిసిల్ల',
          phone: '7799663223',
          discounts: [
            '✅ ఓపీ కన్సల్టేషన్ (OP) 🩺 – ₹99 తగ్గింపు',
            '✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 25% డిస్కౌంట్\n(గమనిక: Consumables, Pharmacy & Surgical items కు వర్తించదు)',
            '✅ ల్యాబ్ పరీక్షలు (LAB Tests) 🔬 – 25% డిస్కౌంట్\n(గమనిక: Outsourced టెస్టులకు వర్తించదు)',
            '✅ ఫార్మసీ (Pharmacy) 💊 – 10% డిస్కౌంట్'
          ]
        },
        { 
          name: "🏥 శ్రీ సిద్ది వినాయక E.N.T హాస్పిటల్", 
          vendor: 'Dr. Sai Shankar Hospital',
          location: '3-2-84/1, ఓల్డ్ బస్ స్టాండ్ దగ్గర, సిరిసిల్ల – 50530',
          phone: '7799663223',
          discounts: [
            '✅ ఓపీ కన్సల్టేషన్ (OP) 🩺 – ₹100 తగ్గింపు',
            '✅ ఐపీ బిల్లింగ్ (IP Billing) 🛏️ – 25% డిస్కౌంట్',
            '✅ ల్యాబ్ పరీక్షలు (LAB Tests) 🔬 – 30% డిస్కౌంట్\n(గమనిక: Outsourced టెస్టులకు వర్తించదు)',
            '✅ ఫార్మసీ (Pharmacy) 💊 – 10% డిస్కౌంట్'
          ]
        },
        { 
          name: "🦷 విహానా మల్టీస్పెషాలిటీ డెంటల్ కేర్", 
          vendor: 'Dr. Vikram Hospital',
          location: 'కరీంనగర్ – సిరిసిల్ల రోడ్, ఓల్డ్ బస్ స్టాండ్ వద్ద, సిరిసిల్ల',
          phone: '7799663223',
          discounts: [
            '✅ ఓపీ కన్సల్టేషన్ (OP) 🩺 – ఉచితం (FREE)',
            '✅ ఎక్స్‌రే (X-ray) 🖼️ – ఉచితం (FREE)',
            '✅ డెంటల్ కేర్ (Dental Care) 🦷 – 25% నుండి 30% డిస్కౌంట్',
            '✅ లేజర్ ఫ్లాప్ సర్జరీ (Laser Flap Surgery) 🔬 – UPto 40% డిస్కౌంట్'
          ]
        },
        { 
          name: "👁️‍🗨️ శివసాయి కళ్ల హాస్పిటల్ (ShivaSai Optics)", 
          vendor: 'Dr. Akhila Hospital',
          location: 'ఓల్డ్ బస్ స్టాండ్ ఎదురు, సిరిసిల్ల',
          phone: '7799663223',
          discounts: [
            '✅ కంటి పరీక్ష (Eye Checkup) – ఉచితం (FREE)',
            '👓 గ్లాసెస్ (Normal Glasses) – ₹599 నుండే ప్రారంభం',
            '🕶️ బ్రాండెడ్ గ్లాసెస్ (Branded Glasses) – 25% నుండి 30% డిస్కౌంట్ '
          ]
        },
      ],
      'Pharmacy': [
        { 
          name: '💊 శ్రీ సిద్ది వినాయక మెడికల్ స్టోర్', 
          vendor: 'Pharmacy Venkat',
          location: 'ఓల్డ్ బస్ స్టాండ్ సమీపంలో, సిరిసిల్ల, రాజన్న సిరిసిల్ల – 505301',
          phone: '9876543211',
          discounts: [
            '✅ ఎథికల్ మెడిసిన్ (Ethical Medicines) – 23% డిస్కౌంట్',
            '✅ పర్సనల్ కేర్ & హైజీన్ (Personal Care & Hygiene) – 10% నుండి 15% డిస్కౌంట్',
            '✅ మెడికల్ డివైసెస్ & యాక్సెసరీస్ (Medical Devices & Accessories) – 20% నుండి 50% డిస్కౌంట్'
          ]
        }
      ],
      'Laboratory': [
        { 
          name: '🧪 ల్యాబొరేటరీ (Laboratory)', 
          vendor: 'Sudha Diagnostics',
          location: 'ఓల్డ్ బస్ స్టాండ్ సమీపంలో, సిరిసిల్ల',
          phone: '9876543212',
          discounts: [
            '✅ బ్లడ్ టెస్టులు (Blood Tests) – 40% డిస్కౌంట్',
            '✅ స్పెషల్ టెస్టులు (Special Tests) – 30% డిస్కౌంట్'
          ]
        }
      ]
    }
  },
  Banking: {
    services: [
      { 
        name: '💳 క్రెడిట్ / డెబిట్ కార్డ్స్ ప్రత్యేక ప్రయోజనాలు', 
        vendor: 'SBI Cards Center',
        phone: '7799663223',
        discounts: [
          '✅ ఎలాంటి ఎక్సట్రా ఛార్జెస్ లేదు',
          '✅ మనీ రివార్డ్స్ (Money Rewards) – ₹1000 వరకు లభించవచ్చు'
        ]
      },
      { 
        name: '🏦 లోన్స్ (Loans)', 
        vendor: 'HDFC Loan Point',
        phone: '7799663223',
        discounts: [
          '✅ LOW Processing Fee',
          '✅ NO Extra Commission',
          '✅ Quick Processing – తక్కువ టైమ్ లో ఆమోదం'
        ]
      },
      { 
        name: '💰 గోల్డ్ లోన్స్ – DiscountMithra VIP బెనిఫిట్స్', 
        vendor: 'Muthoot Finance',
        phone: '9876543215',
        discounts: [
          '✅ LOW Interest Rates – తక్కువ వడ్డీ రేట్లు',
          '✅ Fast Processing – వేగంగా లోన్ పొందండి',
          '✅ సురక్షితమైన గోల్డ్ స్టోరేజ్'
        ]
      }
    ]
  },
  Shopping: {
    services: [
      { 
        name: '🛍️ విశాల షాపింగ్ మాల్ (Vishala Shopping Mall)', 
        vendor: 'Clothing',
        location: 'గాంధీ చౌక్ సమీపంలో, సిరిసిల్ల',
        phone: '9876543216',
        discounts: [
          '✅ టోటల్ బిల్‌పై 5% ఎక్స్ట్రా డిస్కౌంట్'
        ]
      },
      { 
        name: '👔 Adven Men’s Fashion Store', 
        vendor: 'Clothing',
        location: 'గోపాల్ నగర్, సిరిసిల్ల',
        phone: '9876543217',
        discounts: [
          '✅ టోటల్ బిల్‌పై 10% డిస్కౌంట్'
        ]
      },
      { 
        name: '🛍️ Reliance Trends', 
        vendor: 'Clothing',
        location: 'ఓల్డ్ బస్ స్టాండ్ సమీపంలో, సిరిసిల్ల',
        phone: '7799663223',
        discounts: [
          '✅ Cash Vouchersపై 5% డిస్కౌంట్'
        ]
      },
      { 
        name: '👗 MAX Fashion Online & Store', 
        vendor: 'Electronics+Fashion',
        location: 'www.maxfashion.in',
        phone: '9876543218',
        discounts: [
          '🛒 ఆన్‌లైన్ షాపింగ్‌ (Website ద్వారా):\n✅ Cash Voucherపై 10% డిస్కౌంట్',
          '🏬 స్టోర్ లో షాపింగ్‌:\n✅ Cash Voucherపై 5% డిస్కౌంట్'
        ]
      },
      { 
        name: '👟 Skechers', 
        vendor: 'Footwear',
        location: 'www.skechers.in',
        phone: '7799663223',
        discounts: [
          '🛒 ఆన్‌లైన్ షాపింగ్‌కే వర్తిస్తుంది:\n✅ Cash Voucherపై 10% డిస్కౌంట్'
        ]
      },
      { 
        name: '🩳 Jockey (Online Only)', 
        vendor: 'Clothing',
        location: 'www.jockey.in',
        phone: '9876543220',
        discounts: [
          '✅ Cash Voucherపై 10% డిస్కౌంట్',
          '💻 ఈ ఆఫర్ కేవలం Online Shopping వాడినపుడు మాత్రమే వర్తిస్తుంది.'
        ]
      }
    ]
  },
  Food: {
    services: [
      { 
        name: 'Zomato', 
        vendor: 'Online Food Delivery',
        location: 'www.zomato.com',
        phone: '7799663223',
        discounts: [
          '✅ Cash Voucherపై 4% డిస్కౌంట్',
          '🍕 మీ ఫేవరెట్ ఫుడ్‌ను ఆర్డర్ చేయండి – కాంప్లిమెంటరీ డిస్కౌంట్‌తో!'
        ]
      },
      { 
        name: '🍨 Ice House', 
        vendor: 'Ice Creams, Pizza, Burgers',
        location: 'Opposite Union Bank, సిరిసిల్ల',
        phone: '7799663223',
        discounts: [
          '✅ బిల్‌పై 10% డిస్కౌంట్',
          '✅ ₹999కి పైగా బిల్స్‌పై 15% డిస్కౌంట్'
        ]
      },
      { 
        name: '🥟 Shankar Pani Puri', 
        vendor: 'Fast Food',
        location: 'గాంధీ నగర్ శివాలయం ముందు, సిరిసిల్ల',
        phone: '9876543221',
        discounts: [
          '✅ బిల్‌పై 15% డిస్కౌంట్',
          '₹200 కి పైగా బల్క్ ఆర్డర్స్‌పై 20% డిస్కౌంట్'
        ] 
      }
    ]
  },
  Automobiles: {
    services: [
      { 
        name: 'వాసవి ఆటో మొబైల్స్ – కార్ & బైక్ స్పేర్ పార్ట్స్', 
        vendor: 'Auto Care',
        location: 'కరీంనగర్ రోడ్, సిరిసిల్ల – 505301',
        phone: '9876543222',
        discounts: [
          '🛠️ అన్ని రకాల బ్రాండెడ్ కార్ & బైక్ స్పేర్ పార్ట్స్r',
          '💥 10% నుండి 25% వరకు డిస్కౌంట్',
          '💰 Low Price Guarantee – తక్కువ ధరల్లో హై క్వాలిటీ!'
        ]
      },
      { 
        name: '🚗 శ్రీ మంజునాథ హైడ్రాలిక్ వాటర్ సర్విసింగ్ సెంటర్', 
        vendor: 'Hydraulic Services',
        location: 'కరీంనగర్ రోడ్, శ్రీనగర్ కాలనీ, కామన్ పక్కన',
        phone: '9876543225',
        discounts: [
          '🛵 3, 4, 6 వాహనాలపై ప్రత్యేక ఆఫర్లు!',
          '🧼 హైడ్రాలిక్ వాటర్ వాష్ – ప్రొఫెషనల్ సర్విసింగ్',
          '💸 ప్రతి వాహనంపై ₹100 తగ్గింపు',
          '💰 Low Price Guarantee',
          '📍 DiscountMithra ద్వారా బుక్ చేసుకుంటే మాత్రమే!'
        ]
      },
      { 
        name: '🔋 Amaron బ్యాటరీస్', 
        vendor: 'Battery Services',
        location: 'కరీంనగర్ రోడ్, సిరిసిల్ల',
        phone: '9876543226',
        discounts: [
          '💥 35%  తక్కువ ధర – ఇతర స్టోర్లతో పోలిస్తే స్పష్టమైన ధర తేడా',
          '💰 Low Price Guarantee',
          '🚚 అవసరమైతే ఫ్రీ డెలివరీ కూడా అందుబాటులో!'
        ]
      },
      { 
        name: '🛠️ ఎంజిన్ కార్బన్ క్లీనింగ్ సర్వీస్', 
        vendor: 'Engine Services',
        location: 'సిరిసిల్ల',
        phone: '9876543227',
        discounts: [
          '🚗 కార్ & బైక్ రెండింటికీ సరిపోతుంది',
          '💥 ఇప్పుడే బుక్ చేస్తే 50% తగ్గింపు',
          '💰 Low Price Guarantee',
          '✅ ఇంజిన్ ఫెర్ఫార్మెన్స్ మెరుగవుతుంది',
          '✅ మైలేజ్ పెరుగుతుంది – ఇంధనంలో పొదుపు',
          '✅ స్మూత్ డ్రైవింగ్ ఎక్స్‌పీరియెన్స్',
          '✅ ఇంజిన్ లైఫ్ పెరుగుతుంది'
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
        name: '💇‍♂️💇‍♀️ Hairzone (Men & Women)', 
        vendor: 'Men & Women',
        location: 'గాంధీ నగర్, సిరిసిల్ల',
        phone: '9876543228',
        discounts: [
          '✅ హెయిర్‌కట్ పై 25% డిస్కౌంట్',
          '✅ పార్లర్ సర్వీసులపై 25% డిస్కౌంట్ ',
          '✅ టాటూ పై 25% డిస్కౌంట్'
        ]
      },
      { 
        name: '💅 Beauty Parlour – Ladies Special', 
        vendor: 'Beauty Services',
        location: 'గాంధీ నగర్ దగ్గర, సిరిసిల్ల',
        phone: '9876543229',
        discounts: [
          '✅ హెయిర్‌కట్ పై 20% డిస్కౌంట్',
          '✅ పార్లర్ సర్వీసులపై 20% డిస్కౌంట్',
          '✅ ప్యాకేజులపై 20% డిస్కౌంట్',
          '✨ బ్యూటీ, గ్లో & రిలాక్సేషన్ – అన్నీ ఇప్పుడు తక్కువ ధరకి!'
        ]
      }
    ]
  },
  Laundry: {
    services: [
      { 
        name: 'CleanZone Laundry', 
        vendor: 'Professional Laundry Services',
        location: 'శాంతినగర్ రోడ్, సిరిసిల్ల',
        phone: '7799663223',
        discounts: [
          '✅ వాష్/ఐరన్  సర్వీసులపై 20% డిస్కౌంట్',
          '✅ డ్రై క్లీనింగ్ పై 20% డిస్కౌంట్',
          '🚚 ఫ్రీ డెలివరీ అందుబాటులో ఉంది (డిస్కౌంట్ లేదు)'
        ]
      }
    ]
  },
  //   services: [
  //     { 
  //       name: 'Online Skill Development', 
  //       vendor: 'Skill Academy',
  //       location: 'Online',
  //       phone: '7799663223',
  //       discounts: [
  //         '100+Free Courses with Certigication',
  //         'Free Trial Classes'
  //       ]
  //     },
  //     { 
  //       name: 'Sircilla High School', 
  //       vendor: 'Schooling',
  //       location: 'Soon',
  //       phone: '7799663223',
  //       discounts: [
  //         '10% fee discount',
  //         'Free books for first 100 students',
  //         'Scholarships available'
  //       ]
  //     },
  //     { 
  //       name: 'Sircilla Inter College', 
  //       vendor: 'Schooling',
  //       location: 'Soon',
  //       phone: '7799663223',
  //       discounts: [
  //         '10% fee discount',
  //         'Free study materials',
  //         'Career guidance'
  //       ]
  //     },
  //     { 
  //       name: 'Sircilla Degree College', 
  //       vendor: 'Schooling',
  //       location: 'Soon',
  //       phone: '7799663223',
  //       discounts: [
  //         '20% fee discount',
  //         'Placement assistance',
  //         'Library access'
  //       ]
  //     }
  //   ]
  // },
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
  //   services: [
  //     { 
  //       name: 'Perfect Stitch - Men', 
  //       vendor: 'Tailoring Services',
  //       location: 'Shanthinagar',
  //       phone: '7799663223',
  //       discounts: [
  //         '20% off on first order',
  //         'Free fitting session'
  //       ]
  //     }
  //   ]
  // },
  Events: {
    services: [
      { 
        name: '🌸 ఫ్లవర్ డెకరేషన్ – మీ వేడుకలకు మేమే సరైన ఎంపిక!', 
        vendor: 'Event Management',
        phone: '7799663223',
        discounts: [
          '🎉 బర్త్‌డేలు | పెళ్లిళ్లు | హౌస్ వార్మింగ్ | ఫంక్షన్స్',
          '💐 మీ వేడుకను అందంగా, ఆకర్షణీయంగా ముస్తాబు చేస్తాము',
          '💰 బయటి ధరల కంటే 20% తక్కువ',
          '✅ Creative Designs | Quality Flowers | Time-bound Setup',
          '📞 ఇప్పుడే బుక్ చేసుకోండి – మీ డేట్ కి ముందే ప్లాన్ చేసుకుందాం!'
        ]
      },
      { 
        name: '🎪 టెంట్ హౌస్ సేవలు', 
        vendor: 'Decoration Services',
        phone: '7799663223',
        discounts: [
          '✅ 15% డిస్కౌంట్',
          '✅ Chairs, Shamiyana, Tables, Lighting, Stage Setup',
          '🎉 బర్త్‌డే, పెళ్లి, ఫంక్షన్, అన్నప్రాశన, అన్ని వేడుకలకి',
          '💯 Low Price Guarantee – బైట రేట్లకంటే తక్కువగా',
          '🕐 టైమ్ కి సెట్ అప్ – నాణ్యతతో సేవ'
        ]
      },
      { 
        name: '🎧 DJ సేవలు', 
        vendor: 'DJ Services',
        phone: '7799663223',
        discounts: [
          '🎶 వేడుకలు మరింత మజాగా మార్చే DJ సెటప్',
          '✅ Sound System, Lights, Smoke Effects, Stage',
          '🎉 బర్త్‌డే, పెళ్లి, రిసెప్షన్, ఫంక్షన్, కాలేజ్/స్కూల్ ఈవెంట్స్',
          '💰 15% వరకు డిస్కౌంట్',
          '🔊 Quality Sound | Time-bound Setup | Professional Crew'
        ]
      },
            { 
        name: '🎺 బ్యాండ్ / చప్పుడు సేవలు ', 
        vendor: 'Band Services',
        phone: '7799663223',
        discounts: [
          '🎉 పెళ్లిళ్లు, శుభకార్యాలు, ప్రాసెషన్లు, విందు వేడుకలకి',
          '🥁 Drum, Trumpet, Shehnai, Dhol Teams అందుబాటులో',
          '💰 10% వరకు తగ్గింపు',
          '💯 Low Price Guarantee – బైట రేట్లకంటే తక్కువ ధర',
          '🎵 శ్రావ్యమైన సంగీతం | టైమ్ కి సర్వీస్ | అనుభవజ్ఞులైన టీమ్'
        ]
      },
            { 
        name: '👨‍🍳 కేటరింగ్ సేవలు', 
        vendor: 'Catering Services',
        phone: '7799663223',
        discounts: [
          '🍛 స్వీట్‌లు, కర్రీలు, స్టార్టర్స్, బిర్యానీలు & స్పెషల్ మెనూలు',
          '🎉 పెళ్లిళ్లు, బర్త్‌డేలు, హౌస్ వార్మింగ్, అన్నప్రాశన, అన్ని వేడుకలకు',
          '🍽️ Veg / Non-Veg రెండు అందుబాటులో',
          '💰 10% వరకు డిస్కౌంట్',
          '✅ రుచికరమైన భోజనం | శుభ్రత | టైమ్ కి సర్వీస్'
        ]
      },
            { 
        name: '🏛️ ఫంక్షన్ హాల్ బుకింగ్', 
        vendor: 'Booking Services',
        phone: '7799663223',
        discounts: [
          '🎉 పెళ్లిళ్లు, బర్త్‌డేలు, ఎంగేజ్మెంట్లు, హౌస్ వార్మింగ్, అన్నప్రాశన, అన్ని శుభకార్యాలకి',
          '🏠 AC / Non-AC హాల్స్ అందుబాటులో',
          '🪑 Tables, Chairs, Stage, Decoration Support',
          '💰 5% – 10% వరకు తగ్గింపు',
          '💯 Low Price Guarantee + Clean & Spacious Halls'
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
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    serviceName: string;
    vendorName: string;
  }>({
    isOpen: false,
    serviceName: '',
    vendorName: ''
  });
  
  // Function to show confirmation dialog
  const showBookingConfirmation = (serviceName: string, vendorName: string) => {
    setConfirmationDialog({
      isOpen: true,
      serviceName,
      vendorName
    });
  };

  // Function to close confirmation dialog
  const closeConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: false,
      serviceName: '',
      vendorName: ''
    });
  };

  // Function to handle confirmed booking
  const handleConfirmedBooking = async () => {
    const { serviceName, vendorName } = confirmationDialog;
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

      // Close the confirmation dialog
      closeConfirmationDialog();

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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-2 sm:p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl font-bold">
                🏥 Healthcare Subcategories
              </CardTitle>
              <div className="text-center text-xs sm:text-sm text-gray-600 mt-2">
                Booking for: <Badge variant="secondary">{selectedMember}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              {'subcategories' in categoryData && categoryData.subcategories?.map((sub) => (
                <Button
                  key={sub}
                  onClick={() => onSubcategorySelect(sub)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 sm:py-3 shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl font-bold">
              {subcategory ? `${subcategory} Services` : `${category} Services`}
            </CardTitle>
            <div className="text-center text-xs sm:text-sm text-gray-600 mt-2">
              Booking for: <Badge variant="secondary">{selectedMember}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-4 sm:px-6">
            {services.map((service: any, index: number) => {
              const bookingKey = `${service.name}-${service.vendor}`;
              const isLoading = loadingBookings.has(bookingKey);
              
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-blue-600 mb-1 break-words">{service.name}</h3>
                        <Badge variant="secondary" className="mb-2 text-xs">{service.vendor}</Badge>
                        {service.location && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            <strong>Location:</strong> <span className="break-words">{service.location}</span>
                          </p>
                        )}
                        {service.phone && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            <strong>Phone:</strong> <span className="text-green-600">{service.phone}</span>
                          </p>
                        )}
                        {service.discounts && service.discounts.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Discounts:</p>
                            <ul className="list-disc ml-4 text-xs sm:text-sm text-gray-600 space-y-1">
                              {service.discounts.map((discount: string, i: number) => (
                                <li key={i} className="break-words">{discount}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="sm:ml-4 sm:flex-shrink-0">
                        <Button
                          onClick={() => showBookingConfirmation(service.name, service.vendor)}
                          disabled={isLoading}
                          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm py-2 px-4"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                              <span className="hidden sm:inline">Booking...</span>
                              <span className="sm:hidden">...</span>
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
      
      {/* Booking Confirmation Dialog */}
      <BookingConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={handleConfirmedBooking}
        serviceName={confirmationDialog.serviceName}
        vendorName={confirmationDialog.vendorName}
        selectedMember={selectedMember}
        isLoading={loadingBookings.has(`${confirmationDialog.serviceName}-${confirmationDialog.vendorName}`)}
      />
    </div>
  );
};

export default ServicesList;