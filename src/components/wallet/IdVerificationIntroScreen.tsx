
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Camera, FileText, User } from 'lucide-react';

interface IdVerificationIntroScreenProps {
  onStart: () => void;
  onSkip: () => void;
}

const IdVerificationIntroScreen = ({ onStart, onSkip }: IdVerificationIntroScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
            <Shield className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Conta Criada!</h1>
        <p className="text-center text-white/80 mt-2">Verifique sua identidade para usar todos os recursos</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              Verificação de Identidade
            </CardTitle>
            <CardDescription className="text-center">
              Para sua segurança e para cumprir as regulamentações, precisamos verificar sua identidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <h3 className="font-semibold text-green-800">Conta criada com sucesso!</h3>
              </div>
              <p className="text-green-700 text-sm">
                Sua conta Kitadi foi criada. Agora vamos verificar sua identidade.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-kitadi-navy mb-3">O que vamos fazer:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Escolher tipo de documento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Fotografar frente e verso do documento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Tirar uma foto sua</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <h3 className="font-semibold text-amber-700 mb-2">Por que é necessário?</h3>
              <ul className="text-sm text-amber-700 list-disc list-inside space-y-1">
                <li>Para proteger sua conta contra fraudes</li>
                <li>Para cumprir as leis de São Tomé e Príncipe</li>
                <li>Para permitir transações de maior valor</li>
                <li>Para garantir a segurança de todos os usuários</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold text-red-700 mb-2">Limitações sem verificação:</h3>
              <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                <li>Não é possível enviar ou receber dinheiro</li>
                <li>Não é possível fazer pagamentos</li>
                <li>Não é possível carregar a conta</li>
              </ul>
            </div>

            <div className="space-y-3 mt-8">
              <Button
                onClick={onStart}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold"
              >
                Verificar Identidade Agora
              </Button>
              <Button
                onClick={onSkip}
                variant="outline"
                className="w-full py-3"
              >
                Fazer Mais Tarde
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdVerificationIntroScreen;
