
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Smartphone } from 'lucide-react';

interface CodeInputScreenProps {
  onBack: () => void;
  onConfirm: (code: string, amount: number) => void;
}

const CodeInputScreen = ({ onBack, onConfirm }: CodeInputScreenProps) => {
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    if (code && amount && parseFloat(amount) > 0) {
      onConfirm(code, parseFloat(amount));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Receber Pagamento</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-kitadi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-kitadi-orange" />
            </div>
            <CardTitle className="text-kitadi-navy">Inserir Código de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código do Cliente
              </label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite o código gerado pelo cliente"
                className="text-center text-lg font-mono"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (Db)
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-center text-lg"
              />
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!code || !amount || parseFloat(amount) <= 0}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg"
            >
              Confirmar Recebimento
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeInputScreen;
