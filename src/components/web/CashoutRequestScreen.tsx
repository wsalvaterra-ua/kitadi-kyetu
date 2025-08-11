import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Banknote, Calculator } from 'lucide-react';

interface CashoutRequestScreenProps {
  onBack: () => void;
  onSubmit: (data: { accountNumber: string; amount: number; estimatedFee: number }) => void;
}

const FEE_PERCENT = 0.02; // 2% estimativa de taxa

const CashoutRequestScreen = ({ onBack, onSubmit }: CashoutRequestScreenProps) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  const estimatedFee = useMemo(() => {
    const value = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (isNaN(value) || value <= 0) return 0;
    return parseFloat((value * FEE_PERCENT).toFixed(2));
  }, [amount]);

  const total = useMemo(() => {
    const value = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (isNaN(value) || value <= 0) return 0;
    return parseFloat((value + estimatedFee).toFixed(2));
  }, [amount, estimatedFee]);

  const handleSubmit = () => {
    const value = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (!accountNumber || isNaN(value) || value <= 0) return;
    onSubmit({ accountNumber, amount: value, estimatedFee });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-kitadi-navy">Saque para Cliente</h1>
              <p className="text-sm text-gray-500">Envie um pedido de saque para o cliente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-5 h-5" />
              Detalhes do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="accountNumber">Número da Conta / Telefone</Label>
              <Input
                id="accountNumber"
                placeholder="Ex.: +239 991 2345"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="amount">Valor do Saque</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Taxa Estimada (2%)</Label>
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-gray-500" />
                  <span className="text-kitadi-navy font-medium">{estimatedFee.toFixed(2)} STN</span>
                </div>
              </div>
              <div>
                <Label>Total a Debitar</Label>
                <div className="text-kitadi-navy font-semibold">{total.toFixed(2)} STN</div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="text-gray-600">Estimativa</div>
              </div>
            </div>

            <div className="pt-2">
              <Button className="w-full" onClick={handleSubmit} disabled={!accountNumber || !amount || Number(amount) <= 0}>
                Enviar Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashoutRequestScreen;
