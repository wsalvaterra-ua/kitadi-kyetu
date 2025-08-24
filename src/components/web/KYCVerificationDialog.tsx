import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CheckCircle, XCircle, FileImage, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PendingUser {
  id: string;
  name: string;
  phone: string;
  documentType: 'identity' | 'fiscal';
  submittedAt: string;
  status: 'pending' | 'under_review';
}

interface KYCVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: PendingUser;
}

interface KYCFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  civilStatus: string;
  documentNumber: string;
  nationality: string;
  birthDate: string;
  documentExpiration: string;
  fiscalNumber?: string;
  companyName?: string;
  businessType?: string;
}

const KYCVerificationDialog = ({ isOpen, onClose, user }: KYCVerificationDialogProps) => {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const { toast } = useToast();

  const form = useForm<KYCFormData>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      civilStatus: '',
      documentNumber: '',
      nationality: 'São Tomé e Príncipe',
      birthDate: '',
      documentExpiration: '',
      fiscalNumber: '',
      companyName: '',
      businessType: ''
    }
  });

  // Mock document images
  const mockDocumentImages = {
    identity: {
      front: '/lovable-uploads/021ecf80-ecf2-4552-b076-f66640273304.png',
      back: '/lovable-uploads/0a31d96f-afef-4ffe-a457-1581a4279cf8.png'
    },
    fiscal: {
      certificate: '/lovable-uploads/2ac0f969-7525-4b47-89c8-2e3e615c3de1.png',
      license: '/lovable-uploads/36c7e433-7a25-4dc4-883e-498016607394.png'
    }
  };

  const handleSubmit = (data: KYCFormData) => {
    if (!decision) {
      toast({
        title: "Decisão Requerida",
        description: "Por favor, aprove ou rejeite a verificação antes de submeter.",
        variant: "destructive"
      });
      return;
    }

    console.log('KYC Decision:', decision);
    console.log('Form Data:', data);
    console.log('User:', user);

    toast({
      title: decision === 'approve' ? "Verificação Aprovada" : "Verificação Rejeitada",
      description: `O usuário ${user.name} foi ${decision === 'approve' ? 'aprovado' : 'rejeitado'} com sucesso.`,
    });

    onClose();
  };

  const civilStatusOptions = [
    { value: 'single', label: 'Solteiro(a)' },
    { value: 'married', label: 'Casado(a)' },
    { value: 'divorced', label: 'Divorciado(a)' },
    { value: 'widowed', label: 'Viúvo(a)' },
    { value: 'separated', label: 'Separado(a)' }
  ];

  const businessTypeOptions = [
    { value: 'ltd', label: 'Sociedade Limitada (Lda)' },
    { value: 'sa', label: 'Sociedade Anónima (SA)' },
    { value: 'individual', label: 'Empresário Individual' },
    { value: 'partnership', label: 'Sociedade em Nome Coletivo' },
    { value: 'cooperative', label: 'Cooperativa' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-kitadi-orange">
            Verificação KYC - {user.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kitadi-navy">
                <FileImage className="w-5 h-5" />
                Documentos Submetidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.documentType === 'identity' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Frente do Documento</Label>
                    <img
                      src={mockDocumentImages.identity.front}
                      alt="Frente do documento de identidade"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Verso do Documento</Label>
                    <img
                      src={mockDocumentImages.identity.back}
                      alt="Verso do documento de identidade"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Certificado Fiscal</Label>
                    <img
                      src={mockDocumentImages.fiscal.certificate}
                      alt="Certificado fiscal"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Licença Comercial</Label>
                    <img
                      src={mockDocumentImages.fiscal.license}
                      alt="Licença comercial"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* KYC Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-kitadi-navy">Preencher Dados KYC</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  {user.documentType === 'identity' ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{ required: "Primeiro nome é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primeiro Nome *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o primeiro nome" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Meio</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o nome do meio" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        rules={{ required: "Último nome é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Último Nome *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o último nome" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="civilStatus"
                        rules={{ required: "Estado civil é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado Civil *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecionar estado civil" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {civilStatusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentNumber"
                        rules={{ required: "Número do documento é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do Documento *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o número do documento" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationality"
                        rules={{ required: "Nacionalidade é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nacionalidade *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite a nacionalidade" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="birthDate"
                        rules={{ required: "Data de nascimento é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento *</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentExpiration"
                        rules={{ required: "Data de expiração é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Expiração do Documento *</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        rules={{ required: "Nome da empresa é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o nome da empresa" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fiscalNumber"
                        rules={{ required: "Número fiscal é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número Fiscal *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o número fiscal" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessType"
                        rules={{ required: "Tipo de negócio é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Negócio *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecionar tipo de negócio" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessTypeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentNumber"
                        rules={{ required: "Número do documento é obrigatório" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do Documento *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Digite o número do documento" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentExpiration"
                        rules={{ required: "Data de expiração é obrigatória" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Expiração *</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Decision Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                    <div className="flex gap-2 flex-1">
                      <Button
                        type="button"
                        variant={decision === 'approve' ? 'default' : 'outline'}
                        onClick={() => setDecision('approve')}
                        className={`flex-1 ${decision === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button
                        type="button"
                        variant={decision === 'reject' ? 'default' : 'outline'}
                        onClick={() => setDecision('reject')}
                        className={`flex-1 ${decision === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'border-red-600 text-red-600 hover:bg-red-50'}`}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeitar
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-kitadi-orange hover:bg-kitadi-orange/90">
                        Submeter Decisão
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { KYCVerificationDialog };