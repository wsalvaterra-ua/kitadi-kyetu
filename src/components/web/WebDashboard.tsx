import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Download, Eye, CreditCard, Users, UserPlus, Building, Plus, Search, UserCheck, DollarSign, CheckCircle, Wallet, FileText, Settings, ArrowDownCircle, Banknote } from 'lucide-react';

interface WebDashboardProps {
  userType: 'personal' | 'business' | 'agent' | 'business-associated' | 'merchant';
  onLogout: () => void;
  onViewTransactions: () => void;
  onDownloadExtract: () => void;
  onCreateAccount?: () => void;
  onCreateMerchantProfile?: () => void;
  onAddReconciliation?: () => void;
  onTransactionManagement?: () => void;
  onAccountOwnership?: () => void;
  onBankTransactionApproval?: () => void;
  onCashVerification?: () => void;
  onCashReserve?: () => void;
  onExternalBankTransfer?: () => void;
  onOperatorManagement?: () => void;
  onWithdrawalReport?: () => void;
  onAgentCashoutRequest?: () => void;
}

const WebDashboard = ({ 
  userType, 
  onLogout, 
  onViewTransactions, 
  onDownloadExtract, 
  onCreateAccount, 
  onCreateMerchantProfile, 
  onAddReconciliation,
  onTransactionManagement,
  onAccountOwnership,
  onBankTransactionApproval,
  onCashVerification,
  onCashReserve,
  onExternalBankTransfer,
  onOperatorManagement,
  onWithdrawalReport,
  onAgentCashoutRequest
}: WebDashboardProps) => {
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
    <div className="w-full p-8">
        {userType === 'agent' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Balance Card */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                    <CreditCard className="w-5 h-5" />
                    {userInfo.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{userInfo.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-kitadi-orange mb-2">
                    {userInfo.balance}
                  </div>
                  <p className="text-gray-600">
                    {userInfo.transactions} transações este mês
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Agent Statistics Cards */}
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-kitadi-orange">12</div>
                    <p className="text-sm text-gray-600">Novos clientes hoje</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-kitadi-orange">85</div>
                    <p className="text-sm text-gray-600">Novos clientes este mês</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="mb-8 w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                <CreditCard className="w-5 h-5" />
                {userInfo.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{userInfo.description}</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-kitadi-orange mb-2">
                {userInfo.balance}
              </div>
              <p className="text-gray-600">
                {userInfo.transactions} transações este mês
              </p>
            </CardContent>
          </Card>
        )}

        {/* Consultas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-kitadi-navy mb-4">Consultas</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
            <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onDownloadExtract}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kitadi-orange">
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
        </div>

        {/* Agent-specific action cards */}
        {userType === 'agent' && (
          <>
            {/* Gestão de Clientes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kitadi-navy mb-4">Gestão de Clientes</h2>
              <div className="grid gap-6 grid-cols-1 w-full">
                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onCreateMerchantProfile}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Building className="w-5 h-5" />
                      Gerir Clientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Pesquise clientes e gira perfis, contas bancárias e proprietários
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Gerir
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Transações */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kitadi-navy mb-4">Transações</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onAgentCashoutRequest}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Banknote className="w-5 h-5" />
                      Transações com Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Efetue Cash-in, Cash-out e transações em nome do cliente
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Abrir
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onTransactionManagement}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Search className="w-5 h-5" />
                      Gestão de Transações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Pesquisar e gerir transações por ID
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Pesquisar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Operações Financeiras */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kitadi-navy mb-4">Operações Financeiras</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onAddReconciliation}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Plus className="w-5 h-5" />
                      Reconciliação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gerir reconciliação e histórico
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Abrir
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onBankTransactionApproval}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <CheckCircle className="w-5 h-5" />
                      Verificar Operações de Reconciliação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Verifique operações ligadas à reconciliação: depósitos bancários, levantamentos e receção de dinheiro físico
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Verificar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onCashReserve}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Wallet className="w-5 h-5" />
                      Reserva de Dinheiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gerir reserva de dinheiro do cofre
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Gerir
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onExternalBankTransfer}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <FileText className="w-5 h-5" />
                      Verificar Cash In/Out via Banco
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Verifique cash in/out realizados via banco
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Verificar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sistema */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-kitadi-navy mb-4">Sistema</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
                <Card className="cursor-pointer hover:shadow-md transition-shadow w-full" onClick={onOperatorManagement}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                      <Settings className="w-5 h-5" />
                      Gestão de Operadores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gerir horários e status dos operadores
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Gerir
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Additional Info for Business/Merchant accounts (excluding agent) */}
        {(userType === 'merchant' || userType === 'business' || userType === 'business-associated') && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kitadi-orange">
                <Users className="w-5 h-5" />
                {userType === 'merchant' && 'Informações Comerciais'}
                {userType === 'business' && 'Métricas do Negócio'}
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

    </div>
  );
};

export default WebDashboard;