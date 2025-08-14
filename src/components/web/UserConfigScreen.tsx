import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface Props {
  onBack: () => void;
  phoneNumber: string;
}

const UserConfigScreen = ({ onBack, phoneNumber }: Props) => {
  const [phone, setPhone] = useState(phoneNumber);
  const [allowSms, setAllowSms] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Configurações do Utilizador"
        description="Atualizar dados de contacto e preferências"
        onBack={onBack}
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Número de Telefone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              <p className="text-xs text-gray-500 mt-1">A alteração do número pode exigir verificação.</p>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="allowSms" checked={allowSms} onCheckedChange={(c) => setAllowSms(c === true)} />
              <Label htmlFor="allowSms" className="text-sm">Permitir transações via SMS</Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={onBack}>Cancelar</Button>
              <Button className="flex-1" onClick={() => setShowConfirm(true)}>Guardar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurações guardadas</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">As preferências do utilizador foram atualizadas com sucesso.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserConfigScreen;
