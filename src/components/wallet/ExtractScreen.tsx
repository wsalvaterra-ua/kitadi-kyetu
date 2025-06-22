
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText, Download, Calendar } from 'lucide-react';

interface ExtractScreenProps {
  onBack: () => void;
}

const ExtractScreen = ({ onBack }: ExtractScreenProps) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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
    { value: '12', label: 'Dezembro' },
  ];

  const years = ['2025', '2024', '2023'];

  const handleDownload = () => {
    if (selectedMonth && selectedYear) {
      console.log('Downloading extract for:', selectedMonth, selectedYear);
      // Here you would implement the actual CSV download logic
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-6">
        <div className="px-6 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Extrato de Movimentos</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-kitadi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-kitadi-orange" />
            </div>
            <CardTitle className="text-kitadi-navy">Exportar Extrato CSV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar Mês
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o mês" />
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
                Selecionar Ano
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o ano" />
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

            <Button
              onClick={handleDownload}
              disabled={!selectedMonth || !selectedYear}
              className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar Extrato CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-kitadi-orange mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">Informação</p>
                <p className="text-sm text-gray-600">
                  O extrato inclui todas as transações (enviadas, recebidas, depósitos e levantamentos) 
                  do mês selecionado em formato CSV.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExtractScreen;
