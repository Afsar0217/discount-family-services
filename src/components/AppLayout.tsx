import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import FamilyDashboard from './FamilyDashboard';

type AppState = 'welcome' | 'login' | 'dashboard';

interface FamilyData {
  phone: string;
  members: string[];
}

const AppLayout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>('welcome');
  const [familyData, setFamilyData] = useState<FamilyData | null>(null);

  const handleLoginClick = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (data: FamilyData) => {
    setFamilyData(data);
    setCurrentScreen('dashboard');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  const handleLogout = () => {
    setFamilyData(null);
    setCurrentScreen('welcome');
  };

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onLoginClick={handleLoginClick} />;
    case 'login':
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBack} />;
    case 'dashboard':
      return familyData ? (
        <FamilyDashboard familyData={familyData} onLogout={handleLogout} />
      ) : (
        <WelcomeScreen onLoginClick={handleLoginClick} />
      );
    default:
      return <WelcomeScreen onLoginClick={handleLoginClick} />;
  }
};

export default AppLayout;