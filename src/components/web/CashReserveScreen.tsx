import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CashTransaction {
  id: string;
  type: 'ALLOCATE_TO_SYSTEM' | 'ALLOCATE_TO_OPERATOR';
  amount: number;
  operatorName: string;
  timestamp: string;
  description: string;
}

interface CashReserveScreenProps {
  onBack: () => void;
}

const CashReserveScreen = ({ onBack }: CashReserveScreenProps) => {
  const [allocateAmount, setAllocateAmount] = useState('');
  const [allocateDescription, setAllocateDescription] = useState('');
  const [operatorAmount, setOperatorAmount] = useState('');
  const [operatorDescription, setOperatorDescription] = useState('');

  // Mock data
  const systemReserve = 500000; // STN
  const operatorCash = 75000; // STN

  const mockTransactions: CashTransaction[] = [
    {
      id: 'CR001',
      type: 'ALLOCATE_TO_SYSTEM',
      amount: 100000,
      operatorName: 'João Silva',
      timestamp: '2024-01-15T10:30:00Z',
      description: 'Depósito de dinheiro no cofre'
    },
    {
      id: 'CR002',
      type: 'ALLOCATE_TO_OPERATOR',
      amount: 50000,
      operatorName: 'João Silva',
      timestamp: '2024-01-15T14:20:00Z',
      description: 'Retirada para operações'
    },
    {
      id: 'CR003',
      type: 'ALLOCATE_TO_SYSTEM',
      amount: 75000,
      operatorName: 'João Silva',
      timestamp: '2024-01-14T16:45:00Z',
      description: 'Fim do dia - depósito no cofre'
    }
  ];

  const handleAllocateToSystem = () => {
    if (!allocateAmount || !allocateDescription) return;
    
    console.log('Allocating to system reserve:', {
      amount: allocateAmount,
      description: allocateDescription
    });
    
    setAllocateAmount('');
    setAllocateDescription('');
    alert('Dinheiro alocado ao sistema com sucesso!');
  };

  const handleAllocateToOperator = () => {
    if (!operatorAmount || !operatorDescription) return;
    
    console.log('Allocating to operator:', {
      amount: operatorAmount,
      description: operatorDescription
    });
    
    setOperatorAmount('');
    setOperatorDescription('');
    alert('Dinheiro retirado do sistema com sucesso!');
  };

  const getTransactionIcon = (type: string) => {
    return type === 'ALLOCATE_TO_SYSTEM' ? 
      <ArrowUpCircle className="w-4 h-4 text-green-600" /> : 
      <ArrowDownCircle className="w-4 h-4 text-blue-600" />;
  };

  const getTransactionLabel = (type: string) => {
    return type === 'ALLOCATE_TO_SYSTEM' ? 'Para Sistema' : 'Para Operador';
  };

  const getAmountColor = (type: string) => {
    return type === 'ALLOCATE_TO_SYSTEM' ? 'text-green-600' : 'text-blue-600';
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
              <h1 className="text-xl font-bold text-kitadi-navy">Reserva de Dinheiro</h1>
              <p className="text-sm text-gray-500">Gerir reserva de dinheiro do cofre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" />
                Reserva do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {systemReserve.toLocaleString()} STN
              </div>
              <p className="text-gray-600 text-sm">Dinheiro em cofre do escritório</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Meu Dinheiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {operatorCash.toLocaleString()} STN
              </div>
              <p className="text-gray-600 text-sm">Dinheiro disponível para operações</p>
            </CardContent>
          </Card>
        </div>

        {/* Allocation Tabs */}
        <Tabs defaultValue="to-system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="to-system">Alocar ao Sistema</TabsTrigger>
            <TabsTrigger value="to-operator">Retirar do Sistema</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="to-system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  Alocar Dinheiro ao Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="allocateAmount">Valor (STN)</Label>
                    <Input
                      id="allocateAmount"
                      type="number"
                      placeholder="50000"
                      value={allocateAmount}
                      onChange={(e) => setAllocateAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="allocateDescription">Descrição</Label>
                    <Input
                      id="allocateDescription"
                      placeholder="Ex: Depósito fim do dia"
                      value={allocateDescription}
                      onChange={(e) => setAllocateDescription(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleAllocateToSystem}
                  disabled={!allocateAmount || !allocateDescription}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  Alocar ao Sistema
                </Button>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-700 text-sm">
                    Este dinheiro será movido do seu controle pessoal para a reserva do sistema.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="to-operator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownCircle className="w-5 h-5 text-blue-600" />
                  Retirar Dinheiro do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="operatorAmount">Valor (STN)</Label>
                    <Input
                      id="operatorAmount"
                      type="number"
                      placeholder="25000"
                      value={operatorAmount}
                      onChange={(e) => setOperatorAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="operatorDescription">Descrição</Label>
                    <Input
                      id="operatorDescription"
                      placeholder="Ex: Para operações diárias"
                      value={operatorDescription}
                      onChange={(e) => setOperatorDescription(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleAllocateToOperator}
                  disabled={!operatorAmount || !operatorDescription}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ArrowDownCircle className="w-4 h-4 mr-2" />
                  Retirar do Sistema
                </Button>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-700 text-sm">
                    Este dinheiro será movido da reserva do sistema para o seu controle pessoal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Histórico de Movimentações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Operador</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Data/Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTransactionIcon(transaction.type)}
                            <Badge variant="outline">
                              {getTransactionLabel(transaction.type)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className={`font-bold ${getAmountColor(transaction.type)}`}>
                          {transaction.type === 'ALLOCATE_TO_SYSTEM' ? '+' : '-'}
                          {transaction.amount.toLocaleString()} STN
                        </TableCell>
                        <TableCell>{transaction.operatorName}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CashReserveScreen;