import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, User, CreditCard, Building, Shield, Phone, MessageSquare, Eye, Plus, Trash2, Upload, Download, FileText, Edit, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onOpenAccountManagement?: (phoneNumber: string) => void;
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
  location: string;
  status: 'active' | 'pending' | 'suspended';
}

interface Document {
  id: string;
  name: string;
  submissionDate: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
}

const UserProfileScreen = ({ phoneNumber, onBack, onOpenAccountManagement }: UserProfileScreenProps) => {
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

  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>([
    { id: 'biz001', name: 'Silva Commerce Lda', type: 'Comércio', location: 'São Tomé Centro', status: 'active' },
    { id: 'biz002', name: 'Restaurante Central', type: 'Restauração', location: 'Água Grande', status: 'pending' }
  ]);

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Bilhete de Identidade',
      submissionDate: '2024-01-10',
      type: 'PDF',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Comprovativo de Morada',
      submissionDate: '2024-01-12',
      type: 'PDF',
      status: 'pending'
    }
  ]);

  const [showNewBusinessForm, setShowNewBusinessForm] = useState(false);
  const [newBusinessData, setNewBusinessData] = useState({
    name: '',
    type: '',
    location: ''
  });
  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

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
      <div className="w-full px-6 py-8 space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Perfil Pessoal</TabsTrigger>
            <TabsTrigger value="commercial">Perfis Comerciais</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="accounts">Contas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6">
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
          </TabsContent>

          <TabsContent value="commercial" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Perfis Comerciais
                  </div>
                  <Dialog open={showNewBusinessForm} onOpenChange={setShowNewBusinessForm}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Perfil Comercial
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Novo Perfil Comercial</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="businessName">Nome do Negócio</Label>
                          <Input
                            id="businessName"
                            placeholder="Nome do negócio"
                            value={newBusinessData.name}
                            onChange={(e) => setNewBusinessData({...newBusinessData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="businessType">Tipo de Negócio</Label>
                          <Select value={newBusinessData.type} onValueChange={(value) => setNewBusinessData({...newBusinessData, type: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comercio">Comércio</SelectItem>
                              <SelectItem value="restauracao">Restauração</SelectItem>
                              <SelectItem value="servicos">Serviços</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="businessLocation">Localização</Label>
                          <Input
                            id="businessLocation"
                            placeholder="Localização do negócio"
                            value={newBusinessData.location}
                            onChange={(e) => setNewBusinessData({...newBusinessData, location: e.target.value})}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowNewBusinessForm(false)} className="flex-1">
                            Cancelar
                          </Button>
                          <Button onClick={() => {
                            if (newBusinessData.name && newBusinessData.type && newBusinessData.location) {
                              const newProfile: BusinessProfile = {
                                id: (businessProfiles.length + 1).toString(),
                                name: newBusinessData.name,
                                type: newBusinessData.type,
                                location: newBusinessData.location,
                                status: 'pending'
                              };
                              setBusinessProfiles([...businessProfiles, newProfile]);
                              setNewBusinessData({ name: '', type: '', location: '' });
                              setShowNewBusinessForm(false);
                              toast({
                                title: "Perfil criado",
                                description: "Novo perfil comercial criado com sucesso",
                              });
                            }
                          }} className="flex-1">
                            Criar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Perfil</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Tipo de Negócio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businessProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">{profile.name}</TableCell>
                        <TableCell>{profile.location}</TableCell>
                        <TableCell>{profile.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(profile.status)}>
                            {getStatusText(profile.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Editar
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remover
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="space-y-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Enviar Novo Documento
                    </div>
                    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar Documento
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Enviar Documento</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="documentName">Nome do Documento</Label>
                            <Input
                              id="documentName"
                              placeholder="Ex: Bilhete de Identidade"
                              value={newDocumentName}
                              onChange={(e) => setNewDocumentName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="documentFile">Selecionar Arquivo</Label>
                            <Input
                              id="documentFile"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                              Cancelar
                            </Button>
                            <Button onClick={() => {
                              if (newDocumentName && selectedFile) {
                                toast({
                                  title: "Documento enviado",
                                  description: `${newDocumentName} foi enviado com sucesso`,
                                });
                                setNewDocumentName('');
                                setSelectedFile(null);
                                setShowUploadDialog(false);
                              }
                            }} className="flex-1">
                              Enviar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Documents Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentos Submetidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome do Documento</TableHead>
                        <TableHead>Data de Submissão</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium">{document.name}</TableCell>
                          <TableCell>{document.submissionDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(document.status)}>
                              {document.status === 'approved' ? 'Aprovado' : document.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Gestão de Contas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <p className="text-blue-800 text-sm">
                    Para gerir contas, perfis e associações, utilize o menu "Contas" disponível nos resultados de pesquisa.
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => onOpenAccountManagement?.(phoneNumber)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Ir para Gestão de Contas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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