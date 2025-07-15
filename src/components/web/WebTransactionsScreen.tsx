import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Send, Smartphone, Plus, ArrowDownToLine, Clock, RefreshCw, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'payment' | 'topup' | 'cashout';
  status?: 'pending' | 'completed';
  amount: number;
  from?: string;
  to?: string;
  note?: string;
  date: string;
  time: string;
  transactionId: string;
  balanceAfter: number;
  fromAccount?: string;
  toAccount?: string;
  fee?: number;
}

interface WebTransactionsScreenProps {
  userType: 'personal' | 'business' | 'agent' | 'business-associated' | 'merchant';
  onBack: () => void;
}

const WebTransactionsScreen = ({ userType, onBack }: WebTransactionsScreenProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data based on user type
  const getTransactions = (): Transaction[] => {
    if (userType === 'personal') {
      return [
        { 
          id: '1', 
          type: 'received', 
          amount: 500, 
          from: 'João Silva', 
          date: 'Hoje', 
          time: '10:30',
          transactionId: 'TXN001',
          balanceAfter: 16250.50,
          note: 'Pagamento de serviços'
        },
        { 
          id: '2', 
          type: 'sent', 
          status: 'pending',
          amount: -250, 
          to: 'Maria Santos', 
          date: 'Hoje', 
          time: '09:15',
          transactionId: 'TXN002',
          balanceAfter: 15750.50
        },
        { 
          id: '3', 
          type: 'payment', 
          amount: -125, 
          to: 'Loja do João', 
          date: 'Hoje', 
          time: '14:20',
          transactionId: 'TXN004',
          balanceAfter: 15625.50
        },
        { 
          id: '4', 
          type: 'topup', 
          status: 'pending',
          amount: 1000, 
          from: 'Agente Pedro', 
          date: 'Hoje', 
          time: '13:45',
          transactionId: 'TXN005',
          balanceAfter: 16625.50
        },
        { 
          id: '5', 
          type: 'received', 
          amount: 300, 
          from: 'Ana Costa', 
          date: 'Ontem', 
          time: '15:45',
          transactionId: 'TXN003',
          balanceAfter: 16000.00
        },
      ];
    }

    if (userType === 'business') {
      return [
        { 
          id: '1', 
          type: 'received', 
          amount: 1500, 
          from: 'Cliente A', 
          date: 'Hoje', 
          time: '11:30',
          transactionId: 'TXN101',
          balanceAfter: 47230.25,
          fromAccount: 'Conta Pessoal - 991 2345'
        },
        { 
          id: '2', 
          type: 'received', 
          amount: 800, 
          from: 'Cliente B', 
          date: 'Hoje', 
          time: '10:15',
          transactionId: 'TXN102',
          balanceAfter: 45730.25,
          fromAccount: 'Conta Pessoal - 991 6789'
        },
        { 
          id: '3', 
          type: 'payment', 
          amount: -200, 
          to: 'Fornecedor X', 
          date: 'Hoje', 
          time: '09:20',
          transactionId: 'TXN103',
          balanceAfter: 44930.25,
          toAccount: 'Conta Comercial - 78901'
        },
        { 
          id: '4', 
          type: 'topup', 
          amount: 5000, 
          from: 'Banco', 
          date: 'Ontem', 
          time: '16:45',
          transactionId: 'TXN104',
          balanceAfter: 45130.25
        },
      ];
    }

    if (userType === 'agent') {
      return [
        { 
          id: '1', 
          type: 'cashout', 
          amount: -2000, 
          to: 'Cliente X', 
          date: 'Hoje', 
          time: '12:30',
          transactionId: 'TXN201',
          balanceAfter: 87340.75,
          toAccount: 'Conta Pessoal - 991 1111',
          fee: 50
        },
        { 
          id: '2', 
          type: 'topup', 
          amount: 1500, 
          from: 'Cliente Y', 
          date: 'Hoje', 
          time: '11:15',
          transactionId: 'TXN202',
          balanceAfter: 89340.75,
          fromAccount: 'Conta Pessoal - 991 2222'
        },
        { 
          id: '3', 
          type: 'received', 
          amount: 300, 
          from: 'Comissão', 
          date: 'Hoje', 
          time: '10:20',
          transactionId: 'TXN203',
          balanceAfter: 87840.75,
          note: 'Comissão por transações'
        },
        { 
          id: '4', 
          type: 'topup', 
          amount: 800, 
          from: 'Cliente Z', 
          date: 'Ontem', 
          time: '17:45',
          transactionId: 'TXN204',
          balanceAfter: 87540.75,
          fromAccount: 'Conta Pessoal - 991 3333'
        },
      ];
    }

    if (userType === 'business-associated') {
      return [
        { 
          id: '1', 
          type: 'received', 
          amount: 750, 
          from: 'Venda A', 
          date: 'Hoje', 
          time: '13:30',
          transactionId: 'TXN301',
          balanceAfter: 126180.75,
          note: 'Venda de produtos'
        },
        { 
          id: '2', 
          type: 'received', 
          amount: 450, 
          from: 'Venda B', 
          date: 'Hoje', 
          time: '12:15',
          transactionId: 'TXN302',
          balanceAfter: 125430.75
        },
        { 
          id: '3', 
          type: 'payment', 
          amount: -100, 
          to: 'Taxa', 
          date: 'Hoje', 
          time: '09:20',
          transactionId: 'TXN303',
          balanceAfter: 124980.75,
          note: 'Taxa de manutenção'
        },
      ];
    }

    // Default merchant transactions
    return [
      { 
        id: '1', 
        type: 'received', 
        amount: 250, 
        from: 'Pagamento QR', 
        date: 'Hoje', 
        time: '14:30',
        transactionId: 'TXN401',
        balanceAfter: 8750.00,
        note: 'Pagamento via QR Code'
      },
      { 
        id: '2', 
        type: 'received', 
        amount: 180, 
        from: 'Pagamento QR', 
        date: 'Hoje', 
        time: '13:15',
        transactionId: 'TXN402',
        balanceAfter: 8500.00,
        note: 'Pagamento via QR Code'
      },
      { 
        id: '3', 
        type: 'payment', 
        amount: -50, 
        to: 'Taxa', 
        date: 'Hoje', 
        time: '12:20',
        transactionId: 'TXN403',
        balanceAfter: 8320.00,
        note: 'Taxa de processamento'
      },
    ];
  };

  const transactions = getTransactions();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
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

  const getTransactionLabel = (type: string, transaction: Transaction) => {
    switch (type) {
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
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  // Transaction Details Modal Component
  const TransactionDetails = ({ transaction }: { transaction: Transaction }) => {
    const getTransactionTitle = () => {
      switch (transaction.type) {
        case 'received':
          return `Recebido de ${transaction.from}`;
        case 'sent':
          return `Enviado para ${transaction.to}`;
        case 'payment':
          return 'Pagamento efetuado';
        case 'topup':
          return 'Depósito efetuado';
        case 'cashout':
          return 'Levantamento efetuado';
        default:
          return 'Transação';
      }
    };

    const getAmountColor = () => {
      return transaction.amount > 0 ? 'text-green-600' : 'text-red-600';
    };

    const isPending = transaction.status === 'pending';

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-kitadi-navy px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">Detalhes da Transação</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedTransaction(null)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Transaction Summary */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 relative">
                {getTransactionIcon(transaction.type)}
                {isPending && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-orange-500" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{getTransactionTitle()}</h3>
                {isPending && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Pendente
                  </Badge>
                )}
              </div>
              <div className={`text-3xl font-bold ${getAmountColor()}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-ST')} Db
              </div>
            </div>

            {transaction.note && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Nota: </span>
                  {transaction.note}
                </p>
              </div>
            )}

            {/* Transaction Details */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Informações da Transação</h4>
              
              {/* Source Account */}
              {(transaction.from || transaction.fromAccount) && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-500">De:</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{transaction.from}</div>
                    {transaction.fromAccount && (
                      <div className="text-xs text-gray-500">{transaction.fromAccount}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Destination Account */}
              {(transaction.to || transaction.toAccount) && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-500">Para:</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{transaction.to}</div>
                    {transaction.toAccount && (
                      <div className="text-xs text-gray-500">{transaction.toAccount}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Estado:</span>
                <span className={`text-sm font-medium ${isPending ? 'text-orange-600' : 'text-green-600'}`}>
                  {isPending ? 'Pendente' : 'Concluída'}
                </span>
              </div>

              {/* Date and Time */}
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Data:</span>
                <span className="text-sm font-medium text-gray-900">{transaction.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Hora:</span>
                <span className="text-sm font-medium text-gray-900">{transaction.time}</span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">ID da Transação:</span>
                <span className="text-sm font-medium text-gray-900 font-mono">{transaction.transactionId}</span>
              </div>

              {/* Fee */}
              {transaction.fee && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Taxa:</span>
                  <span className="text-sm font-medium text-red-600">-{transaction.fee.toLocaleString('pt-ST')} Db</span>
                </div>
              )}

              {/* Balance After */}
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Saldo após transação:</span>
                <span className="text-sm font-medium text-gray-900">{transaction.balanceAfter.toLocaleString('pt-ST')} Db</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => {
                console.log('Download receipt for transaction:', transaction.transactionId);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Comprovativo
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (selectedTransaction) {
    return <TransactionDetails transaction={selectedTransaction} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
              alt="Kitadi Logo" 
              className="h-6 w-auto mr-2"
            />
            <h1 className="text-xl font-bold text-kitadi-navy">Histórico de Transações</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-kitadi-navy flex items-center justify-between">
              Histórico de Transações
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Atualizando...' : 'Atualizar'}
                </Button>
                <Button variant="outline" onClick={() => {
                  // Generate CSV
                  const csvContent = transactions.map(t => 
                    `${t.date},${t.time},${t.type},${t.amount},${t.from || t.to || ''}`
                  ).join('\n');
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'transacoes.csv';
                  a.click();
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{date}</h3>
                  <div className="space-y-2">
                    {transactions.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100 cursor-pointer transition-colors"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            {getTransactionIcon(transaction.type)}
                            {transaction.status === 'pending' && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-100 rounded-full flex items-center justify-center">
                                <Clock className="w-2 h-2 text-orange-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">
                                {getTransactionLabel(transaction.type, transaction)}
                              </p>
                              {transaction.status === 'pending' && (
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                                  Pendente
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{transaction.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-ST')} Db
                          </p>
                          <p className="text-xs text-gray-500">{transaction.transactionId}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebTransactionsScreen;