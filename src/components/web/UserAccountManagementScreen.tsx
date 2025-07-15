import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Building, Wallet, Plus, Edit, Eye, EyeOff, Shield, Send } from 'lucide-react';
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
      nationality: 'STP',
      dateOfBirth: '1985-03-15',
      expiryDate: '2030-03-15',
      civilStatus: 'casado',
      status: 'verified'
    },
    business: [
      {
        id: '1',
        businessName: 'Loja da Maria',
        businessType: 'Comércio Varejista',
        taxId: 'NIF123456789',
        address: 'Avenida Comercial, 456, São Tomé',
        description: 'Loja de produtos alimentares e utensílios domésticos',
        status: 'active'
      },
      {
        id: '2',
        businessName: 'Restaurante Sabores',
        businessType: 'Restauração',
        taxId: 'NIF987654321',
        address: 'Rua dos Sabores, 789, São Tomé',
        description: 'Restaurante de comida tradicional são-tomense',
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
          daily: '50,000 STN',
          monthly: '500,000 STN'
        }
      },
      {
        id: '2',
        accountNumber: 'ACC-002-' + phoneNumber.replace('+', ''),
        accountType: 'Conta Comercial - Loja da Maria',
        balance: '123,456 STN',
        status: 'active',
        limits: {
          daily: '200,000 STN',
          monthly: '2,000,000 STN'
        }
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
  const [isVerified, setIsVerified] = useState(false);
  const [showNewBusinessForm, setShowNewBusinessForm] = useState(false);
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
    if (!isVerified) {
      toast({
        title: "Código de verificação necessário",
        description: "Introduza o código de verificação para aceder aos dados da conta",
        variant: "destructive"
      });
      return;
    }
    setShowBalance(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const verifyAccess = () => {
    if (verificationCode === '1234') { // Mock verification
      setIsVerified(true);
      toast({
        title: "Acesso verificado",
        description: "Código correto. Pode agora aceder aos dados das carteiras.",
      });
    } else {
      toast({
        title: "Código incorreto",
        description: "Código de verificação inválido. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleTransferOnBehalf = (accountId: string) => {
    if (!isVerified) {
      toast({
        title: "Verificação necessária",
        description: "Código de verificação é obrigatório para transferências",
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
      case 'active':
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'verified':
        return 'Verificado';
      case 'pending':
        return 'Pendente';
      case 'suspended':
        return 'Suspenso';
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
              Carteiras
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPersonal(!editingPersonal)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {editingPersonal ? 'Cancelar' : 'Editar'}
                    </Button>
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
                </div>
                {editingPersonal && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => {
                      // Save changes logic here
                      setEditingPersonal(false);
                    }}>
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
                      <Input
                        id="gpsCoordinates"
                        value={newBusinessData.gpsCoordinates}
                        onChange={(e) => setNewBusinessData({...newBusinessData, gpsCoordinates: e.target.value})}
                        placeholder="Ex: 0.3365° N, 6.7273° E"
                      />
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
                        <p className="text-sm">{business.taxId}</p>
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
                    {editingBusiness === business.id && (
                      <div className="flex gap-2 pt-4">
                        <Button onClick={() => {
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

          {/* Wallets Tab */}
          <TabsContent value="accounts" className="space-y-6">
            {/* Verification Section */}
            {!isVerified && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Shield className="w-5 h-5" />
                    Código de Verificação Necessário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Código de segurança"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="bg-white"
                    />
                    <Button onClick={verifyAccess}>
                      Verificar
                    </Button>
                  </div>
                  <p className="text-sm text-amber-700 mt-2">
                    Introduza o código de verificação para aceder aos dados das carteiras
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Carteiras Digitais</h2>
              <Button className="flex items-center gap-2" disabled={!isVerified}>
                <Plus className="w-4 h-4" />
                Criar Nova Carteira
              </Button>
            </div>

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
                          onClick={() => handleTransferOnBehalf(account.id)}
                          disabled={!isVerified}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Transferir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingAccount(editingAccount === account.id ? null : account.id)}
                          disabled={!isVerified}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {editingAccount === account.id ? 'Cancelar' : 'Editar'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Número da Carteira</Label>
                        <p className="text-sm font-mono">{isVerified ? account.accountNumber : '****'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Saldo</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold">
                            {showBalance[account.id] && isVerified ? account.balance : '****'}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBalanceVisibility(account.id)}
                            disabled={!isVerified}
                          >
                            {showBalance[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Limite Diário</Label>
                        {editingAccount === account.id ? (
                          <Input 
                            value={account.limits.daily}
                            onChange={(e) => {
                              const updatedAccounts = accounts.map(acc => 
                                acc.id === account.id 
                                  ? {...acc, limits: {...acc.limits, daily: e.target.value}}
                                  : acc
                              );
                              setAccounts(updatedAccounts);
                            }}
                          />
                        ) : (
                          <p className="text-sm">{account.limits.daily}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Limite Mensal</Label>
                        {editingAccount === account.id ? (
                          <Input 
                            value={account.limits.monthly}
                            onChange={(e) => {
                              const updatedAccounts = accounts.map(acc => 
                                acc.id === account.id 
                                  ? {...acc, limits: {...acc.limits, monthly: e.target.value}}
                                  : acc
                              );
                              setAccounts(updatedAccounts);
                            }}
                          />
                        ) : (
                          <p className="text-sm">{account.limits.monthly}</p>
                        )}
                      </div>
                    </div>
                    {editingAccount === account.id && (
                      <div className="flex gap-2 pt-4">
                        <Button onClick={() => {
                          // Save changes logic here
                          setEditingAccount(null);
                        }}>
                          Guardar Alterações
                        </Button>
                        <Button variant="outline" onClick={() => setEditingAccount(null)}>
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAccountManagementScreen;