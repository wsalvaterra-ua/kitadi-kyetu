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
import CodeInputScreen from '@/components/wallet/CodeInputScreen';
import WalletUserManagementScreen from '@/components/wallet/UserManagementScreen';
import ExtractScreen from '@/components/wallet/ExtractScreen';
import ForgotPinScreen from '@/components/wallet/ForgotPinScreen';
import TermsScreen from '@/components/wallet/TermsScreen';
import CreatePinScreen from '@/components/wallet/CreatePinScreen';
import SmsVerificationScreen from '@/components/wallet/SmsVerificationScreen';
import IdVerificationIntroScreen from '@/components/wallet/IdVerificationIntroScreen';
import DocumentSelectionScreen from '@/components/wallet/DocumentSelectionScreen';
import ReconciliationScreen from '@/components/wallet/ReconciliationScreen';
import AddReconciliationScreen from '@/components/wallet/AddReconciliationScreen';
import AccountCreationScreen from '@/components/wallet/AccountCreationScreen';
import WebLoginScreen from '@/components/web/WebLoginScreen';
import WebDashboard from '@/components/web/WebDashboard';
import WebTransactionsScreen from '@/components/web/WebTransactionsScreen';
import WebExtractScreen from '@/components/web/WebExtractScreen';
import AccountManagementScreen from '@/components/web/AccountManagementScreen';
import { BackofficeLayout } from '@/components/layout/BackofficeLayout';
import UserAccountManagementScreen from '@/components/web/UserAccountManagementScreen';
import UserProfileScreen from '@/components/web/UserProfileScreen';
import CreateUserProfileScreen from '@/components/web/CreateUserProfileScreen';
import EnhancedReconciliationScreen from '@/components/web/EnhancedReconciliationScreen';
import TransactionManagementScreen from '@/components/web/TransactionManagementScreen';
import AccountOwnershipScreen from '@/components/web/AccountOwnershipScreen';
import BankTransactionApprovalScreen from '@/components/web/BankTransactionApprovalScreen';
import CashVerificationScreen from '@/components/web/CashVerificationScreen';
import CashReserveScreen from '@/components/web/CashReserveScreen';
import ExternalBankTransferScreen from '@/components/web/ExternalBankTransferScreen';
import OperatorManagementScreen from '@/components/web/OperatorManagementScreen';
import WithdrawalReportScreen from '@/components/web/WithdrawalReportScreen';
import UserAccessManagementScreen from '@/components/web/UserAccessManagementScreen';
import UserConfigScreen from '@/components/web/UserConfigScreen';
import ClientTransactionsScreen from '@/components/web/ClientTransactionsScreen';
import UserAccountsScreen from '@/components/web/UserAccountsScreen';
import TransactionHistoryScreen from '@/components/web/TransactionHistoryScreen';

