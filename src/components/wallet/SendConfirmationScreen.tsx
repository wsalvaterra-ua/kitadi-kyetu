
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

interface SendConfirmationScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  phoneNumber: string;
  amount: number;
}

const SendConfirmationScreen = ({ onBack, onConfirm, phoneNumber, amount }: SendConfirmationScreenProps) => {
  const fee = 25;
  const total = amount + fee;
  const recipientName = "Maria Santos"; // Mock name

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
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Recipient Info */}
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl font-bold">{recipientName.charAt(0)}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{recipientName}</h2>
              <p className="text-gray-500">{phoneNumber}</p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montante:</span>
                <span className="font-semibold text-gray-900">{amount.toFixed(2)} Db</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxa:</span>
                <span className="font-semibold text-gray-900">{fee.toFixed(2)} Db</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-kitadi-orange">{total.toFixed(2)} Db</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Certifique-se de que os dados estão corretos. Esta operação não pode ser desfeita.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 py-3 text-lg font-semibold border-kitadi-orange text-kitadi-orange hover:bg-kitadi-orange/5"
          >
            Voltar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
          >
            <Check className="w-5 h-5 mr-2" />
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendConfirmationScreen;
