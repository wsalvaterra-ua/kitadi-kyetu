import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle, X, Building, CreditCard, ArrowUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BankTransaction {
  id: string;
  type: 'BANK_CASH_IN' | 'BANK_CASH_OUT';
  amount: number;
  currency: string;
  accountNumber: string;
  externalBankId?: string;
  externalOperationId?: string;
  targetBankAccount?: string;
  initiatedBy: string;
  createdAt: string;
  status: 'PENDING';
}

interface BankTransactionApprovalScreenProps {
  onBack: () => void;
}

const BankTransactionApprovalScreen = ({ onBack }: BankTransactionApprovalScreenProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<BankTransaction | null>(null);
  const [bankId, setBankId] = useState('');
  const [operationId, setOperationId] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);

  const mockDeposits: BankTransaction[] = [
    {
      id: 'BD001',
      type: 'BANK_CASH_IN',
      amount: 100000,
      currency: 'STN',
      accountNumber: 'KT-123456789',
      initiatedBy: 'João Silva',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'PENDING'
    },
    {
      id: 'BD002',
      type: 'BANK_CASH_IN',
      amount: 75000,
      currency: 'STN',
      accountNumber: 'KT-987654321',
      initiatedBy: 'Maria Santos',
      createdAt: '2024-01-15T14:20:00Z',
      status: 'PENDING'
    }
  ];

  const mockCashouts: BankTransaction[] = [
    {
      id: 'BC001',
      type: 'BANK_CASH_OUT',
      amount: 50000,
      currency: 'STN',
      accountNumber: 'KT-555666777',
      targetBankAccount: '1234567890123456',
      initiatedBy: 'Ana Costa',
      createdAt: '2024-01-15T11:45:00Z',
      status: 'PENDING'
    },
    {
      id: 'BC002',
      type: 'BANK_CASH_OUT',
      amount: 25000,
      currency: 'STN',
      accountNumber: 'KT-888999000',
      targetBankAccount: '9876543210987654',
      initiatedBy: 'Carlos Mendes',
      createdAt: '2024-01-15T16:10:00Z',
      status: 'PENDING'
    }
  ];

  const handleApprove = () => {
    if (!selectedTransaction) return;
    
    if (selectedTransaction.type === 'BANK_CASH_OUT' && (!bankId || !operationId)) {
      alert('Por favor, preencha o ID do banco e ID da operação para saques');
      return;
    }
    
    console.log('Approving transaction:', {
      transactionId: selectedTransaction.id,
      bankId,
      operationId
    });
    
    setShowApproval(false);
    setSelectedTransaction(null);
    setBankId('');
    setOperationId('');
  };

  const handleReject = () => {
    if (!selectedTransaction || !rejectionReason.trim()) return;
    
    console.log('Rejecting transaction:', {
      transactionId: selectedTransaction.id,
      reason: rejectionReason
    });
    
    setShowRejection(false);
    setSelectedTransaction(null);
    setRejectionReason('');
  };

  const getTypeLabel = (type: string) => {
    return type === 'BANK_CASH_IN' ? 'Depósito Bancário' : 'Saque Bancário';
  };

  const getTypeIcon = (type: string) => {
    return type === 'BANK_CASH_IN' ? 
      <ArrowUpDown className="w-4 h-4 text-green-600" /> : 
      <ArrowUpDown className="w-4 h-4 text-blue-600" />;
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
              <h1 className="text-xl font-bold text-kitadi-navy">Aprovação Bancária</h1>
              <p className="text-sm text-gray-500">Aprovar depósitos e saques bancários</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="deposits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposits">Depósitos Pendentes ({mockDeposits.length})</TabsTrigger>
            <TabsTrigger value="cashouts">Saques Pendentes ({mockCashouts.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Depósitos Bancários Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Iniciado por</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDeposits.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">{transaction.id}</TableCell>
                        <TableCell className="font-mono">{transaction.accountNumber}</TableCell>
                        <TableCell className="font-bold text-green-600">
                          +{transaction.amount.toLocaleString()} {transaction.currency}
                        </TableCell>
                        <TableCell>{transaction.initiatedBy}</TableCell>
                        <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowApproval(true);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Aprovar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowRejection(true);
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Rejeitar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cashouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Saques Bancários Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Conta Origem</TableHead>
                      <TableHead>Conta Destino</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Iniciado por</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCashouts.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">{transaction.id}</TableCell>
                        <TableCell className="font-mono">{transaction.accountNumber}</TableCell>
                        <TableCell className="font-mono">{transaction.targetBankAccount}</TableCell>
                        <TableCell className="font-bold text-red-600">
                          -{transaction.amount.toLocaleString()} {transaction.currency}
                        </TableCell>
                        <TableCell>{transaction.initiatedBy}</TableCell>
                        <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowApproval(true);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Aprovar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowRejection(true);
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Rejeitar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Approval Dialog */}
        <Dialog open={showApproval} onOpenChange={setShowApproval}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprovar {selectedTransaction && getTypeLabel(selectedTransaction.type)}</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(selectedTransaction.type)}
                    <span className="font-medium">{getTypeLabel(selectedTransaction.type)}</span>
                  </div>
                  <p><strong>ID:</strong> {selectedTransaction.id}</p>
                  <p><strong>Valor:</strong> {selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}</p>
                  <p><strong>Conta:</strong> {selectedTransaction.accountNumber}</p>
                  {selectedTransaction.targetBankAccount && (
                    <p><strong>Conta Destino:</strong> {selectedTransaction.targetBankAccount}</p>
                  )}
                </div>
                
                {selectedTransaction.type === 'BANK_CASH_OUT' && (
                  <>
                    <div>
                      <Label htmlFor="bankId">ID do Banco Externo</Label>
                      <Input
                        id="bankId"
                        placeholder="Ex: BANK001"
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operationId">ID da Operação Bancária</Label>
                      <Input
                        id="operationId"
                        placeholder="Ex: OP123456789"
                        value={operationId}
                        onChange={(e) => setOperationId(e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirmar Aprovação
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowApproval(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Rejection Dialog */}
        <Dialog open={showRejection} onOpenChange={setShowRejection}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rejeitar {selectedTransaction && getTypeLabel(selectedTransaction.type)}</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(selectedTransaction.type)}
                    <span className="font-medium">{getTypeLabel(selectedTransaction.type)}</span>
                  </div>
                  <p><strong>ID:</strong> {selectedTransaction.id}</p>
                  <p><strong>Valor:</strong> {selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}</p>
                  <p><strong>Conta:</strong> {selectedTransaction.accountNumber}</p>
                </div>
                
                <div>
                  <Label htmlFor="rejectionReason">Motivo da Rejeição</Label>
                  <Textarea
                    id="rejectionReason"
                    placeholder="Descreva o motivo da rejeição..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleReject}
                    disabled={!rejectionReason.trim()}
                    variant="destructive"
                  >
                    Confirmar Rejeição
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRejection(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BankTransactionApprovalScreen;