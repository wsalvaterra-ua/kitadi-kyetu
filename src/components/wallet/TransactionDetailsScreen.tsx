
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Download } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'payment' | 'recharge';
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
}

interface TransactionDetailsScreenProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetailsScreen = ({ transaction, onBack }: TransactionDetailsScreenProps) => {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'received':
        return <Send className="w-6 h-6 text-green-600 rotate-180" />;
      case 'sent':
        return <Send className="w-6 h-6 text-red-600" />;
      case 'payment':
        return <Send className="w-6 h-6 text-blue-600" />;
      case 'recharge':
        return <Send className="w-6 h-6 text-orange-600" />;
      default:
        return <Send className="w-6 h-6 text-gray-600" />;
    }
  };

  const getTransactionTitle = () => {
    switch (transaction.type) {
      case 'received':
        return `Recebido de ${transaction.from}`;
      case 'sent':
        return `Enviado para ${transaction.to}`;
      case 'payment':
        return 'Pagamento efetuado';
      case 'recharge':
        return 'Recarga efetuada';
      default:
        return 'Transação';
    }
  };

  const getAmountColor = () => {
    return transaction.amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Detalhes da Transação</h1>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Transaction Summary Card */}
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                {getTransactionIcon()}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{getTransactionTitle()}</h2>
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
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Transação</h3>
            
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

            {/* Balance After */}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Saldo após transação:</span>
              <span className="text-sm font-medium text-gray-900">{transaction.balanceAfter.toLocaleString('pt-ST')} Db</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full mt-6 py-3"
          onClick={() => {
            // Handle download receipt or share
            console.log('Download receipt for transaction:', transaction.transactionId);
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Comprovativo
        </Button>
      </div>

      {/* Bottom spacing */}
      <div className="h-24" />
    </div>
  );
};

export default TransactionDetailsScreen;
