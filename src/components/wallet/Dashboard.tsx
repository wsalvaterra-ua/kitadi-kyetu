import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, CreditCard, Plus, ArrowDownToLine, History, User, Eye, EyeOff, ChevronDown, Menu, Phone, Calendar, Shield, FileText, Lock, ArrowUpDown, Clock, Smartphone, Users, Unlink } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DashboardProps {
  onSend?: () => void;
  onPay?: () => void;
  onTopUp?: () => void;
  onWithdraw?: () => void;
  onTransactionClick?: (transactionId: string) => void;
  onCodeInput?: () => void;
  onUserManagement?: () => void;
  onExtract?: () => void;
}

const Dashboard = ({ onSend, onPay, onTopUp, onWithdraw, onTransactionClick, onCodeInput, onUserManagement, onExtract }: DashboardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [currentAccount, setCurrentAccount] = useState('personal');

  const accounts = [
    { 
      id: 'personal', 
      name: 'Conta Pessoal', 
      balance: 15750.50, 
      type: 'Personal',
      typePortuguese: 'Pessoal',
      displayInfo: '991 2345',
      accountType: 'personal',
      category: 'own' // Contas Próprias
    },
    { 
      id: 'business', 
      name: 'Conta Comercial', 
      balance: 45230.25, 
      type: 'Business',
      typePortuguese: 'Comercial',
      displayInfo: '41234',
      accountType: 'business',
      category: 'own' // Contas Próprias
    },
    { 
      id: 'savings', 
      name: 'Poupança', 
      balance: 8500.00, 
      type: 'Savings',
      typePortuguese: 'Poupança',
      displayInfo: '991 2345',
      accountType: 'personal',
      category: 'own' // Contas Próprias
    },
    { 
      id: 'business-associated', 
      name: 'Balcão A - Centro Comercial', 
      balance: 125430.75, 
      type: 'Business',
      typePortuguese: 'Comercial',
      displayInfo: '52341',
      accountType: 'business-associated',
      category: 'associated' // Contas Associadas
    },
  ];

  const activeAccount = accounts.find(acc => acc.id === currentAccount) || accounts[0];

  // Base quick actions for personal accounts
  const baseQuickActions = [
    { icon: Send, label: 'Enviar', color: 'bg-blue-500', onClick: onSend },
    { icon: Smartphone, label: 'Comprar\nRecarga', color: 'bg-green-500', onClick: onPay },
    { icon: Plus, label: 'Depósito', color: 'bg-kitadi-orange', onClick: onTopUp },
    { icon: ArrowDownToLine, label: 'Levantar', color: 'bg-red-500', onClick: onWithdraw },
  ];

  // Additional business actions
  const businessActions = [
    { icon: Smartphone, label: 'Receber\nPagamento', color: 'bg-purple-500', onClick: onCodeInput },
    { icon: Users, label: 'Gerir\nUtilizadores', color: 'bg-indigo-500', onClick: onUserManagement },
    { icon: FileText, label: 'Extrato\nCSV', color: 'bg-teal-500', onClick: onExtract },
    { icon: CreditCard, label: 'Terminal\nPOS', color: 'bg-orange-500', onClick: () => console.log('POS Terminal') },
    { icon: History, label: 'Relatórios', color: 'bg-pink-500', onClick: () => console.log('Reports') },
    { icon: Shield, label: 'Segurança', color: 'bg-gray-500', onClick: () => console.log('Security') },
  ];

  // Determine which actions to show based on account type
  const getQuickActions = () => {
    if (activeAccount.accountType === 'business') {
      return [...baseQuickActions, ...businessActions];
    } else if (activeAccount.accountType === 'business-associated') {
      // Only show extract and dissociate for associated business accounts
      return [
        { icon: FileText, label: 'Extrato\nCSV', color: 'bg-teal-500', onClick: onExtract },
        { icon: Unlink, label: 'Dissociar', color: 'bg-red-500', onClick: () => handleDissociate(activeAccount.id) }
      ];
    }
    return baseQuickActions;
  };

  const quickActions = getQuickActions();
  const isScrollable = activeAccount.accountType === 'business';

  // Group accounts by category
  const ownAccounts = accounts.filter(acc => acc.category === 'own');
  const associatedAccounts = accounts.filter(acc => acc.category === 'associated');

  const recentTransactions = [
    { 
      id: 1, 
      type: 'received', 
      amount: 500, 
      from: 'João Silva', 
      date: 'Hoje',
      time: '10:30',
      transactionId: 'TXN001'
    },
    { 
      id: 2, 
      type: 'sent', 
      status: 'pending',
      amount: -250, 
      to: 'Maria Santos', 
      date: 'Hoje',
      time: '09:15',
      transactionId: 'TXN002'
    },
    { 
      id: 3, 
      type: 'payment', 
      amount: -125, 
      to: 'Loja do João', 
      date: 'Hoje',
      time: '14:20',
      transactionId: 'TXN004'
    },
    { 
      id: 4, 
      type: 'topup', 
      status: 'pending',
      amount: 1000, 
      from: 'Agente Pedro', 
      date: 'Hoje',
      time: '13:45',
      transactionId: 'TXN005'
    },
    { 
      id: 5, 
      type: 'cashout', 
      status: 'pending',
      amount: -500, 
      to: 'Agente Ana', 
      date: 'Hoje',
      time: '12:30',
      transactionId: 'TXN006'
    },
    { 
      id: 6, 
      type: 'received', 
      amount: 1000, 
      from: 'Pedro Costa', 
      date: 'Ontem',
      time: '15:45',
      transactionId: 'TXN003'
    },
  ];

  const getTransactionIcon = (transaction: any) => {
    switch (transaction.type) {
      case 'received':
        return <Send className="w-5 h-5 text-green-600 rotate-180" />;
      case 'sent':
        return <Send className="w-5 h-5 text-red-600" />;
      case 'payment':
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'topup':
        return <Plus className="w-5 h-5 text-kitadi-orange" />;
      case 'cashout':
        return <ArrowDownToLine className="w-5 h-5 text-red-600" />;
      default:
        return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTransactionLabel = (transaction: any) => {
    switch (transaction.type) {
      case 'received':
        return `De ${transaction.from}`;
      case 'sent':
        return `Para ${transaction.to}`;
      case 'payment':
        return `Pagamento - ${transaction.to}`;
      case 'topup':
        return `Depósito - ${transaction.from}`;
      case 'cashout':
        return `Levantamento - ${transaction.to}`;
      default:
        return 'Transação';
    }
  };

  // Group transactions by date
  const groupedTransactions = recentTransactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof recentTransactions>);

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    // These would typically navigate to different screens or show modals
  };

  const handleDissociate = (accountId: string) => {
    console.log(`Dissociating account: ${accountId}`);
    // Here you would implement the dissociation logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="bg-kitadi-navy px-6 pt-16 pb-8 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/lovable-uploads/0a31d96f-afef-4ffe-a457-1581a4279cf8.png')`,
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-kitadi-navy/80"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-white text-xl font-semibold">Olá, João!</h1>
            </div>
            
            {/* Burger Menu Drawer */}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="w-6 h-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-80 mt-0 rounded-none border-l right-0 left-auto">
                <DrawerHeader className="text-left">
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 flex flex-col space-y-1">
                  {/* Profile Section */}
                  <button
                    onClick={() => handleMenuAction('profile')}
                    className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Perfil</div>
                        <div className="text-sm text-gray-500">João Silva</div>
                        <div className="text-sm text-gray-500">991 2345</div>
                      </div>
                    </div>
                  </button>
                  
                  {/* Menu Items */}
                  <button
                    onClick={() => handleMenuAction('contacts')}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Contactos Kitadi</span>
                  </button>
                  
                  <button
                    onClick={() => handleMenuAction('change-pin')}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <Lock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Alterar PIN</span>
                  </button>
                  
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  <button
                    onClick={() => handleMenuAction('privacy-policy')}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Política de Privacidade</span>
                  </button>
                  
                  <button
                    onClick={() => handleMenuAction('terms')}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Termos e Condições</span>
                  </button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Combined Balance & Account Switcher Card */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Card className="bg-white/10 backdrop-blur border-0 cursor-pointer hover:bg-white/15 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-gray-200 text-sm">
                            {activeAccount.name}
                          </span>
                          <div className="text-gray-300 text-xs">
                            {activeAccount.displayInfo} • {activeAccount.category === 'own' ? 'Própria' : 'Associada'}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowBalance(!showBalance);
                            }}
                            className="text-gray-200 hover:text-white h-8 w-8"
                          >
                            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <ChevronDown className="w-4 h-4 text-gray-200" />
                        </div>
                      </div>
                      <div className="text-white text-3xl font-bold">
                        {showBalance ? `${activeAccount.balance.toLocaleString('pt-ST')} Db` : '••••••'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white border shadow-lg">
              {/* Own Accounts Section */}
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Contas Próprias
              </div>
              {ownAccounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  onClick={() => setCurrentAccount(account.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">
                        {account.displayInfo} • Própria
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-kitadi-navy">
                        {account.balance.toLocaleString('pt-ST')} Db
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              
              {/* Divider */}
              {associatedAccounts.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contas Associadas
                  </div>
                  {associatedAccounts.map((account) => (
                    <DropdownMenuItem
                      key={account.id}
                      onClick={() => setCurrentAccount(account.id)}
                      className="p-4 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">
                            {account.displayInfo} • Associada
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-kitadi-navy">
                            {account.balance.toLocaleString('pt-ST')} Db
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 mb-6 relative z-10">
        <div className={`${isScrollable ? 'overflow-x-auto scrollbar-hide' : ''}`}>
          <div className={`grid gap-4 ${isScrollable ? 'grid-flow-col auto-cols-max' : 'grid-cols-4'}`}>
            {quickActions.map((action, index) => (
              <Card key={index} className={`border-0 shadow-md overflow-hidden ${isScrollable ? 'w-20' : ''}`}>
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className={`w-full h-full ${action.color} hover:opacity-90 flex flex-col items-center justify-center space-y-2 py-6 px-2 rounded-none`}
                    onClick={action.onClick}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                    <span className="text-xs font-medium text-white text-center leading-tight whitespace-pre-line">{action.label}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transações recentes</h2>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {Object.entries(groupedTransactions).map(([date, transactions], dateIndex) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex justify-center py-4">
                  <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-1 rounded-full">
                    {date}
                  </span>
                </div>
                
                {transactions.map((transaction, index) => (
                  <button
                    key={transaction.id}
                    onClick={() => onTransactionClick?.(transaction.transactionId)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      index !== transactions.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {getTransactionIcon(transaction)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {getTransactionLabel(transaction)}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{transaction.time}</span>
                            {transaction.status === 'pending' && (
                              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs px-2 py-0.5">
                                Pendente
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-ST')} Db
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-24" />
    </div>
  );
};

export default Dashboard;
