import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Phone, User, Settings, Shield, History, Save, X, Plus, Trash2, Eye, UserCog } from 'lucide-react';

interface UserAccountManagementScreenProps {
  onBack: () => void;
  phoneNumber: string;
}

const UserAccountManagementScreen = ({ onBack, phoneNumber }: UserAccountManagementScreenProps) => {
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [showCreateCommercialDialog, setShowCreateCommercialDialog] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showTransactionHistoryDialog, setShowTransactionHistoryDialog] = useState(false);
  const [showCodeVerification, setShowCodeVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAccount, setEditingAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [businessType, setBusinessType] = useState('');
  const [showOtherBusinessType, setShowOtherBusinessType] = useState(false);
  const [otherBusinessType, setOtherBusinessType] = useState('');

  const mockUserData = {
    name: 'Maria dos Santos',
    phone: searchPhoneNumber || phoneNumber,
    email: 'maria@email.com',
    alternativePhone: '+2399876543',
    personalProfile: {
      birthDate: '1985-03-15',
      address: 'Rua das Flores, 123',
      idNumber: '12345678'
    },
    commercialProfile: {
      businessName: 'Loja da Maria',
      businessType: 'retail',
      businessSize: 'small',
      address: 'Avenida Principal, 456',
      taxNumber: '987654321'
    },
    accounts: [
      {
        id: '1',
        type: 'Pessoal',
        balance: 125000,
        status: 'Ativa',
        dailyLimit: 50000,
        monthlyLimit: 500000
      },
      {
        id: '2',
        type: 'Comercial',
        balance: 350000,
        status: 'Ativa',
        dailyLimit: 100000,
        monthlyLimit: 1000000
      }
    ],
    accessHistory: [
      { date: '2024-01-15 14:30', interface: 'Mobile App', action: 'Login', status: 'Sucesso' },
      { date: '2024-01-14 09:15', interface: 'Web Portal', action: 'Transfer', status: 'Sucesso' },
      { date: '2024-01-13 16:45', interface: 'Mobile App', action: 'Login', status: 'Falhado' },
      { date: '2024-01-12 11:20', interface: 'USSD', action: 'Balance Check', status: 'Sucesso' }
    ]
  };

  const handleSearch = async () => {
    if (!searchPhoneNumber.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const existingUsers = ['+2399123456', '+2399654321', '+2399987654'];
      const foundUser = existingUsers.includes(searchPhoneNumber);
      
      setIsSearching(false);
      setUserFound(foundUser);
      
      if (!foundUser) {
        alert('Utilizador não encontrado. Deseja criar um novo utilizador?');
      }
    }, 1000);
  };

  const handleManageProfile = () => {
    setShowCodeVerification(true);
  };

  const handleManageAccess = () => {
    setShowAccessDialog(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === '1234') {
      setIsVerified(true);
      setShowCodeVerification(false);
      setShowProfileDialog(true);
    } else {
      alert('Código inválido. Tente novamente.');
    }
  };

  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value);
    setShowOtherBusinessType(value === 'other');
    if (value !== 'other') {
      setOtherBusinessType('');
    }
  };

  const resetUserPin = () => {
    alert('PIN do utilizador foi resetado. Um novo PIN temporário foi enviado por SMS.');
  };

  const toggleAccountStatus = () => {
    alert('Estado da conta alterado com sucesso.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Utilizadores</h1>
              <p className="text-sm text-gray-500">Gerir perfis e contas de utilizadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!userFound ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Procurar Utilizador
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Número de Telefone
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+239 912 3456"
                      value={searchPhoneNumber}
                      onChange={(e) => setSearchPhoneNumber(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={!searchPhoneNumber.trim() || isSearching}
                    className="px-6"
                  >
                    {isSearching ? 'Procurando...' : 'Procurar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* User Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Utilizador: {mockUserData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={handleManageProfile} className="flex items-center gap-2">
                    <UserCog className="w-4 h-4" />
                    Gerir Perfil do Utilizador
                  </Button>
                  <Button onClick={handleManageAccess} variant="outline" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Gerir Acesso
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Accounts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Contas Bancárias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserData.accounts.map((account) => (
                    <div key={account.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{account.type}</h4>
                          <p className="text-2xl font-bold text-green-600">
                            {account.balance.toLocaleString()} STN
                          </p>
                          <Badge variant={account.status === 'Ativa' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowTransactionHistoryDialog(true)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Histórico de Transações
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedAccount(account);
                              setShowAccountDialog(true);
                            }}
                          >
                            <Settings className="w-4 h-4 mr-1" />
                            Gerir Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowCreateCommercialDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Conta Comercial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Code Verification Dialog */}
      <Dialog open={showCodeVerification} onOpenChange={setShowCodeVerification}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificação de Código</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Um código de verificação foi enviado para {mockUserData.phone}
            </p>
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                placeholder="Introduza o código de 4 dígitos"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={4}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCodeVerification(false)}>
                Cancelar
              </Button>
              <Button onClick={handleVerifyCode}>
                Verificar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Access Management Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gerir Acesso do Utilizador</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Account Status */}
            <div className="space-y-4">
              <h3 className="font-medium">Estado da Conta</h3>
              <div className="flex items-center justify-between">
                <span>Conta Ativa</span>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" onClick={toggleAccountStatus}>
                Alterar Estado da Conta
              </Button>
            </div>

            <Separator />

            {/* PIN Reset */}
            <div className="space-y-4">
              <h3 className="font-medium">Gestão de PIN</h3>
              <Button variant="destructive" onClick={resetUserPin}>
                Resetar PIN do Utilizador
              </Button>
            </div>

            <Separator />

            {/* Access History */}
            <div className="space-y-4">
              <h3 className="font-medium">Histórico de Acessos</h3>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {mockUserData.accessHistory.map((access, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{access.action}</p>
                        <p className="text-sm text-gray-600">{access.date}</p>
                        <Badge variant="outline" className="text-xs">
                          {access.interface}
                        </Badge>
                      </div>
                      <Badge variant={access.status === 'Sucesso' ? 'default' : 'destructive'}>
                        {access.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Management Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerir Perfil do Utilizador</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Personal Profile */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Perfil Pessoal</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input defaultValue={mockUserData.name} />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue={mockUserData.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Telefone Alternativo</Label>
                  <Input defaultValue={mockUserData.alternativePhone} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={mockUserData.email} />
                </div>
                <div className="space-y-2">
                  <Label>Data de Nascimento</Label>
                  <Input type="date" defaultValue={mockUserData.personalProfile.birthDate} />
                </div>
                <div className="space-y-2">
                  <Label>Número de Identificação</Label>
                  <Input defaultValue={mockUserData.personalProfile.idNumber} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Endereço</Label>
                  <Input defaultValue={mockUserData.personalProfile.address} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Commercial Profile */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Perfil Comercial</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Negócio</Label>
                  <Input defaultValue={mockUserData.commercialProfile.businessName} />
                </div>
                <div className="space-y-2">
                  <Label>Tamanho do Negócio</Label>
                  <Select defaultValue={mockUserData.commercialProfile.businessSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Individual</SelectItem>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                      <SelectItem value="enterprise">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Negócio</Label>
                  <Select value={businessType} onValueChange={handleBusinessTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Comércio</SelectItem>
                      <SelectItem value="restaurant">Restauração</SelectItem>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="technology">Tecnologia</SelectItem>
                      <SelectItem value="healthcare">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {showOtherBusinessType && (
                  <div className="space-y-2">
                    <Label>Especifique o Tipo</Label>
                    <Input 
                      placeholder="Descreva o tipo de negócio"
                      value={otherBusinessType}
                      onChange={(e) => setOtherBusinessType(e.target.value)}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Número Fiscal</Label>
                  <Input defaultValue={mockUserData.commercialProfile.taxNumber} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Endereço Comercial</Label>
                  <Input defaultValue={mockUserData.commercialProfile.address} />
                </div>
              </div>
            </div>

            {/* SMS Verification */}
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Verificação por SMS</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Código de verificação" 
                    className="w-40"
                  />
                  <Button variant="outline" size="sm">
                    Enviar Código
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Guardar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAccountManagementScreen;
