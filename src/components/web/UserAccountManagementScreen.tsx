import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Building, Wallet, Plus, Edit, Eye, EyeOff, Shield, Send, Upload, Smartphone, FileText, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserAccountManagementScreenProps {
  onBack: () => void;
  phoneNumber: string;
}

const UserAccountManagementScreen = ({ onBack, phoneNumber }: UserAccountManagementScreenProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user data - in real app would come from API
  const mockUserData = {
    personal: {
      firstName: 'Maria',
      middleName: 'dos Santos',
      lastName: 'Silva',
      idNumber: '1234567890',
      nif: 'NIF123456789',
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
        accountNumber: 'ACC-001-' + phoneNumber.replace('+', ''),
        accountType: 'Conta Pessoal',
        balance: '45,678 STN',
        status: 'active',
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
        accountNumber: 'ACC-002-' + phoneNumber.replace('+', ''),
        accountType: 'Conta Comercial - Loja da Maria',
        balance: '123,456 STN',
        status: 'active',
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
  const [businessSmsStep, setBusinessSmsStep] = useState<{[key: string]: 'send' | 'verify' | 'verified'}>({});
  const [businessSmsCode, setBusinessSmsCode] = useState('');
  const [newBusinessData, setNewBusinessData] = useState({
    businessName: '',
    businessType: '',
    otherBusinessType: '',
    district: '',
    location: '',
    gpsCoordinates: '',
    description: ''
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
          setNewBusinessData({...newBusinessData, gpsCoordinates: coords});
          toast({
            title: "Localização obtida",
            description: "Coordenadas GPS atualizadas automaticamente",
          });
        },
        () => {
          setNewBusinessData({...newBusinessData, gpsCoordinates: '0.3440, 6.7310'}); // Default São Tomé coordinates
          toast({
            title: "Localização padrão",
            description: "Não foi possível obter a localização atual. Usando coordenadas de São Tomé.",
          });
        }
      );
    } else {
      setNewBusinessData({...newBusinessData, gpsCoordinates: '0.3440, 6.7310'});
      toast({
        title: "Localização padrão",
        description: "Geolocalização não disponível. Usando coordenadas de São Tomé.",
      });
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
    if (smsCode === '123456') { // Mock SMS verification
      setSmsStep('verified');
      toast({
        title: "SMS verificado",
        description: "Perfil pessoal verificado com sucesso.",
      });
    } else {
      toast({
        title: "Código incorreto",
        description: "Código SMS inválido. Tente novamente.",
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
    if (businessSmsCode === '123456') {
      setBusinessSmsStep(prev => ({...prev, [businessId]: 'verified'}));
      toast({
        title: "SMS verificado",
        description: "Perfil comercial verificado com sucesso.",
      });
    } else {
      toast({
        title: "Código incorreto",
        description: "Código SMS inválido. Tente novamente.",
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

    setEditingPersonal(false);
    toast({
      title: "Perfil atualizado",
      description: "Dados pessoais atualizados com sucesso",
    });
  };

  const handleTransferOnBehalf = (accountId: string) => {
    if (verificationCode !== '123456') {
      toast({
        title: "Código de verificação necessário",
        description: "Introduza o código de verificação para transferências",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Transferência em nome do titular será implementada em breve",
    });
  };

  const businessTypes = [
    'Comércio', 'Restauração', 'Serviços', 'Agricultura', 'Pesca', 'Turismo', 'Tecnologia', 'Outro'
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
      otherBusinessType: '',
      district: '',
      location: '',
      gpsCoordinates: '',
      description: ''
    });

    toast({
      title: "Perfil comercial criado",
      description: "Novo perfil criado com sucesso. Estado: Pendente",
    });
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
      case 'CLOSED':
        return 'Fechado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                Telefone: {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
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
                     <Label htmlFor="expiryDate">Data de Expiração do Documento</Label>
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
                        placeholder="Número de Identificação Fiscal"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={personalData.status} 
                        disabled={!editingPersonal || personalData.status === 'PENDING_KYC'} 
                        onValueChange={(value) => setPersonalData({...personalData, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Ativo</SelectItem>
                          <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                          <SelectItem value="PENDING_KYC">Pendente KYC</SelectItem>
                          <SelectItem value="CLOSED">Fechado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="mt-6">
                    <h3 className="text-md font-semibold mb-4">Documentos de Identificação</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label>Foto do Documento (Frente)</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Clique para fazer upload da frente do documento
                          </p>
                          <input type="file" className="hidden" accept="image/*" />
                        </div>
                      </div>
                      <div>
                        <Label>Foto do Documento (Verso)</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Clique para fazer upload do verso do documento
                          </p>
                          <input type="file" className="hidden" accept="image/*" />
                        </div>
                      </div>
                      <div>
                        <Label>Foto do Contrato</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <FileText className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Clique para fazer upload do contrato
                          </p>
                          <input type="file" className="hidden" accept="image/*,application/pdf" />
                        </div>
                      </div>
                    </div>
                  </div>

                 {/* Código de Verificação */}
                 <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                   <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                     <Smartphone className="w-5 h-5" />
                     Verificação por SMS
                   </h3>
                   
                   {smsStep === 'send' && (
                     <div className="space-y-3">
                       <p className="text-sm text-gray-600">
                         Para verificar a identidade, será enviado um código SMS para {phoneNumber}
                       </p>
                       <Button onClick={sendSms} className="flex items-center gap-2">
                         <Send className="w-4 h-4" />
                         Enviar Código SMS
                       </Button>
                     </div>
                   )}

                   {smsStep === 'verify' && (
                     <div className="space-y-3">
                       <p className="text-sm text-gray-600">
                         Código enviado para {phoneNumber}. Introduza o código recebido:
                       </p>
                       <div className="flex gap-2">
                         <Input
                           type="text"
                           placeholder="Código SMS"
                           value={smsCode}
                           onChange={(e) => setSmsCode(e.target.value)}
                           className="bg-white"
                         />
                         <Button onClick={verifySms}>
                           Verificar
                         </Button>
                       </div>
                     </div>
                   )}

                   {smsStep === 'verified' && (
                     <div className="flex items-center gap-2 text-green-600">
                       <Shield className="w-5 h-5" />
                       <span className="text-sm font-medium">SMS verificado com sucesso</span>
                     </div>
                   )}
                 </div>

                 {editingPersonal && (
                   <div className="flex gap-2 pt-4">
                     <Button onClick={savePersonalProfile}>
                       Guardar Alterações
                     </Button>
                     <Button variant="outline" onClick={() => setEditingPersonal(false)}>
                       Cancelar
                     </Button>
                   </div>
                 )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Profiles Tab */}
          <TabsContent value="business" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Perfis Comerciais</h2>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setShowNewBusinessForm(true)}
              >
                <Plus className="w-4 h-4" />
                Criar Perfil Comercial
              </Button>
            </div>

            {/* New Business Form */}
            {showNewBusinessForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Novo Perfil Comercial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Nome do Negócio *</Label>
                      <Input
                        id="businessName"
                        value={newBusinessData.businessName}
                        onChange={(e) => setNewBusinessData({...newBusinessData, businessName: e.target.value})}
                        placeholder="Ex: Loja da Maria"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Tipo de Negócio *</Label>
                      <Select value={newBusinessData.businessType} onValueChange={(value) => setNewBusinessData({...newBusinessData, businessType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {newBusinessData.businessType === 'Outro' && (
                      <div className="md:col-span-2">
                        <Label htmlFor="otherBusinessType">Especificar Tipo</Label>
                        <Input
                          id="otherBusinessType"
                          value={newBusinessData.otherBusinessType}
                          onChange={(e) => setNewBusinessData({...newBusinessData, otherBusinessType: e.target.value})}
                          placeholder="Especifique o tipo de negócio"
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="district">Distrito *</Label>
                      <Select value={newBusinessData.district} onValueChange={(value) => setNewBusinessData({...newBusinessData, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar distrito" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        value={newBusinessData.location}
                        onChange={(e) => setNewBusinessData({...newBusinessData, location: e.target.value})}
                        placeholder="Ex: Rua Principal, 123"
                      />
                    </div>
                     <div>
                       <Label htmlFor="gpsCoordinates">Coordenadas GPS</Label>
                       <div className="flex gap-2">
                         <Input
                           id="gpsCoordinates"
                           value={newBusinessData.gpsCoordinates}
                           disabled
                           placeholder="Ex: 0.3365° N, 6.7273° E"
                         />
                         <Button 
                           type="button"
                           variant="outline"
                           onClick={getCurrentLocation}
                         >
                           Obter Localização
                         </Button>
                       </div>
                     </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newBusinessData.description}
                        onChange={(e) => setNewBusinessData({...newBusinessData, description: e.target.value})}
                        placeholder="Descreva o seu negócio..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={saveNewBusiness}>
                      Criar Perfil
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewBusinessForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {businessProfiles.map((business) => (
                <Card key={business.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        {business.businessName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(business.status)}`}>
                          {getStatusText(business.status)}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingBusiness(editingBusiness === business.id ? null : business.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {editingBusiness === business.id ? 'Cancelar' : 'Editar'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Tipo de Negócio</Label>
                        {editingBusiness === business.id ? (
                          <Select value={business.businessType} onValueChange={(value) => {
                            const updated = businessProfiles.map(b => 
                              b.id === business.id ? {...b, businessType: value} : b
                            );
                            setBusinessProfiles(updated);
                          }}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {businessTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm">{business.businessType}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">NIF</Label>
                        {editingBusiness === business.id ? (
                          <Input
                            value={business.taxId}
                            onChange={(e) => {
                              const updated = businessProfiles.map(b => 
                                b.id === business.id ? {...b, taxId: e.target.value} : b
                              );
                              setBusinessProfiles(updated);
                            }}
                          />
                        ) : (
                          <p className="text-sm">{business.taxId}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-600">Endereço</Label>
                        {editingBusiness === business.id ? (
                          <Input 
                            value={business.address}
                            onChange={(e) => {
                              const updated = businessProfiles.map(b => 
                                b.id === business.id ? {...b, address: e.target.value} : b
                              );
                              setBusinessProfiles(updated);
                            }}
                          />
                        ) : (
                          <p className="text-sm">{business.address}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Coordenadas GPS</Label>
                        <p className="text-sm font-mono">{business.gpsCoordinates}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-600">Descrição</Label>
                        {editingBusiness === business.id ? (
                          <Textarea 
                            value={business.description}
                            onChange={(e) => {
                              const updated = businessProfiles.map(b => 
                                b.id === business.id ? {...b, description: e.target.value} : b
                              );
                              setBusinessProfiles(updated);
                            }}
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm">{business.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* SMS Verification for Business Profile */}
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Verificação SMS do Perfil Comercial
                      </h4>
                      
                      {!businessSmsStep[business.id] && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-600">
                            Para verificar este perfil comercial, será enviado um código SMS para {phoneNumber}
                          </p>
                          <Button 
                            size="sm"
                            onClick={() => sendBusinessSms(business.id)} 
                            className="flex items-center gap-2"
                          >
                            <Send className="w-3 h-3" />
                            Enviar Código SMS
                          </Button>
                        </div>
                      )}

                      {businessSmsStep[business.id] === 'verify' && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-600">
                            Código enviado para {phoneNumber}. Introduza o código recebido:
                          </p>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Código SMS"
                              value={businessSmsCode}
                              onChange={(e) => setBusinessSmsCode(e.target.value)}
                              className="bg-white"
                            />
                            <Button size="sm" onClick={() => verifyBusinessSms(business.id)}>
                              Verificar
                            </Button>
                          </div>
                        </div>
                      )}

                      {businessSmsStep[business.id] === 'verified' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Shield className="w-4 h-4" />
                          <span className="text-xs font-medium">SMS verificado com sucesso</span>
                        </div>
                      )}
                    </div>

                    {editingBusiness === business.id && (
                      <div className="flex gap-2 pt-4">
                        <Button onClick={() => {
                          if (businessSmsStep[business.id] !== 'verified') {
                            toast({
                              title: "Verificação SMS necessária",
                              description: "Por favor, complete a verificação SMS antes de guardar",
                              variant: "destructive"
                            });
                            return;
                          }
                          setEditingBusiness(null);
                          toast({
                            title: "Perfil atualizado",
                            description: "Alterações guardadas com sucesso",
                          });
                        }}>
                          Guardar Alterações
                        </Button>
                        <Button variant="outline" onClick={() => setEditingBusiness(null)}>
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

            {/* Accounts Tab */}
            <TabsContent value="accounts" className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Código de Verificação para Transferências
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Para fazer transferências, introduza o código de verificação:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Código de verificação"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Hide verification section for accounts view */}
              {false && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Shield className="w-5 h-5" />
                    Código de Verificação Necessário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Enviar código SMS</Label>
                      <div className="flex gap-2 mt-1">
                        <Button 
                          variant="outline" 
                          onClick={sendSms}
                          className="flex items-center gap-2"
                        >
                          <Smartphone className="w-4 h-4" />
                          Enviar SMS para {phoneNumber}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Código de segurança do agente</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="password"
                          placeholder="Código de segurança"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="bg-white"
                        />
                        <Button onClick={() => {
                          if (verificationCode === '123456') {
                            toast({
                              title: "Código verificado",
                              description: "Acesso às contas autorizado",
                            });
                          } else {
                            toast({
                              title: "Código incorreto",
                              description: "Tente novamente",
                              variant: "destructive"
                            });
                          }
                        }}>
                          Verificar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-amber-700 mt-2">
                    É necessário código de verificação para aceder aos dados das contas
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Contas Digitais</h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Criar Nova Conta
              </Button>
            </div>

            {/* Account Details View */}
            {showAccountDetails && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Detalhes da Conta
                    </CardTitle>
                    <Button variant="outline" onClick={() => setShowAccountDetails(null)}>
                      Voltar à Lista
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const account = accounts.find(acc => acc.id === showAccountDetails);
                    if (!account) return null;

                    return (
                      <div className="space-y-6">
                        {/* Account Info */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Tipo de Conta</Label>
                            <p className="text-sm font-bold">{account.accountType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Número</Label>
                            <p className="text-sm font-mono">{account.accountNumber}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Saldo</Label>
                            <p className="text-sm font-bold text-green-600">{account.balance}</p>
                          </div>
                        </div>

                        {/* Limits Grid */}
                        <div>
                          <h3 className="text-md font-semibold mb-3">Limites de Transação</h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Envio Diário</Label>
                              <p className="text-sm font-medium">{account.limits.dailySend}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Recebimento Diário</Label>
                              <p className="text-sm font-medium">{account.limits.dailyReceive}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Envio Mensal</Label>
                              <p className="text-sm font-medium">{account.limits.monthlySend}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Recebimento Mensal</Label>
                              <p className="text-sm font-medium">{account.limits.monthlyReceive}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Transação Envio</Label>
                              <p className="text-sm font-medium">{account.limits.transactionSend}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Transação Recebimento</Label>
                              <p className="text-sm font-medium">{account.limits.transactionReceive}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <Label className="text-xs text-gray-500">Saldo Máximo</Label>
                              <p className="text-sm font-medium">{account.limits.maxBalance}</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleTransferOnBehalf(account.id)}
                            className="flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Fazer Transferência
                          </Button>
                          <Button variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Editar Limites
                          </Button>
                        </div>

                        {/* Transactions */}
                        <div>
                          <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                            <History className="w-5 h-5" />
                            Últimas Transações
                          </h3>
                          <div className="space-y-2">
                            {account.transactions.map((transaction) => (
                              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <p className="text-sm font-medium">{transaction.description}</p>
                                  <p className="text-xs text-gray-500">{transaction.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className={`text-sm font-bold ${
                                    transaction.type === 'Recebido' ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {transaction.amount}
                                  </p>
                                  <p className="text-xs text-gray-500">{transaction.type}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Account List */}
            {!showAccountDetails && (
              <div className="grid gap-4">
                {accounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Wallet className="w-5 h-5" />
                          {account.accountType}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(account.status)}`}>
                            {getStatusText(account.status)}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowAccountDetails(account.id)}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTransferOnBehalf(account.id)}
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Transferir
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Número da Conta</Label>
                          <p className="text-sm font-mono">{account.accountNumber}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Saldo</Label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold">
                              {showBalance[account.id] ? account.balance : '****'}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBalanceVisibility(account.id)}
                            >
                              {showBalance[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Limite Envio Diário</Label>
                          <p className="text-sm">{account.limits.dailySend}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Limite Envio Mensal</Label>
                          <p className="text-sm">{account.limits.monthlySend}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAccountManagementScreen;