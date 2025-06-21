import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingScreen from '@/components/wallet/OnboardingScreen';
import LoginScreen from '@/components/wallet/LoginScreen';
import Dashboard from '@/components/wallet/Dashboard';
import SendMoneyScreen from '@/components/wallet/SendMoneyScreen';
import SendConfirmationScreen from '@/components/wallet/SendConfirmationScreen';
import PayScreen from '@/components/wallet/PayScreen';
import WithdrawScreen from '@/components/wallet/WithdrawScreen';
import TopUpScreen from '@/components/wallet/TopUpScreen';
import MerchantLoginScreen from '@/components/merchant/MerchantLoginScreen';
import MerchantDashboard from '@/components/merchant/MerchantDashboard';
import QRPaymentScreen from '@/components/merchant/QRPaymentScreen';

type AppScreen = 'selection' | 'onboarding' | 'login' | 'dashboard' | 'send' | 'send-confirmation' | 'pay' | 'withdraw' | 'topup' | 'merchant-login' | 'merchant-dashboard' | 'qr-payment';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selection');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  
  // Send money state
  const [sendData, setSendData] = useState<{phoneNumber: string, amount: number} | null>(null);

  const handleUserSelection = () => {
    setIsMerchant(false);
    setCurrentScreen('onboarding');
  };

  const handleMerchantSelection = () => {
    setIsMerchant(true);
    setCurrentScreen('merchant-login');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    if (isMerchant) {
      setCurrentScreen('merchant-dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleQRPayment = () => {
    setCurrentScreen('qr-payment');
  };

  const handleBackToDashboard = () => {
    if (isMerchant) {
      setCurrentScreen('merchant-dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  // Wallet action handlers
  const handleSend = () => setCurrentScreen('send');
  const handlePay = () => setCurrentScreen('pay');
  const handleTopUp = () => setCurrentScreen('topup');
  const handleWithdraw = () => setCurrentScreen('withdraw');

  const handleSendConfirm = (phoneNumber: string, amount: number) => {
    setSendData({ phoneNumber, amount });
    setCurrentScreen('send-confirmation');
  };

  const handleSendFinalConfirm = () => {
    // Process send money transaction
    console.log('Send money confirmed:', sendData);
    setCurrentScreen('dashboard');
  };

  const handlePayConfirm = (reference: string, amount: number) => {
    // Process payment
    console.log('Payment confirmed:', { reference, amount });
    setCurrentScreen('dashboard');
  };

  const handleScanQR = () => {
    // Handle QR scan for payment
    console.log('Scan QR for payment');
  };

  const handleWithdrawAgent = (amount: number, fee: number) => {
    // Process agent withdrawal
    console.log('Agent withdrawal:', { amount, fee });
    setCurrentScreen('dashboard');
  };

  const handleWithdrawBank = (amount: number, fee: number) => {
    // Process bank withdrawal
    console.log('Bank withdrawal:', { amount, fee });
    setCurrentScreen('dashboard');
  };

  const handleTopUpAgent = () => {
    // Process agent top up
    console.log('Agent top up');
    setCurrentScreen('dashboard');
  };

  const handleTopUpBank = () => {
    // Process bank top up
    console.log('Bank top up');
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'selection':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-kitadi-navy pt-16 pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
              </div>
              <h1 className="text-center text-white text-2xl font-bold">Bem-vindo ao Kitadi</h1>
              <p className="text-center text-white/80 mt-2">Escolha como deseja usar o app</p>
            </div>

            {/* Selection Options */}
            <div className="flex-1 px-6 py-8 space-y-4">
              <Button
                onClick={handleUserSelection}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-8 rounded-xl text-lg font-semibold"
              >
                <div className="text-center">
                  <div className="text-xl mb-2">👤</div>
                  <div>Cliente</div>
                  <div className="text-sm opacity-90">Enviar e receber dinheiro</div>
                </div>
              </Button>

              <Button
                onClick={handleMerchantSelection}
                variant="outline"
                className="w-full border-kitadi-navy text-kitadi-navy py-8 rounded-xl text-lg font-semibold hover:bg-kitadi-navy/5"
              >
                <div className="text-center">
                  <div className="text-xl mb-2">🏪</div>
                  <div>Comerciante</div>
                  <div className="text-sm opacity-70">Aceitar pagamentos digitais</div>
                </div>
              </Button>
            </div>
          </div>
        );
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return <Dashboard onSend={handleSend} onPay={handlePay} onTopUp={handleTopUp} onWithdraw={handleWithdraw} />;
      case 'send':
        return <SendMoneyScreen onBack={handleBackToDashboard} onConfirm={handleSendConfirm} />;
      case 'send-confirmation':
        return sendData ? (
          <SendConfirmationScreen 
            onBack={() => setCurrentScreen('send')} 
            onConfirm={handleSendFinalConfirm}
            phoneNumber={sendData.phoneNumber}
            amount={sendData.amount}
          />
        ) : null;
      case 'pay':
        return <PayScreen onBack={handleBackToDashboard} onConfirm={handlePayConfirm} onScanQR={handleScanQR} />;
      case 'withdraw':
        return <WithdrawScreen onBack={handleBackToDashboard} onContinueAgent={handleWithdrawAgent} onContinueBank={handleWithdrawBank} />;
      case 'topup':
        return <TopUpScreen onBack={handleBackToDashboard} onSelectAgent={handleTopUpAgent} onSelectBank={handleTopUpBank} />;
      case 'merchant-login':
        return <MerchantLoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'merchant-dashboard':
        return <MerchantDashboard onQRPayment={handleQRPayment} />;
      case 'qr-payment':
        return <QRPaymentScreen onBack={handleBackToDashboard} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-kitadi-navy pt-16 pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
              </div>
              <h1 className="text-center text-white text-2xl font-bold">Bem-vindo ao Kitadi</h1>
              <p className="text-center text-white/80 mt-2">Escolha como deseja usar o app</p>
            </div>

            {/* Selection Options */}
            <div className="flex-1 px-6 py-8 space-y-4">
              <Button
                onClick={handleUserSelection}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-8 rounded-xl text-lg font-semibold"
              >
                <div className="text-center">
                  <div className="text-xl mb-2">👤</div>
                  <div>Cliente</div>
                  <div className="text-sm opacity-90">Enviar e receber dinheiro</div>
                </div>
              </Button>

              <Button
                onClick={handleMerchantSelection}
                variant="outline"
                className="w-full border-kitadi-navy text-kitadi-navy py-8 rounded-xl text-lg font-semibold hover:bg-kitadi-navy/5"
              >
                <div className="text-center">
                  <div className="text-xl mb-2">🏪</div>
                  <div>Comerciante</div>
                  <div className="text-sm opacity-70">Aceitar pagamentos digitais</div>
                </div>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Index;
