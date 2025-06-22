
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CheckCircle } from 'lucide-react';

interface SendConfirmationScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  accountNumber: string;
  amount: number;
}

const SendConfirmationScreen = ({ onBack, onConfirm, accountNumber, amount }: SendConfirmationScreenProps) => {
  // Calculate fee based on account number
  const getFee = (accountNumber: string) => {
    if (accountNumber.startsWith('4')) {
      return 0; // No fee for merchants (accounts starting with 4)
    } else if (accountNumber.startsWith('9')) {
      return 0.20; // 0.20 Db fee for accounts starting with 9
    }
    return 0.20; // Default fee
  };

  const fee = getFee(accountNumber);
  const total = amount + fee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Confirmar Envio</h1>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Enviar para</h2>
              <div className="text-2xl font-bold text-kitadi-navy">{accountNumber}</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montante:</span>
                <span className="font-semibold text-gray-900">{amount.toFixed(2)} Db</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxa de envio:</span>
                <span className="font-semibold text-gray-900">{fee.toFixed(2)} Db</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total a debitar:</span>
                  <span className="text-lg font-bold text-kitadi-navy">{total.toFixed(2)} Db</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button
            onClick={onConfirm}
            className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirmar Envio
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full py-3 text-lg font-semibold"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendConfirmationScreen;
