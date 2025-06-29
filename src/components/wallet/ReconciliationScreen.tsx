
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Receipt, DollarSign, Check, X, AlertCircle, Plus } from 'lucide-react';

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
      time: '09:15',
      type: 'cash_in',
      customer: 'Maria Santos',
      amount: 15000,
      commission: 150,
      status: 'reconciled',
      reference: 'CI-2024-001'
    },
    {
      id: 'AGT001-002',
      time: '09:30',
      type: 'cash_out',
      customer: 'João Silva',
      amount: -25000,
      commission: 250,
      status: 'reconciled',
      reference: 'CO-2024-002'
    },
    {
      id: 'AGT001-003',
      time: '10:15',
      type: 'money_transfer',
      customer: 'Ana Costa',
      amount: 8500,
      commission: 85,
      status: 'pending',
      reference: 'MT-2024-003'
    },
    {
      id: 'AGT001-004',
      time: '10:45',
      type: 'cash_in',
      customer: 'Pedro Mendes',
      amount: 12000,
      commission: 120,
      status: 'pending',
      reference: 'CI-2024-004'
    },
    {
      id: 'AGT001-005',
      time: '11:20',
      type: 'bill_payment',
      customer: 'Carlos Lima',
      amount: 4500,
      commission: 45,
      status: 'reconciled',
      reference: 'BP-2024-005'
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

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'cash_in': return 'Depósito';
      case 'cash_out': return 'Levantamento';
      case 'money_transfer': return 'Transferência';
      case 'bill_payment': return 'Pagamento de Conta';
      default: return type;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'cash_in': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'cash_out': return <DollarSign className="w-5 h-5 text-red-600" />;
      case 'money_transfer': return <ArrowLeft className="w-5 h-5 text-blue-600 rotate-45" />;
      case 'bill_payment': return <Receipt className="w-5 h-5 text-purple-600" />;
      default: return <Receipt className="w-5 h-5 text-gray-600" />;
    }
  };

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
      case 'discrepancy':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
          <X className="w-3 h-3 mr-1" />
          Discrepância
        </Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${Math.abs(amount).toLocaleString()} Db`;
  };

  const cashDifference = reconciliationData.expectedCash - reconciliationData.reconciledCash;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
          <Button
            onClick={onAddRecord}
            size="sm"
            className="bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Date Selection */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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
                   `${cashDifference > 0 ? '+' : ''}${formatCurrency(cashDifference)}`}
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
            <CardTitle className="text-kitadi-navy">Transações do Dia</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-kitadi-navy">
                          {getTransactionTypeLabel(transaction.type)}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <p className="text-sm text-gray-600">{transaction.customer}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.time} • {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Comissão: {formatCurrency(transaction.commission)}
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
