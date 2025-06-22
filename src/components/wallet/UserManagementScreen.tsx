
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, UserPlus, Users, Phone, Trash2 } from 'lucide-react';

interface UserManagementScreenProps {
  onBack: () => void;
}

const UserManagementScreen = ({ onBack }: UserManagementScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [associatedUsers] = useState([
    { id: '1', name: 'Maria Santos', phone: '+239 991 1234', role: 'Funcionário', status: 'active' },
    { id: '2', name: 'Pedro Costa', phone: '+239 991 5678', role: 'Gerente', status: 'active' },
    { id: '3', name: 'Ana Silva', phone: '+239 991 9876', role: 'Funcionário', status: 'pending' },
  ]);

  const handleInviteUser = () => {
    if (phoneNumber) {
      console.log('Inviting user:', phoneNumber);
      setPhoneNumber('');
      // Here you would implement the actual invitation logic
    }
  };

  const handleRemoveUser = (userId: string) => {
    console.log('Removing user:', userId);
    // Here you would implement the actual removal logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Gerir Utilizadores</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Invite User */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Convidar Utilizador</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Telefone
              </label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+239 991 2345"
                className="text-center"
              />
            </div>
            <Button
              onClick={handleInviteUser}
              disabled={!phoneNumber}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
            >
              Enviar Convite
            </Button>
          </CardContent>
        </Card>

        {/* Associated Users */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Utilizadores Associados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {associatedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-kitadi-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-kitadi-navy">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.status === 'active' ? 'Ativo' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveUser(user.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagementScreen;
