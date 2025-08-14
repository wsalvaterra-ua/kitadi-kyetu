import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Eye } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface Props {
  onBack: () => void;
  phoneNumber: string;
}

const UserAccessManagementScreen = ({ onBack, phoneNumber }: Props) => {
  const [status, setStatus] = useState<'ACTIVE'|'FROZEN'|'SUSPENDED'|'CLOSED'>('ACTIVE');
  const [pinResetRequested, setPinResetRequested] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Mock login attempts data
  const loginAttempts = [
    {
      id: 1,
      dateTime: '2024-01-15 10:30:15',
      interface: 'App Mobile',
      success: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      dateTime: '2024-01-15 08:45:22',
      interface: 'Web Portal',
      success: true,
      ipAddress: '192.168.1.105'
    },
    {
      id: 3,
      dateTime: '2024-01-14 22:15:33',
      interface: 'App Mobile',
      success: false,
      ipAddress: '192.168.1.100'
    },
    {
      id: 4,
      dateTime: '2024-01-14 18:20:44',
      interface: 'Web Portal',
      success: true,
      ipAddress: '192.168.1.105'
    }
  ];

  return (
    <div className="w-full">
      <PageHeader 
        title="Gestão de Acesso"
        description={`Utilizador: ${phoneNumber}`}
        onBack={onBack}
      />

      <div className="w-full p-8">
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="security" className="flex-1">Acesso e Segurança</TabsTrigger>
            <TabsTrigger value="attempts" className="flex-1">Tentativas de Login</TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Acesso e Segurança
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

          <TabsContent value="attempts" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Tentativas de Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Interface</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginAttempts.map((attempt) => (
                      <TableRow key={attempt.id}>
                        <TableCell>{attempt.dateTime}</TableCell>
                        <TableCell>{attempt.interface}</TableCell>
                        <TableCell className="font-mono text-sm">{attempt.ipAddress}</TableCell>
                        <TableCell>
                          <Badge variant={attempt.success ? "default" : "destructive"}>
                            {attempt.success ? "Sucesso" : "Falhado"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
