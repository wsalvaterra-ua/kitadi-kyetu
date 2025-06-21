
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, QrCode, Plus, History, User, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [currentAccount, setCurrentAccount] = useState('personal');

  const accounts = [
    { id: 'personal', name: 'Conta Pessoal', balance: 15750.50, type: 'Personal' },
    { id: 'business', name: 'Conta Comercial', balance: 45230.25, type: 'Business' },
    { id: 'savings', name: 'Poupança', balance: 8500.00, type: 'Savings' },
  ];

  const activeAccount = accounts.find(acc => acc.id === currentAccount) || accounts[0];

  const quickActions = [
    { icon: Send, label: 'Enviar', color: 'bg-blue-500' },
    { icon: QrCode, label: 'Receber', color: 'bg-green-500' },
    { icon: Plus, label: 'Carregar', color: 'bg-kitadi-orange' },
    { icon: History, label: 'Histórico', color: 'bg-purple-500' },
  ];

  const recentTransactions = [
    { id: 1, type: 'received', amount: 500, from: 'João Silva', time: '10:30' },
    { id: 2, type: 'sent', amount: -250, to: 'Maria Santos', time: '09:15' },
    { id: 3, type: 'received', amount: 1000, from: 'Pedro Costa', time: 'Ontem' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-xl font-semibold">Olá, João!</h1>
            <p className="text-white/80 text-sm">Bem-vindo de volta</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <User className="w-6 h-6" />
          </Button>
        </div>

        {/* Account Switcher */}
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 p-2 h-auto justify-start w-full"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <div className="text-sm font-medium">{activeAccount.name}</div>
                    <div className="text-xs text-white/70">{activeAccount.type}</div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white border shadow-lg">
              {accounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  onClick={() => setCurrentAccount(account.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <div className="font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.type}</div>
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

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm">Saldo disponível</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white h-8 w-8"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="text-white text-3xl font-bold">
              {showBalance ? `${activeAccount.balance.toLocaleString('pt-ST')} Db` : '••••••'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 mb-6">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
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
              <div
                key={transaction.id}
                className={`p-4 flex justify-between items-center ${
                  index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Send className={`w-5 h-5 ${
                      transaction.type === 'received' ? 'text-green-600 rotate-180' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.type === 'received' 
                        ? `De ${transaction.from}` 
                        : `Para ${transaction.to}`
                      }
                    </p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-ST')} Db
                </div>
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
