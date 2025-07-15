import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Upload, Phone, MessageSquare, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateUserProfileScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onUserCreated: () => void;
}

const CreateUserProfileScreen = ({ phoneNumber, onBack, onUserCreated }: CreateUserProfileScreenProps) => {
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  
  const [userData, setUserData] = useState({
    idNumber: '',
    nationality: 'STP',
    dateOfBirth: '',
    expiryDate: '',
    firstName: '',
    middleName: '',
    lastName: '',
    civilStatus: ''
  });

  const [documents, setDocuments] = useState({
    frontId: null as File | null,
    backId: null as File | null,
    contract: null as File | null
  });

  const sendVerificationCode = () => {
    setVerificationSent(true);
    toast({
      title: "Código enviado",
      description: `Código de verificação enviado para ${phoneNumber}`,
    });
  };

  const handleFileUpload = (type: 'frontId' | 'backId' | 'contract', file: File) => {
    setDocuments(prev => ({
      ...prev,
      [type]: file
    }));
    toast({
      title: "Documento carregado",
      description: `${file.name} foi carregado com sucesso`,
    });
  };

  const createUserProfile = () => {
    if (!verificationCode) {
      toast({
        title: "Erro",
        description: "Código de verificação é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (!userData.firstName || !userData.lastName || !userData.dateOfBirth || !userData.idNumber) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (!documents.frontId || !documents.backId || !documents.contract) {
      toast({
        title: "Erro",
        description: "Todos os documentos são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Utilizador criado",
      description: "Perfil criado com sucesso. Estado: Verificação Pendente",
    });
    
    setTimeout(() => {
      onUserCreated();
    }, 1500);
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
              <h1 className="text-xl font-bold text-kitadi-navy">Criar Perfil do Utilizador</h1>
              <p className="text-sm text-gray-500">{phoneNumber} - Novo utilizador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Verification Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Código de Verificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                O cliente deve receber e fornecer o código de verificação por SMS.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Código fornecido pelo cliente"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button 
                onClick={sendVerificationCode} 
                variant="outline"
                disabled={verificationSent}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {verificationSent ? 'Código Enviado' : 'Enviar SMS'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Information */}
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
                <Label htmlFor="firstName">Primeiro Nome *</Label>
                <Input
                  id="firstName"
                  value={userData.firstName}
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  placeholder="João"
                />
              </div>
              <div>
                <Label htmlFor="middleName">Nome do Meio</Label>
                <Input
                  id="middleName"
                  value={userData.middleName}
                  onChange={(e) => setUserData({...userData, middleName: e.target.value})}
                  placeholder="António"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName">Último Nome *</Label>
                <Input
                  id="lastName"
                  value={userData.lastName}
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  placeholder="Silva"
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
                <Label htmlFor="idNumber">Número do Documento *</Label>
                <Input
                  id="idNumber"
                  value={userData.idNumber}
                  onChange={(e) => setUserData({...userData, idNumber: e.target.value})}
                  placeholder="123456789"
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
                <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) => setUserData({...userData, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Data de Expiração do Documento *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={userData.expiryDate}
                  onChange={(e) => setUserData({...userData, expiryDate: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos Obrigatórios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Front ID */}
            <div>
              <Label>Documento de Identificação (Frente) *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('frontId', e.target.files[0])}
                  className="hidden"
                  id="frontId"
                />
                <label htmlFor="frontId" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  {documents.frontId ? (
                    <p className="text-green-600">✓ {documents.frontId.name}</p>
                  ) : (
                    <p className="text-gray-600">Clique para carregar a frente do documento</p>
                  )}
                </label>
              </div>
            </div>

            {/* Back ID */}
            <div>
              <Label>Documento de Identificação (Verso) *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('backId', e.target.files[0])}
                  className="hidden"
                  id="backId"
                />
                <label htmlFor="backId" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  {documents.backId ? (
                    <p className="text-green-600">✓ {documents.backId.name}</p>
                  ) : (
                    <p className="text-gray-600">Clique para carregar o verso do documento</p>
                  )}
                </label>
              </div>
            </div>

            {/* Contract */}
            <div>
              <Label>Foto do Contrato Assinado *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('contract', e.target.files[0])}
                  className="hidden"
                  id="contract"
                />
                <label htmlFor="contract" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  {documents.contract ? (
                    <p className="text-green-600">✓ {documents.contract.name}</p>
                  ) : (
                    <p className="text-gray-600">Clique para carregar a foto do contrato assinado</p>
                  )}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={createUserProfile}>
            Criar Perfil de Utilizador
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserProfileScreen;