
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import NumericKeypad from './NumericKeypad';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onForgotPin: () => void;
  onCreateAccount: () => void;
}

const LoginScreen = ({ onLoginSuccess, onForgotPin, onCreateAccount }: LoginScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberPress = (number: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + number);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) return;
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">K</span>
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Entrar</h1>
        <p className="text-center text-white/80 mt-2">Acesse sua conta Kitadi</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-center">
              Digite seus dados para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+239 XXX XXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="pin">PIN</Label>
                
                {/* PIN Display */}
                <div className="flex justify-center space-x-2 mb-6">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 ${
                        pin.length > index 
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
              </div>

              <Button
                type="submit"
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold mt-8"
                disabled={isLoading || pin.length !== 4}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-kitadi-orange" onClick={onForgotPin}>
                Esqueceu seu PIN?
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">Não tem uma conta?</p>
              <Button variant="link" className="text-kitadi-orange font-semibold" onClick={onCreateAccount}>
                Criar conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
