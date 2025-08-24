import { useState } from "react";
import { BackofficeSidebar } from "./BackofficeSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User, PanelLeft } from "lucide-react";

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

  const getCategoryTitle = () => {
    const categories: Record<string, string> = {
      'web-dashboard': 'Painel',
      'web-transactions': 'Transações',
      'web-user-account-management': 'Clientes',
      'web-user-access': 'Clientes',
      'web-create-user': 'Clientes',
      'web-account-management': 'Contas',
      'web-cash-verification': 'Operações',
      'web-account-ownership': 'Contas',
      'web-withdrawal-report': 'Sistema',
      'web-user-config': 'Sistema',
      'web-kyc-verification': 'Clientes'
    };
    return categories[currentScreen] || 'Kitadi Backoffice';
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      'web-dashboard': 'Painel de Controle',
      'web-transactions': 'Transações de Clientes',
      'web-user-account-management': 'Busca de Clientes',
      'web-user-access': 'Perfis de Clientes',
      'web-create-user': 'Criação de Conta',
      'web-account-management': 'Contas Empresariais',
      'web-cash-verification': 'Operações de Caixa',
      'web-account-ownership': 'Propriedade de Conta',
      'web-withdrawal-report': 'Relatórios',
      'web-user-config': 'Configurações'
    };
    return titles[currentScreen] || 'Kitadi Backoffice';
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar is now hidden for simplified layout */}
      {/* <BackofficeSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onNavigate={onNavigate}
        currentScreen={currentScreen}
      /> */}
      
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Sidebar toggle button is hidden since sidebar is hidden */}
              {/* <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSidebar}
                className="p-2 text-kitadi-orange hover:bg-kitadi-orange/10"
              >
                <PanelLeft className="h-5 w-5" />
              </Button> */}
              <div>
                <h1 className="text-2xl font-semibold text-foreground">{getCategoryTitle()}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
        <main className="flex-1 overflow-y-auto w-full bg-content">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}