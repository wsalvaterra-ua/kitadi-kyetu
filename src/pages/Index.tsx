import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingScreen from '@/components/wallet/OnboardingScreen';
import LoginScreen from '@/components/wallet/LoginScreen';
import Dashboard from '@/components/wallet/Dashboard';
import SendMoneyScreen from '@/components/wallet/SendMoneyScreen';
import SendConfirmationScreen from '@/components/wallet/SendConfirmationScreen';
import PayScreen from '@/components/wallet/PayScreen';
import PayConfirmationScreen from '@/components/wallet/PayConfirmationScreen';
import WithdrawScreen from '@/components/wallet/WithdrawScreen';
import TopUpScreen from '@/components/wallet/TopUpScreen';
import MerchantLoginScreen from '@/components/merchant/MerchantLoginScreen';
import MerchantDashboard from '@/components/merchant/MerchantDashboard';
import QRPaymentScreen from '@/components/merchant/QRPaymentScreen';
import TransactionDetailsScreen from '@/components/wallet/TransactionDetailsScreen';

type AppScreen = 'selection' | 'onboarding' | 'login' | 'dashboard' | 'send' | 'send-confirmation' | 'pay' | 'pay-confirmation' | 'withdraw' | 'topup' | 'merchant-login' | 'merchant-dashboard' | 'qr-payment' | 'transaction-details';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selection');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  
  // Send money state
  const [sendData, setSendData] = useState<{phoneNumber: string, amount: number} | null>(null);
  
  // Pay state
  const [payData, setPayData] = useState<{reference: string, amount: number} | null>(null);

  // Transaction details state
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  // Mock transaction data - in a real app, this would come from your backend
  const mockTransactions = {
    'TXN001': {
      id: 'TXN001',
      type: 'received' as const,
      amount: 500,
      from: 'João Silva',
      fromAccount: '+239 991 1234',
      note: 'Pagamento do jantar',
      date: '22 Jun 2025',
      time: '10:30',
      transactionId: 'TXN001',
      balanceAfter: 16250.50
    },
    'TXN002': {
      id: 'TXN002',
      type: 'sent' as const,
      status: 'pending' as const,
      amount: -250,
      to: 'Maria Santos',
      toAccount: '+239 991 5678',
      note: 'Contribuição para o presente',
      date: '22 Jun 2025',
      time: '09:15',
      transactionId: 'TXN002',
      balanceAfter: 15750.50
    },
    'TXN003': {
      id: 'TXN003',
      type: 'received' as const,
      amount: 1000,
      from: 'Pedro Costa',
      fromAccount: '+239 991 9876',
      note: 'Reembolso',
      date: '21 Jun 2025',
      time: '15:45',
      transactionId: 'TXN003',
      balanceAfter: 16000.00
    },
    'TXN004': {
      id: 'TXN004',
      type: 'payment' as const,
      amount: -125,
      to: 'Loja do João',
      toAccount: 'REF123456789',
      note: 'Compra de produtos',
      date: '21 Jun 2025',
      time: '14:20',
      transactionId: 'TXN004',
      balanceAfter: 15625.50
    },
    'TXN005': {
      id: 'TXN005',
      type: 'topup' as const,
      status: 'pending' as const,
      amount: 1000,
      from: 'Agente Pedro',
      fromAccount: 'AGT001',
      note: 'Recarga via agente',
      date: '22 Jun 2025',
      time: '13:45',
      transactionId: 'TXN005',
      balanceAfter: 16625.50
    },
    'TXN006': {
      id: 'TXN006',
      type: 'cashout' as const,
      status: 'pending' as const,
      amount: -500,
      to: 'Agente Ana',
      toAccount: 'AGT002',
      note: 'Levantamento via agente',
      date: '22 Jun 2025',
      time: '12:30',
      transactionId: 'TXN006',
      balanceAfter: 16125.50
    }
  };

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
    console.log('Setting send data:', { phoneNumber, amount });
    setSendData({ phoneNumber, amount });
    setCurrentScreen('send-confirmation');
  };

  const handleSendFinalConfirm = () => {
    // Process send money transaction
    console.log('Send money confirmed:', sendData);
    setSendData(null);
    setCurrentScreen('dashboard');
  };

  const handlePayConfirm = (reference: string, amount: number) => {
    console.log('Setting pay data:', { reference, amount });
    setPayData({ reference, amount });
    setCurrentScreen('pay-confirmation');
  };

  const handlePayFinalConfirm = () => {
    // Process payment transaction
    console.log('Payment confirmed:', payData);
    setPayData(null);
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

  const handleTopUpComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleTransactionClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setCurrentScreen('transaction-details');
  };

  const renderScreen = () => {
    console.log('Current screen:', currentScreen);
    console.log('Send data:', sendData);
    console.log('Pay data:', payData);

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
        return <Dashboard onSend={handleSend} onPay={handlePay} onTopUp={handleTopUp} onWithdraw={handleWithdraw} onTransactionClick={handleTransactionClick} />;
      case 'send':
        return <SendMoneyScreen onBack={handleBackToDashboard} onConfirm={handleSendConfirm} />;
      case 'send-confirmation':
        if (!sendData) {
          console.log('No send data, redirecting to dashboard');
          setCurrentScreen('dashboard');
          return null;
        }
        return (
          <SendConfirmationScreen 
            onBack={() => setCurrentScreen('send')} 
            onConfirm={handleSendFinalConfirm}
            phoneNumber={sendData.phoneNumber}
            amount={sendData.amount}
          />
        );
      case 'pay':
        return <PayScreen onBack={handleBackToDashboard} onConfirm={handlePayConfirm} onScanQR={handleScanQR} />;
      case 'pay-confirmation':
        if (!payData) {
          console.log('No pay data, redirecting to dashboard');
          setCurrentScreen('dashboard');
          return null;
        }
        return (
          <PayConfirmationScreen 
            onBack={() => setCurrentScreen('pay')} 
            onConfirm={handlePayFinalConfirm}
            reference={payData.reference}
            amount={payData.amount}
          />
        );
      case 'withdraw':
        return <WithdrawScreen onBack={handleBackToDashboard} onContinueAgent={handleWithdrawAgent} onContinueBank={handleWithdrawBank} />;
      case 'topup':
        return <TopUpScreen onBack={handleBackToDashboard} />;
      case 'merchant-login':
        return <MerchantLoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'merchant-dashboard':
        return <MerchantDashboard onQRPayment={handleQRPayment} />;
      case 'qr-payment':
        return <QRPaymentScreen onBack={handleBackToDashboard} />;
      case 'transaction-details':
        if (!selectedTransactionId || !mockTransactions[selectedTransactionId as keyof typeof mockTransactions]) {
          setCurrentScreen('dashboard');
          return null;
        }
        return (
          <TransactionDetailsScreen 
            transaction={mockTransactions[selectedTransactionId as keyof typeof mockTransactions]}
            onBack={handleBackToDashboard}
          />
        );
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
