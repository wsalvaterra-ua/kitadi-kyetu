
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Hash, DollarSign, QrCode } from 'lucide-react';

interface PayScreenProps {
  onBack: () => void;
  onConfirm: (reference: string, amount: number) => void;
  onScanQR: () => void;
}

const PayScreen = ({ onBack, onConfirm, onScanQR }: PayScreenProps) => {
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'manual' | 'qr'>('manual');

  const handleContinue = () => {
    if (reference && amount) {
      onConfirm(reference, parseFloat(amount));
    }
  };

  const isValid = reference.length > 0 && amount && parseFloat(amount) > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Pagar</h1>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Payment Method Toggle */}
        <div className="flex mb-6">
          <Button
            variant={paymentMethod === 'manual' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('manual')}
            className="flex-1 mr-2"
          >
            Manual
          </Button>
          <Button
            variant={paymentMethod === 'qr' ? 'default' : 'outline'}
            onClick={() => {
              setPaymentMethod('qr');
              if (paymentMethod !== 'qr') {
                onScanQR();
              }
            }}
            className="flex-1 ml-2"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Escanear QR
          </Button>
        </div>

        {paymentMethod === 'manual' && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-6">
              {/* Reference Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Referência de pagamento</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="123456789"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Montante</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <span className="text-xs text-gray-500">Db (Dobras)</span>
              </div>

              {/* No Fee Information */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <span className="text-sm text-green-800 font-medium">Sem taxas de pagamento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={handleContinue}
          disabled={!isValid || paymentMethod === 'qr'}
          className="w-full mt-6 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default PayScreen;
