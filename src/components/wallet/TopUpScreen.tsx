
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Building2 } from 'lucide-react';

interface TopUpScreenProps {
  onBack: () => void;
  onSelectAgent: () => void;
  onSelectBank: () => void;
}

const TopUpScreen = ({ onBack, onSelectAgent, onSelectBank }: TopUpScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy px-6 pt-16 pb-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Carregar Conta</h1>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-6">
        <div className="text-center mb-8">
          <p className="text-gray-600">Escolha como deseja carregar sua conta</p>
        </div>

        {/* Top Up Method Selection */}
        <div className="grid grid-cols-1 gap-6">
          <Card 
            className="border-2 border-gray-200 hover:border-kitadi-orange cursor-pointer transition-colors"
            onClick={onSelectAgent}
          >
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-kitadi-orange" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Agente</h3>
              <p className="text-gray-600 mb-4">Carregue em qualquer agente Kitadi próximo de si</p>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium">Disponível 24/7</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-gray-200 hover:border-kitadi-orange cursor-pointer transition-colors"
            onClick={onSelectBank}
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
      </div>
    </div>
  );
};

export default TopUpScreen;
