import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Building, CreditCard, Plus, Edit, Eye, EyeOff } from 'lucide-react';

interface UserAccountManagementScreenProps {
  onBack: () => void;
  phoneNumber: string;
}

const UserAccountManagementScreen = ({ onBack, phoneNumber }: UserAccountManagementScreenProps) => {
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user data - in real app would come from API
  const mockUserData = {
    personal: {
      fullName: 'Maria dos Santos Silva',
      email: 'maria.santos@email.com',
      dateOfBirth: '1985-03-15',
      idNumber: '1234567890',
      address: 'Rua Principal, 123, São Tomé',
      emergencyContact: '+239 991 9999',
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
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState<{[key: string]: boolean}>({});

  const toggleBalanceVisibility = (accountId: string) => {
    setShowBalance(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
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
              <CreditCard className="w-4 h-4" />
              Contas Bancárias
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
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={personalData.fullName}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalData.email}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                    />
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
                    <Label htmlFor="idNumber">Número de Identificação</Label>
                    <Input
                      id="idNumber"
                      value={personalData.idNumber}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, idNumber: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={personalData.address}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Contacto de Emergência</Label>
                    <Input
                      id="emergencyContact"
                      value={personalData.emergencyContact}
                      disabled={!editingPersonal}
                      onChange={(e) => setPersonalData({...personalData, emergencyContact: e.target.value})}
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
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Criar Perfil Comercial
              </Button>
            </div>

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
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Tipo de Negócio</Label>
                        <p className="text-sm">{business.businessType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">NIF</Label>
                        <p className="text-sm">{business.taxId}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-600">Endereço</Label>
                        <p className="text-sm">{business.address}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-600">Descrição</Label>
                        <p className="text-sm">{business.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bank Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Contas Bancárias</h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Criar Nova Conta
              </Button>
            </div>

            <div className="grid gap-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        {account.accountType}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(account.status)}`}>
                          {getStatusText(account.status)}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingAccount(editingAccount === account.id ? null : account.id)}
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