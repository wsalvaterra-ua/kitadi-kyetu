import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ReconciliationReport {
  id: string;
  transactionId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'REJECTED';
  createdAt: string;
  operatorName: string;
}

interface ReconciliationSummary {
  remainingCash: number;
  pendingCash: number;
  reconciledCash: number;
  depositsAmount: number;
}

interface EnhancedReconciliationScreenProps {
  onBack: () => void;
}

const EnhancedReconciliationScreen = ({ onBack }: EnhancedReconciliationScreenProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const mockReports: ReconciliationReport[] = [
    {
      id: 'RC001',
      transactionId: 'TA4R45',
      amount: 50000,
      status: 'COMPLETED',
      createdAt: '2024-01-15T10:30:00Z',
      operatorName: 'João Silva'
    },
    {
      id: 'RC002',
      transactionId: 'TA4R46',
      amount: 25000,
      status: 'PENDING',
      createdAt: '2024-01-15T14:20:00Z',
      operatorName: 'Maria Santos'
    },
    {
      id: 'RC003',
      transactionId: 'TA4R47',
      amount: 15000,
      status: 'REJECTED',
      createdAt: '2024-01-15T16:45:00Z',
      operatorName: 'Ana Costa'
    }
  ];

  const mockSummary: ReconciliationSummary = {
    remainingCash: 125000,
    pendingCash: 25000,
    reconciledCash: 350000,
    depositsAmount: 500000
  };

  const handleAddReport = () => {
    if (!newAmount || !newDescription) return;
    
    console.log('Adding new reconciliation report:', {
      amount: newAmount,
      description: newDescription,
      date: selectedDate
    });
    
    setNewAmount('');
    setNewDescription('');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: 'secondary',
      COMPLETED: 'default',
      REJECTED: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'REJECTED':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
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
              <h1 className="text-xl font-bold text-kitadi-navy">Reconciliação</h1>
              <p className="text-sm text-gray-500">Gerir reconciliação e histórico</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Dinheiro Restante</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {mockSummary.remainingCash.toLocaleString()} STN
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">Dinheiro Pendente</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {mockSummary.pendingCash.toLocaleString()} STN
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Dinheiro Reconciliado</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {mockSummary.reconciledCash.toLocaleString()} STN
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Date Selector - moved after summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Selecionar Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="date">Data da Reconciliação</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Consultar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-kitadi-orange hover:bg-kitadi-orange/90">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Reconciliação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Reconciliação</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Valor (STN)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="50000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Descrição da transação"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddReport} disabled={!newAmount || !newDescription} className="bg-kitadi-orange hover:bg-kitadi-orange/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded mt-4">
                <p className="text-blue-700 text-sm">
                  Confirme apenas valores físicos recebidos/entregues para este dia de reconciliação.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Histórico de Reconciliação - {new Date(selectedDate).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Relatório</TableHead>
                  <TableHead>ID Transação</TableHead>
                  <TableHead>Operador</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data/Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-mono">{report.id}</TableCell>
                    <TableCell className="font-mono">{report.transactionId}</TableCell>
                    <TableCell>{report.operatorName}</TableCell>
                    <TableCell className="font-bold">
                      {report.amount.toLocaleString()} STN
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        {getStatusBadge(report.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockReports.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum relatório encontrado</h3>
                <p className="text-gray-500">Não há relatórios de reconciliação para esta data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedReconciliationScreen;