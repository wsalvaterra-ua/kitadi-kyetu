import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Upload, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  onBack: () => void;
  phoneNumber: string;
}

interface Document {
  id: string;
  name: string;
  submissionDate: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
}

const UserDocumentsScreen = ({ onBack, phoneNumber }: Props) => {
  const { toast } = useToast();
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Bilhete de Identidade',
      submissionDate: '2024-01-10',
      type: 'PDF',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Comprovativo de Morada',
      submissionDate: '2024-01-12',
      type: 'PDF',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Cartão Contribuinte',
      submissionDate: '2024-01-08',
      type: 'JPEG',
      status: 'approved'
    }
  ]);

  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!newDocumentName || !selectedFile) {
      toast({
        title: "Dados obrigatórios",
        description: "Selecione um arquivo e defina o nome do documento",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Documento enviado",
      description: `${newDocumentName} foi enviado com sucesso`,
    });

    setNewDocumentName('');
    setSelectedFile(null);
    setShowUploadDialog(false);
  };

  const handleDownload = (documentId: string, documentName: string) => {
    toast({
      title: "Download iniciado",
      description: `Fazendo download de ${documentName}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-kitadi-navy">Documentos do Utilizador</h1>
              <p className="text-sm text-gray-500">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-8 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Enviar Novo Documento
              </div>
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enviar Documento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="documentName">Nome do Documento</Label>
                      <Input
                        id="documentName"
                        placeholder="Ex: Bilhete de Identidade"
                        value={newDocumentName}
                        onChange={(e) => setNewDocumentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentFile">Selecionar Arquivo</Label>
                      <Input
                        id="documentFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                      />
                      {selectedFile && (
                        <p className="text-sm text-gray-500 mt-1">
                          Arquivo selecionado: {selectedFile.name}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                        Cancelar
                      </Button>
                      <Button onClick={handleUpload} className="flex-1">
                        Enviar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Clique no botão acima para enviar um novo documento para este utilizador.
            </p>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos Submetidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Documento</TableHead>
                  <TableHead>Data de Submissão</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">{document.name}</TableCell>
                    <TableCell>{document.submissionDate}</TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(document.status)}>
                        {getStatusText(document.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(document.id, document.name)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {documents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      Nenhum documento encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDocumentsScreen;