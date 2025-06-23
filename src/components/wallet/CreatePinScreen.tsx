
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import NumericKeypad from './NumericKeypad';

interface CreatePinScreenProps {
  onBack: () => void;
  onPinCreated: () => void;
}

const CreatePinScreen = ({ onBack, onPinCreated }: CreatePinScreenProps) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [error, setError] = useState('');

  const handleNumberPress = (number: string) => {
    if (step === 'create' && pin.length < 4) {
      setPin(prev => prev + number);
    } else if (step === 'confirm' && confirmPin.length < 4) {
      setConfirmPin(prev => prev + number);
      setError('');
    }
  };

  const handleBackspace = () => {
    if (step === 'create') {
      setPin(prev => prev.slice(0, -1));
    } else {
      setConfirmPin(prev => prev.slice(0, -1));
      setError('');
    }
  };

  const handleContinue = () => {
    if (step === 'create' && pin.length === 4) {
      setStep('confirm');
    } else if (step === 'confirm' && confirmPin.length === 4) {
      if (pin === confirmPin) {
        onPinCreated();
      } else {
        setError('Os PINs não coincidem. Tente novamente.');
        setConfirmPin('');
      }
    }
  };

  const handleBackStep = () => {
    if (step === 'confirm') {
      setStep('create');
      setConfirmPin('');
      setError('');
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex items-center px-6 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackStep}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
            <Shield className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">
          {step === 'create' ? 'Criar PIN' : 'Confirmar PIN'}
        </h1>
        <p className="text-center text-white/80 mt-2">
          {step === 'create' 
            ? 'Escolha um PIN seguro de 4 dígitos' 
            : 'Digite novamente o seu PIN'
          }
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              {step === 'create' ? 'Defina seu PIN' : 'Confirme seu PIN'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'create' 
                ? 'Este PIN será usado para acessar sua conta e confirmar transações'
                : 'Digite o mesmo PIN que você criou anteriormente'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'create' && (
              <div className="bg-yellow-50 p-4 rounded-xl mb-6">
                <h3 className="font-semibold text-kitadi-navy mb-2">Dicas para um PIN seguro:</h3>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Evite sequências óbvias (1234, 0000)</li>
                  <li>Não use sua data de nascimento</li>
                  <li>Escolha números que você consegue lembrar</li>
                  <li>Mantenha seu PIN em segredo</li>
                </ul>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
                <p className="text-red-700 text-center font-medium">{error}</p>
              </div>
            )}

            {/* PIN Display */}
            <div className="flex justify-center space-x-3 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 ${
                    (step === 'create' ? pin.length : confirmPin.length) > index 
                      ? 'bg-kitadi-orange border-kitadi-orange' 
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Numeric Keypad */}
            <NumericKeypad 
              onNumberPress={handleNumberPress}
              onBackspace={handleBackspace}
            />

            <Button
              onClick={handleContinue}
              disabled={(step === 'create' ? pin.length : confirmPin.length) !== 4}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold mt-8"
            >
              {step === 'create' ? 'Continuar' : 'Criar Conta'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePinScreen;
