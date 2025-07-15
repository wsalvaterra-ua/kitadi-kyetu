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
  
  // Mock user data - exemplo de utilizador existente: Maria dos Santos Almeida
  const [userData, setUserData] = useState({
    idNumber: '120845678',
    nationality: 'STP',
    dateOfBirth: '1990-05-15',
    expiryDate: '2030-05-15',
    firstName: 'Maria',
    middleName: 'dos Santos',
    lastName: 'Almeida',
    civilStatus: 'casado'
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Primeiro Nome</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Nome do Meio</Label>
                  <Input
                    id="middleName"
                    value={userData.middleName}
                    onChange={(e) => setUserData({...userData, middleName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastName">Último Nome</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="civilStatus">Estado Civil</Label>
                  <select
                    id="civilStatus"
                    value={userData.civilStatus}
                    onChange={(e) => setUserData({...userData, civilStatus: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecionar</option>
                    <option value="solteiro">Solteiro</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viuvo">Viúvo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idNumber">Número do Documento</Label>
                  <Input
                    id="idNumber"
                    value={userData.idNumber}
                    onChange={(e) => setUserData({...userData, idNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <select
                    id="nationality"
                    value={userData.nationality}
                    onChange={(e) => setUserData({...userData, nationality: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="STP">São Tomé e Príncipe</option>
                    <option value="AGO">Angola</option>
                    <option value="PRT">Portugal</option>
                    <option value="BRA">Brasil</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={(e) => setUserData({...userData, dateOfBirth: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Data de Expiração do Documento</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={userData.expiryDate}
                    onChange={(e) => setUserData({...userData, expiryDate: e.target.value})}
                  />
                </div>
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