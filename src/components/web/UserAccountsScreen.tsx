import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Settings, Clock, Trash2 } from 'lucide-react';
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
  accountType: 'personal' | 'business' | 'merchant';
  accountNature: 'checking' | 'savings' | 'current';
  balance: number;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  name: string;
  commercialProfile?: string;
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
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);

  // Mock data
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 'acc001',
      accountNumber: '1000000123',
      accountType: 'personal',
      accountNature: 'checking',
      balance: 45000,
      status: 'ACTIVE',
      name: 'Conta Principal',
      commercialProfile: 'N/A'
    },
    {
      id: 'acc002', 
      accountNumber: '2000000456',
      accountType: 'business',
      accountNature: 'current',
      balance: 125000,
      status: 'ACTIVE',
      name: 'Loja Online',
      commercialProfile: 'Silva Commerce Lda'
    },
    {
      id: 'acc003',
      accountNumber: '3000000789',
      accountType: 'merchant',
      accountNature: 'current',
      balance: 67000,
      status: 'FROZEN',
      name: 'Restaurante Central',
      commercialProfile: 'Restaurante Central'
    }
  ]);

  const commercialProfiles = [
    'Silva Commerce Lda',
    'Restaurante Central',
    'Boutique Fashion',
    'Tech Solutions STP'
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
    if (!newAccountName.trim() || !newAccountProfile) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newAccount: Account = {
      id: `acc${Date.now()}`,
      accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      accountType: 'business',
      accountNature: 'current',
      balance: 0,
      status: 'ACTIVE',
      name: newAccountName,
      commercialProfile: newAccountProfile
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountName('');
    setNewAccountProfile('');
    
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'personal': return 'Pessoal';
      case 'business': return 'Comercial';
      case 'merchant': return 'Comerciante';
      default: return type;
    }
  };

  const getNatureLabel = (nature: string) => {
    switch (nature) {
      case 'checking': return 'Conta Corrente';
      case 'savings': return 'Poupança';
      case 'current': return 'Conta à Ordem';
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="commercialProfile">Perfil Comercial</Label>
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
                          {account.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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
                                    <Label htmlFor="editStatus">Status</Label>
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
                                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                        <SelectItem value="FROZEN">FROZEN</SelectItem>
                                        <SelectItem value="CLOSED">CLOSED</SelectItem>
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

                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3 mr-1" />
                            Limites
                          </Button>

                          <Dialog open={transactionDialogOpen && selectedAccount?.id === account.id} onOpenChange={setTransactionDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedAccount(account)}
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                Histórico
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Histórico de Transações - {account.name}</DialogTitle>
                              </DialogHeader>
                              <div>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Tipo</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Valor</TableHead>
                                      <TableHead>Data</TableHead>
                                      <TableHead>Descrição</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {mockTransactions.map((transaction) => (
                                      <TableRow 
                                        key={transaction.id} 
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleTransactionClick(transaction.id)}
                                      >
                                        <TableCell className="font-mono">{transaction.id}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>
                                          <Badge variant={
                                            transaction.status === 'COMPLETED' ? 'default' :
                                            transaction.status === 'PENDING' ? 'secondary' : 'destructive'
                                          }>
                                            {transaction.status}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>{transaction.amount.toLocaleString()} STN</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.description}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAccountsScreen;