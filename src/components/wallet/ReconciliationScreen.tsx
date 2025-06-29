
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Check, AlertCircle, Plus, CreditCard, Banknote } from 'lucide-react';

interface ReconciliationScreenProps {
  onBack: () => void;
  onAddRecord: () => void;
}

const ReconciliationScreen = ({ onBack, onAddRecord }: ReconciliationScreenProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  
  const [reconciliationData] = useState({
    expectedCash: 1850000,
    reconciledCash: 1650000
  });

  const [transactions] = useState([
    {
      id: 'AGT001-001',
      value: 15000,
      type: 'deposit',
      status: 'reconciled'
    },
    {
      id: 'AGT001-002',
      value: 25000,
      type: 'deposit',
      status: 'reconciled'
    },
    {
      id: 'AGT001-003',
      value: 8500,
      type: 'cash',
      status: 'pending'
    },
    {
      id: 'AGT001-004',
      value: 12000,
      type: 'deposit',
      status: 'pending'
    },
    {
      id: 'AGT001-005',
      value: 4500,
      type: 'cash',
      status: 'reconciled'
    }
  ]);

  // Generate date options (last 30 days)
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('pt-BR', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reconciled':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
          <Check className="w-3 h-3 mr-1" />
          Reconciliado
        </Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pendente
        </Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Db`;
  };

  const cashDifference = reconciliationData.expectedCash - reconciliationData.reconciledCash;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Reconciliação</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Date Selection */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Reconciliação
                </label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar data" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Add Button */}
              <Button
                onClick={onAddRecord}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Reconciliação
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cash Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-kitadi-navy mb-3">Resumo de Caixa</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(reconciliationData.expectedCash)}
                </div>
                <div className="text-sm text-gray-600">Caixa Esperado</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(reconciliationData.reconciledCash)}
                </div>
                <div className="text-sm text-gray-600">Caixa Reconciliado</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-center">
                <div className={`text-lg font-bold ${
                  cashDifference === 0 ? 'text-green-600' : 
                  cashDifference > 0 ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {cashDifference === 0 ? '0 Db' : 
                   `${cashDifference > 0 ? '+' : ''}${formatCurrency(Math.abs(cashDifference))}`}
                </div>
                <div className="text-sm text-gray-600">
                  {cashDifference === 0 ? 'Reconciliado' : 'Diferença'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy">Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {transaction.type === 'deposit' ? (
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Banknote className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-kitadi-navy">
                        {transaction.type === 'deposit' ? 'Depósito Bancário' : 'Dinheiro'}
                      </p>
                      <p className="text-sm text-gray-600">{transaction.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-kitadi-navy">
                      {formatCurrency(transaction.value)}
                    </div>
                    <div className="mt-1">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReconciliationScreen;
