
import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Check, AlertCircle, Plus, CreditCard, Banknote, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReconciliationScreenProps {
  onBack: () => void;
  onAddRecord: () => void;
}

const ReconciliationScreen = ({ onBack, onAddRecord }: ReconciliationScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [reconciliationData] = useState({
    expectedCash: 1850000,
    reconciledCash: 1650000,
    pendingCash: 200000
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

  // Navigation functions for date
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
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
        {/* Date Navigation */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data da Reconciliação
              </label>
              
              {/* Date Navigation Controls */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateDate('prev')}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-center text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Selecionar data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateDate('next')}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
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
            <h3 className="font-semibold text-kitadi-navy mb-4">Resumo de Reconciliação</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Expected Cash */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(reconciliationData.expectedCash)}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Dinheiro Esperado</div>
                  <div className="text-xs text-blue-600 mt-1">Total que deveria estar em caixa</div>
                </div>
              </div>
              
              {/* Reconciled Cash */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(reconciliationData.reconciledCash)}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Dinheiro Reconciliado</div>
                  <div className="text-xs text-green-600 mt-1">Total confirmado e reconciliado</div>
                </div>
              </div>
              
              {/* Pending Cash */}
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {formatCurrency(reconciliationData.pendingCash)}
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">Dinheiro Pendente</div>
                  <div className="text-xs text-yellow-600 mt-1">Aguardando confirmação</div>
                </div>
              </div>
            </div>
            
            {/* Difference Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className={`text-xl font-bold ${
                  cashDifference === 0 ? 'text-green-600' : 
                  cashDifference > 0 ? 'text-red-600' : 'text-orange-600'
                }`}>
                  {cashDifference === 0 ? '0 Db' : 
                   `${cashDifference > 0 ? '+' : ''}${formatCurrency(Math.abs(cashDifference))}`}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {cashDifference === 0 ? 'Totalmente Reconciliado' : 
                   cashDifference > 0 ? 'Excesso em Caixa' : 'Falta em Caixa'}
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
