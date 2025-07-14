import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

interface WebLoginScreenProps {
  onLoginSuccess: (userType: 'user' | 'merchant') => void;
  onBack: () => void;
}

const WebLoginScreen = ({ onLoginSuccess, onBack }: WebLoginScreenProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock login - determine user type based on code
      const userType = code.startsWith('M') ? 'merchant' : 'user';
      onLoginSuccess(userType);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
              alt="Kitadi Logo" 
              className="h-8 w-auto mr-2"
            />
            <h1 className="text-xl font-bold text-kitadi-navy">Kitadi Web</h1>
          </div>
        </div>

        {/* Login Form */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Web
          </h2>
          <p className="text-gray-600">
            Digite o código obtido na versão mobile para acessar sua conta
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Código de Acesso
            </label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Digite o código de 6 dígitos"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Obtenha este código na versão mobile do Kitadi
            </p>
          </div>

          <Button
            type="submit"
            disabled={code.length !== 6 || loading}
            className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Versão somente leitura - Consulte extratos e transações
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebLoginScreen;