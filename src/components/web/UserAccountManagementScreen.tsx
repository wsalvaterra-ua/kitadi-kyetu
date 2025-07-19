import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Building, Wallet, Plus, Edit, Eye, EyeOff, Shield, Send, Upload, Smartphone, FileText, History, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserAccountManagementScreenProps {
  onBack: () => void;
  phoneNumber: string;
}

type UserAccessStep = 'initial' | 'data-access' | 'verified';
type AccountStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED';

const UserAccountManagementScreen = ({ onBack, phoneNumber }: UserAccountManagementScreenProps) => {
  const { toast } = useToast();
  const [userAccessStep, setUserAccessStep] = useState<UserAccessStep>('initial');
  const [dataAccessCode, setDataAccessCode] = useState('');
  const [operationCode, setOperationCode] = useState('');
  const [idVerificationChecked, setIdVerificationChecked] = useState(false);
  const [showOperationCode, setShowOperationCode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user data - in real app would come from API
  const mockUserData = {
    personal: {
      firstName: 'Maria',
      middleName: 'dos Santos',
      lastName: 'Silva',
      idNumber: '1234567890',
      nif: 'NIF123456789',
      alternativePhone: '+239987654321',
      nationality: 'STP',
      dateOfBirth: '1985-03-15',
      expiryDate: '2030-03-15',
      civilStatus: 'casado',
      status: 'ACTIVE'
    },
    business: [
      {
        id: '1',
        businessName: 'Loja da Maria',
        businessType: 'Comércio Varejista',
        businessSize: 'Micro Empresa',
        taxId: 'NIF123456789',
        address: 'Avenida Comercial, 456, São Tomé',
        description: 'Loja de produtos alimentares e utensílios domésticos',
        gpsCoordinates: '0.3440, 6.7310',
        status: 'active'
      },
      {
        id: '2',
        businessName: 'Restaurante Sabores',
        businessType: 'Restauração',
        businessSize: 'Pequena Empresa',
        taxId: 'NIF987654321',
        address: 'Rua dos Sabores, 789, São Tomé',
        description: 'Restaurante de comida tradicional são-tomense',
        gpsCoordinates: '0.3441, 6.7311',
        status: 'pending'
      }
    ],
    accounts: [
      {
        id: '1',
        accountNumber: '4' + phoneNumber.slice(-3).padStart(4, 'X'),
        accountType: 'Conta Pessoal',
        balance: '45,678 STN',
        status: 'ACTIVE' as AccountStatus,
        limits: {
          dailySend: '50,000 STN',
          dailyReceive: '100,000 STN',
          monthlySend: '500,000 STN',
          monthlyReceive: '1,000,000 STN',
          transactionSend: '10,000 STN',
          transactionReceive: '20,000 STN',
          maxBalance: '2,000,000 STN'
        },
        transactions: [
          { id: '1', type: 'Recebido', amount: '+5,000 STN', date: '2024-01-15', description: 'Transferência de João Silva' },
          { id: '2', type: 'Enviado', amount: '-2,500 STN', date: '2024-01-14', description: 'Pagamento Loja ABC' },
          { id: '3', type: 'Recebido', amount: '+1,200 STN', date: '2024-01-13', description: 'Venda produto' }
        ]
      },
      {
        id: '2',
        accountNumber: '4' + (parseInt(phoneNumber.slice(-3)) + 1).toString().padStart(4, '0'),
        accountType: 'Conta Comercial - Loja da Maria',
        balance: '123,456 STN',
        status: 'FROZEN' as AccountStatus,
        limits: {
          dailySend: '200,000 STN',
          dailyReceive: '500,000 STN',
          monthlySend: '2,000,000 STN',
          monthlyReceive: '5,000,000 STN',
          transactionSend: '50,000 STN',
          transactionReceive: '100,000 STN',
          maxBalance: '10,000,000 STN'
        },
        transactions: [
          { id: '4', type: 'Recebido', amount: '+15,000 STN', date: '2024-01-15', description: 'Venda produtos' },
          { id: '5', type: 'Enviado', amount: '-8,000 STN', date: '2024-01-14', description: 'Compra stock' }
        ]
      }
    ]
  };

  const [personalData, setPersonalData] = useState(mockUserData.personal);
  const [businessProfiles, setBusinessProfiles] = useState(mockUserData.business);
  const [accounts, setAccounts] = useState(mockUserData.accounts);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<string | null>(null);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState<{[key: string]: boolean}>({});
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(true); // Remove agent security code requirement
  const [showNewBusinessForm, setShowNewBusinessForm] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [smsStep, setSmsStep] = useState<'send' | 'verify' | 'verified'>('send');
  const [showAccountDetails, setShowAccountDetails] = useState<string | null>(null);
  const [accountSmsStep, setAccountSmsStep] = useState<{[key: string]: 'send' | 'verify' | 'verified'}>({});
  const [accountSmsCode, setAccountSmsCode] = useState('');
  const [businessSmsStep, setBusinessSmsStep] = useState<{[key: string]: 'send' | 'verify' | 'verified'}>({});
  const [businessSmsCode, setBusinessSmsCode] = useState('');
  const [newBusinessData, setNewBusinessData] = useState({
      businessName: '',
      businessType: '',
      businessSize: '',
      otherBusinessType: '',
      district: '',
      location: '',
      gpsCoordinates: '',
      description: '',
      isOwnLocation: false
  });
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [selectedBusinessProfile, setSelectedBusinessProfile] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [showAccountHistory, setShowAccountHistory] = useState<string | null>(null);
  const [showAccountManagement, setShowAccountManagement] = useState<string | null>(null);
  const [accountManagementData, setAccountManagementData] = useState<any>({});
  const [createAccountSmsStep, setCreateAccountSmsStep] = useState<'send' | 'verify' | 'verified'>('send');
  const [createAccountSmsCode, setCreateAccountSmsCode] = useState('');
  const [showUserAccessManagement, setShowUserAccessManagement] = useState(false);
  const [userManagementData, setUserManagementData] = useState({
    status: personalData.status,
    pinResetRequested: false
  });

  const toggleBalanceVisibility = (accountId: string) => {
    setShowBalance(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          setNewBusinessData({...newBusinessData, gpsCoordinates: coords, isOwnLocation: true});
          toast({
            title: "Localização obtida",
            description: "Coordenadas GPS atualizadas automaticamente",
          });
        },
        () => {
          setNewBusinessData({...newBusinessData, gpsCoordinates: '0.3440, 6.7310', isOwnLocation: false}); // Default São Tomé coordinates
          toast({
            title: "Localização padrão",
            description: "Não foi possível obter a localização atual. Usando coordenadas de São Tomé.",
          });
        }
      );
    } else {
      setNewBusinessData({...newBusinessData, gpsCoordinates: '0.3440, 6.7310', isOwnLocation: false});
      toast({
        title: "Localização padrão",
        description: "Geolocalização não disponível. Usando coordenadas de São Tomé.",
      });
    }
  };

  const sendDataAccessSms = () => {
    setUserAccessStep('data-access');
    toast({
      title: "SMS enviado",
      description: `Código de acesso aos dados enviado para ${phoneNumber}`,
    });
  };

  const verifyDataAccess = () => {
    if (dataAccessCode && idVerificationChecked) {
      setUserAccessStep('verified');
      toast({
        title: "Acesso autorizado",
        description: "Agora pode aceder aos dados do utilizador.",
      });
    } else {
      toast({
        title: "Verificação falhada",
        description: "Código ou verificação de ID não confirmada.",
        variant: "destructive"
      });
    }
  };

  const requestOperationCode = () => {
    setShowOperationCode(true);
    toast({
      title: "SMS enviado",
      description: `Código de operação enviado para ${phoneNumber}`,
    });
  };

  const verifyOperationCode = () => {
    if (operationCode) {
      setShowOperationCode(false);
      setOperationCode('');
      return true;
    } else {
      toast({
        title: "Código vazio",
        description: "Introduza um código de operação.",
        variant: "destructive"
      });
      return false;
    }
  };

  const sendSms = () => {
    setSmsStep('verify');
    toast({
      title: "SMS enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const verifySms = () => {
    if (smsCode) {
      setSmsStep('verified');
      toast({
        title: "SMS verificado",
        description: "Perfil pessoal verificado com sucesso.",
      });
    } else {
      toast({
        title: "Código vazio",
        description: "Introduza um código SMS.",
        variant: "destructive"
      });
    }
  };

  const sendBusinessSms = (businessId: string) => {
    setBusinessSmsStep(prev => ({...prev, [businessId]: 'verify'}));
    toast({
      title: "SMS enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const verifyBusinessSms = (businessId: string) => {
    if (businessSmsCode) {
      setBusinessSmsStep(prev => ({...prev, [businessId]: 'verified'}));
      toast({
        title: "SMS verificado",
        description: "Perfil comercial verificado com sucesso.",
      });
    } else {
      toast({
        title: "Código vazio",
        description: "Introduza um código SMS.",
        variant: "destructive"
      });
    }
  };

  const savePersonalProfile = () => {
    if (smsStep !== 'verified') {
      toast({
        title: "Verificação SMS necessária",
        description: "Por favor, complete a verificação SMS antes de guardar",
        variant: "destructive"
      });
      return;
    }

    requestOperationCode();
    // Simulate operation code verification success for demo
    setTimeout(() => {
      setEditingPersonal(false);
      toast({
        title: "Perfil atualizado",
        description: "Dados pessoais atualizados com sucesso",
      });
    }, 1000);
  };

  const sendAccountSms = (accountId: string) => {
    setAccountSmsStep(prev => ({...prev, [accountId]: 'verify'}));
    toast({
      title: "SMS enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const verifyAccountSms = (accountId: string) => {
    if (accountSmsCode) {
      setAccountSmsStep(prev => ({...prev, [accountId]: 'verified'}));
      toast({
        title: "SMS verificado",
        description: "Operações na conta autorizadas.",
      });
    } else {
      toast({
        title: "Código vazio",
        description: "Introduza um código SMS.",
        variant: "destructive"
      });
    }
  };

  const handleTransferOnBehalf = (accountId: string) => {
    if (accountSmsStep[accountId] === 'verified') {
      toast({
        title: "Transferência iniciada",
        description: "Funcionalidade de transferência será implementada",
      });
    } else {
      toast({
        title: "Verificação SMS necessária",
        description: "Complete a verificação SMS antes de fazer transferências",
        variant: "destructive"
      });
    }
  };

  const businessTypes = [
    'Comércio', 'Restauração', 'Serviços', 'Agricultura', 'Pesca', 'Turismo', 'Tecnologia', 'Outro'
  ];

  const businessSizes = [
    'Comerciante Individual',
    'Micro Empresa',
    'Pequena Empresa', 
    'Média Empresa',
    'Grande Empresa'
  ];

  const districts = [
    'Água Grande', 'Mé-Zóchi', 'Cantagalo', 'Caué', 'Lemba', 'Lobata', 'Príncipe'
  ];

  const saveNewBusiness = () => {
    if (!newBusinessData.businessName || !newBusinessData.businessType || !newBusinessData.district) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, tipo e distrito do negócio",
        variant: "destructive"
      });
      return;
    }

    const newBusiness = {
      id: (businessProfiles.length + 1).toString(),
      businessName: newBusinessData.businessName,
      businessType: newBusinessData.businessType === 'Outro' ? newBusinessData.otherBusinessType : newBusinessData.businessType,
      businessSize: newBusinessData.businessSize,
      taxId: `NIF${Date.now()}`,
      address: `${newBusinessData.location}, ${newBusinessData.district}`,
      description: newBusinessData.description,
      gpsCoordinates: newBusinessData.gpsCoordinates,
      status: 'pending'
    };

    setBusinessProfiles([...businessProfiles, newBusiness]);
    setShowNewBusinessForm(false);
    setNewBusinessData({
      businessName: '',
      businessType: '',
      businessSize: '',
      otherBusinessType: '',
      district: '',
      location: '',
      gpsCoordinates: '',
      description: '',
      isOwnLocation: false
    });

    toast({
      title: "Perfil comercial criado",
      description: "Novo perfil criado com sucesso. Estado: Pendente",
    });
  };

  const createNewAccount = () => {
    if (!selectedBusinessProfile || !newAccountName) {
      toast({
        title: "Dados obrigatórios",
        description: "Selecione um perfil comercial e nome da conta",
        variant: "destructive"
      });
      return;
    }

    if (createAccountSmsStep !== 'verified') {
      toast({
        title: "Verificação SMS necessária",
        description: "Complete a verificação SMS antes de criar a conta",
        variant: "destructive"
      });
      return;
    }

    const businessProfile = businessProfiles.find(bp => bp.id === selectedBusinessProfile);
    const newAccount = {
      id: (accounts.length + 1).toString(),
      accountNumber: '4' + Math.random().toString().slice(-3).padStart(4, 'X'),
      accountType: newAccountName,
      balance: '0 STN',
      status: 'ACTIVE' as AccountStatus,
      limits: {
        dailySend: '200,000 STN',
        dailyReceive: '500,000 STN',
        monthlySend: '2,000,000 STN',
        monthlyReceive: '5,000,000 STN',
        transactionSend: '50,000 STN',
        transactionReceive: '100,000 STN',
        maxBalance: '10,000,000 STN'
      },
      transactions: []
    };

    setAccounts([...accounts, newAccount]);
    setShowCreateAccountModal(false);
    setSelectedBusinessProfile('');
    setNewAccountName('');
    setCreateAccountSmsStep('send');
    setCreateAccountSmsCode('');

    toast({
      title: "Conta criada",
      description: "Nova conta comercial criada com sucesso",
    });
  };

  const sendCreateAccountSms = () => {
    setCreateAccountSmsStep('verify');
    toast({
      title: "SMS enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const verifyCreateAccountSms = () => {
    if (createAccountSmsCode) {
      setCreateAccountSmsStep('verified');
      toast({
        title: "SMS verificado",
        description: "Criação de conta autorizada.",
      });
    } else {
      toast({
        title: "Código vazio",
        description: "Introduza um código SMS.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'active':
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'PENDING_KYC':
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'SUSPENDED':
      case 'suspended':
      case 'FROZEN':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'CLOSED':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'active':
        return 'Ativo';
      case 'verified':
        return 'Verificado';
      case 'PENDING_KYC':
      case 'pending':
        return 'Pendente KYC';
      case 'SUSPENDED':
      case 'suspended':
        return 'Suspenso';
      case 'FROZEN':
        return 'Congelado';
      case 'CLOSED':
        return 'Fechado';
      default:
        return status;
    }
  };

  // Initial access verification screen
  if (userAccessStep === 'initial') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Utilizador Encontrado</CardTitle>
            <p className="text-center text-sm text-gray-600">
              {phoneNumber} - {personalData.firstName} {personalData.lastName}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={sendDataAccessSms}
              className="w-full"
            >
              <User className="w-4 h-4 mr-2" />
              Gerir Perfil do Utilizador
            </Button>
            <Button 
              onClick={() => setShowUserAccessManagement(true)}
              className="w-full"
              variant="outline"
            >
              <Shield className="w-4 h-4 mr-2" />
              Gerir Acesso
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Data access verification
  if (userAccessStep === 'data-access') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Código de Verificação</CardTitle>
            <p className="text-center text-sm text-gray-600">
              ID do titular: {personalData.idNumber}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dataAccessCode">Código SMS</Label>
              <Input
                id="dataAccessCode"
                value={dataAccessCode}
                onChange={(e) => setDataAccessCode(e.target.value)}
                placeholder="Introduza o código de 6 dígitos"
                maxLength={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="idVerification" 
                checked={idVerificationChecked}
                onCheckedChange={(checked) => setIdVerificationChecked(checked === true)}
              />
              <Label htmlFor="idVerification" className="text-sm">
                Confirmei a identidade do titular comparando com o documento de identificação
              </Label>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setUserAccessStep('initial')}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                onClick={verifyDataAccess}
                disabled={!dataAccessCode || !idVerificationChecked}
                className="flex-1"
              >
                Verificar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* User Access Management Modal - Always available */}
      <Dialog open={showUserAccessManagement} onOpenChange={setShowUserAccessManagement}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gestão de Acesso do Utilizador</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* User Status Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Estado da Conta</h3>
              <div>
                <Label>Estado Atual</Label>
                <Select 
                  value={userManagementData.status} 
                  onValueChange={(value) => setUserManagementData({...userManagementData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Ativo</SelectItem>
                    <SelectItem value="FROZEN">Congelado</SelectItem>
                    <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                    <SelectItem value="CLOSED">Fechado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PIN Reset */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Gestão de PIN</h3>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setUserManagementData({...userManagementData, pinResetRequested: true});
                    toast({
                      title: "PIN resetado",
                      description: "PIN do utilizador foi resetado com sucesso",
                    });
                  }}
                >
                  Resetar PIN
                </Button>
                {userManagementData.pinResetRequested && (
                  <span className="text-green-600 text-sm">✓ PIN resetado</span>
                )}
              </div>
            </div>

            {/* Access History */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Histórico de Acessos</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="space-y-2 p-4 max-h-64 overflow-y-auto">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Login via App Mobile</p>
                      <p className="text-xs text-gray-500">19/01/2024 - 14:32</p>
                    </div>
                    <span className="text-green-600 text-xs">Sucesso</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Login via Web Portal</p>
                      <p className="text-xs text-gray-500">18/01/2024 - 09:45</p>
                    </div>
                    <span className="text-green-600 text-xs">Sucesso</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Tentativa de login via App Mobile</p>
                      <p className="text-xs text-gray-500">17/01/2024 - 22:15</p>
                    </div>
                    <span className="text-red-600 text-xs">Falhado</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="text-sm font-medium">Login via USSD</p>
                      <p className="text-xs text-gray-500">17/01/2024 - 16:20</p>
                    </div>
                    <span className="text-green-600 text-xs">Sucesso</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="text-sm font-medium">Login via App Mobile</p>
                      <p className="text-xs text-gray-500">16/01/2024 - 11:30</p>
                    </div>
                    <span className="text-green-600 text-xs">Sucesso</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowUserAccessManagement(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  setPersonalData({...personalData, status: userManagementData.status});
                  toast({
                    title: "Alterações guardadas",
                    description: "Estado do utilizador atualizado com sucesso",
                  });
                  setShowUserAccessManagement(false);
                }}
                className="flex-1"
              >
                Guardar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50">
        {/* Operation Code Modal */}
        {showOperationCode && (
          <Dialog open={showOperationCode} onOpenChange={setShowOperationCode}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Código de Operação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Introduza o código de operação enviado para {phoneNumber}
                </p>
                <Input
                  value={operationCode}
                  onChange={(e) => setOperationCode(e.target.value)}
                  placeholder="Código de 6 dígitos"
                  maxLength={6}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowOperationCode(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button onClick={verifyOperationCode} className="flex-1">
                    Verificar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Utilizador</h1>
              <p className="text-sm text-gray-500">
                Telefone: {phoneNumber} | ID: {personalData.idNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Detalhes do Utilizador</h2>
          <Button 
            variant="outline"
            onClick={() => setShowUserAccessManagement(true)}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Gerir Acesso
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Perfil Pessoal
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Perfis Comerciais
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Contas
            </TabsTrigger>
          </TabsList>

          {/* Personal Profile Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Perfil Pessoal
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(personalData.status)}`}>
                      {getStatusText(personalData.status)}
                    </span>
                    {personalData.status !== 'PENDING_KYC' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingPersonal(!editingPersonal)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        {editingPersonal ? 'Cancelar' : 'Editar'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Primeiro Nome</Label>
                    <Input
                      id="firstName"
                      value={personalData.firstName}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Nome do Meio</Label>
                    <Input
                      id="middleName"
                      value={personalData.middleName}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, middleName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Último Nome</Label>
                    <Input
                      id="lastName"
                      value={personalData.lastName}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="idNumber">Número de Identificação</Label>
                    <Input
                      id="idNumber"
                      value={personalData.idNumber}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, idNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nacionalidade</Label>
                    <Select value={personalData.nationality} disabled={!editingPersonal} onValueChange={(value) => setPersonalData({...personalData, nationality: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STP">São Tomé e Príncipe</SelectItem>
                        <SelectItem value="AGO">Angola</SelectItem>
                        <SelectItem value="PRT">Portugal</SelectItem>
                        <SelectItem value="BRA">Brasil</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="civilStatus">Estado Civil</Label>
                    <Select value={personalData.civilStatus} disabled={!editingPersonal} onValueChange={(value) => setPersonalData({...personalData, civilStatus: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solteiro">Solteiro</SelectItem>
                        <SelectItem value="casado">Casado</SelectItem>
                        <SelectItem value="divorciado">Divorciado</SelectItem>
                        <SelectItem value="viuvo">Viúvo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalData.dateOfBirth}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Data de Validade do Documento</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={personalData.expiryDate}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, expiryDate: e.target.value})}
                    />
                  </div>
                   <div>
                     <Label htmlFor="nif">NIF (Opcional)</Label>
                     <Input
                       id="nif"
                       value={personalData.nif || ''}
                       disabled={!editingPersonal}
                       onChange={(e) => setPersonalData({...personalData, nif: e.target.value})}
                     />
                   </div>
                   <div>
                     <Label htmlFor="alternativePhone">Telefone Alternativo</Label>
                     <Input
                       id="alternativePhone"
                       value={personalData.alternativePhone || ''}
                       disabled={!editingPersonal}
                       onChange={(e) => setPersonalData({...personalData, alternativePhone: e.target.value})}
                     />
                   </div>
                </div>

                {editingPersonal && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Foto do Documento (Frente)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Clique para carregar imagem</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Foto do Documento (Verso)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Clique para carregar imagem</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Foto do Contrato</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Clique para carregar contrato</p>
                      </div>
                    </div>

                    {/* SMS Verification */}
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-2">Verificação SMS necessária para guardar alterações</p>
                      {smsStep === 'send' && (
                        <Button size="sm" onClick={sendSms}>
                          <Smartphone className="w-4 h-4 mr-1" />
                          Enviar SMS
                        </Button>
                      )}
                      {smsStep === 'verify' && (
                        <div className="space-y-2">
                          <Input
                            placeholder="Código SMS"
                            value={smsCode}
                            onChange={(e) => setSmsCode(e.target.value)}
                            maxLength={6}
                          />
                          <Button size="sm" onClick={verifySms}>
                            Verificar SMS
                          </Button>
                        </div>
                      )}
                      {smsStep === 'verified' && (
                        <div className="space-y-2">
                          <p className="text-green-600 text-sm">✓ SMS verificado</p>
                          <Button onClick={savePersonalProfile}>
                            Guardar Perfil
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Profiles Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Perfis Comerciais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessProfiles.map((business) => (
                    <Dialog key={business.id}>
                      <DialogTrigger asChild>
                        <Card className="p-4 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium">{business.businessName}</h3>
                              <p className="text-sm text-gray-500">{business.businessType}</p>
                              <p className="text-sm text-gray-500">{business.address}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(business.status)}`}>
                                  {getStatusText(business.status)}
                                </span>
                              </div>
                            </div>
                            <Edit className="w-4 h-4 text-gray-400" />
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Perfil Comercial</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome do Negócio</Label>
                            <Input value={business.businessName} />
                          </div>
                           <div>
                             <Label>Tipo de Negócio</Label>
                             <div className="flex gap-2">
                               <Select value={business.businessType} onValueChange={() => {}}>
                                 <SelectTrigger className="flex-1">
                                   <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                   {businessTypes.map(type => (
                                     <SelectItem key={type} value={type}>{type}</SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                               {business.businessType === 'Outro' && (
                                 <Input 
                                   placeholder="Especificar tipo"
                                   className="flex-1"
                                 />
                               )}
                             </div>
                           </div>
                           <div>
                             <Label>Tamanho do Negócio</Label>
                             <Select value={business.businessSize || 'Micro Empresa'}>
                               <SelectTrigger>
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                 {businessSizes.map((size) => (
                                   <SelectItem key={size} value={size}>{size}</SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           </div>
                          <div>
                            <Label>NIF</Label>
                            <Input value={business.taxId} />
                          </div>
                          <div>
                            <Label>Endereço</Label>
                            <Input value={business.address} />
                          </div>
                          <div>
                            <Label>Coordenadas GPS</Label>
                            <div className="flex items-center gap-2">
                              <Input value={business.gpsCoordinates} readOnly />
                              <MapPin className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Checkbox 
                                id={`location-${business.id}`}
                                onCheckedChange={(checked) => console.log('Location checkbox:', checked)}
                              />
                              <Label htmlFor={`location-${business.id}`} className="text-sm">
                                Esta é a localização real do negócio
                              </Label>
                            </div>
                          </div>
                          <div>
                            <Label>Descrição</Label>
                            <Textarea value={business.description} />
                          </div>
                          
                          {/* SMS Verification Section */}
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-2">Verificação SMS para guardar alterações</p>
                            {businessSmsStep[business.id] !== 'verify' && businessSmsStep[business.id] !== 'verified' && (
                              <Button size="sm" onClick={() => sendBusinessSms(business.id)}>
                                <Smartphone className="w-4 h-4 mr-1" />
                                Enviar SMS
                              </Button>
                            )}
                            {businessSmsStep[business.id] === 'verify' && (
                              <div className="space-y-2">
                                <Input
                                  placeholder="Código SMS"
                                  value={businessSmsCode}
                                  onChange={(e) => setBusinessSmsCode(e.target.value)}
                                  maxLength={6}
                                />
                                <Button size="sm" onClick={() => verifyBusinessSms(business.id)}>
                                  Verificar SMS
                                </Button>
                              </div>
                            )}
                            {businessSmsStep[business.id] === 'verified' && (
                              <p className="text-green-600 text-sm">✓ SMS verificado</p>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => {
                              setBusinessSmsStep(prev => ({...prev, [business.id]: 'send'}));
                              setBusinessSmsCode('');
                            }}>
                              Cancelar
                            </Button>
                            <Button className="flex-1" onClick={() => {
                              toast({
                                title: "Perfil atualizado",
                                description: "Dados do perfil comercial atualizados com sucesso",
                              });
                              setBusinessSmsStep(prev => ({...prev, [business.id]: 'send'}));
                              setBusinessSmsCode('');
                            }}>
                              Guardar Alterações
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}

                  {/* Add Business Button */}
                  <Dialog open={showNewBusinessForm} onOpenChange={setShowNewBusinessForm}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full border-dashed"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Perfil Comercial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Perfil Comercial</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Nome do Negócio</Label>
                          <Input
                            value={newBusinessData.businessName}
                            onChange={(e) => setNewBusinessData({...newBusinessData, businessName: e.target.value})}
                          />
                        </div>
                         <div>
                           <Label>Tipo de Negócio</Label>
                           <div className="flex gap-2">
                             <Select 
                               value={newBusinessData.businessType} 
                               onValueChange={(value) => setNewBusinessData({...newBusinessData, businessType: value})}
                             >
                               <SelectTrigger className="flex-1">
                                 <SelectValue placeholder="Selecione o tipo" />
                               </SelectTrigger>
                               <SelectContent>
                                 {businessTypes.map(type => (
                                   <SelectItem key={type} value={type}>{type}</SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                             {newBusinessData.businessType === 'Outro' && (
                               <Input
                                 value={newBusinessData.otherBusinessType}
                                 onChange={(e) => setNewBusinessData({...newBusinessData, otherBusinessType: e.target.value})}
                                 placeholder="Especificar tipo"
                                 className="flex-1"
                               />
                             )}
                           </div>
                         </div>
                         <div>
                           <Label>Tamanho do Negócio</Label>
                           <Select 
                             value={newBusinessData.businessSize} 
                             onValueChange={(value) => setNewBusinessData({...newBusinessData, businessSize: value})}
                           >
                             <SelectTrigger>
                               <SelectValue placeholder="Selecione o tamanho" />
                             </SelectTrigger>
                             <SelectContent>
                               {businessSizes.map(size => (
                                 <SelectItem key={size} value={size}>{size}</SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                        <div>
                          <Label>Distrito</Label>
                          <Select 
                            value={newBusinessData.district} 
                            onValueChange={(value) => setNewBusinessData({...newBusinessData, district: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o distrito" />
                            </SelectTrigger>
                            <SelectContent>
                              {districts.map(district => (
                                <SelectItem key={district} value={district}>{district}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Localização</Label>
                          <Input
                            value={newBusinessData.location}
                            onChange={(e) => setNewBusinessData({...newBusinessData, location: e.target.value})}
                            placeholder="Rua, número, bairro..."
                          />
                        </div>
                        <div>
                          <Label>Coordenadas GPS</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newBusinessData.gpsCoordinates}
                              readOnly
                              placeholder="Latitude, Longitude"
                            />
                            <Button type="button" onClick={getCurrentLocation} size="sm">
                              <MapPin className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Checkbox 
                              id="isOwnLocation" 
                              checked={newBusinessData.isOwnLocation}
                              onCheckedChange={(checked) => setNewBusinessData({...newBusinessData, isOwnLocation: checked === true})}
                            />
                            <Label htmlFor="isOwnLocation" className="text-sm">
                              Esta é a localização real do negócio
                            </Label>
                          </div>
                        </div>
                        <div>
                          <Label>Descrição</Label>
                          <Textarea
                            value={newBusinessData.description}
                            onChange={(e) => setNewBusinessData({...newBusinessData, description: e.target.value})}
                            placeholder="Descrição do negócio..."
                          />
                        </div>
                        
                        {/* SMS Verification Section */}
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-2">Verificação SMS para criar perfil</p>
                          {smsStep !== 'verify' && smsStep !== 'verified' && (
                            <Button size="sm" onClick={sendSms}>
                              <Smartphone className="w-4 h-4 mr-1" />
                              Enviar SMS
                            </Button>
                          )}
                          {smsStep === 'verify' && (
                            <div className="space-y-2">
                              <Input
                                placeholder="Código SMS"
                                value={smsCode}
                                onChange={(e) => setSmsCode(e.target.value)}
                                maxLength={6}
                              />
                              <Button size="sm" onClick={verifySms}>
                                Verificar SMS
                              </Button>
                            </div>
                          )}
                          {smsStep === 'verified' && (
                            <p className="text-green-600 text-sm">✓ SMS verificado</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowNewBusinessForm(false)} className="flex-1">
                            Cancelar
                          </Button>
                          <Button onClick={saveNewBusiness} className="flex-1">
                            Criar Perfil
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Contas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   {accounts.map((account) => (
                     <Card key={account.id} className="p-4">
                       <div className="flex items-center justify-between">
                         <div className="flex-1">
                           <div className="flex items-center gap-2">
                             <h3 className="font-medium">{account.accountType}</h3>
                             <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(account.status)}`}>
                               {getStatusText(account.status)}
                             </span>
                           </div>
                           <p className="text-sm text-gray-500">Conta: {account.accountNumber}</p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-lg font-semibold">{account.balance}</span>
                           </div>
                           <div className="mt-2 text-xs text-gray-500">
                             <div>Limite Diário Envio: {account.limits.dailySend}</div>
                             <div>Limite Diário Recepção: {account.limits.dailyReceive}</div>
                           </div>
                         </div>
                         <div className="flex gap-2">
                           <Dialog>
                             <DialogTrigger asChild>
                               <Button variant="outline" size="sm">
                                 <History className="w-4 h-4 mr-1" />
                                 Ver Histórico
                               </Button>
                             </DialogTrigger>
                             <DialogContent className="max-w-2xl">
                               <DialogHeader>
                                 <DialogTitle>Histórico de Transações - {account.accountNumber}</DialogTitle>
                               </DialogHeader>
                               <div className="space-y-4">
                                 <div className="space-y-2 max-h-96 overflow-y-auto">
                                   {account.transactions.map((transaction) => (
                                     <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                       <div>
                                         <p className="text-sm font-medium">{transaction.description}</p>
                                         <p className="text-xs text-gray-500">{transaction.date}</p>
                                       </div>
                                       <span className={`font-medium ${transaction.type === 'Recebido' ? 'text-green-600' : 'text-red-600'}`}>
                                         {transaction.amount}
                                       </span>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             </DialogContent>
                           </Dialog>
                           
                           <Dialog>
                             <DialogTrigger asChild>
                               <Button variant="outline" size="sm">
                                 <Edit className="w-4 h-4 mr-1" />
                                 Gerir Conta
                               </Button>
                             </DialogTrigger>
                             <DialogContent className="max-w-2xl">
                               <DialogHeader>
                                 <DialogTitle>Gerir Conta - {account.accountNumber}</DialogTitle>
                               </DialogHeader>
                               <div className="space-y-4">
                                 <div>
                                   <h4 className="font-medium mb-2">Informações da Conta</h4>
                                   <div className="grid grid-cols-2 gap-4">
                                     <div>
                                       <Label>Tipo de Conta</Label>
                                       <Input value={account.accountType} readOnly />
                                     </div>
                                     <div>
                                       <Label>Saldo Atual</Label>
                                       <Input value={account.balance} readOnly />
                                     </div>
                                     <div>
                                       <Label>Estado da Conta</Label>
                                       <Select 
                                         value={accountManagementData[account.id]?.status || account.status}
                                         onValueChange={(value) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], status: value }
                                         }))}
                                       >
                                         <SelectTrigger>
                                           <SelectValue />
                                         </SelectTrigger>
                                         <SelectContent>
                                           <SelectItem value="ACTIVE">Ativo</SelectItem>
                                           <SelectItem value="FROZEN">Congelado</SelectItem>
                                           <SelectItem value="CLOSED">Fechado</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </div>
                                   </div>
                                 </div>

                                 <div>
                                   <h4 className="font-medium mb-2">Limites da Conta</h4>
                                   <div className="grid grid-cols-2 gap-4">
                                     <div>
                                       <Label>Envio Diário</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.dailySend || account.limits.dailySend}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], dailySend: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div>
                                       <Label>Recepção Diária</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.dailyReceive || account.limits.dailyReceive}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], dailyReceive: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div>
                                       <Label>Envio Mensal</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.monthlySend || account.limits.monthlySend}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], monthlySend: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div>
                                       <Label>Recepção Mensal</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.monthlyReceive || account.limits.monthlyReceive}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], monthlyReceive: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div>
                                       <Label>Por Transação (Envio)</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.transactionSend || account.limits.transactionSend}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], transactionSend: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div>
                                       <Label>Por Transação (Recepção)</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.transactionReceive || account.limits.transactionReceive}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], transactionReceive: e.target.value }
                                         }))}
                                       />
                                     </div>
                                     <div className="col-span-2">
                                       <Label>Saldo Máximo</Label>
                                       <Input 
                                         value={accountManagementData[account.id]?.maxBalance || account.limits.maxBalance}
                                         onChange={(e) => setAccountManagementData(prev => ({
                                           ...prev,
                                           [account.id]: { ...prev[account.id], maxBalance: e.target.value }
                                         }))}
                                       />
                                     </div>
                                   </div>
                                 </div>

                                 {/* SMS Verification for account operations */}
                                 <div className="bg-yellow-50 p-3 rounded-lg">
                                   <p className="text-sm font-medium mb-2">Verificação SMS para guardar alterações</p>
                                   {accountSmsStep[account.id] !== 'verify' && accountSmsStep[account.id] !== 'verified' && (
                                     <Button size="sm" onClick={() => sendAccountSms(account.id)}>
                                       <Smartphone className="w-4 h-4 mr-1" />
                                       Enviar SMS
                                     </Button>
                                   )}
                                   {accountSmsStep[account.id] === 'verify' && (
                                     <div className="space-y-2">
                                       <Input
                                         placeholder="Código SMS"
                                         value={accountSmsCode}
                                         onChange={(e) => setAccountSmsCode(e.target.value)}
                                         maxLength={6}
                                       />
                                       <Button size="sm" onClick={() => verifyAccountSms(account.id)}>
                                         Verificar SMS
                                       </Button>
                                     </div>
                                   )}
                                   {accountSmsStep[account.id] === 'verified' && (
                                     <p className="text-green-600 text-sm">✓ SMS verificado</p>
                                   )}
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex gap-2">
                                   <Button variant="outline" className="flex-1" onClick={() => {
                                     setAccountSmsStep(prev => ({...prev, [account.id]: 'send'}));
                                     setAccountSmsCode('');
                                     setAccountManagementData(prev => ({...prev, [account.id]: {}}));
                                   }}>
                                     Cancelar
                                   </Button>
                                   <Button className="flex-1" onClick={() => {
                                     toast({
                                       title: "Conta atualizada",
                                       description: "Dados da conta atualizados com sucesso",
                                     });
                                     setAccountSmsStep(prev => ({...prev, [account.id]: 'send'}));
                                     setAccountSmsCode('');
                                     setAccountManagementData(prev => ({...prev, [account.id]: {}}));
                                   }}>
                                     Guardar Alterações
                                   </Button>
                                 </div>
                               </div>
                             </DialogContent>
                           </Dialog>
                         </div>
                       </div>
                     </Card>
                   ))}

                  {/* Add Account Button */}
                  <Dialog open={showCreateAccountModal} onOpenChange={setShowCreateAccountModal}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full border-dashed"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Nova Conta Comercial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nova Conta Comercial</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Nome da Conta Comercial</Label>
                          <Input 
                            value={newAccountName} 
                            onChange={(e) => setNewAccountName(e.target.value)}
                            placeholder="Ex: Conta Comercial - Loja ABC"
                          />
                        </div>
                        <div>
                          <Label>Perfil Comercial</Label>
                          <Select 
                            value={selectedBusinessProfile} 
                            onValueChange={setSelectedBusinessProfile}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o perfil comercial" />
                            </SelectTrigger>
                            <SelectContent>
                              {businessProfiles.map(profile => (
                                <SelectItem key={profile.id} value={profile.id}>
                                  {profile.businessName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* SMS Verification Section */}
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-2">Verificação SMS para criar conta</p>
                          {createAccountSmsStep !== 'verify' && createAccountSmsStep !== 'verified' && (
                            <Button size="sm" onClick={sendCreateAccountSms}>
                              <Smartphone className="w-4 h-4 mr-1" />
                              Enviar SMS
                            </Button>
                          )}
                          {createAccountSmsStep === 'verify' && (
                            <div className="space-y-2">
                              <Input
                                placeholder="Código SMS"
                                value={createAccountSmsCode}
                                onChange={(e) => setCreateAccountSmsCode(e.target.value)}
                                maxLength={6}
                              />
                              <Button size="sm" onClick={verifyCreateAccountSms}>
                                Verificar SMS
                              </Button>
                            </div>
                          )}
                          {createAccountSmsStep === 'verified' && (
                            <p className="text-green-600 text-sm">✓ SMS verificado</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => {
                            setShowCreateAccountModal(false);
                            setCreateAccountSmsStep('send');
                            setCreateAccountSmsCode('');
                            setNewAccountName('');
                            setSelectedBusinessProfile('');
                          }} className="flex-1">
                            Cancelar
                          </Button>
                          <Button onClick={createNewAccount} className="flex-1">
                            Criar Conta
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );

export default UserAccountManagementScreen;