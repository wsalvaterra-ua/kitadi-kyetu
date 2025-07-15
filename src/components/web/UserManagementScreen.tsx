import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, Phone, User } from 'lucide-react';

interface UserManagementScreenProps {
  onBack: () => void;
  onUserFound: (phoneNumber: string) => void;
  onCreateNewUser: (phoneNumber: string) => void;
}

const UserManagementScreen = ({ onBack, onUserFound, onCreateNewUser }: UserManagementScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call to search for user
    setTimeout(() => {
      // Mock: Check if user exists (simulate some existing users)
      const existingUsers = ['+2399123456', '+2399654321', '+2399987654'];
      const userExists = existingUsers.includes(phoneNumber);
      
      setIsSearching(false);
      
      if (userExists) {
        onUserFound(phoneNumber);
      } else {
        onCreateNewUser(phoneNumber);
      }
    }, 1000);
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
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Utilizadores</h1>
              <p className="text-sm text-gray-500">Procurar e gerir utilizadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card>
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
                    placeholder="+239 123 456 789"
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
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Como funciona?</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Se o utilizador já existir, poderá gerir o seu perfil e contas.
                    Se não existir, será direcionado para criar um novo perfil.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagementScreen;