import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  UserPlus, 
  Building2,
  ArrowLeftRight,
  DollarSign,
  CreditCard,
  FileText,
  Settings,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackofficeSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<any>;
  screen?: string;
  children?: MenuItem[];
}

const dashboardItems: MenuItem[] = [
  {
    title: "Painel de Controle",
    icon: LayoutDashboard,
    screen: "web-dashboard"
  }
];

const customerItems: MenuItem[] = [
  {
    title: "Busca de Clientes",
    icon: Search,
    screen: "web-user-account-management"
  },
  {
    title: "Perfis de Clientes",
    icon: Users,
    screen: "web-user-access"
  },
  {
    title: "Criação de Conta",
    icon: UserPlus,
    screen: "web-create-user"
  }
];

const transactionItems: MenuItem[] = [
  {
    title: "Transações de Clientes",
    icon: ArrowLeftRight,
    screen: "web-transactions"
  },
  {
    title: "Gestão de Transações",
    icon: Search,
    screen: "web-transaction-management"
  }
];

const accountItems: MenuItem[] = [
  {
    title: "Contas Empresariais",
    icon: Building2,
    screen: "web-account-management"
  },
  {
    title: "Propriedade de Conta",
    icon: CreditCard,
    screen: "web-account-ownership"
  }
];

const operationsItems: MenuItem[] = [
  {
    title: "Operações de Caixa",
    icon: DollarSign,
    screen: "web-cash-verification"
  },
  {
    title: "Aprovações Bancárias",
    icon: CheckCircle,
    screen: "web-bank-approval"
  },
  {
    title: "Reservas de Caixa",
    icon: Wallet,
    screen: "web-cash-reserve"
  },
  {
    title: "Transferências Externas",
    icon: ArrowLeftRight,
    screen: "web-external-bank-transfer"
  }
];

const systemItems: MenuItem[] = [
  {
    title: "Relatórios",
    icon: FileText,
    screen: "web-withdrawal-report"
  },
  {
    title: "Gestão de Operadores",
    icon: Users,
    screen: "web-operator-management"
  },
  {
    title: "Configurações",
    icon: Settings,
    screen: "web-user-config"
  }
];

const MenuSection = ({ 
  title, 
  items, 
  isCollapsed, 
  onNavigate, 
  currentScreen 
}: { 
  title: string; 
  items: MenuItem[]; 
  isCollapsed: boolean; 
  onNavigate: (screen: string) => void;
  currentScreen: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (isCollapsed) {
    return (
      <div className="py-2">
        {items.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            size="sm"
            className={cn(
              "w-12 h-12 p-0 mx-auto mb-2 flex items-center justify-center",
              "text-sidebar-foreground hover:bg-kitadi-orange/10 hover:text-kitadi-orange",
              currentScreen === item.screen && "bg-kitadi-orange text-white"
            )}
            onClick={() => item.screen && onNavigate(item.screen)}
            title={item.title}
          >
            <item.icon className="h-5 w-5" />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider hover:text-sidebar-foreground transition-colors"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", !isExpanded && "-rotate-90")} />
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-1">
          {items.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start px-4 py-3 text-sidebar-foreground hover:bg-kitadi-orange/10 hover:text-kitadi-orange",
                currentScreen === item.screen && "bg-kitadi-orange text-white"
              )}
              onClick={() => item.screen && onNavigate(item.screen)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export function BackofficeSidebar({ 
  isCollapsed, 
  onToggleCollapse, 
  onNavigate, 
  currentScreen 
}: BackofficeSidebarProps) {
  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border bg-white">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <img 
                  src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
                  alt="Kitadi Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-kitadi-navy">Kitadi</h1>
                <p className="text-sm text-gray-500">Backoffice</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 mx-auto">
              <img 
                src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
                alt="Kitadi Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <MenuSection
          title="Painel"
          items={dashboardItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Clientes"
          items={customerItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Transações"
          items={transactionItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Contas"
          items={accountItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Operações"
          items={operationsItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Sistema"
          items={systemItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
      </div>
    </div>
  );
}