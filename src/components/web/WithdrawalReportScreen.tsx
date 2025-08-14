import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface WithdrawalReportScreenProps {
  onBack: () => void;
}

const WithdrawalReportScreen = ({ onBack }: WithdrawalReportScreenProps) => {
  const [bankId, setBankId] = useState('');
  const [operationId, setOperationId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!bankId || !operationId || !amount || !date) return;
    console.log('Withdrawal report submitted', { bankId, operationId, amount, date });
    alert('Depósito reportado com sucesso!');
    setBankId('');
    setOperationId('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="Reportar Depósito Operacional" 
        onBack={onBack}
      />
      
      <div className="w-full p-8">
        <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Depósito Operacional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankId">ID do Banco</Label>
                <Input id="bankId" placeholder="Ex: BANK001" value={bankId} onChange={(e) => setBankId(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="operationId">ID da Operação</Label>
                <Input id="operationId" placeholder="Ex: OP123456789" value={operationId} onChange={(e) => setOperationId(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="amount">Valor (STN)</Label>
                <Input id="amount" type="number" placeholder="50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={!bankId || !operationId || !amount || !date} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Reportar Depósito
              </Button>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-700 text-sm">Esta funcionalidade permite registar depósitos operacionais efetuados em bancos externos para efeitos de reconciliação e auditoria.</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalReportScreen;
