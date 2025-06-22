
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, DollarSign, Phone } from 'lucide-react';

interface PayScreenProps {
  onBack: () => void;
  onConfirm: (reference: string, amount: number) => void;
}

const PayScreen = ({ onBack, onConfirm }: PayScreenProps) => {
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRechargeConfirm = () => {
    if (phoneNumber && rechargeAmount) {
      // Handle recharge confirmation - treating it as a payment with phone number as reference
      onConfirm(phoneNumber, parseFloat(rechargeAmount));
    }
  };

  const isRechargeValid = phoneNumber.length > 0 && rechargeAmount && parseFloat(rechargeAmount) > 0;

  const rechargeOptions = [
    { amount: 100, bonus: 0 },
    { amount: 200, bonus: 10 },
    { amount: 500, bonus: 50 },
    { amount: 1000, bonus: 150 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Pagar Serviços</h1>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recargas Móveis</h2>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Número de telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="+239 123 456 789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Amount Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Valores rápidos</label>
              <div className="grid grid-cols-2 gap-3">
                {rechargeOptions.map((option) => (
                  <Button
                    key={option.amount}
                    variant="outline"
                    onClick={() => setRechargeAmount(option.amount.toString())}
                    className="p-4 h-auto flex flex-col items-center space-y-1"
                  >
                    <span className="font-semibold">{option.amount} Db</span>
                    {option.bonus > 0 && (
                      <span className="text-xs text-green-600">+{option.bonus} Db bónus</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ou digite o valor</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
              <span className="text-xs text-gray-500">Db (Dobras)</span>
            </div>

            {/* No Fee Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center">
                <span className="text-sm text-green-800 font-medium">Sem taxas de recarga</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleRechargeConfirm}
          disabled={!isRechargeValid}
          className="w-full mt-6 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
        >
          Confirmar Recarga
        </Button>
      </div>
    </div>
  );
};

export default PayScreen;
