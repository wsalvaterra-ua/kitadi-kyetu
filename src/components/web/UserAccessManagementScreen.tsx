import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Monitor, Smartphone } from 'lucide-react';

interface Props {
  onBack: () => void;
  phoneNumber: string;
}

const UserAccessManagementScreen = ({ onBack, phoneNumber }: Props) => {
  const [status, setStatus] = useState<'ACTIVE'|'FROZEN'|'SUSPENDED'|'CLOSED'>('ACTIVE');
  const [pinResetRequested, setPinResetRequested] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Mock login attempts data
  const [loginAttempts] = useState([
    {
      id: '1',
      interface: 'Mobile App',
      dateTime: '2024-01-15 14:30:25',
      success: true,
      location: 'São Tomé'
    },
    {
      id: '2',
      interface: 'Web Portal',
      dateTime: '2024-01-15 09:15:10',
      success: false,
      location: 'São Tomé'
    },
    {
      id: '3',
      interface: 'Mobile App',
      dateTime: '2024-01-14 18:45:33',
      success: true,
      location: 'Príncipe'
    },
    {
      id: '4',
      interface: 'Mobile App',
      dateTime: '2024-01-14 12:20:15',
      success: true,
      location: 'São Tomé'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Acesso</h1>
              <p className="text-sm text-gray-500">Utilizador: {phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-8">
        <div className="w-full">
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="security">Acesso e Segurança</TabsTrigger>
              <TabsTrigger value="history">Histórico de Acessos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Estado da Conta</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Ativo</SelectItem>
                        <SelectItem value="FROZEN">Congelado</SelectItem>
                        <SelectItem value="SUSPENDED">Suspenso</SelectItem>
                        <SelectItem value="CLOSED">Fechado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Gestão de PIN</Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" onClick={() => setPinResetRequested(true)}>Resetar PIN</Button>
                      {pinResetRequested && <span className="text-green-600 text-sm">✓ PIN resetado</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={onBack}>Cancelar</Button>
                    <Button className="flex-1" onClick={() => setShowConfirm(true)}>Guardar Alterações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Tentativas de Acesso</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Interface</TableHead>
                        <TableHead>Data e Hora</TableHead>
                        <TableHead>Sucesso</TableHead>
                        <TableHead>Localização</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginAttempts.map((attempt) => (
                        <TableRow key={attempt.id}>
                          <TableCell className="flex items-center gap-2">
                            {attempt.interface === 'Mobile App' ? 
                              <Smartphone className="w-4 h-4" /> : 
                              <Monitor className="w-4 h-4" />
                            }
                            {attempt.interface}
                          </TableCell>
                          <TableCell>{attempt.dateTime}</TableCell>
                          <TableCell>
                            <Badge variant={attempt.success ? "default" : "destructive"}>
                              {attempt.success ? 'Sucesso' : 'Falhada'}
                            </Badge>
                          </TableCell>
                          <TableCell>{attempt.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterações guardadas</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">Estado e configurações de acesso atualizados com sucesso.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAccessManagementScreen;
