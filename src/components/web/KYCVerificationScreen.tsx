import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileCheck, Receipt } from 'lucide-react';
import { KYCVerificationDialog } from './KYCVerificationDialog';

interface KYCVerificationScreenProps {
  onBack: () => void;
}

interface PendingUser {
  id: string;
  name: string;
  phone: string;
  documentType: 'identity' | 'fiscal';
  submittedAt: string;
  status: 'pending' | 'under_review';
}

const KYCVerificationScreen = ({ onBack }: KYCVerificationScreenProps) => {
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for pending KYC verifications
  const pendingIdentityUsers: PendingUser[] = [
    {
      id: '1',
      name: 'João Silva',
      phone: '+239 991 234 567',
      documentType: 'identity',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Maria Santos',
      phone: '+239 992 345 678',
      documentType: 'identity',
      submittedAt: '2024-01-15T09:15:00Z',
      status: 'under_review'
    },
    {
      id: '3',
      name: 'António Costa',
      phone: '+239 993 456 789',
      documentType: 'identity',
      submittedAt: '2024-01-14T16:45:00Z',
      status: 'pending'
    }
  ];

  const pendingFiscalUsers: PendingUser[] = [
    {
      id: '4',
      name: 'Empresa ABC Lda',
      phone: '+239 994 567 890',
      documentType: 'fiscal',
      submittedAt: '2024-01-15T14:20:00Z',
      status: 'pending'
    },
    {
      id: '5',
      name: 'Comercial XYZ',
      phone: '+239 995 678 901',
      documentType: 'fiscal',
      submittedAt: '2024-01-14T11:30:00Z',
      status: 'under_review'
    }
  ];

  const handleVerifyClick = (user: PendingUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pendente</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Em Análise</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderUserTable = (users: PendingUser[], documentType: 'identity' | 'fiscal') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Data de Submissão</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{formatDate(user.submittedAt)}</TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>
              <Button
                size="sm"
                onClick={() => handleVerifyClick(user)}
                className="bg-kitadi-orange hover:bg-kitadi-orange/90"
              >
                Verificar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-kitadi-navy">Verificação KYC</h1>
          <p className="text-gray-600">Gerir verificações de documentos pendentes</p>
        </div>
      </div>

      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="flex w-full overflow-x-auto min-h-[44px] md:grid md:grid-cols-2">
          <TabsTrigger value="identity" className="flex items-center gap-2 flex-1">
            <FileCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Documentos de</span> Identidade
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="flex items-center gap-2 flex-1">
            <Receipt className="w-4 h-4" />
            <span className="hidden sm:inline">Números</span> Fiscais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-kitadi-orange">
                Verificações de Identidade Pendentes ({pendingIdentityUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingIdentityUsers.length > 0 ? (
                renderUserTable(pendingIdentityUsers, 'identity')
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Não há verificações de identidade pendentes
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fiscal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-kitadi-orange">
                Verificações Fiscais Pendentes ({pendingFiscalUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingFiscalUsers.length > 0 ? (
                renderUserTable(pendingFiscalUsers, 'fiscal')
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Não há verificações fiscais pendentes
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedUser && (
        <KYCVerificationDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default KYCVerificationScreen;