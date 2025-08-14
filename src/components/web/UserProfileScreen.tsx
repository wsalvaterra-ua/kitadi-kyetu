import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, User, Building, Phone, MessageSquare, Plus, Trash2, Upload, Download, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from './PageHeader';

interface UserProfileScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onAccountsManagement?: () => void;
}

interface BusinessProfile {
  id: string;
  name: string;
  location: string;
  businessType: string;
  status: 'active' | 'pending' | 'suspended';
}

interface Document {
  id: string;
  name: string;
  submissionDate: string;
  type: 'id' | 'proof_address' | 'business_license' | 'other';
}

const UserProfileScreen = ({ phoneNumber, onBack, onAccountsManagement }: UserProfileScreenProps) => {
  const { toast } = useToast();
  const [userStatus, setUserStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'PENDING_KYC' | 'CLOSED'>('ACTIVE');
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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

  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>([
    { id: 'biz001', name: 'Silva Commerce Lda', location: 'São Tomé', businessType: 'Comércio', status: 'active' },
    { id: 'biz002', name: 'Restaurante Central', location: 'Príncipe', businessType: 'Restauração', status: 'pending' }
  ]);

  const [documents] = useState<Document[]>([
    { id: 'doc001', name: 'Bilhete de Identidade', submissionDate: '2024-01-15', type: 'id' },
    { id: 'doc002', name: 'Comprovativo de Morada', submissionDate: '2024-01-14', type: 'proof_address' },
    { id: 'doc003', name: 'Licença Comercial', submissionDate: '2024-01-13', type: 'business_license' }
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

  const uploadDocument = () => {
    if (!documentName.trim() || !selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo e insira o nome do documento",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Documento enviado",
      description: `Documento ${documentName} enviado com sucesso`,
    });
    
    setDocumentName('');
    setSelectedFile(null);
  };

  const downloadDocument = (docName: string) => {
    toast({
      title: "Download iniciado",
      description: `Download do documento ${docName} iniciado`,
    });
  };

  const addBusinessProfile = () => {
    const newProfile: BusinessProfile = {
      id: `biz${Date.now()}`,
      name: 'Novo Perfil Comercial',
      location: 'São Tomé',
      businessType: 'Comércio',
      status: 'pending'
    };
    
    setBusinessProfiles([newProfile, ...businessProfiles]);
    
    toast({
      title: "Perfil criado",
      description: "Novo perfil comercial adicionado",
    });
  };

  const saveUserProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Dados do utilizador guardados com sucesso",
    });
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Perfil do Utilizador"
        description={phoneNumber}
        onBack={onBack}
      />

      <div className="w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <Badge className={getStatusColor(userStatus)}>
            {getStatusText(userStatus)}
          </Badge>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="personal" className="flex-1">Perfil Pessoal</TabsTrigger>
            <TabsTrigger value="commercial" className="flex-1">Perfis Comerciais</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documentos</TabsTrigger>
            <TabsTrigger value="accounts" className="flex-1">Contas</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="w-full">
            <Card className="w-full">
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
                  <Button onClick={saveUserProfile}>
                    Guardar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commercial" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Perfis Comerciais
                  </div>
                  <Button size="sm" variant="outline" onClick={addBusinessProfile}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Perfil Comercial
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Tipo de Negócio</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businessProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">{profile.name}</TableCell>
                        <TableCell>{profile.location}</TableCell>
                        <TableCell>{profile.businessType}</TableCell>
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

          <TabsContent value="documents" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Documentos do Utilizador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="documentName">Nome do Documento</Label>
                      <Input
                        id="documentName"
                        placeholder="Ex: Bilhete de Identidade"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
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
                    <Button onClick={uploadDocument} className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Enviar Documento
                    </Button>
                  </div>
                </div>

                {/* Documents Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Documento</TableHead>
                      <TableHead>Data de Submissão</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell className="font-medium">{document.name}</TableCell>
                        <TableCell>{document.submissionDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {document.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadDocument(document.name)}
                          >
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
          </TabsContent>

          <TabsContent value="accounts" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Gestão de Contas
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={onAccountsManagement}
                  >
                    Gerir Contas
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A gestão detalhada de contas foi movida para uma tela dedicada. 
                  Clique no botão "Gerir Contas" para acessar todas as funcionalidades de contas.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfileScreen;