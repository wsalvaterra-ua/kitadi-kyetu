import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings, User, Clock, Calendar, UserCheck, UserX } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';

interface Operator {
  id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  workingDays: string[];
  startTime: string;
  endTime: string;
  lastActive: string;
}

interface OperatorManagementScreenProps {
  onBack: () => void;
}

const OperatorManagementScreen = ({ onBack }: OperatorManagementScreenProps) => {
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedActive, setSelectedActive] = useState<boolean | null>(null);
  // Limits
  const [maxCashLimit, setMaxCashLimit] = useState<string>('');
  const [operationalCreditFloat, setOperationalCreditFloat] = useState<string>('');

  const mockOperators: Operator[] = [
    {
      id: 'OP001',
      name: 'João Silva',
      phone: '+2399123456',
      email: 'joao@kitadi.com',
      isActive: true,
      workingDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      startTime: '08:00',
      endTime: '17:00',
      lastActive: '2024-01-15T16:30:00Z'
    },
    {
      id: 'OP002',
      name: 'Maria Santos',
      phone: '+2399654321',
      email: 'maria@kitadi.com',
      isActive: true,
      workingDays: ['Segunda', 'Terça', 'Quinta', 'Sexta', 'Sábado'],
      startTime: '09:00',
      endTime: '18:00',
      lastActive: '2024-01-15T17:45:00Z'
    },
    {
      id: 'OP003',
      name: 'Ana Costa',
      phone: '+2399987654',
      email: 'ana@kitadi.com',
      isActive: false,
      workingDays: ['Terça', 'Quarta', 'Quinta'],
      startTime: '10:00',
      endTime: '16:00',
      lastActive: '2024-01-10T15:20:00Z'
    }
  ];

  const allDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const handleOperatorSelect = (operatorId: string) => {
    const operator = mockOperators.find(op => op.id === operatorId);
    if (operator) {
      setSelectedOperator(operatorId);
      setWorkingDays(operator.workingDays);
      setStartTime(operator.startTime);
      setEndTime(operator.endTime);
      setSelectedActive(operator.isActive);
    }
  };

  const handleToggleDay = (day: string) => {
    setWorkingDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSaveSchedule = () => {
    if (!selectedOperator) return;
    
    console.log('Saving schedule for operator:', {
      operatorId: selectedOperator,
      workingDays,
      startTime,
      endTime
    });
    
    alert('Horário do operador atualizado com sucesso!');
  };

  const handleToggleOperatorStatus = (operatorId: string, newStatus: boolean) => {
    console.log('Toggling operator status:', { operatorId, newStatus });
    alert(`Operador ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? 
      <Badge variant="default" className="bg-green-600"><UserCheck className="w-3 h-3 mr-1" />Ativo</Badge> :
      <Badge variant="secondary"><UserX className="w-3 h-3 mr-1" />Inativo</Badge>;
  };

  return (
    <div className="min-h-screen bg-content">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Gestão de Operadores</h1>
              <p className="text-sm text-gray-500">Gerir horários e status dos operadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Operators List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Lista de Operadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  
                  <TableHead>Status</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOperators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell className="font-medium">{operator.name}</TableCell>
                    <TableCell className="font-mono">{operator.phone}</TableCell>
                    
                    <TableCell>{getStatusBadge(operator.isActive)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{operator.startTime} - {operator.endTime}</p>
                        <p className="text-gray-500">{operator.workingDays.length} dias/semana</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(operator.lastActive).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOperatorSelect(operator.id)}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Schedule Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Definições do Operador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {selectedOperator && (
              <>
                {/* Status Toggle inside settings */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    <UserCheck className="w-4 h-4 inline mr-2" />
                    Status do Operador
                  </Label>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={!!selectedActive}
                      onCheckedChange={(checked) => {
                        setSelectedActive(checked);
                        handleToggleOperatorStatus(selectedOperator, checked);
                      }}
                    />
                    {selectedActive ? <Badge variant="default">Ativo</Badge> : <Badge variant="secondary">Inativo</Badge>}
                  </div>
                </div>

                {/* Working Days */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Dias de Trabalho
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {allDays.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={workingDays.includes(day)}
                          onCheckedChange={() => handleToggleDay(day)}
                        />
                        <Label htmlFor={day} className="text-sm">{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Horário de Início</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">Horário de Fim</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                {/* Limites Financeiros */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Limites Financeiros
                  </Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxCashLimit">Limite de Dinheiro Vivo (STN)</Label>
                      <Input
                        id="maxCashLimit"
                        type="number"
                        placeholder="Ex: 500000"
                        value={maxCashLimit}
                        onChange={(e) => setMaxCashLimit(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="operationalCreditFloat">Limite OPERATIONAL_CREDIT_FLOAT (STN)</Label>
                      <Input
                        id="operationalCreditFloat"
                        type="number"
                        placeholder="Ex: 200000"
                        value={operationalCreditFloat}
                        onChange={(e) => setOperationalCreditFloat(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-medium text-blue-900 mb-2">Resumo do Horário</h4>
                  <p className="text-blue-700 text-sm">
                    <strong>Dias:</strong> {workingDays.join(', ') || 'Nenhum dia selecionado'}
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>Horário:</strong> {startTime} às {endTime}
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>Total horas/semana:</strong> {
                      workingDays.length > 0 && startTime && endTime ? 
                      (workingDays.length * (
                        (parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1])) -
                        (parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]))
                      ) / 60).toFixed(1) + ' horas' : 
                      '0 horas'
                    }
                  </p>
                </div>

                {/* Save Button */}
                <Button 
                  onClick={handleSaveSchedule}
                  disabled={workingDays.length === 0}
                  className="bg-kitadi-orange hover:bg-kitadi-orange/90"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Guardar Definições
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperatorManagementScreen;