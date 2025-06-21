
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, QrCode, Copy, Share } from 'lucide-react';

interface QRPaymentScreenProps {
  onBack: () => void;
}

const QRPaymentScreen = ({ onBack }: QRPaymentScreenProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQR = () => {
    if (amount) {
      setQrGenerated(true);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue) {
      return `${parseInt(numericValue).toLocaleString()} Db`;
    }
    return '';
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
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-white text-lg font-semibold">Cobrar com QR Code</h1>
            <p className="text-white/80 text-sm">Gere um código para receber pagamento</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {!qrGenerated ? (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-kitadi-navy">Detalhes do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor a Cobrar</Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="0 Db"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Ex: Produto, serviço..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                onClick={handleGenerateQR}
                disabled={!amount}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Gerar QR Code
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* QR Code Display */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-kitadi-navy mb-2">
                  {formatCurrency(amount)}
                </h3>
                {description && (
                  <p className="text-gray-600 mb-4">{description}</p>
                )}
                
                <p className="text-sm text-gray-500">
                  Cliente deve escanear este código para pagar
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-kitadi-navy text-kitadi-navy py-4 rounded-xl"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar Link de Pagamento
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-kitadi-navy text-kitadi-navy py-4 rounded-xl"
              >
                <Share className="w-5 h-5 mr-2" />
                Compartilhar QR Code
              </Button>

              <Button
                onClick={() => setQrGenerated(false)}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-4 rounded-xl"
              >
                Novo QR Code
              </Button>
            </div>

            {/* Payment Status */}
            <Card className="border-0 shadow-lg bg-yellow-50 border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <p className="text-yellow-800 font-medium">Aguardando Pagamento...</p>
                <p className="text-yellow-700 text-sm mt-1">
                  O pagamento será processado automaticamente quando o cliente escanear o código.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPaymentScreen;
