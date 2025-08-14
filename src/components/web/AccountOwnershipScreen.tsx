import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, UserMinus, Crown, User } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AccountOwner {
  id: number;
  name: string;
  phone: string;
  isPrimary: boolean;
  addedAt: string;
}

interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  currency: string;
  owners: AccountOwner[];
}

interface AccountOwnershipScreenProps {
  onBack: () => void;
}

const AccountOwnershipScreen = ({ onBack }: AccountOwnershipScreenProps) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [account, setAccount] = useState<Account | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [newOwnerPhone, setNewOwnerPhone] = useState('');
  const [showAddOwner, setShowAddOwner] = useState(false);

  const mockAccount: Account = {
    id: 12345,
    accountNumber: 'KT-123456789',
    balance: 45000,
    currency: 'STN',
    owners: [
      {
        id: 1,
        name: 'Maria dos Santos',
        phone: '+2399123456',
        isPrimary: true,
        addedAt: '2023-01-15T10:30:00Z'
      },
      {
        id: 2,
        name: 'João Santos',
        phone: '+2399123457',
        isPrimary: false,
        addedAt: '2023-06-20T14:15:00Z'
      },
      {
        id: 3,
        name: 'Ana Santos',
        phone: '+2399123458',
        isPrimary: false,
        addedAt: '2023-09-10T09:45:00Z'
      }
    ]
  };

  const handleSearchAccount = async () => {
    if (!searchPhone.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      if (searchPhone === '+2399123456') {
        setAccount(mockAccount);
      } else {
        setAccount(null);
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleAddOwner = () => {
    if (!newOwnerPhone.trim() || !account) return;
    
    const newOwner: AccountOwner = {
      id: Date.now(),
      name: 'Novo Utilizador', // Would come from user lookup
      phone: newOwnerPhone,
      isPrimary: false,
      addedAt: new Date().toISOString()
    };
    
    setAccount({
      ...account,
      owners: [...account.owners, newOwner]
    });
    
    setNewOwnerPhone('');
    setShowAddOwner(false);
  };

  const handleRemoveOwner = (ownerId: number) => {
    if (!account) return;
    
    const ownerToRemove = account.owners.find(o => o.id === ownerId);
    if (ownerToRemove?.isPrimary) {
      alert('Não é possível remover o proprietário principal');
      return;
    }
    
    setAccount({
      ...account,
      owners: account.owners.filter(o => o.id !== ownerId)
    });
  };

  return (
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Gestão de Proprietários"
        description="Gerir proprietários de contas bancárias"
        onBack={onBack}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Pesquisar Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="phoneNumber">Número de Telefone do Proprietário</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+239 912 3456"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchAccount()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearchAccount}
                  disabled={!searchPhone.trim() || isSearching}
                >
                  {isSearching ? 'Procurando...' : 'Procurar'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Exemplo que funciona: +2399123456
            </p>
          </CardContent>
        </Card>

        {/* Account Details */}
        {account && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Detalhes da Conta
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddOwner(true)}
                  className="bg-kitadi-orange text-white border-kitadi-orange hover:bg-kitadi-orange/90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Proprietário
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Número da Conta</Label>
                  <p className="text-lg font-mono">{account.accountNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Saldo</Label>
                  <p className="text-lg font-bold">{account.balance.toLocaleString()} {account.currency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Owners Table */}
        {account && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Proprietários da Conta ({account.owners.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Adicionado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.owners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell className="font-medium">{owner.name}</TableCell>
                      <TableCell className="font-mono">{owner.phone}</TableCell>
                      <TableCell>
                        {owner.isPrimary ? (
                          <Badge variant="default" className="bg-kitadi-orange">
                            <Crown className="w-3 h-3 mr-1" />
                            Principal
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Secundário</Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(owner.addedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {!owner.isPrimary && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveOwner(owner.id)}
                          >
                            <UserMinus className="w-4 h-4 mr-1" />
                            Remover
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Add Owner Dialog */}
        <Dialog open={showAddOwner} onOpenChange={setShowAddOwner}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Proprietário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newOwnerPhone">Número de Telefone</Label>
                <Input
                  id="newOwnerPhone"
                  placeholder="+239 XXX XXXX"
                  value={newOwnerPhone}
                  onChange={(e) => setNewOwnerPhone(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddOwner}
                  disabled={!newOwnerPhone.trim()}
                  className="bg-kitadi-orange hover:bg-kitadi-orange/90"
                >
                  Adicionar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddOwner(false)}
                >
                  Cancelar
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                O utilizador será automaticamente adicionado como proprietário secundário.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* No Results */}
        {searchPhone && !account && !isSearching && (
          <Card>
            <CardContent className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Conta não encontrada</h3>
              <p className="text-gray-500">Nenhuma conta encontrada para o número "{searchPhone}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AccountOwnershipScreen;