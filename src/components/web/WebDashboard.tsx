import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Download, Eye, CreditCard, Users } from 'lucide-react';

interface WebDashboardProps {
  userType: 'user' | 'merchant';
  onLogout: () => void;
  onViewTransactions: () => void;
  onDownloadExtract: () => void;
}

const WebDashboard = ({ userType, onLogout, onViewTransactions, onDownloadExtract }: WebDashboardProps) => {
  const mockBalance = userType === 'merchant' ? '1,250,000 STN' : '45,000 STN';
  const mockTransactionCount = userType === 'merchant' ? 234 : 12;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
              alt="Kitadi Logo" 
              className="h-8 w-auto mr-3"
            />
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Kitadi Web</h1>
              <p className="text-sm text-gray-500">
                {userType === 'merchant' ? 'Painel Comerciante' : 'Carteira Digital'} - Modo Consulta
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {userType === 'merchant' ? 'Saldo Comercial' : 'Saldo Disponível'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-kitadi-navy mb-2">
              {mockBalance}
            </div>
            <p className="text-gray-600">
              {mockTransactionCount} transações este mês
            </p>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewTransactions}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Ver Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Consulte o histórico completo de transações realizadas
              </p>
              <Button variant="outline" className="mt-4 w-full">
                Abrir Histórico
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onDownloadExtract}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Baixar Extrato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gere e baixe extratos detalhados em formato CSV
              </p>
              <Button variant="outline" className="mt-4 w-full">
                Gerar Extrato
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info for Merchants */}
        {userType === 'merchant' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Informações Comerciais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-kitadi-orange">156</div>
                  <p className="text-sm text-gray-600">Pagamentos Hoje</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-kitadi-orange">2,340</div>
                  <p className="text-sm text-gray-600">Total este Mês</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-kitadi-orange">98%</div>
                  <p className="text-sm text-gray-600">Taxa de Sucesso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Read-only Notice */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm text-center">
            <strong>Modo Consulta:</strong> Esta é uma versão somente leitura. 
            Para realizar transações, utilize a versão mobile do Kitadi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebDashboard;