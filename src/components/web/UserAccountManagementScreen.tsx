import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Shield, MapPin, Building, Phone, Mail, Calendar, Edit, Wallet, History, Settings, Plus, FileText, AlertTriangle, CheckCircle, Clock, Smartphone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UserAccountManagementScreenProps {
  phoneNumber: string;
  onBack: () => void;
}

const UserAccountManagementScreen: React.FC<UserAccountManagementScreenProps> = ({ phoneNumber, onBack }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showUserAccessManagement, setShowUserAccessManagement] = useState(false);
  const [dataAccessStep, setDataAccessStep] = useState<'send' | 'verify' | 'verified'>('send');
  const [dataAccessCode, setDataAccessCode] = useState('');
  const [accountSmsStep, setAccountSmsStep] = useState<Record<string, 'send' | 'verify' | 'verified'>>({});
  const [accountSmsCode, setAccountSmsCode] = useState('');
  const [accountManagementData, setAccountManagementData] = useState<Record<string, any>>({});
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [selectedBusinessProfile, setSelectedBusinessProfile] = useState('');
  const [createAccountSmsStep, setCreateAccountSmsStep] = useState<'send' | 'verify' | 'verified'>('send');
  const [createAccountSmsCode, setCreateAccountSmsCode] = useState('');
  const { toast } = useToast();

  // Mock data
  const personalData = {
    firstName: 'João',
    lastName: 'Silva',
    dateOfBirth: '1985-03-15',
    idNumber: '123456789',
    address: 'Rua das Flores, 123',
    city: 'Luanda',
    province: 'Luanda',
    postalCode: '1000',
    email: 'joao.silva@email.com'
  };

  const businessProfiles = [
    { id: '1', businessName: 'Loja ABC', businessType: 'Comércio', businessSize: 'Pequeno' },
    { id: '2', businessName: 'Empresa XYZ', businessType: 'Serviços', businessSize: 'Médio' }
  ];

  const accounts = [
    {
      id: 'acc1',
      accountType: 'Conta Pessoal',
      accountNumber: '1234567890',
      balance: '125.000,00 Kz',
      status: 'ACTIVE',
      limits: {
        dailySend: '50.000,00 Kz',
        dailyReceive: '100.000,00 Kz',
        dailyWithdrawal: '25.000,00 Kz',
        monthlyDeposit: '500.000,00 Kz'
      },
      transactionCounts: {
        maxDailySend: 5,
        maxDailyReceive: 10,
        maxDailyWithdrawals: 3
      }
    },
    {
      id: 'acc2',
      accountType: 'Conta Comercial - Loja ABC',
      accountNumber: '9876543210',
      balance: '450.000,00 Kz',
      status: 'ACTIVE',
      limits: {
        dailySend: '200.000,00 Kz',
        dailyReceive: '500.000,00 Kz',
        dailyWithdrawal: '100.000,00 Kz',
        monthlyDeposit: '2.000.000,00 Kz'
      },
      transactionCounts: {
        maxDailySend: 20,
        maxDailyReceive: 50,
        maxDailyWithdrawals: 10
      }
    }
  ];

  const transactions = [
    { id: 1, type: 'Recebimento', amount: '+25.000,00 Kz', date: '2024-01-15', from: '+244 912 345 678' },
    { id: 2, type: 'Envio', amount: '-15.000,00 Kz', date: '2024-01-14', to: '+244 923 456 789' },
    { id: 3, type: 'Depósito', amount: '+50.000,00 Kz', date: '2024-01-13', from: 'Transferência Bancária' },
  ];

  const businessTypes = [
    'Comércio', 'Serviços', 'Alimentação', 'Tecnologia', 'Saúde', 'Educação', 'Outro'
  ];

  const sendDataAccessSms = () => {
    toast({
      title: "SMS enviado",
      description: "Código de verificação enviado para " + phoneNumber,
    });
    setDataAccessStep('verify');
  };

  const verifyDataAccessCode = () => {
    if (dataAccessCode.length === 6) {
      toast({
        title: "Código verificado",
        description: "Acesso aos dados autorizado",
      });
      setDataAccessStep('verified');
    }
  };

  const sendAccountSms = (accountId: string) => {
    toast({
      title: "SMS enviado",
      description: "Código de verificação enviado para " + phoneNumber,
    });
    setAccountSmsStep(prev => ({...prev, [accountId]: 'verify'}));
  };

  const verifyAccountSms = (accountId: string) => {
    if (accountSmsCode.length === 6) {
      toast({
        title: "Código verificado",
        description: "Alterações na conta autorizadas",
      });
      setAccountSmsStep(prev => ({...prev, [accountId]: 'verified'}));
    }
  };

  const sendCreateAccountSms = () => {
    toast({
      title: "SMS enviado",
      description: "Código de verificação enviado para " + phoneNumber,
    });
    setCreateAccountSmsStep('verify');
  };

  const verifyCreateAccountSms = () => {
    if (createAccountSmsCode.length === 6) {
      toast({
        title: "Código verificado",
        description: "Criação de conta autorizada",
      });
      setCreateAccountSmsStep('verified');
    }
  };

  const createNewAccount = () => {
    if (!newAccountName || !selectedBusinessProfile || createAccountSmsStep !== 'verified') {
      toast({
        title: "Erro",
        description: "Preencha todos os campos e verifique o SMS",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Conta criada",
      description: "Nova conta comercial criada com sucesso",
    });
    
    setShowCreateAccountModal(false);
    setCreateAccountSmsStep('send');
    setCreateAccountSmsCode('');
    setNewAccountName('');
    setSelectedBusinessProfile('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'border-green-500 text-green-700 bg-green-50';
      case 'FROZEN': return 'border-yellow-500 text-yellow-700 bg-yellow-50';
      case 'CLOSED': return 'border-red-500 text-red-700 bg-red-50';
      default: return 'border-gray-500 text-gray-700 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Ativo';
      case 'FROZEN': return 'Congelado';
      case 'CLOSED': return 'Fechado';
      default: return status;
    }
  };

  // Show initial verification screen if not verified
  if (dataAccessStep === 'send') {
    return (
      <>
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Gestão de Utilizador</h1>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Verificação de Acesso</CardTitle>
              <p className="text-sm text-gray-600">
                {phoneNumber} - {personalData.firstName} {personalData.lastName}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={sendDataAccessSms}
                className="w-full"
              >
                <User className="w-4 h-4 mr-2" />
                Gerir Perfil do Utilizador
              </Button>
              <Button 
                onClick={() => setShowUserAccessManagement(true)}
                className="w-full"
                variant="outline"
              >
                <Shield className="w-4 h-4 mr-2" />
                Gerir Acesso
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Access Management Modal */}
        <Dialog open={showUserAccessManagement} onOpenChange={setShowUserAccessManagement}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gestão de Acesso do Utilizador</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">Verificação SMS necessária</p>
                <Button size="sm" onClick={sendDataAccessSms}>
                  <Smartphone className="w-4 h-4 mr-1" />
                  Enviar SMS
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  disabled={dataAccessStep === 'send' || dataAccessStep === 'verify'}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Desativar Conta
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  disabled={dataAccessStep === 'send' || dataAccessStep === 'verify'}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Congelar Conta
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  disabled={dataAccessStep === 'send' || dataAccessStep === 'verify'}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Alterar Limites Globais
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Data access verification
  if (dataAccessStep === 'verify') {
    return (
      <>
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Verificação SMS</h1>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Confirme o código SMS</CardTitle>
              <p className="text-sm text-gray-600">
                Enviado para {phoneNumber}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Código de Verificação</Label>
                <Input
                  value={dataAccessCode}
                  onChange={(e) => setDataAccessCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={sendDataAccessSms} className="flex-1">
                  Reenviar SMS
                </Button>
                <Button onClick={verifyDataAccessCode} className="flex-1">
                  Verificar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Main dashboard after verification
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold">Detalhes do Utilizador</h2>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowUserAccessManagement(true)}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Gerir Acesso
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Perfil Pessoal
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Perfil Comercial
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Contas
            </TabsTrigger>
          </TabsList>

          {/* Personal Profile Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Primeiro Nome</Label>
                    <Input value={personalData.firstName} readOnly />
                  </div>
                  <div>
                    <Label>Último Nome</Label>
                    <Input value={personalData.lastName} readOnly />
                  </div>
                  <div>
                    <Label>Data de Nascimento</Label>
                    <Input value={personalData.dateOfBirth} readOnly />
                  </div>
                  <div>
                    <Label>Número de Identificação</Label>
                    <Input value={personalData.idNumber} readOnly />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input value={phoneNumber} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={personalData.email} readOnly />
                  </div>
                  <div className="col-span-2">
                    <Label>Endereço</Label>
                    <Input value={personalData.address} readOnly />
                  </div>
                  <div>
                    <Label>Cidade</Label>
                    <Input value={personalData.city} readOnly />
                  </div>
                  <div>
                    <Label>Província</Label>
                    <Input value={personalData.province} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Profile Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Perfis Comerciais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessProfiles.map((profile) => (
                    <Card key={profile.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{profile.businessName}</h3>
                          <p className="text-sm text-gray-500">{profile.businessType} • {profile.businessSize}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Contas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <Card key={account.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{account.accountType}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(account.status)}`}>
                              {getStatusText(account.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Conta: {account.accountNumber}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold">{account.balance}</span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            <div>Limite Diário Envio: {account.limits.dailySend}</div>
                            <div>Limite Diário Recepção: {account.limits.dailyReceive}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <History className="w-4 h-4 mr-1" />
                                Ver Histórico
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Histórico de Transações - {account.accountNumber}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2">
                                {transactions.map((transaction) => (
                                  <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                      <p className="font-medium">{transaction.type}</p>
                                      <p className="text-sm text-gray-500">{transaction.date}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.amount}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {transaction.from || transaction.to}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                Gerir Conta
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh]">
                              <DialogHeader>
                                <DialogTitle>Gerir Conta - {account.accountNumber}</DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="max-h-[60vh] pr-4">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Informações da Conta</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Nome da Conta</Label>
                                        <Input 
                                          value={accountManagementData[account.id]?.accountName || account.accountType}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], accountName: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Saldo Atual</Label>
                                        <Input value={account.balance} readOnly />
                                      </div>
                                      <div>
                                        <Label>Estado da Conta</Label>
                                        <Select 
                                          value={accountManagementData[account.id]?.status || account.status}
                                          onValueChange={(value) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], status: value }
                                          }))}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="ACTIVE">Ativo</SelectItem>
                                            <SelectItem value="FROZEN">Congelado</SelectItem>
                                            <SelectItem value="CLOSED">Fechado</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Limites de Valores</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Limite Diário de Envio</Label>
                                        <Input 
                                          value={accountManagementData[account.id]?.dailySend || account.limits.dailySend}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], dailySend: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Limite Diário de Recepção</Label>
                                        <Input 
                                          value={accountManagementData[account.id]?.dailyReceive || account.limits.dailyReceive}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], dailyReceive: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Limite Diário de Levantamento</Label>
                                        <Input 
                                          value={accountManagementData[account.id]?.dailyWithdrawal || account.limits.dailyWithdrawal}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], dailyWithdrawal: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Limite Mensal de Depósito</Label>
                                        <Input 
                                          value={accountManagementData[account.id]?.monthlyDeposit || account.limits.monthlyDeposit}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], monthlyDeposit: e.target.value }
                                          }))}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Limites de Número de Transações</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Máximo Envios Diários</Label>
                                        <Input 
                                          type="number"
                                          value={accountManagementData[account.id]?.maxDailySend || account.transactionCounts.maxDailySend}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], maxDailySend: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Máximo Recepções Diárias</Label>
                                        <Input 
                                          type="number"
                                          value={accountManagementData[account.id]?.maxDailyReceive || account.transactionCounts.maxDailyReceive}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], maxDailyReceive: e.target.value }
                                          }))}
                                        />
                                      </div>
                                      <div>
                                        <Label>Máximo Levantamentos Diários</Label>
                                        <Input 
                                          type="number"
                                          value={accountManagementData[account.id]?.maxDailyWithdrawals || account.transactionCounts.maxDailyWithdrawals}
                                          onChange={(e) => setAccountManagementData(prev => ({
                                            ...prev,
                                            [account.id]: { ...prev[account.id], maxDailyWithdrawals: e.target.value }
                                          }))}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* SMS Verification Section */}
                                  <div className="bg-yellow-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium mb-2">Verificação SMS para alterações</p>
                                    {accountSmsStep[account.id] !== 'verify' && accountSmsStep[account.id] !== 'verified' && (
                                      <Button size="sm" onClick={() => sendAccountSms(account.id)}>
                                        <Smartphone className="w-4 h-4 mr-1" />
                                        Enviar SMS
                                      </Button>
                                    )}
                                    {accountSmsStep[account.id] === 'verify' && (
                                      <div className="space-y-2">
                                        <Input
                                          placeholder="Código SMS"
                                          value={accountSmsCode}
                                          onChange={(e) => setAccountSmsCode(e.target.value)}
                                          maxLength={6}
                                        />
                                        <Button size="sm" onClick={() => verifyAccountSms(account.id)}>
                                          Verificar SMS
                                        </Button>
                                      </div>
                                    )}
                                    {accountSmsStep[account.id] === 'verified' && (
                                      <p className="text-green-600 text-sm">✓ SMS verificado</p>
                                    )}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1" onClick={() => {
                                      setAccountSmsStep(prev => ({...prev, [account.id]: 'send'}));
                                      setAccountSmsCode('');
                                      setAccountManagementData(prev => ({...prev, [account.id]: {}}));
                                    }}>
                                      Cancelar
                                    </Button>
                                    <Button className="flex-1" onClick={() => {
                                      toast({
                                        title: "Conta atualizada",
                                        description: "Dados da conta atualizados com sucesso",
                                      });
                                      setAccountSmsStep(prev => ({...prev, [account.id]: 'send'}));
                                      setAccountSmsCode('');
                                      setAccountManagementData(prev => ({...prev, [account.id]: {}}));
                                    }}>
                                      Guardar Alterações
                                    </Button>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Add Account Button */}
                  <Dialog open={showCreateAccountModal} onOpenChange={setShowCreateAccountModal}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full border-dashed"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Nova Conta Comercial
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nova Conta Comercial</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Nome da Conta Comercial</Label>
                          <Input 
                            value={newAccountName} 
                            onChange={(e) => setNewAccountName(e.target.value)}
                            placeholder="Ex: Conta Comercial - Loja ABC"
                          />
                        </div>
                        <div>
                          <Label>Perfil Comercial</Label>
                          <Select 
                            value={selectedBusinessProfile} 
                            onValueChange={setSelectedBusinessProfile}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o perfil comercial" />
                            </SelectTrigger>
                            <SelectContent>
                              {businessProfiles.map(profile => (
                                <SelectItem key={profile.id} value={profile.id}>
                                  {profile.businessName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* SMS Verification Section */}
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-2">Verificação SMS para criar conta</p>
                          {createAccountSmsStep !== 'verify' && createAccountSmsStep !== 'verified' && (
                            <Button size="sm" onClick={sendCreateAccountSms}>
                              <Smartphone className="w-4 h-4 mr-1" />
                              Enviar SMS
                            </Button>
                          )}
                          {createAccountSmsStep === 'verify' && (
                            <div className="space-y-2">
                              <Input
                                placeholder="Código SMS"
                                value={createAccountSmsCode}
                                onChange={(e) => setCreateAccountSmsCode(e.target.value)}
                                maxLength={6}
                              />
                              <Button size="sm" onClick={verifyCreateAccountSms}>
                                Verificar SMS
                              </Button>
                            </div>
                          )}
                          {createAccountSmsStep === 'verified' && (
                            <p className="text-green-600 text-sm">✓ SMS verificado</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => {
                            setShowCreateAccountModal(false);
                            setCreateAccountSmsStep('send');
                            setCreateAccountSmsCode('');
                            setNewAccountName('');
                            setSelectedBusinessProfile('');
                          }} className="flex-1">
                            Cancelar
                          </Button>
                          <Button onClick={createNewAccount} className="flex-1">
                            Criar Conta
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Access Management Modal */}
      <Dialog open={showUserAccessManagement} onOpenChange={setShowUserAccessManagement}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestão de Acesso do Utilizador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm font-medium mb-2">Ações de gestão de conta</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <Shield className="w-4 h-4 mr-2" />
                Desativar Conta
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Congelar Conta
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <Settings className="w-4 h-4 mr-2" />
                Alterar Limites Globais
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAccountManagementScreen;