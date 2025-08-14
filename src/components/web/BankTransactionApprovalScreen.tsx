import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, X, Building, CreditCard, ArrowUpDown, DollarSign, AlertTriangle, User } from 'lucide-react';
import { PageHeader } from './PageHeader';
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

interface CashReceipt {
  id: string;
  operatorName: string;
  operatorPhone: string;
  firstDigit: number;
  fullValue: number;
  submittedAt: string;
}

interface BankTransactionApprovalScreenProps {
  onBack: () => void;
}

const BankTransactionApprovalScreen = ({ onBack }: BankTransactionApprovalScreenProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<BankTransaction | null>(null);
  const [bankId, setBankId] = useState('');
  const [operationId, setOperationId] = useState('');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [showCashVerify, setShowCashVerify] = useState(false);
  const [selectedCashReceipt, setSelectedCashReceipt] = useState<CashReceipt | null>(null);
  const [enteredValue, setEnteredValue] = useState('');

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

  const mockCashReceipts: CashReceipt[] = [
    {
      id: 'CR001',
      operatorName: 'Agente A',
      operatorPhone: '+239 900-0000',
      firstDigit: 5,
      fullValue: 50000,
      submittedAt: '2024-01-15T12:05:00Z',
    },
    {
      id: 'CR002',
      operatorName: 'Agente B',
      operatorPhone: '+239 900-0001',
      firstDigit: 7,
      fullValue: 70000,
      submittedAt: '2024-01-15T15:40:00Z',
    },
  ];

  const handleApprove = () => {
    if (!selectedTransaction) return;
    if (!bankId || !operationId || !approvedAmount) {
      alert('Preencha o ID do banco, ID da operação e o valor confirmado.');
      return;
    }
    console.log('Approving transaction:', {
      transactionId: selectedTransaction.id,
      bankId,
      operationId,
      approvedAmount
    });
    setShowApproval(false);
    setSelectedTransaction(null);
    setBankId('');
    setOperationId('');
    setApprovedAmount('');
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
    return type === 'BANK_CASH_IN' ? 'Depósito Bancário' : 'Levantamento Bancário';
  };

  const getTypeIcon = (type: string) => {
    return type === 'BANK_CASH_IN' ? 
      <ArrowUpDown className="w-4 h-4 text-green-600" /> : 
      <ArrowUpDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Verificar Operações de Reconciliação"
        description="Verifique depósitos, levantamentos e receção de dinheiro físico dos operadores com dados bancários e confirmações presenciais"
        onBack={onBack}
      />

      {/* Main Content */}
      <div className="w-full p-8">
        <Tabs defaultValue="deposits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposits">Depósitos Pendentes ({mockDeposits.length})</TabsTrigger>
            <TabsTrigger value="cashouts">Levantamentos Pendentes ({mockCashouts.length})</TabsTrigger>
            <TabsTrigger value="cash-reception">Recepção de Dinheiro ({mockCashReceipts.length})</TabsTrigger>
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
                <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
                  <p className="text-blue-800 text-sm">Ao verificar um depósito, está a confirmar que o operador <strong>depositou</strong> o valor indicado na conta bancária do Kitadi. Registe o <strong>ID do banco</strong>, <strong>ID da operação</strong> e o <strong>valor depositado</strong>.</p>
                </div>
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
                              Verificar
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
                  Levantamentos Bancários Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
                  <p className="text-blue-800 text-sm">Ao verificar um levantamento, está a confirmar que o operador <strong>levantou</strong> a quantia indicada. Registe o <strong>ID do banco</strong>, <strong>ID da operação</strong> e o <strong>valor levantado</strong>.</p>
                </div>
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
                              Verificar
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

          <TabsContent value="cash-reception" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Recepção de Dinheiro Físico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-amber-800 text-sm">
                        Ao verificar uma recepção de dinheiro, está a confirmar que o operador lhe <strong>entregou</strong> o valor indicado em numerário.
                      </p>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Operador</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Primeiro Dígito</TableHead>
                      <TableHead>Submetido em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCashReceipts.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell className="font-medium">{verification.operatorName}</TableCell>
                        <TableCell className="font-mono">{verification.operatorPhone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-kitadi-orange text-white">
                            {verification.firstDigit}***
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(verification.submittedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedCashReceipt(verification);
                              setShowCashVerify(true);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verificar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Dialog open={showCashVerify} onOpenChange={setShowCashVerify}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verificar Recepção de Dinheiro</DialogTitle>
                    </DialogHeader>
                    {selectedCashReceipt && (
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium">{selectedCashReceipt.operatorName}</span>
                          </div>
                          <p><strong>Telefone:</strong> {selectedCashReceipt.operatorPhone}</p>
                          <p><strong>Primeiro Dígito:</strong> {selectedCashReceipt.firstDigit}</p>
                        </div>

                        <div>
                          <Label htmlFor="verifyAmount">Valor Recebido (STN)</Label>
                          <Input
                            id="verifyAmount"
                            type="number"
                            placeholder="Ex: 50000"
                            value={enteredValue}
                            onChange={(e) => setEnteredValue(e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">O valor deve começar com o dígito "{selectedCashReceipt.firstDigit}"</p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              if (parseInt(enteredValue) === selectedCashReceipt.fullValue) {
                                alert('Valor verificado com sucesso!');
                              } else {
                                alert('Valor incorreto! Tente novamente.');
                              }
                              setEnteredValue('');
                              setSelectedCashReceipt(null);
                              setShowCashVerify(false);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={!enteredValue}
                          >
                            Confirmar Verificação
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setEnteredValue('');
                              setSelectedCashReceipt(null);
                              setShowCashVerify(false);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Approval Dialog */}
        <Dialog open={showApproval} onOpenChange={setShowApproval}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verificar {selectedTransaction && getTypeLabel(selectedTransaction.type)}</DialogTitle>
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
                <div>
                  <Label htmlFor="approvedAmount">Valor Confirmado (STN)</Label>
                  <Input
                    id="approvedAmount"
                    type="number"
                    placeholder="Ex: 100000"
                    value={approvedAmount}
                    onChange={(e) => setApprovedAmount(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleApprove}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirmar Verificação
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