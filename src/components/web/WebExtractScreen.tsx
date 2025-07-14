import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Calendar, FileText } from 'lucide-react';

interface WebExtractScreenProps {
  userType: 'user' | 'merchant';
  onBack: () => void;
}

const WebExtractScreen = ({ userType, onBack }: WebExtractScreenProps) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    if (!selectedMonth || !selectedYear) return;

    setIsGenerating(true);
    
    // Simulate file generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create mock CSV content
      const csvContent = userType === 'merchant' 
        ? `Data,Hora,Tipo,Valor,Cliente,Status\n2024-01-15,14:30,Pagamento QR,15000 STN,João Silva,Concluído\n2024-01-15,12:15,Pagamento QR,8500 STN,Maria Santos,Concluído`
        : `Data,Hora,Tipo,Valor,Descrição,Status\n2024-01-15,14:30,Envio,5000 STN,Para Maria,Concluído\n2024-01-14,16:45,Recebimento,10000 STN,De João,Concluído`;
      
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/eaf20c9f-d9d2-4df9-a59b-9270a930044e.png" 
              alt="Kitadi Logo" 
              className="h-6 w-auto mr-2"
            />
            <h1 className="text-xl font-bold text-kitadi-navy">Gerar Extrato</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {userType === 'merchant' ? 'Extrato de Vendas' : 'Extrato de Transações'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                O extrato será gerado em formato CSV contendo todas as {userType === 'merchant' ? 'vendas' : 'transações'} do período selecionado. 
                Este arquivo pode ser aberto em Excel ou outras planilhas.
              </p>
            </div>

            <Button
              onClick={handleDownload}
              disabled={!selectedMonth || !selectedYear || isGenerating}
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
  );
};

export default WebExtractScreen;