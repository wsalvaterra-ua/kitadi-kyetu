import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Settings, Clock, Trash2, Users } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { useToast } from '@/hooks/use-toast';

interface UserAccountsScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onTransactionHistory?: (accountId: string) => void;
}

interface Account {
  id: string;
  accountNumber: string;
  accountType: 'carteira' | 'credito operacional' | 'sistema' | 'escrow buffer';
  accountNature: 'particular' | 'comercial' | 'operador';
  balance: number;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  name: string;
  commercialProfile?: string;
  type?: 'carteira' | 'credito operacional' | 'sistema' | 'escrow buffer';
  nature?: 'particular' | 'comercial' | 'operador';
  profile?: string;
  event?: string;
}

interface Transaction {
  id: string;
  type: 'TRANSFER' | 'PAYMENT' | 'CASH_IN' | 'CASH_OUT';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  amount: number;
  date: string;
  description: string;
}

const UserAccountsScreen = ({ phoneNumber, onBack, onTransactionHistory }: UserAccountsScreenProps) => {
  const { toast } = useToast();
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountProfile, setNewAccountProfile] = useState('');
  const [newAccountEvent, setNewAccountEvent] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [limitsDialogOpen, setLimitsDialogOpen] = useState(false);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [ownersDialogOpen, setOwnersDialogOpen] = useState(false);
  const [selectedAccountForOwners, setSelectedAccountForOwners] = useState<Account | null>(null);

  // Mock data
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 'acc001',
      accountNumber: '1000000123',
      accountType: 'carteira',
      accountNature: 'particular',
      balance: 45000,
      status: 'ACTIVE',
      name: 'Conta Principal',
      commercialProfile: 'N/A'
    },
    {
      id: 'acc002', 
      accountNumber: '2000000456',
      accountType: 'carteira',
      accountNature: 'comercial',
      balance: 125000,
      status: 'ACTIVE',
      name: 'Loja Online',
      commercialProfile: 'Silva Commerce Lda'
    },
    {
      id: 'acc003',
      accountNumber: '3000000789',
      accountType: 'carteira',
      accountNature: 'comercial',
      balance: 67000,
      status: 'FROZEN',
      name: 'Restaurante Central',
      commercialProfile: 'Restaurante Central'
    }
  ]);

  const commercialProfiles = [
    'Nenhuma associação',
    'Silva Commerce Lda',
    'Restaurante Central',
    'Boutique Fashion',
    'Tech Solutions STP'
  ];

  const events = [
    'Nenhuma associação',
    'Evento Cultural 2024',
    'Festival de Música',
    'Conferência Tech',
    'Feira de Negócios'
  ];

  const mockTransactions: Transaction[] = [
    {
      id: 'TX001',
      type: 'TRANSFER',
      status: 'COMPLETED',
      amount: 15000,
      date: '2024-01-15',
      description: 'Transferência recebida'
    },
    {
      id: 'TX002',
      type: 'PAYMENT',
      status: 'PENDING',
      amount: 8500,
      date: '2024-01-14',
      description: 'Pagamento pendente'
    },
    {
      id: 'TX003',
      type: 'CASH_OUT',
      status: 'FAILED',
      amount: 5000,
      date: '2024-01-13',
      description: 'Saque falhado'
    }
  ];

  const createAccount = () => {
    if (!newAccountName.trim()) {
      toast({
        title: "Erro",
        description: "Nome da conta é obrigatório",
        variant: "destructive"
      });
      return;
    }

    const newAccount: Account = {
      id: `acc${Date.now()}`,
      accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      accountType: 'carteira',
      accountNature: 'comercial',
      balance: 0,
      status: 'ACTIVE',
      name: newAccountName,
      commercialProfile: newAccountProfile
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountName('');
    setNewAccountProfile('');
    setNewAccountEvent('');
    
    toast({
      title: "Conta criada",
      description: `Conta ${newAccount.name} criada com sucesso`
    });
  };

  const updateAccount = () => {
    if (!selectedAccount) return;
    
    setAccounts(accounts.map(acc => 
      acc.id === selectedAccount.id ? selectedAccount : acc
    ));
    
    toast({
      title: "Conta atualizada",
      description: "Alterações guardadas com sucesso"
    });
    
    setEditDialogOpen(false);
    setSelectedAccount(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'FROZEN': return 'bg-orange-100 text-orange-800';
      case 'CLOSED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'carteira': return 'Carteira';
      case 'credito operacional': return 'Crédito Operacional';
      case 'sistema': return 'Sistema';
      case 'escrow buffer': return 'Escrow Buffer';
      default: return type;
    }
  };

  const getNatureLabel = (nature: string) => {
    switch (nature) {
      case 'particular': return 'Particular';
      case 'comercial': return 'Comercial';
      case 'operador': return 'Operador';
      default: return nature;
    }
  };

  const handleTransactionClick = (transactionId: string) => {
    if (onTransactionHistory) {
      onTransactionHistory(transactionId);
    }
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Gestão de Contas"
        description={`Utilizador: ${phoneNumber}`}
        onBack={onBack}
      />

      <div className="w-full p-8 space-y-6">
        {/* Account Creation Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Criar Nova Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="accountName">Nome da Conta</Label>
                <Input
                  id="accountName"
                  placeholder="Ex: Loja Principal"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="commercialProfile">Perfil Comercial (Opcional)</Label>
                <Select value={newAccountProfile} onValueChange={setNewAccountProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {commercialProfiles.map((profile) => (
                      <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="eventAssociation">Associação de Evento (Opcional)</Label>
                <Select value={newAccountEvent} onValueChange={setNewAccountEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={createAccount} className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Criar Conta
            </Button>
          </CardContent>
        </Card>

        {/* Accounts Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Contas do Utilizador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número da Conta</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Natureza</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-mono">{account.accountNumber}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{getTypeLabel(account.accountType)}</TableCell>
                      <TableCell>{getNatureLabel(account.accountNature)}</TableCell>
                      <TableCell className="font-semibold">{account.balance.toLocaleString()} STN</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(account.status)}>
                          {getStatusText(account.status)}
                        </Badge>
                      </TableCell>
                       <TableCell>
                         <div className="flex gap-2">
                           <Button 
                             size="sm" 
                             variant="outline"
                             onClick={() => {
                               setSelectedAccountForOwners(account);
                               setOwnersDialogOpen(true);
                             }}
                           >
                             <Users className="w-3 h-3 mr-1" />
                             Proprietários
                           </Button>
                           <Dialog open={editDialogOpen && selectedAccount?.id === account.id} onOpenChange={setEditDialogOpen}>
                             <DialogTrigger asChild>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 onClick={() => setSelectedAccount(account)}
                               >
                                 <Edit className="w-3 h-3 mr-1" />
                                 Editar
                               </Button>
                             </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Conta</DialogTitle>
                              </DialogHeader>
                              {selectedAccount && (
                                 <div className="space-y-4">
                                   <div>
                                     <Label htmlFor="editName">Nome da Conta</Label>
                                     <Input
                                       id="editName"
                                       value={selectedAccount.name}
                                       onChange={(e) => setSelectedAccount({
                                         ...selectedAccount,
                                         name: e.target.value
                                       })}
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="editAccountType">Tipo de Conta</Label>
                                      <Select 
                                        value={selectedAccount.type} 
                                         onValueChange={(value: 'carteira' | 'credito operacional' | 'sistema' | 'escrow buffer') => setSelectedAccount({
                                           ...selectedAccount,
                                           type: value
                                         })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="carteira">Carteira</SelectItem>
                                          <SelectItem value="credito operacional">Crédito Operacional</SelectItem>
                                          <SelectItem value="sistema">Sistema</SelectItem>
                                          <SelectItem value="escrow buffer">Escrow Buffer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                   </div>
                                   <div>
                                     <Label htmlFor="editAccountNature">Natureza da Conta</Label>
                                      <Select 
                                        value={selectedAccount.nature} 
                                         onValueChange={(value: 'particular' | 'comercial' | 'operador') => setSelectedAccount({
                                           ...selectedAccount,
                                           nature: value
                                         })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="particular">Particular</SelectItem>
                                          <SelectItem value="comercial">Comercial</SelectItem>
                                          <SelectItem value="operador">Operador</SelectItem>
                                        </SelectContent>
                                      </Select>
                                   </div>
                                   <div>
                                     <Label htmlFor="editAccountProfile">Perfil Comercial</Label>
                                     <Select 
                                       value={selectedAccount.profile || "none"} 
                                       onValueChange={(value) => setSelectedAccount({
                                         ...selectedAccount,
                                         profile: value === "none" ? undefined : value
                                       })}
                                     >
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecione o perfil" />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="none">Nenhum</SelectItem>
                                         <SelectItem value="perfil1">Perfil Comercial 1</SelectItem>
                                         <SelectItem value="perfil2">Perfil Comercial 2</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                   <div>
                                     <Label htmlFor="editAccountEvent">Evento Associado</Label>
                                     <Select 
                                       value={selectedAccount.event || "none"} 
                                       onValueChange={(value) => setSelectedAccount({
                                         ...selectedAccount,
                                         event: value === "none" ? undefined : value
                                       })}
                                     >
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecione o evento" />
                                       </SelectTrigger>
                                       <SelectContent>
                                         <SelectItem value="none">Nenhum</SelectItem>
                                         <SelectItem value="evento1">Evento Promocional 1</SelectItem>
                                         <SelectItem value="evento2">Evento Sazonal 2</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </div>
                                   <div>
                                     <Label htmlFor="editStatus">Estado</Label>
                                     <Select 
                                       value={selectedAccount.status} 
                                       onValueChange={(value: any) => setSelectedAccount({
                                         ...selectedAccount,
                                         status: value
                                       })}
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
                                   <div>
                                     <Label htmlFor="editAccountId">ID da Conta</Label>
                                     <Input
                                       id="editAccountId"
                                       value={selectedAccount.accountNumber}
                                       onChange={(e) => setSelectedAccount({
                                         ...selectedAccount,
                                         accountNumber: e.target.value
                                       })}
                                     />
                                   </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => {
                                      setEditDialogOpen(false);
                                      setSelectedAccount(null);
                                    }}>
                                      Cancelar
                                    </Button>
                                    <Button onClick={updateAccount}>
                                      Guardar
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Dialog open={limitsDialogOpen && selectedAccount?.id === account.id} onOpenChange={setLimitsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedAccount(account)}
                              >
                                <Settings className="w-3 h-3 mr-1" />
                                Limites
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Configurar Limites - {account.name}</DialogTitle>
                              </DialogHeader>
                               <div className="space-y-4">
                                 <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="dailySend">Limite Diário Envio (STN)</Label>
                                     <Input
                                       id="dailySend"
                                       type="number"
                                       placeholder="Ex: 100000"
                                       defaultValue="100000"
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="dailyReceive">Limite Diário Recebimento (STN)</Label>
                                     <Input
                                       id="dailyReceive"
                                       type="number"
                                       placeholder="Ex: 150000"
                                       defaultValue="150000"
                                     />
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="monthlySend">Limite Mensal Envio (STN)</Label>
                                     <Input
                                       id="monthlySend"
                                       type="number"
                                       placeholder="Ex: 1000000"
                                       defaultValue="1000000"
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="monthlyReceive">Limite Mensal Recebimento (STN)</Label>
                                     <Input
                                       id="monthlyReceive"
                                       type="number"
                                       placeholder="Ex: 1500000"
                                       defaultValue="1500000"
                                     />
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="transactionSend">Limite Transação Envio (STN)</Label>
                                     <Input
                                       id="transactionSend"
                                       type="number"
                                       placeholder="Ex: 50000"
                                       defaultValue="50000"
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="transactionReceive">Limite Transação Recebimento (STN)</Label>
                                     <Input
                                       id="transactionReceive"
                                       type="number"
                                       placeholder="Ex: 75000"
                                       defaultValue="75000"
                                     />
                                   </div>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                   <div>
                                     <Label htmlFor="dailyCashout">Limite Diário Saque (STN)</Label>
                                     <Input
                                       id="dailyCashout"
                                       type="number"
                                       placeholder="Ex: 50000"
                                       defaultValue="50000"
                                     />
                                   </div>
                                   <div>
                                     <Label htmlFor="smsSendMax">Limite Máximo SMS</Label>
                                     <Input
                                       id="smsSendMax"
                                       type="number"
                                       placeholder="Ex: 10"
                                       defaultValue="10"
                                     />
                                   </div>
                                 </div>
                                 <div>
                                   <Label htmlFor="maxBalance">Saldo Máximo (STN)</Label>
                                   <Input
                                     id="maxBalance"
                                     type="number"
                                     placeholder="Ex: 5000000"
                                     defaultValue="5000000"
                                   />
                                 </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" onClick={() => setLimitsDialogOpen(false)}>
                                    Cancelar
                                  </Button>
                                  <Button onClick={() => {
                                    setLimitsDialogOpen(false);
                                    toast({
                                      title: "Limites atualizados",
                                      description: "Os limites da conta foram configurados com sucesso"
                                    });
                                  }}>
                                    Guardar
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onTransactionHistory?.(account.id)}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Histórico
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Account Owners Management Dialog */}
        <Dialog open={ownersDialogOpen} onOpenChange={setOwnersDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gestão de Proprietários - {selectedAccountForOwners?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Current Owners */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Proprietários Atuais</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Percentual</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Maria Silva</TableCell>
                        <TableCell>+2399123456</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Principal</Badge>
                        </TableCell>
                        <TableCell>80%</TableCell>
                        <TableCell>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>João Santos</TableCell>
                        <TableCell>+2399654321</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800">Secundário</Badge>
                        </TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Add New Owner */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Adicionar Proprietário</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="ownerPhone">Telefone</Label>
                        <Input
                          id="ownerPhone"
                          placeholder="+239 912 3456"
                          type="tel"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ownerType">Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="z-50 bg-white">
                            <SelectItem value="principal">Principal</SelectItem>
                            <SelectItem value="secundario">Secundário</SelectItem>
                            <SelectItem value="administrador">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ownerPercentage">Percentual (%)</Label>
                        <Input
                          id="ownerPercentage"
                          placeholder="Ex: 50"
                          type="number"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button 
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Proprietário adicionado",
                              description: "Novo proprietário foi associado à conta"
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOwnersDialogOpen(false)}>
                  Fechar
                </Button>
                <Button onClick={() => {
                  setOwnersDialogOpen(false);
                  toast({
                    title: "Alterações guardadas",
                    description: "As associações de proprietários foram atualizadas"
                  });
                }}>
                  Guardar Alterações
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserAccountsScreen;