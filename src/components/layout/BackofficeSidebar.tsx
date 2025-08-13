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
    title: "Dashboard",
    icon: LayoutDashboard,
    screen: "web-dashboard"
  }
];

const customerItems: MenuItem[] = [
  {
    title: "Customer Search",
    icon: Search,
    screen: "web-user-account-management"
  },
  {
    title: "Customer Profiles",
    icon: Users,
    screen: "web-user-access"
  },
  {
    title: "Account Creation",
    icon: UserPlus,
    screen: "web-create-user"
  }
];

const transactionItems: MenuItem[] = [
  {
    title: "Client Transactions",
    icon: ArrowLeftRight,
    screen: "web-transactions"
  },
  {
    title: "Transaction Management",
    icon: Search,
    screen: "web-transaction-management"
  }
];

const accountItems: MenuItem[] = [
  {
    title: "Business Accounts",
    icon: Building2,
    screen: "web-account-management"
  },
  {
    title: "Account Ownership",
    icon: CreditCard,
    screen: "web-account-ownership"
  }
];

const operationsItems: MenuItem[] = [
  {
    title: "Cash Operations",
    icon: DollarSign,
    screen: "web-cash-verification"
  },
  {
    title: "Bank Approvals",
    icon: CheckCircle,
    screen: "web-bank-approval"
  },
  {
    title: "Cash Reserves",
    icon: Wallet,
    screen: "web-cash-reserve"
  },
  {
    title: "External Transfers",
    icon: ArrowLeftRight,
    screen: "web-external-bank-transfer"
  }
];

const systemItems: MenuItem[] = [
  {
    title: "Reports",
    icon: FileText,
    screen: "web-withdrawal-report"
  },
  {
    title: "Operator Management",
    icon: Users,
    screen: "web-operator-management"
  },
  {
    title: "Settings",
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
                  src="/lovable-uploads/36c7e433-7a25-4dc4-883e-498016607394.png" 
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
                src="/lovable-uploads/36c7e433-7a25-4dc4-883e-498016607394.png" 
                alt="Kitadi Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <MenuSection
          title="Dashboard"
          items={dashboardItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Customers"
          items={customerItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Transactions"
          items={transactionItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Accounts"
          items={accountItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="Operations"
          items={operationsItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
        
        <MenuSection
          title="System"
          items={systemItems}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentScreen={currentScreen}
        />
      </div>
    </div>
  );
}