import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, CreditCard, Building, Shield, Phone, MessageSquare, Eye, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileScreenProps {
  phoneNumber: string;
  onBack: () => void;
}

interface Account {
  id: string;
  name: string;
  type: 'personal' | 'business' | 'merchant';
  status: 'active' | 'suspended' | 'pending' | 'closed';
  balance?: number;
}

interface BusinessProfile {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending' | 'suspended';
}

const UserProfileScreen = ({ phoneNumber, onBack }: UserProfileScreenProps) => {
  const { toast } = useToast();
  const [userStatus, setUserStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'PENDING_KYC' | 'CLOSED'>('ACTIVE');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    birthDate: '1990-05-15',
    idNumber: '123456789',
    address: 'Rua das Flores, 123, São Tomé'
  });

  const [accounts] = useState<Account[]>([
    { id: 'acc001', name: 'Conta Principal', type: 'personal', status: 'active' },
    { id: 'acc002', name: 'Loja Online', type: 'business', status: 'active' },
    { id: 'acc003', name: 'Restaurante Central', type: 'merchant', status: 'pending' }
  ]);

  const [businessProfiles] = useState<BusinessProfile[]>([
    { id: 'biz001', name: 'Silva Commerce Lda', type: 'Comércio', status: 'active' },
    { id: 'biz002', name: 'Restaurante Central', type: 'Restauração', status: 'pending' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'suspended': case 'SUSPENDED': return 'bg-orange-100 text-orange-800';
      case 'pending': case 'PENDING_KYC': return 'bg-yellow-100 text-yellow-800';
      case 'closed': case 'CLOSED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Ativo';
      case 'SUSPENDED': return 'Suspenso';
      case 'PENDING_KYC': return 'Verificação Pendente';
      case 'CLOSED': return 'Fechado';
      case 'active': return 'Ativo';
      case 'suspended': return 'Suspenso';
      case 'pending': return 'Pendente';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };

  const sendVerificationCode = (type: 'profile' | 'account') => {
    toast({
      title: "Código enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const handleAccountAccess = () => {
    if (!verificationCode) {
      toast({
        title: "Erro",
        description: "Introduza o código de verificação",
        variant: "destructive"
      });
      return;
    }
    setShowAccountDetails(true);
    toast({
      title: "Acesso autorizado",
      description: "Detalhes da conta carregados",
    });
  };

  const saveUserProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Dados do utilizador guardados com sucesso",
    });
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
              <h1 className="text-xl font-bold text-kitadi-navy">Perfil do Utilizador</h1>
              <p className="text-sm text-gray-500">{phoneNumber}</p>
            </div>
          </div>
          <Badge className={getStatusColor(userStatus)}>
            {getStatusText(userStatus)}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input 
                    id="birthDate" 
                    type="date"
                    value={userData.birthDate}
                    onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">Número de Identificação</Label>
                  <Input 
                    id="idNumber"
                    value={userData.idNumber}
                    onChange={(e) => setUserData({...userData, idNumber: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Morada</Label>
                <Textarea 
                  id="address"
                  value={userData.address}
                  onChange={(e) => setUserData({...userData, address: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="status">Estado da Conta</Label>
                <Select 
                  value={userStatus} 
                  onValueChange={(value: any) => setUserStatus(value)}
                  disabled={userStatus === 'PENDING_KYC'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Ativo</SelectItem>
                    <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                    <SelectItem value="CLOSED">Fechado</SelectItem>
                  </SelectContent>
                </Select>
                {userStatus === 'PENDING_KYC' && (
                  <p className="text-xs text-amber-600 mt-1">
                    Estado não pode ser alterado enquanto verificação estiver pendente
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={() => sendVerificationCode('profile')} variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Código
                </Button>
                <Button onClick={saveUserProfile}>
                  Guardar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Contas do Utilizador
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conta
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{account.name}</h4>
                      <p className="text-sm text-gray-500">ID: {account.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {account.type}
                      </Badge>
                      <Badge className={getStatusColor(account.status)}>
                        {getStatusText(account.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedAccount(account)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Business Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Perfis Comerciais
              </div>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Novo Perfil
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {businessProfiles.map((profile) => (
                <div key={profile.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{profile.name}</h4>
                    <Badge className={getStatusColor(profile.status)}>
                      {getStatusText(profile.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{profile.type}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Editar</Button>
                    <Button size="sm" variant="outline" className="text-red-600">Eliminar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Details Modal Content */}
        {selectedAccount && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Acesso à Conta: {selectedAccount.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  Para aceder aos detalhes da conta, é necessário código de verificação do cliente.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Código de verificação"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button onClick={() => sendVerificationCode('account')} variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Enviar SMS
                </Button>
                <Button onClick={handleAccountAccess}>
                  Aceder
                </Button>
              </div>

              {showAccountDetails && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Detalhes da Conta</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Estado da Conta</Label>
                        <Select defaultValue={selectedAccount.status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="suspended">Suspenso</SelectItem>
                            <SelectItem value="closed">Fechado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Limite Máximo (STN)</Label>
                        <Input type="number" defaultValue="10000" max="50000" />
                        <p className="text-xs text-gray-500 mt-1">Máximo: 50,000 STN</p>
                      </div>
                    </div>
                    <Button>Guardar Alterações</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserProfileScreen;