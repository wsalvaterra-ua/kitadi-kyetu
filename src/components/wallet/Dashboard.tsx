import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, CreditCard, Plus, ArrowDownToLine, History, User, Eye, EyeOff, ChevronDown, Menu, Phone, Calendar, Shield, FileText, Lock, ArrowUpDown, Clock } from 'lucide-react';
import { useState } from 'react';
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
}

const Dashboard = ({ onSend, onPay, onTopUp, onWithdraw, onTransactionClick }: DashboardProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [currentAccount, setCurrentAccount] = useState('personal');

  const accounts = [
    { 
      id: 'personal', 
      name: 'Conta Pessoal', 
      balance: 15750.50, 
      type: 'Personal',
      displayInfo: '+239 991 2345'
    },
    { 
      id: 'business', 
      name: 'Conta Comercial', 
      balance: 45230.25, 
      type: 'Business',
      displayInfo: '41234'
    },
    { 
      id: 'savings', 
      name: 'Poupança', 
      balance: 8500.00, 
      type: 'Savings',
      displayInfo: '+239 991 2345'
    },
  ];

  const activeAccount = accounts.find(acc => acc.id === currentAccount) || accounts[0];

  const quickActions = [
    { icon: Send, label: 'Enviar', color: 'bg-blue-500', onClick: onSend },
    { icon: CreditCard, label: 'Pagar', color: 'bg-green-500', onClick: onPay },
    { icon: Plus, label: 'Depositar', color: 'bg-kitadi-orange', onClick: onTopUp },
    { icon: ArrowDownToLine, label: 'Levantar', color: 'bg-red-500', onClick: onWithdraw },
  ];

  const recentTransactions = [
    { 
      id: 1, 
      type: 'received', 
      amount: 500, 
      from: 'João Silva', 
      time: '10:30',
      balanceAfter: 16250.50,
      transactionId: 'TXN001'
    },
    { 
      id: 2, 
      type: 'sent', 
      status: 'pending',
      amount: -250, 
      to: 'Maria Santos', 
      time: '09:15',
      balanceAfter: 15750.50,
      transactionId: 'TXN002'
    },
    { 
      id: 3, 
      type: 'payment', 
      amount: -125, 
      to: 'Loja do João', 
      time: '14:20',
      balanceAfter: 15625.50,
      transactionId: 'TXN004'
    },
    { 
      id: 4, 
      type: 'topup', 
      status: 'pending',
      amount: 1000, 
      from: 'Agente Pedro', 
      time: '13:45',
      balanceAfter: 16625.50,
      transactionId: 'TXN005'
    },
    { 
      id: 5, 
      type: 'cashout', 
      status: 'pending',
      amount: -500, 
      to: 'Agente Ana', 
      time: '12:30',
      balanceAfter: 16125.50,
      transactionId: 'TXN006'
    },
    { 
      id: 6, 
      type: 'received', 
      amount: 1000, 
      from: 'Pedro Costa', 
      time: 'Ontem',
      balanceAfter: 16000.00,
      transactionId: 'TXN003'
    },
  ];

  const getTransactionIcon = (transaction: any) => {
    const isPending = transaction.status === 'pending';
    
    switch (transaction.type) {
      case 'received':
        return (
          <div className="relative">
            <Send className="w-5 h-5 text-green-600 rotate-180" />
          </div>
        );
      case 'sent':
        return (
          <div className="relative">
            <Send className="w-5 h-5 text-red-600" />
            {isPending && <Clock className="w-3 h-3 text-orange-500 absolute -top-1 -right-1" />}
          </div>
        );
      case 'payment':
        return (
          <div className="relative">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
        );
      case 'topup':
        return (
          <div className="relative">
            <Plus className="w-5 h-5 text-kitadi-orange" />
            {isPending && <Clock className="w-3 h-3 text-orange-500 absolute -top-1 -right-1" />}
          </div>
        );
      case 'cashout':
        return (
          <div className="relative">
            <ArrowDownToLine className="w-5 h-5 text-red-600" />
            {isPending && <Clock className="w-3 h-3 text-orange-500 absolute -top-1 -right-1" />}
          </div>
        );
      default:
        return <ArrowUpDown className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTransactionLabel = (transaction: any) => {
    const isPending = transaction.status === 'pending';
    const pendingText = isPending ? ' (Pendente)' : '';
    
    switch (transaction.type) {
      case 'received':
        return `De ${transaction.from}${pendingText}`;
      case 'sent':
        return `Para ${transaction.to}${pendingText}`;
      case 'payment':
        return `Pagamento - ${transaction.to}${pendingText}`;
      case 'topup':
        return `Recarga - ${transaction.from}${pendingText}`;
      case 'cashout':
        return `Levantamento - ${transaction.to}${pendingText}`;
      default:
        return 'Transação';
    }
  };

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    // These would typically navigate to different screens or show modals
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="bg-kitadi-navy px-6 pt-16 pb-8 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/lovable-uploads/8cbc59c8-d36c-4dd9-9b78-afd8ec0b6e3d.png')`,
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
                        <div className="text-sm text-gray-500">+239 991 2345</div>
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
                          <span className="text-gray-200 text-sm">{activeAccount.type}</span>
                          <div className="text-gray-300 text-xs">{activeAccount.displayInfo}</div>
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
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  onClick={() => setCurrentAccount(account.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.displayInfo}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-kitadi-navy">
                        {account.balance.toLocaleString('pt-ST')} Db
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 mb-6 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className={`w-full h-full ${action.color} hover:opacity-90 flex flex-col items-center justify-center space-y-2 py-6 px-2 rounded-none`}
                  onClick={action.onClick}
                >
                  <action.icon className="w-6 h-6 text-white" />
                  <span className="text-sm font-medium text-white">{action.label}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transações recentes</h2>
          <Button variant="link" className="text-kitadi-orange p-0">
            Ver todas
          </Button>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <button
                key={transaction.id}
                onClick={() => onTransactionClick?.(transaction.transactionId)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
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
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-ST')} Db
                    </div>
                    <div className="text-xs text-gray-500">
                      Saldo: {transaction.balanceAfter.toLocaleString('pt-ST')} Db
                    </div>
                  </div>
                </div>
              </button>
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
