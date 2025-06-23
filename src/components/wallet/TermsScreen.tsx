
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsScreenProps {
  onBack: () => void;
  onAccept: () => void;
}

const TermsScreen = ({ onBack, onAccept }: TermsScreenProps) => {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setHasScrolledToEnd(isAtBottom);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
            <FileText className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Termos e Condições</h1>
        <p className="text-center text-white/80 mt-2">Leia com atenção antes de continuar</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        <Card className="border-0 shadow-lg flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              Termos de Uso da Kitadi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto space-y-4 text-sm text-gray-700 max-h-96 pr-2"
            >
              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">1. Aceitação dos Termos</h3>
                <p>Ao criar uma conta na Kitadi, você concorda em cumprir estes Termos e Condições. Se não concordar com algum destes termos, não deverá usar nossos serviços.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">2. Descrição do Serviço</h3>
                <p>A Kitadi é uma plataforma de pagamentos digitais que permite transferir dinheiro, fazer pagamentos e gerenciar suas finanças de forma segura em São Tomé e Príncipe.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">3. Elegibilidade</h3>
                <p>Para usar nossos serviços, você deve ter pelo menos 18 anos e fornecer informações precisas e completas durante o registro.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">4. Segurança da Conta</h3>
                <p>Você é responsável por manter a confidencialidade do seu PIN e outras credenciais de acesso. Notifique-nos imediatamente sobre qualquer uso não autorizado de sua conta.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">5. Transações</h3>
                <p>Todas as transações são processadas em tempo real. Uma vez confirmada, uma transação não pode ser cancelada. Verifique sempre os detalhes antes de confirmar.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">6. Taxas</h3>
                <p>Algumas transações podem estar sujeitas a taxas. Todas as taxas aplicáveis serão claramente exibidas antes da confirmação da transação.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">7. Verificação de Identidade</h3>
                <p>Para sua segurança e para cumprir as regulamentações locais, poderemos solicitar documentos de verificação de identidade.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">8. Privacidade</h3>
                <p>Respeitamos sua privacidade e protegemos suas informações pessoais de acordo com nossa Política de Privacidade.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">9. Limitação de Responsabilidade</h3>
                <p>A Kitadi não será responsável por danos indiretos, incidentais ou consequenciais decorrentes do uso de nossos serviços.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">10. Alterações nos Termos</h3>
                <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.</p>
              </div>

              <div>
                <h3 className="font-semibold text-kitadi-navy mb-2">11. Contato</h3>
                <p>Para dúvidas sobre estes termos, entre em contato conosco através dos canais oficiais da Kitadi.</p>
              </div>

              <div className="bg-kitadi-orange/10 p-4 rounded-lg mt-6">
                <p className="text-kitadi-navy font-semibold">
                  Ao continuar, você confirma que leu, compreendeu e aceita todos os termos e condições acima.
                </p>
              </div>
            </div>

            {!hasScrolledToEnd && (
              <div className="text-center text-sm text-gray-500 mt-4">
                Role para baixo para ler todos os termos
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 py-3"
              >
                Voltar
              </Button>
              <Button
                onClick={onAccept}
                disabled={!hasScrolledToEnd}
                className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 disabled:opacity-50"
              >
                Aceitar e Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsScreen;
