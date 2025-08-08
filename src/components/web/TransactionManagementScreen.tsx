import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, ArrowDownUp, DollarSign, Calendar, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Transaction {
  id: string;
  type: string;
  from_account_id: number | null;
  to_account_id: number | null;
  amount: number;
  currency: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED' | 'CANCELLED';
  created_at: string;
  processed_at: string | null;
  failure_reason: string | null;
  children?: Transaction[];
}

interface TransactionManagementScreenProps {
  onBack: () => void;
}

const TransactionManagementScreen = ({ onBack }: TransactionManagementScreenProps) => {
  const [searchId, setSearchId] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Transaction | null>(null);

  const mockTransaction: Transaction = {
    id: 'TA4R45',
    type: 'TRANSFER',
    from_account_id: 12345,
    to_account_id: 67890,
    amount: 50000,
    currency: 'STN',
    description: 'Transferência para João Silva',
    status: 'COMPLETED',
    created_at: '2024-01-15T10:30:00Z',
    processed_at: '2024-01-15T10:31:15Z',
    failure_reason: null,
    children: [
      {
        id: 'TA4R45-FEE',
        type: 'FEE',
        from_account_id: 12345,
        to_account_id: null,
        amount: 250,
        currency: 'STN',
        description: 'Taxa de transferência',
        status: 'COMPLETED',
        created_at: '2024-01-15T10:30:00Z',
        processed_at: '2024-01-15T10:31:15Z',
        failure_reason: null
      }
    ]
  };

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      if (searchId.toUpperCase() === 'TA4R45') {
        setTransaction(mockTransaction);
      } else {
        setTransaction(null);
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleActionTransaction = (action: 'reverse' | 'cancel') => {
    if (!transaction) return;
    
    // Simulate action
    console.log(`${action} transaction ${transaction.id}`);
    // Update transaction status
    setTransaction({
      ...transaction,
      status: action === 'reverse' ? 'REVERSED' : 'CANCELLED'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: 'secondary',
      COMPLETED: 'default',
      FAILED: 'destructive',
      REVERSED: 'secondary',
      CANCELLED: 'secondary'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>{status}</Badge>;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      TRANSFER: 'Transferência',
      PAYMENT: 'Pagamento',
      CASH_IN: 'Depósito',
      CASH_OUT: 'Saque',
      FEE: 'Taxa',
      REFUND: 'Reembolso',
      REVERSAL: 'Reversão'
    } as const;
    
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Transações</h1>
              <p className="text-sm text-gray-500">Pesquisar e gerir transações por ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Pesquisar Transação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="transactionId">ID da Transação</Label>
                <Input
                  id="transactionId"
                  placeholder="Ex: TA4R45"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!searchId.trim() || isSearching}
                >
                  {isSearching ? 'Procurando...' : 'Procurar'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Exemplo de ID que funciona: TA4R45
            </p>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        {transaction && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownUp className="w-5 h-5" />
                Detalhes da Transação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">ID da Transação</Label>
                  <p className="text-lg font-mono">{transaction.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo</Label>
                  <p>{getTypeLabel(transaction.type)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Valor</Label>
                  <p className="text-lg font-bold">{transaction.amount.toLocaleString()} {transaction.currency}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Conta Origem</Label>
                  <p>{transaction.from_account_id || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Conta Destino</Label>
                  <p>{transaction.to_account_id || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Criada em</Label>
                  <p>{new Date(transaction.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Processada em</Label>
                  <p>{transaction.processed_at ? new Date(transaction.processed_at).toLocaleString() : 'Não processada'}</p>
                </div>
              </div>
              
              {transaction.description && (
                <div>
                  <Label className="text-sm font-medium">Descrição</Label>
                  <p>{transaction.description}</p>
                </div>
              )}

              {transaction.failure_reason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <Label className="text-sm font-medium text-red-700">Motivo da Falha</Label>
                  <p className="text-red-700">{transaction.failure_reason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {transaction.status === 'COMPLETED' && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleActionTransaction('reverse')}
                    className="bg-kitadi-orange text-white border-kitadi-orange hover:bg-kitadi-orange/90"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Devolver
                  </Button>
                )}
                {transaction.status === 'PENDING' && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleActionTransaction('cancel')}
                    className="bg-red-500 text-white border-red-500 hover:bg-red-600"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                )}
                {transaction.status === 'FAILED' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Transação falhou - contacte suporte se necessário</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Child Transactions */}
        {transaction && transaction.children && transaction.children.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Transações Filhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.children.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-mono">{child.id}</TableCell>
                      <TableCell>{getTypeLabel(child.type)}</TableCell>
                      <TableCell>{child.amount.toLocaleString()} {child.currency}</TableCell>
                      <TableCell>{getStatusBadge(child.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalhes da Transação Filha</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium">ID</Label>
                                <p className="font-mono">{child.id}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Tipo</Label>
                                <p>{getTypeLabel(child.type)}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Valor</Label>
                                <p className="text-lg font-bold">{child.amount.toLocaleString()} {child.currency}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <div className="mt-1">{getStatusBadge(child.status)}</div>
                              </div>
                              {child.description && (
                                <div>
                                  <Label className="text-sm font-medium">Descrição</Label>
                                  <p>{child.description}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {searchId && !transaction && !isSearching && (
          <Card>
            <CardContent className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Transação não encontrada</h3>
              <p className="text-gray-500">Nenhuma transação encontrada com o ID "{searchId}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransactionManagementScreen;