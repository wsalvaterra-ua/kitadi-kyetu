import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Download, Plus, CheckCircle, Building } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExternalTransfer {
  id: string;
  amount: number;
  currency: string;
  targetAccount: string;
  submittedBy: string;
  submittedAt: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  proofUrl?: string;
}

interface ExternalBankTransferScreenProps {
  onBack: () => void;
}

const ExternalBankTransferScreen = ({ onBack }: ExternalBankTransferScreenProps) => {
  const [selectedTransfer, setSelectedTransfer] = useState<ExternalTransfer | null>(null);
  const [originAccount, setOriginAccount] = useState('');
  const [externalTxId, setExternalTxId] = useState('');
  const [verifyAmount, setVerifyAmount] = useState('');
  const [bankId, setBankId] = useState('');
  
  // New cash-in form
  const [newCashInAmount, setNewCashInAmount] = useState('');
  const [newTargetAccount, setNewTargetAccount] = useState('');
  const [newOriginAccount, setNewOriginAccount] = useState('');
  const [newExternalTxId, setNewExternalTxId] = useState('');
  const [newBankId, setNewBankId] = useState('');

  const mockTransfers: ExternalTransfer[] = [
    {
      id: 'ET001',
      amount: 200000,
      currency: 'STN',
      targetAccount: 'KT-123456789',
      submittedBy: 'João Silva',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'PENDING',
      proofUrl: '#'
    },
    {
      id: 'ET002',
      amount: 150000,
      currency: 'STN',
      targetAccount: 'KT-987654321',
      submittedBy: 'Maria Santos',
      submittedAt: '2024-01-15T14:20:00Z',
      status: 'PENDING',
      proofUrl: '#'
    }
  ];

  const handleVerifyTransfer = () => {
    if (!selectedTransfer || !originAccount || !externalTxId || !verifyAmount || !bankId) return;
    
    console.log('Verifying external transfer:', {
      transferId: selectedTransfer.id,
      originAccount,
      externalTxId,
      amount: verifyAmount,
      bankId
    });
    
    alert('Transferência externa verificada com sucesso!');
    setSelectedTransfer(null);
    setOriginAccount('');
    setExternalTxId('');
    setVerifyAmount('');
    setBankId('');
  };

  const handleAddCashIn = () => {
    if (!newCashInAmount || !newTargetAccount || !newOriginAccount || !newExternalTxId || !newBankId) return;
    
    console.log('Adding new cash-in entry:', {
      amount: newCashInAmount,
      targetAccount: newTargetAccount,
      originAccount: newOriginAccount,
      externalTxId: newExternalTxId,
      bankId: newBankId
    });
    
    alert('Entrada de dinheiro adicionada com sucesso!');
    setNewCashInAmount('');
    setNewTargetAccount('');
    setNewOriginAccount('');
    setNewExternalTxId('');
    setNewBankId('');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: 'secondary',
      VERIFIED: 'default',
      REJECTED: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
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
              <h1 className="text-xl font-bold text-kitadi-navy">Verificar Cash In via Banco</h1>
              <p className="text-sm text-gray-500">Verifique cash in realizados via banco</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pendentes para Verificar ({mockTransfers.filter(t => t.status === 'PENDING').length})</TabsTrigger>
            <TabsTrigger value="add-new">Adicionar Nova</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Transferências Pendentes para Verificação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
                  <p className="text-blue-800 text-sm">
                    Esta secção é para o operador <strong>verificar</strong> que o utilizador efetuou uma transferência
                    para o sistema Kitadi. Confirme os dados com o comprovativo antes de aprovar.
                  </p>
                </div>
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Conta Destino</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                  <TableBody>
                    {mockTransfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell className="font-mono">{transfer.id}</TableCell>
                        <TableCell className="font-mono">{transfer.targetAccount}</TableCell>
                        <TableCell className="font-bold text-green-600">
                          {transfer.amount.toLocaleString()} {transfer.currency}
                        </TableCell>
                        <TableCell>{transfer.submittedBy}</TableCell>
                        <TableCell>{new Date(transfer.submittedAt).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {transfer.proofUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(transfer.proofUrl, '_blank')}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Comprovativo
                              </Button>
                            )}
                            {transfer.status === 'PENDING' && (
                              <Button 
                                size="sm"
                                onClick={() => setSelectedTransfer(transfer)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verificar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Verification Form */}
            {selectedTransfer && (
              <Card className="border-2 border-kitadi-orange">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Verificar Transferência - {selectedTransfer.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Conta Destino</Label>
                      <p className="font-mono text-lg">{selectedTransfer.targetAccount}</p>
                    </div>
                  </div>

                  {selectedTransfer.proofUrl && (
                    <div>
                      <Button 
                        variant="outline"
                        onClick={() => window.open(selectedTransfer.proofUrl as string, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar Comprovativo
                      </Button>
                    </div>
                  )}

                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="bankId">ID do Banco</Label>
                      <Input
                        id="bankId"
                        placeholder="Ex: BANK001"
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="originAccount">Conta Bancária de Origem</Label>
                      <Input
                        id="originAccount"
                        placeholder="1234567890123456"
                        value={originAccount}
                        onChange={(e) => setOriginAccount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="externalTxId">ID da Transação Externa</Label>
                      <Input
                        id="externalTxId"
                        placeholder="TRX123456789"
                        value={externalTxId}
                        onChange={(e) => setExternalTxId(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="verifyAmount">Valor Recebido (STN)</Label>
                      <Input
                        id="verifyAmount"
                        type="number"
                        placeholder="200000"
                        value={verifyAmount}
                        onChange={(e) => setVerifyAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleVerifyTransfer}
                      disabled={!originAccount || !externalTxId || !verifyAmount}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmar Verificação
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedTransfer(null)}
                    >
                      Cancelar
                    </Button>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-700 text-sm">
                      Verifique todos os dados cuidadosamente antes de confirmar a transferência.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="add-new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Adicionar Nova Entrada de Dinheiro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newCashInAmount">Valor (STN)</Label>
                    <Input
                      id="newCashInAmount"
                      type="number"
                      placeholder="100000"
                      value={newCashInAmount}
                      onChange={(e) => setNewCashInAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTargetAccount">Conta Destino Kitadi</Label>
                    <Input
                      id="newTargetAccount"
                      placeholder="KT-123456789"
                      value={newTargetAccount}
                      onChange={(e) => setNewTargetAccount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newBankId">ID do Banco</Label>
                    <Input
                      id="newBankId"
                      placeholder="Ex: BANK001"
                      value={newBankId}
                      onChange={(e) => setNewBankId(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newOriginAccount">Conta Bancária de Origem</Label>
                    <Input
                      id="newOriginAccount"
                      placeholder="1234567890123456"
                      value={newOriginAccount}
                      onChange={(e) => setNewOriginAccount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newExternalTxId">ID da Transação Externa</Label>
                    <Input
                      id="newExternalTxId"
                      placeholder="TRX123456789"
                      value={newExternalTxId}
                      onChange={(e) => setNewExternalTxId(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAddCashIn}
                  disabled={!newCashInAmount || !newTargetAccount || !newOriginAccount || !newExternalTxId || !newBankId}
                  className="bg-kitadi-orange hover:bg-kitadi-orange/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Entrada
                </Button>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                  <p className="text-amber-700 text-sm">
                    <strong>Nota:</strong> Esta funcionalidade é para quando o dinheiro é adicionado 
                    sem comprovativo documental. Use apenas quando necessário.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExternalBankTransferScreen;