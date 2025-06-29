
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Banknote, CreditCard } from 'lucide-react';

interface AddReconciliationScreenProps {
  onBack: () => void;
}

const AddReconciliationScreen = ({ onBack }: AddReconciliationScreenProps) => {
  const [transactionForm, setTransactionForm] = useState({
    depositId: '',
    bank: '',
    value: '',
    operationType: 'deposit' // 'deposit' or 'cash'
  });

  const banks = [
    'BFA - Banco de Fomento Angola',
    'BAI - Banco Angolano de Investimentos',
    'BIC - Banco BIC',
    'Millennium Atlântico',
    'Standard Bank Angola',
    'Banco Sol',
    'Banco Económico',
    'Banco de Poupança e Crédito'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting manual transaction:', transactionForm);
    // Here you would implement the transaction submission logic
    
    // Reset form after submission
    setTransactionForm({
      depositId: '',
      bank: '',
      value: '',
      operationType: 'deposit'
    });
    
    // Navigate back after successful submission
    onBack();
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
          <h1 className="text-white text-xl font-semibold">Adicionar Reconciliação</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-kitadi-navy flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Nova Transação de Reconciliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Operation Type Selection */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Operação
                </Label>
                <RadioGroup
                  value={transactionForm.operationType}
                  onValueChange={(value) => setTransactionForm({...transactionForm, operationType: value})}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deposit" id="deposit" />
                    <Label htmlFor="deposit" className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Depósito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <Banknote className="w-4 h-4 mr-1" />
                      Dinheiro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Fields for Deposit */}
              {transactionForm.operationType === 'deposit' && (
                <>
                  <div>
                    <Label htmlFor="depositId" className="block text-sm font-medium text-gray-700 mb-2">
                      ID do Depósito
                    </Label>
                    <Input
                      id="depositId"
                      type="text"
                      placeholder="Ex: DEP-2024-001"
                      value={transactionForm.depositId}
                      onChange={(e) => setTransactionForm({...transactionForm, depositId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-2">
                      Banco
                    </Label>
                    <Select
                      value={transactionForm.bank}
                      onValueChange={(value) => setTransactionForm({...transactionForm, bank: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar banco" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Transaction Value */}
              <div>
                <Label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Transação (Db)
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0"
                  value={transactionForm.value}
                  onChange={(e) => setTransactionForm({...transactionForm, value: e.target.value})}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Transação
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddReconciliationScreen;