type AppScreen = 'onboarding' | 'login' | 'dashboard' | 'send' | 'send-confirmation' | 'pay' | 'pay-confirmation' | 'withdraw' | 'topup' | 'merchant-login' | 'merchant-dashboard' | 'qr-payment' | 'transaction-details' | 'code-input' | 'user-management' | 'extract' | 'forgot-pin' | 'terms' | 'create-pin' | 'sms-verification' | 'id-verification-intro' | 'document-selection' | 'reconciliation' | 'add-reconciliation' | 'account-creation' | 'web-login' | 'web-dashboard' | 'web-transactions' | 'web-extract' | 'web-account-management' | 'web-user-account-management' | 'web-user-profile' | 'web-user-accounts' | 'web-transaction-history' | 'web-user-access' | 'web-user-config' | 'web-create-user' | 'web-reconciliation' | 'web-transaction-management' | 'web-account-ownership' | 'web-bank-approval' | 'web-cash-verification' | 'web-cash-reserve' | 'web-external-bank-transfer' | 'web-operator-management' | 'web-withdrawal-report' | 'web-client-transactions';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  
  // Send money state - changed from phoneNumber to accountNumber
  const [sendData, setSendData] = useState<{accountNumber: string, amount: number} | null>(null);
  
  // Pay state
  const [payData, setPayData] = useState<{reference: string, amount: number} | null>(null);

  // Transaction details state
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  // Registration state
  const [registrationPhoneNumber, setRegistrationPhoneNumber] = useState('');

  // Web version state
  const [isWebVersion, setIsWebVersion] = useState(false);
  const [webUserType, setWebUserType] = useState<'personal' | 'business' | 'agent' | 'business-associated' | 'merchant'>('personal');
  
  // User management state
  const [userManagementPhone, setUserManagementPhone] = useState('');
  // Preselected transaction for Web Transaction Management
  const [webSelectedTransactionId, setWebSelectedTransactionId] = useState<string | null>(null);

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
      from: 'Transferência Bancária',
      fromAccount: 'BANCO SANTANDER',
      note: 'Depósito via transferência bancária',
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
      to: 'Transferência Bancária',
      toAccount: 'BANCO SANTANDER',
      note: 'Levantamento via transferência bancária',
      date: '22 Jun 2025',
      time: '12:30',
      transactionId: 'TXN006',
      balanceAfter: 16125.50
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleWebVersion = () => {
    setIsWebVersion(true);
    setCurrentScreen('web-login');
  };

  const handleWebNavigate = (screen: string) => {
    setCurrentScreen(screen as AppScreen);
  };

  const handleWebLogin = (userType: 'personal' | 'business' | 'agent' | 'business-associated' | 'merchant') => {
    setWebUserType(userType);
    setIsAuthenticated(true);
    setIsMerchant(userType === 'merchant');
    setCurrentScreen('web-dashboard');
  };

  const handleWebLogout = () => {
    setIsAuthenticated(false);
    setIsMerchant(false);
    setIsWebVersion(false);
    setCurrentScreen('onboarding');
  };

  const handleWebTransactions = () => {
    setCurrentScreen('web-transactions');
  };

  const handleWebExtract = () => {
    setCurrentScreen('web-extract');
  };

  const handleWebCreateMerchantProfile = () => {
    setCurrentScreen('web-account-management');
  };

