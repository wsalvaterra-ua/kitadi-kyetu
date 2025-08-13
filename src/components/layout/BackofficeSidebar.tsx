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
  X
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

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    screen: "web-dashboard"
  },
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
  },
  {
    title: "Business Accounts",
    icon: Building2,
    screen: "web-account-management"
  }
];

const operationsItems: MenuItem[] = [
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    screen: "web-transactions"
  },
  {
    title: "Cash Operations",
    icon: DollarSign,
    screen: "web-cash-verification"
  },
  {
    title: "Account Management",
    icon: CreditCard,
    screen: "web-account-ownership"
  }
];

const systemItems: MenuItem[] = [
  {
    title: "Reports",
    icon: FileText,
    screen: "web-withdrawal-report"
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
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              currentScreen === item.screen && "bg-sidebar-primary text-sidebar-primary-foreground"
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
                "w-full justify-start px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                currentScreen === item.screen && "bg-sidebar-primary text-sidebar-primary-foreground"
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
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-kitadi-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">Kitadi</h1>
                <p className="text-sm text-sidebar-foreground/60">Backoffice</p>
              </div>
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
          title="Main Menu"
          items={menuItems}
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