import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type NavKey =
  | "dashboard"
  | "transactions"
  | "extract"
  | "accountManagement"
  | "transactionManagement"
  | "accountOwnership"
  | "bankApproval"
  | "cashVerification"
  | "cashReserve"
  | "externalBankTransfer"
  | "operatorManagement"
  | "withdrawalReport"
  | "agentCashout";

interface NavItem {
  key: NavKey;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface WebAdminLayoutProps {
  title?: string;
  userType?: string;
  onLogout?: () => void;
  navItems: NavItem[];
  children: React.ReactNode;
}

export default function WebAdminLayout({ title = "Kitadi Backoffice", userType, onLogout, navItems, children }: WebAdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Topbar */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/c90423f2-4d67-4571-ba32-970709d92983.png"
              alt="Kitadi logo orange K"
              className="h-8 w-auto"
              loading="eager"
            />
            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {userType && <p className="text-xs text-muted-foreground">Sessão: {userType}</p>}
            </div>
          </div>
          {onLogout && (
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-4 grid grid-cols-12 gap-4">
        {/* Sidebar - classic PHP admin look */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border rounded-md">
          <nav className="py-2">
            <ul className="text-sm">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={item.onClick}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                  >
                    {item.icon && <span className="text-foreground/80">{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="bg-white border rounded-md p-4">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} Kitadi</span>
          <span>Backoffice • Versão Demo</span>
        </div>
      </footer>
    </div>
  );
}
