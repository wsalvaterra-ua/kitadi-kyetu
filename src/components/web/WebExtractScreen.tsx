import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Calendar, FileText } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface WebExtractScreenProps {
  userType: 'personal' | 'business' | 'agent' | 'business-associated' | 'merchant';
  onBack: () => void;
}

const WebExtractScreen = ({ userType, onBack }: WebExtractScreenProps) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeRequested, setCodeRequested] = useState(false);

  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const years = ['2024', '2023', '2022'];

  const handleDownload = async () => {
    if (!selectedMonth || !selectedYear || !accountId || !verificationCode) return;

    setIsGenerating(true);
    
    // Simulate file generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create mock CSV content based on user type
      let csvContent = '';
      
      if (userType === 'merchant') {
        csvContent = `Data,Hora,Tipo,Valor,Cliente,Status\n2024-01-15,14:30,Pagamento QR,15000 STN,João Silva,Concluído\n2024-01-15,12:15,Pagamento QR,8500 STN,Maria Santos,Concluído`;
      } else if (userType === 'business') {
        csvContent = `Data,Hora,Tipo,Valor,Descrição,Status\n2024-01-15,14:30,Recebimento,25000 STN,Pagamento Cliente,Concluído\n2024-01-15,12:15,Envio,8500 STN,Pagamento Fornecedor,Concluído`;
      } else if (userType === 'agent') {
        csvContent = `Data,Hora,Tipo,Valor,Cliente,Status\n2024-01-15,14:30,Comissão,2500 STN,Cliente #12345,Concluído\n2024-01-15,12:15,Taxa Serviço,1200 STN,Cliente #67890,Concluído`;
      } else if (userType === 'business-associated') {
        csvContent = `Data,Hora,Tipo,Valor,Descrição,Status\n2024-01-15,14:30,Venda,15000 STN,Venda no Balcão,Concluído\n2024-01-15,12:15,Comissão,750 STN,Comissão de Venda,Concluído`;
      } else {
        csvContent = `Data,Hora,Tipo,Valor,Descrição,Status\n2024-01-15,14:30,Envio,5000 STN,Para Maria,Concluído\n2024-01-14,16:45,Recebimento,10000 STN,De João,Concluído`;
      }
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kitadi_extrato_${selectedYear}_${selectedMonth}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 2000);
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Baixar Extrato"
        onBack={onBack}
      />

      <div className="w-full p-8">
        <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {userType === 'merchant' && 'Extrato de Vendas'}
              {userType === 'business' && 'Extrato Comercial'}
              {userType === 'agent' && 'Extrato de Operações'}
              {userType === 'business-associated' && 'Extrato do Balcão'}
              {userType === 'personal' && 'Extrato de Transações'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">ID da Conta</label>
                <Input placeholder="Ex: KT-123456789" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
              </div>
              <div className="flex items-end">
                <Button type="button" onClick={() => setCodeRequested(true)} disabled={!accountId} className="w-full">
                  Solicitar Código
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Código de Verificação</label>
              <Input placeholder="Código enviado ao utilizador" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              {codeRequested && (
                <p className="text-xs text-gray-500 mt-2">Um código foi enviado ao utilizador desta conta. Insira-o para prosseguir.</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mês
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-blue-900">Sobre o Extrato</h3>
              </div>
              <p className="text-sm text-blue-800">
                O extrato será gerado em formato CSV contendo todas as {
                  userType === 'merchant' ? 'vendas' : 
                  userType === 'business' ? 'transações comerciais' :
                  userType === 'agent' ? 'operações' :
                  userType === 'business-associated' ? 'vendas do balcão' :
                  'transações'
                } do período selecionado. 
                Este arquivo pode ser aberto em Excel ou outras planilhas.
              </p>
            </div>

            <Button
              onClick={handleDownload}
              disabled={!selectedMonth || !selectedYear || !accountId || !verificationCode || isGenerating}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg font-semibold"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Gerando Extrato...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Baixar Extrato
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default WebExtractScreen;