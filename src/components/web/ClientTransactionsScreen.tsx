import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Banknote, Download, ArrowLeftRight } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

interface ClientTransactionsScreenProps {
  onBack: () => void;
}

const FEE_PERCENT = 0.02;

const ClientTransactionsScreen = ({ onBack }: ClientTransactionsScreenProps) => {
  const { toast } = useToast();

  // Cash-out state
  const [cashoutAccount, setCashoutAccount] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState<number | ''>('');
  const [cashoutCode, setCashoutCode] = useState('');

  const cashoutEstimatedFee = useMemo(() => {
    const value = typeof cashoutAmount === 'number' ? cashoutAmount : parseFloat(String(cashoutAmount));
    if (isNaN(value) || value <= 0) return 0;
    return parseFloat((value * FEE_PERCENT).toFixed(2));
  }, [cashoutAmount]);

  const cashoutTotal = useMemo(() => {
    const value = typeof cashoutAmount === 'number' ? cashoutAmount : parseFloat(String(cashoutAmount));
    if (isNaN(value) || value <= 0) return 0;
    return parseFloat((value + cashoutEstimatedFee).toFixed(2));
  }, [cashoutAmount, cashoutEstimatedFee]);

  // Cash-in state
  const [cashinAccount, setCashinAccount] = useState('');
  const [cashinAmount, setCashinAmount] = useState<number | ''>('');

  // On-behalf transfer state
  const [originAccount, setOriginAccount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [behalfAmount, setBehalfAmount] = useState<number | ''>('');
  const [behalfCode, setBehalfCode] = useState('');

  const handleCashoutConfirm = () => {
    toast({ title: 'Cash-out concluído', description: 'O levantamento foi efetuado com sucesso.' });
    setCashoutAccount('');
    setCashoutAmount('');
    setCashoutCode('');
  };

  const handleCashinConfirm = () => {
    toast({ title: 'Cash-in registado', description: 'Depósito de dinheiro vivo registado com sucesso.' });
    setCashinAccount('');
    setCashinAmount('');
  };

  const handleBehalfConfirm = () => {
    toast({ title: 'Transação efetuada', description: 'Transação em nome do cliente concluída.' });
    setOriginAccount('');
    setTargetAccount('');
    setBehalfAmount('');
    setBehalfCode('');
  };

  return (
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Transações com Cliente"
        description="Efetue Cash-in, Cash-out e transações em nome do cliente"
        onBack={onBack}
      />

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="cashout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cashout">Cash-out</TabsTrigger>
            <TabsTrigger value="cashin">Cash-in</TabsTrigger>
            <TabsTrigger value="behalf">Em Nome do Cliente</TabsTrigger>
          </TabsList>

          {/* Cash-out */}
          <TabsContent value="cashout">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="w-5 h-5" />
                  Cash-out para Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cashoutAccount">Número da Conta / Telefone</Label>
                  <Input id="cashoutAccount" placeholder="Ex.: +239 991 2345" value={cashoutAccount} onChange={(e) => setCashoutAccount(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="cashoutAmount">Valor do Levantamento</Label>
                  <Input id="cashoutAmount" type="number" min="0" step="0.01" placeholder="0.00" value={cashoutAmount} onChange={(e) => setCashoutAmount(e.target.value === '' ? '' : parseFloat(e.target.value))} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Taxa Estimada (2%)</Label>
                    <div className="text-kitadi-navy font-medium">{cashoutEstimatedFee.toFixed(2)} STN</div>
                  </div>
                  <div>
                    <Label>Total a Debitar</Label>
                    <div className="text-kitadi-navy font-semibold">{cashoutTotal.toFixed(2)} STN</div>
                  </div>
                  <div>
                    <Label>Confirmação</Label>
                    <div className="text-gray-600">Será requerido código do cliente</div>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full" disabled={!cashoutAccount || !cashoutAmount || Number(cashoutAmount) <= 0}>Continuar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Cash-out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Envie o código ao cliente. Insira abaixo o código recebido para confirmar o levantamento.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                      <Label htmlFor="cashoutCode">Código de Verificação</Label>
                      <Input id="cashoutCode" placeholder="Ex.: 123456" value={cashoutCode} onChange={(e) => setCashoutCode(e.target.value)} />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCashoutConfirm} disabled={!cashoutCode}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash-in */}
          <TabsContent value="cashin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Cash-in do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cashinAccount">Número da Conta / Telefone</Label>
                  <Input id="cashinAccount" placeholder="Ex.: +239 991 2345" value={cashinAccount} onChange={(e) => setCashinAccount(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="cashinAmount">Valor Recebido</Label>
                  <Input id="cashinAmount" type="number" min="0" step="0.01" placeholder="0.00" value={cashinAmount} onChange={(e) => setCashinAmount(e.target.value === '' ? '' : parseFloat(e.target.value))} />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full" disabled={!cashinAccount || !cashinAmount || Number(cashinAmount) <= 0}>Confirmar Cash-in</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Cash-in</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem a certeza que pretende registar este Cash-in?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCashinConfirm}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* On behalf */}
          <TabsContent value="behalf">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5" />
                  Transação em Nome do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originAccount">Conta de Origem</Label>
                    <Input id="originAccount" placeholder="Ex.: +239 991 2345" value={originAccount} onChange={(e) => setOriginAccount(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="targetAccount">Conta de Destino</Label>
                    <Input id="targetAccount" placeholder="Ex.: +239 998 7654" value={targetAccount} onChange={(e) => setTargetAccount(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="behalfAmount">Valor</Label>
                  <Input id="behalfAmount" type="number" min="0" step="0.01" placeholder="0.00" value={behalfAmount} onChange={(e) => setBehalfAmount(e.target.value === '' ? '' : parseFloat(e.target.value))} />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full" disabled={!originAccount || !targetAccount || !behalfAmount || Number(behalfAmount) <= 0}>Continuar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Transação</AlertDialogTitle>
                      <AlertDialogDescription>
                        Insira o código de verificação para executar a transação em nome do cliente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                      <Label htmlFor="behalfCode">Código de Verificação</Label>
                      <Input id="behalfCode" placeholder="Ex.: 123456" value={behalfCode} onChange={(e) => setBehalfCode(e.target.value)} />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBehalfConfirm} disabled={!behalfCode}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientTransactionsScreen;
