
import { useState } from 'react';
import OnboardingScreen from '@/components/wallet/OnboardingScreen';
import LoginScreen from '@/components/wallet/LoginScreen';
import Dashboard from '@/components/wallet/Dashboard';

type AppScreen = 'onboarding' | 'login' | 'dashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Index;
