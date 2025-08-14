import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DollarSign, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CashVerification {
  id: string;
  operatorName: string;
  operatorPhone: string;
  firstDigit: string;
  fullValue: number;
  submittedAt: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

interface CashVerificationScreenProps {
  onBack: () => void;
}

const CashVerificationScreen = ({ onBack }: CashVerificationScreenProps) => {
  const [selectedVerification, setSelectedVerification] = useState<CashVerification | null>(null);
  const [enteredValue, setEnteredValue] = useState('');

  const mockVerifications: CashVerification[] = [
    {
      id: 'CV001',
      operatorName: 'João Silva',
      operatorPhone: '+2399123456',
      firstDigit: '5',
      fullValue: 50000,
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'PENDING'
    },
    {
      id: 'CV002',
      operatorName: 'Maria Santos',
      operatorPhone: '+2399654321',
      firstDigit: '2',
      fullValue: 25000,
      submittedAt: '2024-01-15T14:20:00Z',
      status: 'PENDING'
    },
    {
      id: 'CV003',
      operatorName: 'Ana Costa',
      operatorPhone: '+2399987654',
      firstDigit: '1',
      fullValue: 15000,
      submittedAt: '2024-01-15T16:45:00Z',
      status: 'PENDING'
    }
  ];

  const handleVerifyAmount = (verification: CashVerification) => {
    const entered = parseInt(enteredValue);
    if (entered === verification.fullValue) {
      console.log('Amount verified successfully for:', verification.id);
      alert('Valor verificado com sucesso!');
    } else {
      console.log('Amount verification failed for:', verification.id);
      alert('Valor incorreto! Tente novamente.');
    }
    setEnteredValue('');
    setSelectedVerification(null);
  };

  const handleRejectVerification = (verification: CashVerification) => {
    console.log('Rejecting verification for:', verification.id);
    alert('Verificação rejeitada!');
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
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Verificar Recepção de Dinheiro"
        description="Confirme a recepção física de dinheiro dos operadores, introduzindo o valor completo"
        onBack={onBack}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Pending Verifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Verificações Pendentes ({mockVerifications.filter(v => v.status === 'PENDING').length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-sm">
                    <strong>Importante:</strong> Ao confirmar uma verificação, está a declarar que o dinheiro 
                    foi passado do operador para si. Verifique cuidadosamente o valor antes de confirmar.
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
                {mockVerifications.map((verification) => (
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
                      {verification.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => setSelectedVerification(verification)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verificar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectVerification(verification)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Verification Modal */}
        {selectedVerification && (
          <Card className="border-2 border-kitadi-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Verificar Valor - {selectedVerification.operatorName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Operador</Label>
                  <p className="text-lg font-medium">{selectedVerification.operatorName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Telefone</Label>
                  <p className="font-mono">{selectedVerification.operatorPhone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Primeiro Dígito Fornecido</Label>
                  <p className="text-2xl font-bold text-kitadi-orange">{selectedVerification.firstDigit}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Data de Submissão</Label>
                  <p>{new Date(selectedVerification.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label htmlFor="verifyAmount" className="text-sm font-medium">
                  Digite o valor completo que recebeu (STN)
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="verifyAmount"
                    type="number"
                    placeholder="Ex: 50000"
                    value={enteredValue}
                    onChange={(e) => setEnteredValue(e.target.value)}
                    className="text-lg"
                  />
                  <Button 
                    onClick={() => handleVerifyAmount(selectedVerification)}
                    disabled={!enteredValue}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmar
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  O valor deve começar com o dígito "{selectedVerification.firstDigit}"
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedVerification(null);
                    setEnteredValue('');
                  }}
                >
                  Cancelar
                </Button>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 text-sm">
                  <strong>Atenção:</strong> Ao confirmar, está a declarar que recebeu este valor 
                  em dinheiro físico do operador {selectedVerification.operatorName}.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {mockVerifications.filter(v => v.status === 'PENDING').length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma verificação pendente</h3>
              <p className="text-gray-500">Todas as verificações de dinheiro foram processadas</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CashVerificationScreen;