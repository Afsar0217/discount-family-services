import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FamilyMemberSelector from './FamilyMemberSelector';
import CategoryGrid from './CategoryGrid';
import ServicesList from './ServicesList';

interface FamilyDashboardProps {
  familyData: { phone: string; members: string[] };
  selectedLocation: string;
  onLogout: () => void;
}

const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ familyData, selectedLocation, onLogout }) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const handleMemberSelect = (member: string) => {
    setSelectedMember(member);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else if (selectedMember) {
      setSelectedMember(null);
    }
  };

  // Show member selection first
  if (!selectedMember) {
    return (
      <FamilyMemberSelector 
        familyData={familyData}
        selectedLocation={selectedLocation}
        onMemberSelect={handleMemberSelect}
        onLogout={onLogout}
      />
    );
  }

  // Show services if category is selected
  if (selectedCategory) {
    return (
      <ServicesList 
        category={selectedCategory}
        subcategory={selectedSubcategory}
        onSubcategorySelect={setSelectedSubcategory}
        onBack={handleBack}
        familyData={familyData}
        selectedMember={selectedMember}
        selectedLocation={selectedLocation}
      />
    );
  }

  // Show categories after member selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-4 sm:mb-6">
          <CardHeader className="text-center px-4 sm:px-6">
            <div className="text-3xl sm:text-4xl mb-2">🎯</div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Booking for: {selectedMember}
            </CardTitle>
            <div className="mt-2">
              <Badge className="bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                📍 {selectedLocation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-center">
              <div className="text-base sm:text-lg font-medium mb-4">👇 Choose a Category:</div>
              <CategoryGrid onCategorySelect={handleCategorySelect} />
            </div>
            <div className="text-center mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-4">
              <Button onClick={handleBack} variant="outline" className="border-2 w-full sm:w-auto mb-2 sm:mb-0">
                ← Back
              </Button>
              <Button onClick={onLogout} variant="outline" className="border-2 w-full sm:w-auto">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyDashboard;