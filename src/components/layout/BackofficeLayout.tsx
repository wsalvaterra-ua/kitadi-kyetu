import { useState } from "react";
import { BackofficeSidebar } from "./BackofficeSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, User } from "lucide-react";

interface BackofficeLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
  userType: string;
}

export function BackofficeLayout({ 
  children, 
  onLogout, 
  onNavigate, 
  currentScreen, 
  userType 
}: BackofficeLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'web-dashboard': 'Dashboard',
      'web-transactions': 'Client Transactions',
      'web-user-account-management': 'Customer Search',
      'web-user-access': 'Customer Profiles',
      'web-create-user': 'Account Creation',
      'web-account-management': 'Business Accounts',
      'web-cash-verification': 'Cash Operations',
      'web-account-ownership': 'Account Management',
      'web-withdrawal-report': 'Reports',
      'web-user-config': 'Settings'
    };
    return titles[currentScreen] || 'Kitadi Backoffice';
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <BackofficeSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onNavigate={onNavigate}
        currentScreen={currentScreen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-kitadi-orange">{getPageTitle()}</h1>
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <span>Home</span>
                <span>›</span>
                <span className="text-kitadi-orange">{getPageTitle()}</span>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Operador</p>
                  <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}