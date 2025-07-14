import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, QrCode } from 'lucide-react';

interface WebTransactionsScreenProps {
  userType: 'user' | 'merchant';
  onBack: () => void;
}

const WebTransactionsScreen = ({ userType, onBack }: WebTransactionsScreenProps) => {
  // Mock transaction data
  const mockTransactions = userType === 'merchant' ? [
    {
      id: '1',
      type: 'received',
      amount: '15,000 STN',
      description: 'Pagamento QR Code',
      date: '2024-01-15',
      time: '14:30',
      customer: 'João Silva'
    },
    {
      id: '2',
      type: 'received',
      amount: '8,500 STN',
      description: 'Pagamento QR Code',
      date: '2024-01-15',
      time: '12:15',
      customer: 'Maria Santos'
    },
    {
      id: '3',
      type: 'received',
      amount: '25,000 STN',
      description: 'Pagamento QR Code',
      date: '2024-01-14',
      time: '16:45',
      customer: 'Carlos Mendes'
    }
  ] : [
    {
      id: '1',
      type: 'sent',
      amount: '5,000 STN',
      description: 'Transferência para Maria',
      date: '2024-01-15',
      time: '14:30',
      recipient: '+239 999 1234'
    },
    {
      id: '2',
      type: 'received',
      amount: '10,000 STN',
      description: 'Recebido de João',
      date: '2024-01-14',
      time: '16:45',
      sender: '+239 991 5678'
    },
    {
      id: '3',
      type: 'topup',
      amount: '50,000 STN',
      description: 'Carregamento de saldo',
      date: '2024-01-13',
      time: '09:20'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case 'received':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case 'topup':
        return <QrCode className="w-5 h-5 text-blue-500" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'sent':
        return 'text-red-600';
      case 'received':
        return 'text-green-600';
      case 'topup':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

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
            <h1 className="text-xl font-bold text-kitadi-navy">
              {userType === 'merchant' ? 'Histórico de Vendas' : 'Histórico de Transações'}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {userType === 'merchant' ? 'Últimas Vendas' : 'Últimas Transações'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date} às {transaction.time}
                      </p>
                      {userType === 'merchant' && transaction.customer && (
                        <p className="text-xs text-gray-400">
                          Cliente: {transaction.customer}
                        </p>
                      )}
                      {userType === 'user' && transaction.recipient && (
                        <p className="text-xs text-gray-400">
                          Para: {transaction.recipient}
                        </p>
                      )}
                      {userType === 'user' && transaction.sender && (
                        <p className="text-xs text-gray-400">
                          De: {transaction.sender}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>

            {mockTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma transação encontrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebTransactionsScreen;