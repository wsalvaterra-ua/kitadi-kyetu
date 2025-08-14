import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Plus, Edit, History, Settings, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  onBack: () => void;
  phoneNumber: string;
  onOpenTransactionManagement?: (transactionId: string) => void;
}

interface Account {
  id: string;
  accountNumber: string;
  accountType: string;
  accountNature: string;
  balance: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  commercialProfile: string;
}

interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: string;
  date: string;
}

const UserAccountsScreen = ({ onBack, phoneNumber, onOpenTransactionManagement }: Props) => {
  const { toast } = useToast();
  
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      accountNumber: '4001234567',
      accountType: 'Conta Pessoal',
      accountNature: 'Individual',
      balance: '45,678 STN',
      status: 'ACTIVE',
      commercialProfile: 'N/A'
    },
    {
      id: '2',
      accountNumber: '4001234568',
      accountType: 'Conta Comercial',
      accountNature: 'Empresa',
      balance: '123,456 STN',
      status: 'FROZEN',
      commercialProfile: 'Silva Commerce Lda'
    }
  ]);

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState<string | null>(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState<string | null>(null);
  const [newAccountData, setNewAccountData] = useState({
    name: '',
    commercialProfile: ''
  });
  const [editAccountData, setEditAccountData] = useState({
    name: '',
    status: 'ACTIVE' as 'ACTIVE' | 'FROZEN' | 'CLOSED',
    accountId: ''
  });

  const transactions: Transaction[] = [
    { id: 'TXN001', type: 'Recebido', status: 'COMPLETED', amount: '+5,000 STN', date: '2024-01-15' },
    { id: 'TXN002', type: 'Enviado', status: 'PENDING', amount: '-2,500 STN', date: '2024-01-14' },
    { id: 'TXN003', type: 'Recebido', status: 'FAILED', amount: '+1,200 STN', date: '2024-01-13' }
  ];

  const commercialProfiles = [
    'Silva Commerce Lda',
    'Restaurante Central',
    'Loja da Maria'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'FROZEN': return 'bg-yellow-100 text-yellow-800';
      case 'CLOSED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Ativo';
      case 'FROZEN': return 'Congelado';
      case 'CLOSED': return 'Fechado';
      case 'COMPLETED': return 'Concluída';
      case 'PENDING': return 'Pendente';
      case 'FAILED': return 'Falhada';
      default: return status;
    }
  };

  const handleCreateAccount = () => {
    if (!newAccountData.name || !newAccountData.commercialProfile) {
      toast({
        title: "Dados obrigatórios",
        description: "Preencha o nome da conta e selecione um perfil comercial",
        variant: "destructive"
      });
      return;
    }

    const newAccount: Account = {
      id: (accounts.length + 1).toString(),
      accountNumber: '400' + Math.random().toString().slice(-7),
      accountType: newAccountData.name,
      accountNature: 'Empresa',
      balance: '0 STN',
      status: 'ACTIVE',
      commercialProfile: newAccountData.commercialProfile
    };

    setAccounts([...accounts, newAccount]);
    setNewAccountData({ name: '', commercialProfile: '' });
    setShowCreateAccount(false);

    toast({
      title: "Conta criada",
      description: "Nova conta criada com sucesso",
    });
  };

  const handleEditAccount = () => {
    if (!showEditAccount) return;

    setAccounts(accounts.map(account => 
      account.id === showEditAccount 
        ? { ...account, accountType: editAccountData.name, status: editAccountData.status, accountNumber: editAccountData.accountId }
        : account
    ));

    setShowEditAccount(null);
    setEditAccountData({ name: '', status: 'ACTIVE', accountId: '' });

    toast({
      title: "Conta atualizada",
      description: "Dados da conta atualizados com sucesso",
    });
  };

  const openEditAccount = (account: Account) => {
    setEditAccountData({
      name: account.accountType,
      status: account.status,
      accountId: account.accountNumber
    });
    setShowEditAccount(account.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Contas</h1>
              <p className="text-sm text-gray-500">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-8 space-y-6">
        {/* Create Account Form */}
        <Card>
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
                  placeholder="Nome da conta"
                  value={newAccountData.name}
                  onChange={(e) => setNewAccountData({...newAccountData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="commercialProfile">Perfil Comercial</Label>
                <Select 
                  value={newAccountData.commercialProfile} 
                  onValueChange={(value) => setNewAccountData({...newAccountData, commercialProfile: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {commercialProfiles.map((profile) => (
                      <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateAccount}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Conta
            </Button>
          </CardContent>
        </Card>

        {/* Accounts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Contas do Utilizador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número da Conta</TableHead>
                  <TableHead>Tipo de Conta</TableHead>
                  <TableHead>Natureza</TableHead>
                  <TableHead>Saldo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.accountNumber}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>{account.accountNature}</TableCell>
                    <TableCell>{account.balance}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(account.status)}>
                        {getStatusText(account.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditAccount(account)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Limites
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowTransactionHistory(account.id)}
                        >
                          <History className="w-3 h-3 mr-1" />
                          Histórico
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Account Dialog */}
        <Dialog open={!!showEditAccount} onOpenChange={() => setShowEditAccount(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Conta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editAccountName">Nome da Conta</Label>
                <Input
                  id="editAccountName"
                  value={editAccountData.name}
                  onChange={(e) => setEditAccountData({...editAccountData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editAccountId">ID da Conta</Label>
                <Input
                  id="editAccountId"
                  value={editAccountData.accountId}
                  onChange={(e) => setEditAccountData({...editAccountData, accountId: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editStatus">Estado da Conta</Label>
                <Select value={editAccountData.status} onValueChange={(value: any) => setEditAccountData({...editAccountData, status: value})}>
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEditAccount(null)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleEditAccount} className="flex-1">
                  Guardar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Transaction History Dialog */}
        <Dialog open={!!showTransactionHistory} onOpenChange={() => setShowTransactionHistory(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Histórico de Transações</DialogTitle>
            </DialogHeader>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => onOpenTransactionManagement?.(transaction.id)}
                    >
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserAccountsScreen;