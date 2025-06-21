
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, DollarSign, User, Building2 } from 'lucide-react';

interface WithdrawScreenProps {
  onBack: () => void;
  onContinueAgent: (amount: number, fee: number) => void;
  onContinueBank: (amount: number, fee: number) => void;
}

const WithdrawScreen = ({ onBack, onContinueAgent, onContinueBank }: WithdrawScreenProps) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'agent' | 'bank' | null>(null);

  const calculateFee = (withdrawAmount: number, method: 'agent' | 'bank') => {
    if (method === 'agent') {
      return withdrawAmount * 0.02; // 2% fee for agent
    } else {
      return withdrawAmount * 0.015; // 1.5% fee for bank
    }
  };

  const withdrawAmount = parseFloat(amount) || 0;
  const fee = selectedMethod ? calculateFee(withdrawAmount, selectedMethod) : 0;
  const netAmount = withdrawAmount - fee;

  const handleContinue = () => {
    if (selectedMethod && withdrawAmount > 0) {
      if (selectedMethod === 'agent') {
        onContinueAgent(withdrawAmount, fee);
      } else {
        onContinueBank(withdrawAmount, fee);
      }
    }
  };

  const isValid = selectedMethod && amount && withdrawAmount > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Levantar Dinheiro</h1>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-6">
        {/* Amount Input */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Montante a levantar</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 text-lg"
                />
              </div>
              <span className="text-xs text-gray-500">Db (Dobras)</span>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Method Selection */}
        <div className="grid grid-cols-1 gap-4">
          <Card 
            className={`border-2 cursor-pointer transition-colors ${
              selectedMethod === 'agent' 
                ? 'border-kitadi-orange bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('agent')}
          >
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 mx-auto mb-3 text-kitadi-orange" />
              <h3 className="font-semibold text-gray-900 mb-2">Agente</h3>
              <p className="text-sm text-gray-600">Levante em qualquer agente Kitadi</p>
            </CardContent>
          </Card>

          <Card 
            className={`border-2 cursor-pointer transition-colors ${
              selectedMethod === 'bank' 
                ? 'border-kitadi-orange bg-orange-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod('bank')}
          >
            <CardContent className="p-6 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-kitadi-orange" />
              <h3 className="font-semibold text-gray-900 mb-2">Transferência Bancária</h3>
              <p className="text-sm text-gray-600">Transfira para sua conta bancária</p>
            </CardContent>
          </Card>
        </div>

        {/* Fee Calculation */}
        {selectedMethod && withdrawAmount > 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montante:</span>
                <span className="font-semibold">{withdrawAmount.toFixed(2)} Db</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxa ({selectedMethod === 'agent' ? '2%' : '1.5%'}):</span>
                <span className="font-semibold text-red-600">-{fee.toFixed(2)} Db</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Receberá:</span>
                  <span className="text-lg font-bold text-green-600">{netAmount.toFixed(2)} Db</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default WithdrawScreen;
