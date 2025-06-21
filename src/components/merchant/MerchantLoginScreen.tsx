
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Mail } from 'lucide-react';
import NumericKeypad from '../wallet/NumericKeypad';

interface MerchantLoginScreenProps {
  onLoginSuccess: () => void;
}

const MerchantLoginScreen = ({ onLoginSuccess }: MerchantLoginScreenProps) => {
  const [email, setEmail] = useState('');
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
            <Store className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Kitadi Comerciante</h1>
        <p className="text-center text-white/80 mt-2">Acesse sua conta empresarial</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              Bem-vindo, Comerciante
            </CardTitle>
            <CardDescription className="text-center">
              Digite seus dados para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Empresarial</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@negocio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="pin">PIN de Acesso</Label>
                
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
                disabled={isLoading || pin.length !== 4 || !email}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-kitadi-orange">
                Esqueceu seu PIN?
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">Ainda não é comerciante?</p>
              <Button variant="link" className="text-kitadi-orange font-semibold">
                Registrar Negócio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantLoginScreen;
