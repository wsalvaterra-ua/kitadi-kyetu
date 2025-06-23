
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin } from 'lucide-react';

interface ForgotPinScreenProps {
  onBack: () => void;
}

const ForgotPinScreen = ({ onBack }: ForgotPinScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex items-center px-6 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">K</span>
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">PIN Esquecido</h1>
        <p className="text-center text-white/80 mt-2">Como recuperar o seu PIN</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-kitadi-orange" />
              </div>
            </div>
            <CardTitle className="text-kitadi-navy text-xl">
              Visite a Nossa Sede
            </CardTitle>
            <CardDescription className="text-base mt-4">
              Para recuperar o seu PIN, será necessário dirigir-se à sede da Kitadi com um documento de identificação válido.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-kitadi-navy mb-2">Localização:</h3>
              <p className="text-gray-700">
                <strong>Kitadi Headquarters</strong><br />
                Rua Kwame Nkrumah, Edifício Comercial<br />
                1º Andar, Sala 102<br />
                São Tomé, São Tomé e Príncipe
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <h3 className="font-semibold text-kitadi-navy mb-2">Horário de Funcionamento:</h3>
              <p className="text-gray-700">
                Segunda a Sexta: 08:00 - 17:00<br />
                Sábado: 08:00 - 12:00<br />
                Domingo: Fechado
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-kitadi-navy mb-2">Documentos Necessários:</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>Bilhete de Identidade ou Passaporte</li>
                <li>Comprovativo de registo na Kitadi (se disponível)</li>
              </ul>
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold mt-8"
            >
              Voltar ao Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPinScreen;
