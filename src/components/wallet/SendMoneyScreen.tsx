
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Phone, DollarSign } from 'lucide-react';

interface SendMoneyScreenProps {
  onBack: () => void;
  onConfirm: (phoneNumber: string, amount: number) => void;
}

const SendMoneyScreen = ({ onBack, onConfirm }: SendMoneyScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleContinue = () => {
    if (phoneNumber && amount) {
      onConfirm(phoneNumber, parseFloat(amount));
    }
  };

  const isValid = phoneNumber.length >= 9 && amount && parseFloat(amount) > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Enviar Dinheiro</h1>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Número de telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+239 991 2345"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

            {/* Fee Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-800">Taxa de envio:</span>
                <span className="font-semibold text-yellow-800">25 STN</span>
              </div>
            </div>

            {/* Total */}
            {amount && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total a debitar:</span>
                  <span className="font-semibold text-gray-900">
                    {(parseFloat(amount) + 25).toFixed(2)} Db
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full mt-6 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default SendMoneyScreen;
