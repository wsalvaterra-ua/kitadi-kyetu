import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, DollarSign, User, Building2, Copy } from 'lucide-react';

interface WithdrawScreenProps {
  onBack: () => void;
  onContinueAgent: (amount: number, fee: number) => void;
  onContinueBank: (amount: number, fee: number) => void;
}

const WithdrawScreen = ({ onBack, onContinueAgent, onContinueBank }: WithdrawScreenProps) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'agent' | 'bank' | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const generateWithdrawCode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const [withdrawCode] = useState(generateWithdrawCode());

  const handleContinue = () => {
    if (selectedMethod && withdrawAmount > 0) {
      setShowConfirmation(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(withdrawCode);
  };

  const handleBankConfirm = () => {
    console.log('Bank withdrawal confirmed:', { 
      amount: withdrawAmount, 
      fee, 
      bank: selectedBank, 
      account: accountNumber 
    });
    onContinueBank(withdrawAmount, fee);
  };

  const handleAgentConfirm = () => {
    console.log('Agent withdrawal confirmed:', { 
      amount: withdrawAmount, 
      fee 
    });
    onContinueAgent(withdrawAmount, fee);
  };

  // Agent confirmation screen
  if (showConfirmation && selectedMethod === 'agent') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-kitadi-navy px-6 pt-16 pb-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => setShowConfirmation(false)} className="text-white mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Código de Levantamento</h1>
          </div>
        </div>

        <div className="px-6 -mt-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <User className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Levantamento via Agente</h2>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <p className="text-sm text-green-700 mb-2">Seu código de levantamento:</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-green-900 tracking-wider">{withdrawCode}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                    className="text-green-700 hover:text-green-800"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-blue-900">Instruções:</h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                  <li>Dirija-se a qualquer agente Kitadi</li>
                  <li>Diga ao agente este código: <strong>{withdrawCode}</strong></li>
                  <li>Aguarde a validação do agente</li>
                  <li>Recolha o seu dinheiro: <strong>{netAmount.toFixed(2)} Db</strong></li>
                </ol>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Montante solicitado:</span>
                  <span>{withdrawAmount.toFixed(2)} Db</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa (2%):</span>
                  <span className="text-red-600">-{fee.toFixed(2)} Db</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Receberá:</span>
                  <span className="text-green-600">{netAmount.toFixed(2)} Db</span>
                </div>
              </div>

              <Button
                onClick={handleAgentConfirm}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
              >
                Concluído
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Bank confirmation screen
  if (showConfirmation && selectedMethod === 'bank') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-kitadi-navy px-6 pt-16 pb-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => setShowConfirmation(false)} className="text-white mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Transferência Bancária</h1>
          </div>
        </div>

        <div className="px-6 -mt-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirmar Transferência</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Selecione o seu banco:</label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Escolha o banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banco-stp">Banco STP</SelectItem>
                      <SelectItem value="ecobank">Ecobank</SelectItem>
                      <SelectItem value="bistp">BISTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Número da sua conta:</label>
                  <Input
                    type="text"
                    placeholder="Digite o número da conta"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montante:</span>
                  <span>{withdrawAmount.toFixed(2)} Db</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa (1.5%):</span>
                  <span className="text-red-600">-{fee.toFixed(2)} Db</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Receberá na conta:</span>
                  <span className="text-green-600">{netAmount.toFixed(2)} Db</span>
                </div>
              </div>

              <Button
                onClick={handleBankConfirm}
                disabled={!selectedBank || !accountNumber}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                Enviar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          disabled={!selectedMethod || !amount || withdrawAmount <= 0}
          className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default WithdrawScreen;
