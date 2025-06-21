
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  QrCode, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Settings,
  Bell,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface MerchantDashboardProps {
  onQRPayment?: () => void;
}

const MerchantDashboard = ({ onQRPayment }: MerchantDashboardProps) => {
  const [todaysSales] = useState(125750);
  const [totalCustomers] = useState(342);
  const [pendingPayments] = useState(5);

  const recentTransactions = [
    { id: '1', customer: 'João Silva', amount: 2500, type: 'payment', time: '10:30' },
    { id: '2', customer: 'Maria Santos', amount: 1200, type: 'payment', time: '10:15' },
    { id: '3', customer: 'Pedro Costa', amount: 3400, type: 'payment', time: '09:45' },
    { id: '4', customer: 'Ana Ferreira', amount: 850, type: 'refund', time: '09:30' },
  ];

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Db`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-kitadi-orange rounded-full flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg font-semibold">Loja do João</h1>
              <p className="text-white/80 text-sm">Comerciante</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-3 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Vendas Hoje</p>
                  <p className="text-xl font-bold text-kitadi-navy">
                    {formatCurrency(todaysSales)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Clientes</p>
                  <p className="text-xl font-bold text-kitadi-navy">{totalCustomers}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-kitadi-navy text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={onQRPayment}
                className="bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Gerar QR Code
              </Button>
              <Button variant="outline" className="border-kitadi-navy text-kitadi-navy py-6 rounded-xl">
                <DollarSign className="w-5 h-5 mr-2" />
                Cobrar Cliente
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        {pendingPayments > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pagamentos Pendentes</p>
                  <p className="text-lg font-semibold text-kitadi-navy">{pendingPayments} transações</p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Pendente
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-kitadi-navy text-lg">Transações Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-kitadi-orange">
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'payment' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'payment' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-kitadi-navy">{transaction.customer}</p>
                    <p className="text-sm text-gray-600">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'payment' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'payment' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bottom spacing */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
