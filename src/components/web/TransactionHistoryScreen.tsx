import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Download, Clock } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { useToast } from '@/hooks/use-toast';

interface TransactionHistoryScreenProps {
  phoneNumber: string;
  accountName: string;
  onBack: () => void;
  onTransactionDetails?: (transactionId: string) => void;
}

interface Transaction {
  id: string;
  type: 'TRANSFER' | 'PAYMENT' | 'CASH_IN' | 'CASH_OUT';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  amount: number;
  date: string;
  time: string;
  description: string;
  reference: string;
  balance: number;
}

const TransactionHistoryScreen = ({ phoneNumber, accountName, onBack, onTransactionDetails }: TransactionHistoryScreenProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Mock data - extensive transaction history
  const allTransactions: Transaction[] = [
    {
      id: 'TX001',
      type: 'TRANSFER',
      status: 'COMPLETED',
      amount: 15000,
      date: '2024-01-15',
      time: '14:30',
      description: 'Transferência recebida de João Silva',
      reference: 'REF001',
      balance: 45000
    },
    {
      id: 'TX002',
      type: 'PAYMENT',
      status: 'PENDING',
      amount: 8500,
      date: '2024-01-14',
      time: '12:15',
      description: 'Pagamento a fornecedor',
      reference: 'REF002',
      balance: 30000
    },
    {
      id: 'TX003',
      type: 'CASH_OUT',
      status: 'FAILED',
      amount: 5000,
      date: '2024-01-13',
      time: '16:45',
      description: 'Levantamento ATM',
      reference: 'REF003',
      balance: 38500
    },
    {
      id: 'TX004',
      type: 'CASH_IN',
      status: 'COMPLETED',
      amount: 25000,
      date: '2024-01-12',
      time: '09:20',
      description: 'Depósito em balcão',
      reference: 'REF004',
      balance: 43500
    },
    {
      id: 'TX005',
      type: 'TRANSFER',
      status: 'COMPLETED',
      amount: 12000,
      date: '2024-01-11',
      time: '18:30',
      description: 'Transferência para Maria Santos',
      reference: 'REF005',
      balance: 18500
    }
  ];

  useState(() => {
    setFilteredTransactions(allTransactions);
  });

  const handleFilter = () => {
    let filtered = allTransactions;
    
    if (startDate && endDate) {
      filtered = allTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    }
    
    setFilteredTransactions(filtered);
    
    toast({
      title: "Filtro aplicado",
      description: `${filtered.length} transações encontradas`,
    });
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredTransactions(allTransactions);
  };

  const exportTransactions = () => {
    const csvContent = [
      'ID,Tipo,Status,Valor,Data,Hora,Descrição,Referência,Saldo',
      ...filteredTransactions.map(t => 
        `${t.id},${t.type},${t.status},${t.amount},${t.date},${t.time},"${t.description}",${t.reference},${t.balance}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_transacoes_${accountName.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Exportação concluída",
      description: "Histórico de transações exportado com sucesso",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'TRANSFER': return 'Transferência';
      case 'PAYMENT': return 'Pagamento';
      case 'CASH_IN': return 'Depósito';
      case 'CASH_OUT': return 'Levantamento';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Concluído';
      case 'PENDING': return 'Pendente';
      case 'FAILED': return 'Falhado';
      default: return status;
    }
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Histórico de Transações"
        description={`${accountName} - Utilizador: ${phoneNumber}`}
        onBack={onBack}
      />

      <div className="w-full p-8 space-y-6">
        {/* Filter Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Data Inicial</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Data Final</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleFilter} className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" onClick={clearFilter}>
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Transações ({filteredTransactions.length})
              </div>
              <Button onClick={exportTransactions} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Referência</TableHead>
                    <TableHead>Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onTransactionDetails?.(transaction.id)}
                    >
                      <TableCell className="font-mono">{transaction.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{transaction.date}</div>
                          <div className="text-muted-foreground">{transaction.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeLabel(transaction.type)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusLabel(transaction.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {transaction.amount.toLocaleString()} STN
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="font-mono">{transaction.reference}</TableCell>
                      <TableCell className="font-semibold">
                        {transaction.balance.toLocaleString()} STN
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Nenhuma transação encontrada para o período selecionado
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistoryScreen;