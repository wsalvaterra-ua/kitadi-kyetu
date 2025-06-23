
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
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-kitadi-orange" />
            </div>
          </div>
          <DialogTitle className="text-center text-kitadi-navy text-xl">
            Receber Notificações
          </DialogTitle>
          <DialogDescription className="text-center mt-4">
            Deseja receber notificações para transações recebidas? As notificações serão enviadas por SMS.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
            <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              As transações serão notificadas via SMS para o seu número registado.
            </p>
          </div>

          <RadioGroup value={notificationPreference} onValueChange={setNotificationPreference}>
            <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <RadioGroupItem value="yes" id="yes" className="mt-1" />
              <Label htmlFor="yes" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-semibold text-kitadi-navy text-lg">Sim</p>
                  <p className="text-sm text-gray-600 mt-1">Receber notificações SMS para todas as transações recebidas</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <RadioGroupItem value="no" id="no" className="mt-1" />
              <Label htmlFor="no" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-semibold text-kitadi-navy text-lg">Não</p>
                  <p className="text-sm text-gray-600 mt-1">Não receber notificações SMS</p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <div className="flex space-x-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 text-base"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!notificationPreference}
              className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-base"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
