import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Phone, User, Building, Plus, Edit } from 'lucide-react';

interface ProfileManagementScreenProps {
  onBack: () => void;
  onCreatePersonalProfile: (phoneNumber: string) => void;
  onCreateBusinessProfile: (phoneNumber: string) => void;
  onEditProfile: (phoneNumber: string, profileId: string, type: 'personal' | 'business') => void;
}

interface Profile {
  id: string;
  type: 'personal' | 'business';
  name: string;
  status: 'ACTIVE' | 'PENDING_KYC' | 'SUSPENDED';
  createdAt: string;
}

const ProfileManagementScreen = ({ 
  onBack, 
  onCreatePersonalProfile, 
  onCreateBusinessProfile, 
  onEditProfile 
}: ProfileManagementScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate API call to search for user profiles
    setTimeout(() => {
      // Mock: Check if user exists and return their profiles
      const existingUsers = ['+2399123456', '+2399654321'];
      const userExists = existingUsers.includes(phoneNumber);
      
      if (userExists) {
        // Mock profiles for existing users
        const mockProfiles: Profile[] = phoneNumber === '+2399123456' ? [
          {
            id: 'personal_001',
            type: 'personal',
            name: 'Maria dos Santos Silva',
            status: 'ACTIVE',
            createdAt: '2024-01-15'
          },
          {
            id: 'business_001',
            type: 'business',
            name: 'Padaria Santos Lda',
            status: 'ACTIVE',
            createdAt: '2024-03-20'
          }
        ] : [
          {
            id: 'personal_002',
            type: 'personal',
            name: 'João Silva Costa',
            status: 'PENDING_KYC',
            createdAt: '2024-07-10'
          }
        ];
        
        setSearchResults(mockProfiles);
      } else {
        setSearchResults([]);
      }
      
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'PENDING_KYC':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente KYC</Badge>;
      case 'SUSPENDED':
        return <Badge className="bg-red-100 text-red-800">Suspenso</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProfileIcon = (type: string) => {
    return type === 'personal' ? User : Building;
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
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Perfis</h1>
              <p className="text-sm text-gray-500">Procurar e gerir perfis pessoais e comerciais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Procurar Utilizador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Número de Telefone
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+239 912 3456 (exemplo: usuário existente)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={!phoneNumber.trim() || isSearching}
                  className="px-6"
                >
                  {isSearching ? 'Procurando...' : 'Procurar'}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Introduza o número de telefone completo incluindo o código do país (+239)
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                <p><strong>Exemplos que funcionam:</strong></p>
                <p>• +2399123456 (Maria dos Santos - com perfis existentes)</p>
                <p>• +2399654321 (João Silva - perfil pendente)</p>
                <p>• +2399000000 (qualquer outro número - sem perfis)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Perfis do Utilizador: {phoneNumber}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCreatePersonalProfile(phoneNumber)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Perfil Pessoal
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCreateBusinessProfile(phoneNumber)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Perfil Comercial
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((profile) => {
                    const IconComponent = getProfileIcon(profile.type);
                    return (
                      <div
                        key={profile.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-kitadi-gold" />
                          <div>
                            <h3 className="font-medium text-kitadi-navy">{profile.name}</h3>
                            <p className="text-sm text-gray-500">
                              {profile.type === 'personal' ? 'Perfil Pessoal' : 'Perfil Comercial'} • 
                              Criado em {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(profile.status)}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEditProfile(phoneNumber, profile.id, profile.type)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Nenhum perfil encontrado</h3>
                  <p className="text-gray-500 mb-4">
                    Este utilizador ainda não possui perfis. Crie um perfil pessoal ou comercial.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Gestão de Perfis</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Cada utilizador pode ter múltiplos perfis (pessoal e comerciais). 
                  Use a busca por telefone para encontrar perfis existentes ou criar novos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileManagementScreen;