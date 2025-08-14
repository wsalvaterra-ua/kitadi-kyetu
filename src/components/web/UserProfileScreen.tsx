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
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Building, Phone, MessageSquare, Plus, Trash2, Upload, Download, Edit, MapPin } from 'lucide-react';
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
  businessSize: string;
  taxId: string;
  address: string;
  description: string;
  district: string;
  gpsCoordinates: string;
  status: 'active' | 'pending' | 'suspended';
}

interface Document {
  id: string;
  name: string;
  submissionDate: string;
  type: 'id' | 'proof_address' | 'business_license' | 'other';
  documentType: string;
}

const UserProfileScreen = ({ phoneNumber, onBack, onAccountsManagement }: UserProfileScreenProps) => {
  const { toast } = useToast();
  const [userStatus, setUserStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'PENDING_KYC' | 'CLOSED'>('ACTIVE');
  const [documentName, setDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [identityVerified, setIdentityVerified] = useState(false);
  const [addProfileOpen, setAddProfileOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BusinessProfile | null>(null);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileLocation, setNewProfileLocation] = useState('');
  const [newProfileType, setNewProfileType] = useState('');
  const [newBusinessSize, setNewBusinessSize] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newTaxId, setNewTaxId] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newGpsCoordinates, setNewGpsCoordinates] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState('');
  
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
    { 
      id: 'biz001', 
      name: 'Silva Commerce Lda', 
      location: 'São Tomé', 
      businessType: 'Comércio', 
      businessSize: 'Pequena Empresa',
      taxId: '123456789',
      address: 'Rua da Independência, 45',
      description: 'Comércio geral de produtos alimentares',
      district: 'Água Grande',
      gpsCoordinates: '0.3365° N, 6.7273° E',
      status: 'active' 
    },
    { 
      id: 'biz002', 
      name: 'Restaurante Central', 
      location: 'Príncipe', 
      businessType: 'Restauração', 
      businessSize: 'Micro Empresa',
      taxId: '987654321',
      address: 'Avenida Marginal, 12',
      description: 'Restaurante especializado em culinária local',
      district: 'Príncipe',
      gpsCoordinates: '1.6136° N, 7.4061° E',
      status: 'pending' 
    }
  ]);

  const [documents] = useState<Document[]>([
    { id: 'doc001', name: 'Bilhete de Identidade', submissionDate: '2024-01-15', type: 'id', documentType: 'Bilhete de Identidade' },
    { id: 'doc002', name: 'Comprovativo de Morada', submissionDate: '2024-01-14', type: 'proof_address', documentType: 'Comprovativo de Morada' },
    { id: 'doc003', name: 'Licença Comercial', submissionDate: '2024-01-13', type: 'business_license', documentType: 'Licença Comercial' }
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
    if (!documentName.trim() || !selectedFile || !documentType) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos e selecione um arquivo",
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
    setDocumentType('');
  };

  const downloadDocument = (docName: string) => {
    toast({
      title: "Download iniciado",
      description: `Download do documento ${docName} iniciado`,
    });
  };

  const addBusinessProfile = () => {
    if (!newProfileName.trim() || !newProfileLocation.trim() || !newProfileType.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newProfile: BusinessProfile = {
      id: `biz${Date.now()}`,
      name: newProfileName,
      location: newProfileLocation,
      businessType: newProfileType,
      businessSize: newBusinessSize,
      taxId: newTaxId,
      address: newAddress,
      description: newDescription,
      district: newDistrict,
      gpsCoordinates: newGpsCoordinates,
      status: 'pending'
    };
    
    setBusinessProfiles([newProfile, ...businessProfiles]);
    setNewProfileName('');
    setNewProfileLocation('');
    setNewProfileType('');
    setNewBusinessSize('');
    setNewDistrict('');
    setNewTaxId('');
    setNewAddress('');
    setNewGpsCoordinates('');
    setNewDescription('');
    setAddProfileOpen(false);
    
    toast({
      title: "Perfil criado",
      description: "Novo perfil comercial adicionado",
    });
  };

  const updateBusinessProfile = () => {
    if (!editingProfile) return;
    
    setBusinessProfiles(businessProfiles.map(profile => 
      profile.id === editingProfile.id ? editingProfile : profile
    ));
    
    setEditProfileOpen(false);
    setEditingProfile(null);
    
    toast({
      title: "Perfil atualizado",
      description: "Alterações guardadas com sucesso",
    });
  };

  const removeBusinessProfile = (profileId: string) => {
    setBusinessProfiles(businessProfiles.filter(profile => profile.id !== profileId));
    toast({
      title: "Perfil removido",
      description: "Perfil comercial removido com sucesso",
    });
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'id': return 'Documento de Identidade';
      case 'proof_address': return 'Comprovativo de Morada';
      case 'business_license': return 'Licença Comercial';
      case 'other': return 'Outro';
      default: return type;
    }
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
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="personal" className="flex-1">Perfil Pessoal</TabsTrigger>
            <TabsTrigger value="commercial" className="flex-1">Perfis Comerciais</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Dados Pessoais
                  </div>
                  <Badge className={getStatusColor(userStatus)}>
                    {getStatusText(userStatus)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="identity-verified" 
                    checked={identityVerified}
                    onCheckedChange={(checked) => setIdentityVerified(checked === true)}
                  />
                  <Label htmlFor="identity-verified">Identidade verificada</Label>
                </div>

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
                      disabled={!identityVerified}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nacionalidade</Label>
                    <select
                      id="nationality"
                      value={userData.nationality}
                      onChange={(e) => setUserData({...userData, nationality: e.target.value})}
                      disabled={!identityVerified}
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
                      disabled={!identityVerified}
                    />
                  </div>
                </div>

                {identityVerified && (
                  <div>
                    <Label htmlFor="fiscalNumber">Número Fiscal (Opcional)</Label>
                    <Input
                      id="fiscalNumber"
                      placeholder="Ex: 123456789"
                      value={fiscalNumber}
                      onChange={(e) => setFiscalNumber(e.target.value)}
                    />
                  </div>
                )}

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
                  <Dialog open={addProfileOpen} onOpenChange={setAddProfileOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Perfil Comercial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Perfil Comercial</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="profileName">Nome do Perfil</Label>
                          <Input
                            id="profileName"
                            placeholder="Ex: Silva Commerce Lda"
                            value={newProfileName}
                            onChange={(e) => setNewProfileName(e.target.value)}
                          />
                        </div>
                         <div>
                           <Label htmlFor="profileLocation">Localização</Label>
                           <div className="flex gap-2">
                             <Input
                               id="profileLocation"
                               placeholder="Ex: São Tomé"
                               value={newProfileLocation}
                               onChange={(e) => setNewProfileLocation(e.target.value)}
                             />
                             <Button
                               type="button"
                               size="sm"
                               variant="outline"
                               onClick={() => {
                                 if (navigator.geolocation) {
                                   navigator.geolocation.getCurrentPosition((position) => {
                                     const coords = `${position.coords.latitude.toFixed(4)}° N, ${position.coords.longitude.toFixed(4)}° E`;
                                     setNewProfileLocation(coords);
                                   });
                                 }
                               }}
                             >
                               <MapPin className="w-4 h-4" />
                             </Button>
                           </div>
                         </div>
                        <div>
                          <Label htmlFor="profileType">Tipo de Negócio</Label>
                          <Select value={newProfileType} onValueChange={setNewProfileType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Comércio">Comércio</SelectItem>
                              <SelectItem value="Restauração">Restauração</SelectItem>
                              <SelectItem value="Serviços">Serviços</SelectItem>
                              <SelectItem value="Agricultura">Agricultura</SelectItem>
                              <SelectItem value="Pesca">Pesca</SelectItem>
                              <SelectItem value="Turismo">Turismo</SelectItem>
                              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                              <SelectItem value="Outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                         <div>
                           <Label htmlFor="businessSize">Tamanho do Negócio</Label>
                           <Select value={newBusinessSize} onValueChange={setNewBusinessSize}>
                             <SelectTrigger>
                               <SelectValue placeholder="Selecione o tamanho" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="Comerciante Individual">Comerciante Individual</SelectItem>
                               <SelectItem value="Micro Empresa">Micro Empresa</SelectItem>
                               <SelectItem value="Pequena Empresa">Pequena Empresa</SelectItem>
                               <SelectItem value="Média Empresa">Média Empresa</SelectItem>
                               <SelectItem value="Grande Empresa">Grande Empresa</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                         <div>
                           <Label htmlFor="district">Distrito</Label>
                           <Select value={newDistrict} onValueChange={setNewDistrict}>
                             <SelectTrigger>
                               <SelectValue placeholder="Selecione o distrito" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="Água Grande">Água Grande</SelectItem>
                               <SelectItem value="Mé-Zóchi">Mé-Zóchi</SelectItem>
                               <SelectItem value="Cantagalo">Cantagalo</SelectItem>
                               <SelectItem value="Caué">Caué</SelectItem>
                               <SelectItem value="Lemba">Lemba</SelectItem>
                               <SelectItem value="Lobata">Lobata</SelectItem>
                               <SelectItem value="Príncipe">Príncipe</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                         <div>
                           <Label htmlFor="taxId">NIF</Label>
                           <Input
                             id="taxId"
                             placeholder="Ex: 123456789"
                             value={newTaxId}
                             onChange={(e) => setNewTaxId(e.target.value)}
                           />
                         </div>
                           <div>
                             <Label htmlFor="gpsCoordinates">Coordenadas GPS</Label>
                             <div className="flex gap-2">
                               <Input
                                 id="gpsCoordinates"
                                 placeholder="Ex: 0.3365° N, 6.7273° E"
                                 value={newGpsCoordinates}
                                 onChange={(e) => setNewGpsCoordinates(e.target.value)}
                               />
                               <Button
                                 type="button"
                                 size="sm"
                                 variant="outline"
                                 onClick={() => {
                                   if ("geolocation" in navigator) {
                                     navigator.geolocation.getCurrentPosition((position) => {
                                       const { latitude, longitude } = position.coords;
                                       setNewGpsCoordinates(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`);
                                     });
                                   }
                                 }}
                               >
                                 <MapPin className="w-4 h-4" />
                               </Button>
                             </div>
                           </div>
                         <div>
                           <Label htmlFor="description">Descrição</Label>
                           <textarea
                             id="description"
                             placeholder="Descrição do negócio"
                             className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                             value={newDescription}
                             onChange={(e) => setNewDescription(e.target.value)}
                           />
                         </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setAddProfileOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={addBusinessProfile}>
                            Adicionar
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Tipo de Negócio</TableHead>
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
                          <div className="flex gap-2">
                            <Dialog open={editProfileOpen && editingProfile?.id === profile.id} onOpenChange={setEditProfileOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setEditingProfile(profile)}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Editar
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Editar Perfil Comercial</DialogTitle>
                                </DialogHeader>
                                {editingProfile && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="editProfileName">Nome do Perfil</Label>
                                      <Input
                                        id="editProfileName"
                                        value={editingProfile.name}
                                        onChange={(e) => setEditingProfile({
                                          ...editingProfile,
                                          name: e.target.value
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="editProfileLocation">Localização</Label>
                                      <Input
                                        id="editProfileLocation"
                                        value={editingProfile.location}
                                        onChange={(e) => setEditingProfile({
                                          ...editingProfile,
                                          location: e.target.value
                                        })}
                                      />
                                    </div>
                                     <div>
                                       <Label htmlFor="editProfileType">Tipo de Negócio</Label>
                                       <Select 
                                         value={editingProfile.businessType} 
                                         onValueChange={(value) => setEditingProfile({
                                           ...editingProfile,
                                           businessType: value
                                         })}
                                       >
                                         <SelectTrigger>
                                           <SelectValue />
                                         </SelectTrigger>
                                         <SelectContent>
                                           <SelectItem value="Comércio">Comércio</SelectItem>
                                           <SelectItem value="Restauração">Restauração</SelectItem>
                                           <SelectItem value="Serviços">Serviços</SelectItem>
                                           <SelectItem value="Agricultura">Agricultura</SelectItem>
                                           <SelectItem value="Pesca">Pesca</SelectItem>
                                           <SelectItem value="Turismo">Turismo</SelectItem>
                                           <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                                           <SelectItem value="Outro">Outro</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </div>
                                     <div>
                                       <Label htmlFor="editBusinessSize">Tamanho do Negócio</Label>
                                       <Select 
                                         value={editingProfile.businessSize} 
                                         onValueChange={(value) => setEditingProfile({
                                           ...editingProfile,
                                           businessSize: value
                                         })}
                                       >
                                         <SelectTrigger>
                                           <SelectValue />
                                         </SelectTrigger>
                                         <SelectContent>
                                           <SelectItem value="Comerciante Individual">Comerciante Individual</SelectItem>
                                           <SelectItem value="Micro Empresa">Micro Empresa</SelectItem>
                                           <SelectItem value="Pequena Empresa">Pequena Empresa</SelectItem>
                                           <SelectItem value="Média Empresa">Média Empresa</SelectItem>
                                           <SelectItem value="Grande Empresa">Grande Empresa</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </div>
                                     <div>
                                       <Label htmlFor="editDistrict">Distrito</Label>
                                       <Select 
                                         value={editingProfile.district} 
                                         onValueChange={(value) => setEditingProfile({
                                           ...editingProfile,
                                           district: value
                                         })}
                                       >
                                         <SelectTrigger>
                                           <SelectValue />
                                         </SelectTrigger>
                                         <SelectContent>
                                           <SelectItem value="Água Grande">Água Grande</SelectItem>
                                           <SelectItem value="Mé-Zóchi">Mé-Zóchi</SelectItem>
                                           <SelectItem value="Cantagalo">Cantagalo</SelectItem>
                                           <SelectItem value="Caué">Caué</SelectItem>
                                           <SelectItem value="Lemba">Lemba</SelectItem>
                                           <SelectItem value="Lobata">Lobata</SelectItem>
                                           <SelectItem value="Príncipe">Príncipe</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </div>
                                     <div>
                                       <Label htmlFor="editTaxId">NIF</Label>
                                       <Input
                                         id="editTaxId"
                                         value={editingProfile.taxId}
                                         onChange={(e) => setEditingProfile({
                                           ...editingProfile,
                                           taxId: e.target.value
                                         })}
                                       />
                                     </div>
                                       <div>
                                         <Label htmlFor="editGpsCoordinates">Coordenadas GPS</Label>
                                         <div className="flex gap-2">
                                           <Input
                                             id="editGpsCoordinates"
                                             value={editingProfile.gpsCoordinates}
                                             onChange={(e) => setEditingProfile({
                                               ...editingProfile,
                                               gpsCoordinates: e.target.value
                                             })}
                                           />
                                           <Button
                                             type="button"
                                             size="sm"
                                             variant="outline"
                                             onClick={() => {
                                               if ("geolocation" in navigator) {
                                                 navigator.geolocation.getCurrentPosition((position) => {
                                                   const { latitude, longitude } = position.coords;
                                                   setEditingProfile({
                                                     ...editingProfile,
                                                     gpsCoordinates: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`
                                                   });
                                                 });
                                               }
                                             }}
                                           >
                                             <MapPin className="w-4 h-4" />
                                           </Button>
                                         </div>
                                       </div>
                                     <div>
                                       <Label htmlFor="editDescription">Descrição</Label>
                                       <textarea
                                         id="editDescription"
                                         className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                         value={editingProfile.description}
                                         onChange={(e) => setEditingProfile({
                                           ...editingProfile,
                                           description: e.target.value
                                         })}
                                       />
                                     </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" onClick={() => {
                                        setEditProfileOpen(false);
                                        setEditingProfile(null);
                                      }}>
                                        Cancelar
                                      </Button>
                                      <Button onClick={updateBusinessProfile}>
                                        Guardar
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => removeBusinessProfile(profile.id)}
                            >
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
                      <Label htmlFor="documentType">Tipo de Documento</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bilhete de Identidade">Bilhete de Identidade</SelectItem>
                          <SelectItem value="Passaporte">Passaporte</SelectItem>
                          <SelectItem value="Carta de Condução">Carta de Condução</SelectItem>
                          <SelectItem value="Comprovativo de Morada">Comprovativo de Morada</SelectItem>
                          <SelectItem value="Licença Comercial">Licença Comercial</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
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
                            {getDocumentTypeLabel(document.type)}
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

        </Tabs>
      </div>
    </div>
  );
};

export default UserProfileScreen;