const handleWebAddReconciliation = () => {
    setCurrentScreen('web-reconciliation');
  };

  const handleWebTransactionManagement = () => setCurrentScreen('web-transaction-management');
  const handleWebAccountOwnership = () => setCurrentScreen('web-account-ownership');
  const handleWebBankTransactionApproval = () => setCurrentScreen('web-bank-approval');
  const handleWebCashVerification = () => setCurrentScreen('web-cash-verification');
  const handleWebCashReserve = () => setCurrentScreen('web-cash-reserve');
  const handleWebExternalBankTransfer = () => setCurrentScreen('web-external-bank-transfer');
  const handleWebOperatorManagement = () => setCurrentScreen('web-operator-management');
  const handleWebWithdrawalReport = () => setCurrentScreen('web-withdrawal-report');
  const handleWebAgentCashout = () => setCurrentScreen('web-client-transactions');

  const handleWebBack = () => {
    setCurrentScreen('web-dashboard');
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
  const handleReconciliation = () => setCurrentScreen('reconciliation');

  const handleAddReconciliation = () => setCurrentScreen('add-reconciliation');

  const handleSendConfirm = (accountNumber: string, amount: number) => {
    console.log('Setting send data:', { accountNumber, amount });
    setSendData({ accountNumber, amount });
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
    // Handle QR scan for sending money
    console.log('Scan QR for sending money');
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

  const handleCodeInput = () => {
    setCurrentScreen('code-input');
  };

  const handleUserManagement = () => {
    setCurrentScreen('user-management');
  };

  const handleExtract = () => {
    setCurrentScreen('extract');
  };

  const handleForgotPin = () => {
    setCurrentScreen('forgot-pin');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('terms');
  };

  const handleTermsAccepted = () => {
    setCurrentScreen('create-pin');
  };

  const handlePinCreated = () => {
    // For demo purposes, set a mock phone number
    setRegistrationPhoneNumber('+239 991 1234');
    setCurrentScreen('sms-verification');
  };

  const handleSmsVerified = () => {
    setCurrentScreen('id-verification-intro');
  };

  const handleStartVerification = () => {
    setCurrentScreen('document-selection');
  };

  const handleSkipVerification = () => {
    // For now, just go to dashboard with limited functionality
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleDocumentSelected = (documentType: string) => {
    console.log('Document selected:', documentType);
    // For now, just complete the flow
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleAccountCreation = () => {
    setCurrentScreen('account-creation');
  };

  const renderScreen = () => {
    console.log('Current screen:', currentScreen);
    console.log('Send data:', sendData);
    console.log('Pay data:', payData);

    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} onWebVersion={handleWebVersion} />;
      case 'login':
        return (
          <LoginScreen 
            onLoginSuccess={handleLoginSuccess} 
            onForgotPin={handleForgotPin}
            onCreateAccount={handleCreateAccount}
          />
        );
      case 'forgot-pin':
        return <ForgotPinScreen onBack={() => setCurrentScreen('login')} />;
      case 'terms':
        return <TermsScreen onBack={() => setCurrentScreen('login')} onAccept={handleTermsAccepted} />;
      case 'create-pin':
        return <CreatePinScreen onBack={() => setCurrentScreen('terms')} onPinCreated={handlePinCreated} />;
      case 'sms-verification':
        return (
          <SmsVerificationScreen 
            onBack={() => setCurrentScreen('create-pin')} 
            onVerified={handleSmsVerified}
            phoneNumber={registrationPhoneNumber}
          />
        );
      case 'id-verification-intro':
        return (
          <IdVerificationIntroScreen 
            onStart={handleStartVerification} 
            onSkip={handleSkipVerification} 
          />
        );
      case 'document-selection':
        return (
          <DocumentSelectionScreen 
            onBack={() => setCurrentScreen('id-verification-intro')} 
            onDocumentSelected={handleDocumentSelected} 
          />
        );
      case 'dashboard':
        return <Dashboard onSend={handleSend} onPay={handlePay} onTopUp={handleTopUp} onWithdraw={handleWithdraw} onTransactionClick={handleTransactionClick} onCodeInput={handleCodeInput} onUserManagement={handleUserManagement} onExtract={handleExtract} onReconciliation={handleReconciliation} onAccountCreation={handleAccountCreation} />;
      case 'send':
        return <SendMoneyScreen onBack={handleBackToDashboard} onConfirm={handleSendConfirm} onScanQR={handleScanQR} />;
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
            accountNumber={sendData.accountNumber}
            amount={sendData.amount}
          />
        );
      case 'pay':
        return <PayScreen onBack={handleBackToDashboard} onConfirm={handlePayConfirm} />;
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
      case 'reconciliation':
        return <ReconciliationScreen onBack={handleBackToDashboard} onAddRecord={handleAddReconciliation} />;
      case 'add-reconciliation':
        return <AddReconciliationScreen onBack={() => setCurrentScreen('reconciliation')} />;
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
      case 'code-input':
        return <CodeInputScreen onBack={handleBackToDashboard} onConfirm={(code, amount) => {
          console.log('Code payment confirmed:', { code, amount });
          setCurrentScreen('dashboard');
        }} />;
      case 'user-management':
        return <WalletUserManagementScreen onBack={handleBackToDashboard} />;
      case 'extract':
        return <ExtractScreen onBack={handleBackToDashboard} />;
      case 'account-creation':
        return <AccountCreationScreen onBack={handleBackToDashboard} />;
      case 'web-login':
        return (
          <WebLoginScreen 
            onLoginSuccess={handleWebLogin}
            onBack={() => {
              setIsWebVersion(false);
              setCurrentScreen('onboarding');
            }}
          />
        );
      case 'web-dashboard':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <WebDashboard
              userType={webUserType}
              onLogout={handleWebLogout}
              onViewTransactions={handleWebTransactions}
              onDownloadExtract={handleWebExtract}
              onCreateMerchantProfile={handleWebCreateMerchantProfile}
              onAddReconciliation={handleWebAddReconciliation}
              onTransactionManagement={handleWebTransactionManagement}
              onAccountOwnership={handleWebAccountOwnership}
              onBankTransactionApproval={handleWebBankTransactionApproval}
              onCashVerification={handleWebCashVerification}
              onCashReserve={handleWebCashReserve}
              onExternalBankTransfer={handleWebExternalBankTransfer}
              onOperatorManagement={handleWebOperatorManagement}
              onWithdrawalReport={handleWebWithdrawalReport}
              onAgentCashoutRequest={handleWebAgentCashout}
            />
          </BackofficeLayout>
        );
      case 'web-transactions':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <WebTransactionsScreen 
              userType={webUserType}
              onBack={handleWebBack}
              onOpenTransactionManagement={(id: string) => {
                setWebSelectedTransactionId(id);
                setCurrentScreen('web-transaction-management');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-extract':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <WebExtractScreen 
              userType={webUserType}
              onBack={handleWebBack}
            />
          </BackofficeLayout>
        );
      case 'web-account-management':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <AccountManagementScreen
              onBack={handleWebBack}
              onUserFound={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-user-account-management');
              }}
              onCreateNewUser={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-create-user');
              }}
              onManageUser={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-user-profile');
              }}
              onManageAccounts={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-user-accounts');
              }}
              onManageAccess={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-user-access');
              }}
              onManageConfig={(phone) => {
                setUserManagementPhone(phone);
                setCurrentScreen('web-user-config');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-user-account-management':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <UserAccountManagementScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
              onOpenTransactionManagement={(id: string) => {
                setWebSelectedTransactionId(id);
                setCurrentScreen('web-transaction-management');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-user-profile':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <UserProfileScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
              onAccountsManagement={() => {
                setCurrentScreen('web-user-accounts');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-user-accounts':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <UserAccountsScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
              onTransactionHistory={(accountId: string) => {
                setWebSelectedTransactionId(accountId);
                setCurrentScreen('web-transaction-history');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-transaction-history':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <TransactionHistoryScreen
              phoneNumber={userManagementPhone}
              accountName="Conta Selecionada"
              onBack={() => setCurrentScreen('web-user-accounts')}
              onTransactionDetails={(transactionId: string) => {
                setWebSelectedTransactionId(transactionId);
                setCurrentScreen('web-transaction-management');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-user-access':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <UserAccessManagementScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
            />
          </BackofficeLayout>
        );
      case 'web-user-config':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <UserConfigScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
            />
          </BackofficeLayout>
        );
      case 'web-create-user':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <CreateUserProfileScreen
              phoneNumber={userManagementPhone}
              onBack={handleWebBack}
              onUserCreated={() => {
                setCurrentScreen('web-user-account-management');
              }}
            />
          </BackofficeLayout>
        );
      case 'web-reconciliation':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <EnhancedReconciliationScreen
              onBack={handleWebBack}
            />
          </BackofficeLayout>
        );
      case 'web-transaction-management':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <TransactionManagementScreen onBack={handleWebBack} initialTransactionId={webSelectedTransactionId || undefined} />
          </BackofficeLayout>
        );
      case 'web-account-ownership':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <AccountOwnershipScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-bank-approval':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <BankTransactionApprovalScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-cash-verification':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <CashVerificationScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-cash-reserve':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <CashReserveScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-external-bank-transfer':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <ExternalBankTransferScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-operator-management':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <OperatorManagementScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-withdrawal-report':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <WithdrawalReportScreen onBack={handleWebBack} />
          </BackofficeLayout>
        );
      case 'web-client-transactions':
        return (
          <BackofficeLayout
            onLogout={handleWebLogout}
            onNavigate={handleWebNavigate}
            currentScreen={currentScreen}
            userType={webUserType}
          >
            <ClientTransactionsScreen
              onBack={handleWebBack}
            />
          </BackofficeLayout>
        );
      default:
        return <OnboardingScreen onComplete={handleOnboardingComplete} onWebVersion={handleWebVersion} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isWebVersion ? (
        renderScreen()
      ) : (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
          {renderScreen()}
        </div>
      )}
    </div>
  );
};

export default Index;
