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
    name: '',
    email: '',
    birthDate: '',
    idNumber: '',
    address: ''
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

    if (!userData.name || !userData.email || !userData.birthDate || !userData.idNumber) {
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input 
                  id="name" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  placeholder="Nome completo do utilizador"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input 
                  id="birthDate" 
                  type="date"
                  value={userData.birthDate}
                  onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="idNumber">Número de Identificação *</Label>
                <Input 
                  id="idNumber"
                  value={userData.idNumber}
                  onChange={(e) => setUserData({...userData, idNumber: e.target.value})}
                  placeholder="Número do documento de identificação"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Morada</Label>
              <Textarea 
                id="address"
                value={userData.address}
                onChange={(e) => setUserData({...userData, address: e.target.value})}
                placeholder="Morada completa do utilizador"
              />
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