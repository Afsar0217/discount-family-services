import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FamilyMemberSelectorProps {
  familyData: { phone: string; members: string[] };
  selectedLocation: string;
  onMemberSelect: (member: string) => void;
  onLogout: () => void;
}

const FamilyMemberSelector: React.FC<FamilyMemberSelectorProps> = ({ 
  familyData, 
  selectedLocation,
  onMemberSelect, 
  onLogout 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-4 sm:mb-6">
          <CardHeader className="text-center px-4 sm:px-6">
            <div className="text-3xl sm:text-4xl mb-2">🙌</div>
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Welcome back, {familyData.members[0]} family!
            </CardTitle>
            <div className="mt-2">
              <Badge className="bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                📍 {selectedLocation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-base sm:text-xl mb-4 flex items-center justify-center gap-2">
                <span>👨‍👩‍👧‍👦</span>
                <span>Select Family Member:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {familyData.members.map((member, index) => (
                  <Button
                    key={index}
                    onClick={() => onMemberSelect(member)}
                    className="h-12 sm:h-16 text-sm sm:text-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 py-2 px-4"
                  >
                    {member}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-center mt-4 sm:mt-6">
              <Button onClick={onLogout} variant="outline" className="border-2 w-full sm:w-auto text-sm sm:text-base">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyMemberSelector;