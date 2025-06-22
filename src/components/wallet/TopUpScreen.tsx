
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Building2, Phone, Upload, Copy } from 'lucide-react';

interface TopUpScreenProps {
  onBack: () => void;
}

const TopUpScreen = ({ onBack }: TopUpScreenProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'agent' | 'bank' | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const userPhone = '+239 991 2345'; // Mock user phone
  const bankAccounts = {
    'banco-stp': { name: 'Banco STP', account: '1234567890' },
    'ecobank': { name: 'Ecobank', account: '0987654321' },
    'bistp': { name: 'BISTP', account: '1122334455' }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(userPhone);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleBankSubmit = () => {
    console.log('Bank transfer submitted:', { bank: selectedBank, file: uploadedFile });
    onBack(); // Go back to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Depositar</h1>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-6">
        {!selectedMethod && (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">Escolha como deseja depositar na sua conta</p>
            </div>

            {/* Method Selection */}
            <div className="grid grid-cols-1 gap-6">
              <Card 
                className="border-2 border-gray-200 hover:border-kitadi-orange cursor-pointer transition-colors"
                onClick={() => setSelectedMethod('agent')}
              >
                <CardContent className="p-8 text-center">
                  <User className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Agente</h3>
                  <p className="text-gray-600 mb-4">Deposite em qualquer agente Kitadi próximo de si</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-700 font-medium">Disponível 24/7</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-2 border-gray-200 hover:border-kitadi-orange cursor-pointer transition-colors"
                onClick={() => setSelectedMethod('bank')}
              >
                <CardContent className="p-8 text-center">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Transferência Bancária</h3>
                  <p className="text-gray-600 mb-4">Transfira do seu banco para a conta Kitadi</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700 font-medium">Processamento em 1-2 horas úteis</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Agent Flow */}
        {selectedMethod === 'agent' && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <User className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Depositar via Agente</h2>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-blue-900">Instruções:</h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>Dirija-se a qualquer agente Kitadi</li>
                  <li>Diga ao agente o seu número de telefone</li>
                  <li>Informe o valor que deseja depositar</li>
                  <li>Entregue o dinheiro ao agente</li>
                  <li>Receberá confirmação por SMS</li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Seu número de telefone:</p>
                    <p className="text-lg font-semibold text-gray-900">{userPhone}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPhone}
                    className="text-kitadi-orange border-kitadi-orange hover:bg-kitadi-orange/5"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={onBack}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
              >
                Entendido
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bank Transfer Flow */}
        {selectedMethod === 'bank' && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Transferência Bancária</h2>
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

                {selectedBank && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Dados para transferência:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Banco:</span>
                        <span className="font-medium text-blue-900">{bankAccounts[selectedBank as keyof typeof bankAccounts]?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Conta Kitadi:</span>
                        <span className="font-medium text-blue-900">{bankAccounts[selectedBank as keyof typeof bankAccounts]?.account}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Nome:</span>
                        <span className="font-medium text-blue-900">Kitadi Wallet</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Comprovativo de transferência:</label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-kitadi-orange hover:text-kitadi-orange/80"
                    >
                      {uploadedFile ? uploadedFile.name : 'Clique para carregar o comprovativo'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG ou PDF até 5MB</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleBankSubmit}
                disabled={!selectedBank || !uploadedFile}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                Enviar Comprovativo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TopUpScreen;
