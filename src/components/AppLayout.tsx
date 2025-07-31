import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import LocationSelector from './LocationSelector';
import FamilyDashboard from './FamilyDashboard';

type AppState = 'welcome' | 'login' | 'location' | 'dashboard';

interface FamilyData {
  phone: string;
  members: string[];
}

const AppLayout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>('welcome');
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLoginClick = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (data: FamilyData) => {
    setFamilyData(data);
    setCurrentScreen('location');
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setCurrentScreen('dashboard');
  };

  const handleLocationBack = () => {
    setCurrentScreen('login');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  const handleLogout = () => {
    setFamilyData(null);
    setSelectedLocation(null);
    setCurrentScreen('welcome');
  };

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onLoginClick={handleLoginClick} />;
    case 'login':
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBack} />;
    case 'location':
      return <LocationSelector onLocationSelect={handleLocationSelect} onBack={handleLocationBack} />;
    case 'dashboard':
      return familyData && selectedLocation ? (
        <FamilyDashboard 
          familyData={familyData} 
          selectedLocation={selectedLocation}
          onLogout={handleLogout} 
        />
      ) : (
        <WelcomeScreen onLoginClick={handleLoginClick} />
      );
    default:
      return <WelcomeScreen onLoginClick={handleLoginClick} />;
  }
};

export default AppLayout;