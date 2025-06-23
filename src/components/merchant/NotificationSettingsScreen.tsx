
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Bell, MessageSquare, ArrowLeft } from 'lucide-react';

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export const NotificationSettingsScreen = ({ onBack }: NotificationSettingsScreenProps) => {
  const [notificationPreference, setNotificationPreference] = useState('');

  const handleSave = () => {
    if (notificationPreference) {
      console.log('Notification preference saved:', notificationPreference);
      // Here you would typically save the preference to your backend
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex items-center px-6 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange/10 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-kitadi-orange" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Receber Notificações</h1>
        <p className="text-center text-white/80 mt-2">Configure suas preferências</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy text-xl">
              Notificações por SMS
            </CardTitle>
            <CardDescription className="text-center mt-4">
              Deseja receber notificações para transações recebidas? As notificações serão enviadas por SMS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <Button 
              onClick={handleSave}
              disabled={!notificationPreference}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-6 rounded-xl font-semibold mt-8"
            >
              Guardar Preferências
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
