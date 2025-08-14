import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Phone, User } from 'lucide-react';

interface UserListItem {
  name: string;
  phone: string;
  idNumber: string;
  nif: string;
}

interface UserManagementScreenProps {
  onBack: () => void;
  onUserFound: (phoneNumber: string) => void;
  onCreateNewUser: (phoneNumber: string) => void;
  onManageUser?: (phoneNumber: string) => void;
  onManageAccounts?: (phoneNumber: string) => void;
  onManageAccess?: (phoneNumber: string) => void;
  onManageConfig?: (phoneNumber: string) => void;
}

const MOCK_USERS: UserListItem[] = [
  { name: 'Maria dos Santos', phone: '+2399123456', idNumber: '1234567890', nif: 'NIF123456789' },
  { name: 'João Silva', phone: '+2399654321', idNumber: '9876543210', nif: 'NIF987654321' },
  { name: 'Pedro Costa', phone: '+2399987654', idNumber: '1112223334', nif: 'NIF111222333' },
];

const AccountManagementScreen = ({ onBack, onUserFound, onCreateNewUser, onManageUser, onManageAccounts, onManageAccess, onManageConfig }: UserManagementScreenProps) => {
  const [tab, setTab] = useState<'phone' | 'name' | 'id' | 'nif'>('phone');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<UserListItem[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [verifyOpen, setVerifyOpen] = useState(false);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  const placeholder = useMemo(() => {
    switch (tab) {
      case 'name':
        return 'Ex: Maria, João...';
      case 'id':
        return 'Nº Identificação (BI/Passaporte)';
      case 'nif':
        return 'NIF Fiscal';
      default:
        return '+239 912 3456';
    }
  }, [tab]);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      const filtered = MOCK_USERS.filter(u => {
        if (tab === 'phone') return u.phone.includes(q);
        if (tab === 'name') return u.name.toLowerCase().includes(q.toLowerCase());
        if (tab === 'id') return u.idNumber.toLowerCase().includes(q.toLowerCase());
        if (tab === 'nif') return u.nif.toLowerCase().includes(q.toLowerCase());
        return false;
      });
      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleVerifyAndNavigate = (phone: string) => {
    setPendingPhone(phone);
    setVerifyOpen(true);
    setCode('');
    setCodeSent(false);
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
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Contas</h1>
              <p className="text-sm text-gray-500">Procurar e gerir contas bancárias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Procurar Utilizador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Select value={tab} onValueChange={(v) => { setTab(v as any); setResults(null); setHasSearched(false); }}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Critério" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="id">Identificação</SelectItem>
                  <SelectItem value="nif">NIF</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                {tab === 'phone' && <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />}
                <Input
                  type={tab === 'phone' ? 'tel' : 'text'}
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setResults(null); setHasSearched(false); }}
                  className={tab === 'phone' ? 'pl-10' : ''}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={!query.trim() || isSearching} className="px-6">
                {isSearching ? 'A listar...' : 'Listar Resultados'}
              </Button>
            </div>
            {tab === 'phone' && (
              <div className="text-xs text-gray-500 space-y-1">
                <p>Introduza o número completo com o código do país (+239)</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium select-all">Exemplo: +2399123456</span>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard?.writeText('+2399123456')}>Copiar</Button>
                  <Button size="sm" variant="ghost" onClick={() => setQuery('+2399123456')}>Preencher</Button>
                </div>
              </div>
            )}

            {/* Results List */}
            {hasSearched && results && (
              results.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Sem resultados para "{query}"</p>
                  {tab === 'phone' && (
                    <Button size="sm" onClick={() => onCreateNewUser(query)}>
                      Criar novo utilizador com {query}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((u) => (
                    <div key={u.phone} className="p-3 border rounded-lg bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-gray-500">Tel: {u.phone} • ID: {u.idNumber}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleVerifyAndNavigate(u.phone)}>Perfil</Button>
                        <Button size="sm" variant="outline" onClick={() => onManageAccounts && onManageAccounts(u.phone)}>Contas</Button>
                        <Button size="sm" variant="outline" onClick={() => onManageAccess && onManageAccess(u.phone)}>Acesso</Button>
                        <Button size="sm" variant="outline" onClick={() => onManageConfig && onManageConfig(u.phone)}>Configurações</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}


            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Gestão de Contas</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Pesquise por nome, identificação, NIF ou telefone para gerir perfis, acessos, limitações, associações e histórico.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verificação de Segurança</DialogTitle>
              <DialogDescription>
                Envie o código por SMS e introduza-o para aceder ao perfil e contas.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Código recebido pelo cliente"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => setCodeSent(true)}
                  disabled={codeSent}
                >
                  {codeSent ? 'Enviado' : 'Enviar Código'}
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setVerifyOpen(false)}>Cancelar</Button>
                <Button
                  onClick={() => {
                    if (!code.trim()) return;
                    const phone = pendingPhone;
                    setVerifyOpen(false);
                    if (phone) {
                      onManageUser ? onManageUser(phone) : onUserFound(phone);
                    }
                  }}
                  disabled={!code.trim()}
                >
                  Verificar e Continuar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountManagementScreen;
