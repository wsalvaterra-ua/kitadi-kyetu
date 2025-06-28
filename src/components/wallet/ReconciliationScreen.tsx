import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Receipt, Calendar, DollarSign, Search, FileText, Check, X, AlertCircle, Plus, Banknote, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReconciliationScreenProps {
  onBack: () => void;
}

const ReconciliationScreen = ({ onBack }: ReconciliationScreenProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state for manual transaction entry
  const [transactionForm, setTransactionForm] = useState({
    depositId: '',
    bank: '',
    value: '',
    operationType: 'deposit' // 'deposit' or 'cash'
  });

  const [reconciliationData] = useState({
    totalTransactions: 147,
    totalAmount: 2456780,
    reconciled: 145,
    pending: 2,
    discrepancies: 0,
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

  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return `${Math.abs(amount).toLocaleString()} Db`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting manual transaction:', transactionForm);
    // Here you would implement the transaction submission logic
    
    // Reset form after submission
    setTransactionForm({
      depositId: '',
      bank: '',
      value: '',
      operationType: 'deposit'
    });
  };

  const handleReconcileAll = () => {
    console.log('Reconciling all pending transactions');
    // Here you would implement the reconciliation logic
  };

  const handleExportReport = () => {
    console.log('Exporting reconciliation report');
    // Here you would implement the export functionality
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
        {/* Date Selection and Cash Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Reconciliação
                </Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Cash Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
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
            </div>
          </CardContent>
        </Card>

        {/* Manual Transaction Entry */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Transação Manual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Operation Type Selection */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Operação
                </Label>
                <RadioGroup
                  value={transactionForm.operationType}
                  onValueChange={(value) => setTransactionForm({...transactionForm, operationType: value})}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deposit" id="deposit" />
                    <Label htmlFor="deposit" className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Depósito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <Banknote className="w-4 h-4 mr-1" />
                      Dinheiro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Fields */}
              {transactionForm.operationType === 'deposit' && (
                <>
                  <div>
                    <Label htmlFor="depositId" className="block text-sm font-medium text-gray-700 mb-2">
                      ID do Depósito
                    </Label>
                    <Input
                      id="depositId"
                      type="text"
                      placeholder="Ex: DEP-2024-001"
                      value={transactionForm.depositId}
                      onChange={(e) => setTransactionForm({...transactionForm, depositId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-2">
                      Banco
                    </Label>
                    <Input
                      id="bank"
                      type="text"
                      placeholder="Nome do banco"
                      value={transactionForm.bank}
                      onChange={(e) => setTransactionForm({...transactionForm, bank: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Transação (Db)
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0"
                  value={transactionForm.value}
                  onChange={(e) => setTransactionForm({...transactionForm, value: e.target.value})}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Transação
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-kitadi-navy">
                  {reconciliationData.totalTransactions}
                </div>
                <div className="text-sm text-gray-600">Total Transações</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-kitadi-navy">
                  {formatCurrency(reconciliationData.totalAmount)}
                </div>
                <div className="text-sm text-gray-600">Valor Total</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reconciliationData.reconciled}
                </div>
                <div className="text-sm text-gray-600">Reconciliadas</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {reconciliationData.pending}
                </div>
                <div className="text-sm text-gray-600">Pendentes</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar Transações
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cliente ou referência"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleReconcileAll}
                className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
              >
                Reconciliar Tudo
              </Button>
              <Button
                onClick={handleExportReport}
                variant="outline"
                className="flex-1 border-kitadi-navy text-kitadi-navy"
              >
                <FileText className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy">Transações do Dia</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 ${index !== filteredTransactions.length - 1 ? 'border-b border-gray-100' : ''}`}
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
