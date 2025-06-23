
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Bell, MessageSquare } from 'lucide-react';

interface NotificationSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationSettingsDialog = ({ 
  open, 
  onOpenChange 
}: NotificationSettingsDialogProps) => {
  const [notificationPreference, setNotificationPreference] = useState('');

  const handleSave = () => {
    if (notificationPreference) {
      console.log('Notification preference saved:', notificationPreference);
      // Here you would typically save the preference to your backend
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-kitadi-orange" />
            </div>
            <DialogTitle className="text-kitadi-navy">Receber Notificações</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            Deseja receber notificações para transações recebidas? As notificações serão enviadas por SMS.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-700">
              As transações serão notificadas via SMS para o seu número registado.
            </p>
          </div>

          <RadioGroup value={notificationPreference} onValueChange={setNotificationPreference}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium text-kitadi-navy">Sim</p>
                  <p className="text-sm text-gray-600">Receber notificações SMS para todas as transações recebidas</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium text-kitadi-navy">Não</p>
                  <p className="text-sm text-gray-600">Não receber notificações SMS</p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!notificationPreference}
              className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
