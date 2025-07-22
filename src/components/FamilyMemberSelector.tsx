import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FamilyMemberSelectorProps {
  familyData: { phone: string; members: string[] };
  onMemberSelect: (member: string) => void;
  onLogout: () => void;
}

const FamilyMemberSelector: React.FC<FamilyMemberSelectorProps> = ({ 
  familyData, 
  onMemberSelect, 
  onLogout 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🙌</div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back, {familyData.members[0]} family!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-xl mb-4">👨‍👩‍👧‍👦 Select Family Member:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {familyData.members.map((member, index) => (
                  <Button
                    key={index}
                    onClick={() => onMemberSelect(member)}
                    className="h-16 text-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    ✅ {member}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-center mt-6">
              <Button onClick={onLogout} variant="outline" className="border-2">
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