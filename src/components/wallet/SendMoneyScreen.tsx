
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User, DollarSign, QrCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SendMoneyScreenProps {
  onBack: () => void;
  onConfirm: (accountNumber: string, amount: number) => void;
  onScanQR: () => void;
}

const SendMoneyScreen = ({ onBack, onConfirm, onScanQR }: SendMoneyScreenProps) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'manual' | 'qr'>('manual');

  const handleContinue = () => {
    if (accountNumber && amount) {
      onConfirm(accountNumber, parseFloat(amount));
    }
  };

  const isValid = accountNumber.length > 0 && amount && parseFloat(amount) > 0;

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
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="qr">Escanear QR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-6">
                {/* Account Number Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Número da conta</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="991234567 ou 41234"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
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
              </CardContent>
            </Card>

            <Button
              onClick={handleContinue}
              disabled={!isValid}
              className="w-full mt-6 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
            >
              Continuar
            </Button>
          </TabsContent>

          <TabsContent value="qr">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-6">
                <div className="text-center py-12">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Escanear QR Code</h3>
                  <p className="text-gray-600 mb-6">Aponte a câmera para o QR code da pessoa que deseja pagar</p>
                  <Button
                    onClick={onScanQR}
                    className="bg-kitadi-orange hover:bg-kitadi-orange/90 text-white px-8 py-3"
                  >
                    Abrir Câmera
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SendMoneyScreen;
