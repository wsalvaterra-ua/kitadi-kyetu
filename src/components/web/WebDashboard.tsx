import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Download, Eye, CreditCard, Users, UserPlus, Building, Plus } from 'lucide-react';

interface WebDashboardProps {
  userType: 'personal' | 'business' | 'agent' | 'business-associated' | 'merchant';
  onLogout: () => void;
  onViewTransactions: () => void;
  onDownloadExtract: () => void;
  onCreateAccount?: () => void;
  onCreateMerchantProfile?: () => void;
  onAddReconciliation?: () => void;
}

const WebDashboard = ({ userType, onLogout, onViewTransactions, onDownloadExtract, onCreateAccount, onCreateMerchantProfile, onAddReconciliation }: WebDashboardProps) => {
  const getUserTypeInfo = () => {
    switch (userType) {
      case 'personal':
        return { 
          title: 'Carteira Pessoal', 
          balance: '45,000 STN', 
          transactions: 12,
          description: 'Conta pessoal verificada'
        };
      case 'business':
        return { 
          title: 'Conta Comercial', 
          balance: '125,000 STN', 
          transactions: 89,
          description: 'Conta comercial ativa'
        };
      case 'agent':
        return { 
          title: 'Conta Agente', 
          balance: '89,340 STN', 
          transactions: 156,
          description: 'Agente autorizado'
        };
      case 'business-associated':
        return { 
          title: 'Conta Comercial Associada', 
          balance: '67,890 STN', 
          transactions: 45,
          description: 'Balcão associado'
        };
      case 'merchant':
        return { 
          title: 'Painel Comerciante', 
          balance: '1,250,000 STN', 
          transactions: 234,
          description: 'Dashboard comercial'
        };
      default:
        return { 
          title: 'Carteira Digital', 
          balance: '0 STN', 
          transactions: 0,
          description: 'Conta não identificada'
        };
    }
  };

  const userInfo = getUserTypeInfo();

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
                {userInfo.title} - Modo Consulta
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
              {userInfo.title}
            </CardTitle>
            <p className="text-sm text-gray-600">{userInfo.description}</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-kitadi-navy mb-2">
              {userInfo.balance}
            </div>
            <p className="text-gray-600">
              {userInfo.transactions} transações este mês
            </p>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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

          {/* Agent-specific action cards */}
          {userType === 'agent' && (
            <>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onCreateMerchantProfile}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Gerir Contas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pesquise clientes e gira perfis e contas bancárias
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Gerir
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onAddReconciliation}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Reconciliação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Adicionar transação manual para reconciliação
                  </p>
                  <Button variant="outline" className="mt-4 w-full">
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Additional Info for Business/Agent/Merchant accounts */}
        {(userType === 'merchant' || userType === 'business' || userType === 'agent' || userType === 'business-associated') && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {userType === 'merchant' && 'Informações Comerciais'}
                {userType === 'business' && 'Métricas do Negócio'}
                {userType === 'agent' && 'Estatísticas de Agente'}
                {userType === 'business-associated' && 'Dados do Balcão'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {userType === 'merchant' && (
                  <>
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
                  </>
                )}
                {userType === 'business' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">89</div>
                      <p className="text-sm text-gray-600">Transações Hoje</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">1,567</div>
                      <p className="text-sm text-gray-600">Total este Mês</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">95%</div>
                      <p className="text-sm text-gray-600">Operações Concluídas</p>
                    </div>
                  </>
                )}
                {userType === 'agent' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">234</div>
                      <p className="text-sm text-gray-600">Clientes Atendidos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">3,456</div>
                      <p className="text-sm text-gray-600">Operações este Mês</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">99%</div>
                      <p className="text-sm text-gray-600">Taxa de Aprovação</p>
                    </div>
                  </>
                )}
                {userType === 'business-associated' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">45</div>
                      <p className="text-sm text-gray-600">Vendas Hoje</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">789</div>
                      <p className="text-sm text-gray-600">Total este Mês</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-kitadi-orange">97%</div>
                      <p className="text-sm text-gray-600">Balcão Ativo</p>
                    </div>
                  </>
                )}
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