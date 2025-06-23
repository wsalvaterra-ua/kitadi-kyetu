
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare, Phone } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface SmsVerificationScreenProps {
  onBack: () => void;
  onVerified: () => void;
  phoneNumber: string;
}

const SmsVerificationScreen = ({ onBack, onVerified, phoneNumber }: SmsVerificationScreenProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Start countdown on component mount
  useState(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  });

  const handleVerify = async () => {
    if (code.length !== 6) return;
    
    setIsLoading(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      onVerified();
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setCountdown(60);
    console.log('Resending SMS verification code');
    
    // Restart countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

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
          <div className="w-16 h-16 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-kitadi-orange" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Verificação SMS</h1>
        <p className="text-center text-white/80 mt-2">Confirme o seu número</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy text-xl">
              Código de Verificação
            </CardTitle>
            <CardDescription className="text-center mt-4">
              Enviámos um código de 6 dígitos para o número:
            </CardDescription>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Phone className="w-4 h-4 text-kitadi-orange" />
              <span className="font-semibold text-kitadi-navy">{phoneNumber}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || code.length !== 6}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold"
            >
              {isLoading ? 'Verificando...' : 'Verificar Código'}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-gray-600 text-sm">Não recebeu o código?</p>
              {canResend ? (
                <Button 
                  variant="link" 
                  onClick={handleResend}
                  className="text-kitadi-orange font-semibold"
                >
                  Reenviar código
                </Button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Reenviar em {countdown}s
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmsVerificationScreen;
