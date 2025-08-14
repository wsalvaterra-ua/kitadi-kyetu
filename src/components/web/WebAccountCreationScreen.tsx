import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building, Link, Phone, Upload, FileImage, ArrowLeft } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface WebAccountCreationScreenProps {
  onBack: () => void;
}

const WebAccountCreationScreen = ({ onBack }: WebAccountCreationScreenProps) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [documentFrontFile, setDocumentFrontFile] = useState<File | null>(null);
  const [documentBackFile, setDocumentBackFile] = useState<File | null>(null);

  // Personal account form
  const personalForm = useForm({
    defaultValues: {
      idNumber: '',
      nationality: 'STP',
      dateOfBirth: '',
      expiryDate: '',
      firstName: '',
      middleName: '',
      lastName: '',
      civilStatus: ''
    }
  });

  // Business profile form
  const businessForm = useForm({
    defaultValues: {
      businessName: '',
      businessType: '',
      otherBusinessType: '',
      district: '',
      location: '',
      gpsCoordinates: ''
    }
  });

  // Association form
  const [associationForm, setAssociationForm] = useState({
    phoneNumber: '',
    businessProfileId: '',
    accountName: ''
  });

  const [showOtherBusinessType, setShowOtherBusinessType] = useState(false);

  const businessTypes = [
    'Comércio',
    'Restauração',
    'Serviços',
    'Agricultura',
    'Pesca',
    'Turismo',
    'Tecnologia',
    'Outro'
  ];

  const districts = [
    'Água Grande',
    'Mé-Zóchi',
    'Cantagalo',
    'Caué',
    'Lemba',
    'Lobata',
    'Príncipe'
  ];

  const civilStatuses = [
    { value: 'single', label: 'Solteiro(a)' },
    { value: 'married', label: 'Casado(a)' },
    { value: 'divorced', label: 'Divorciado(a)' },
    { value: 'widowed', label: 'Viúvo(a)' }
  ];

  // Mock data for business profiles
  const mockBusinessProfiles = [
    { id: '1', name: 'Loja do João - Centro' },
    { id: '2', name: 'Restaurante Maria - Água Grande' },
    { id: '3', name: 'Oficina Pedro - Mé-Zóchi' }
  ];

  const handlePhoneNumberSubmit = () => {
    if (userPhoneNumber.trim()) {
      setAssociationForm({...associationForm, phoneNumber: userPhoneNumber});
      setShowTabs(true);
    }
  };

  const handleBackToPhoneInput = () => {
    setShowTabs(false);
    setUserPhoneNumber('');
    setAssociationForm({...associationForm, phoneNumber: ''});
    setDocumentFrontFile(null);
    setDocumentBackFile(null);
  };

  const handleDocumentFrontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentFrontFile(file);
    }
  };

  const handleDocumentBackUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentBackFile(file);
    }
  };

  const handlePersonalSubmit = (data: any) => {
    console.log('Creating personal account for:', userPhoneNumber, data);
    console.log('Document front file:', documentFrontFile);
    console.log('Document back file:', documentBackFile);
    // Here you would typically send to your backend including the document files
  };

  const handleBusinessSubmit = (data: any) => {
    console.log('Creating business profile for:', userPhoneNumber, data);
    // Here you would typically send to your backend
  };

  const handleAssociationSubmit = () => {
    console.log('Creating merchant association for:', userPhoneNumber, associationForm);
    // Here you would typically send to your backend
  };

  return (
    <div className="min-h-screen bg-content">
      <PageHeader 
        title="Criação de Contas"
        description="Agente - Criar novas contas de utilizador"
        onBack={showTabs ? handleBackToPhoneInput : onBack}
      />

      <div className="w-full p-8">
        {!showTabs ? (
          // Phone number input step
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Número de Telefone do Utilizador</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Número de Telefone</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={userPhoneNumber}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                  placeholder="+239 991 1234"
                  className="mt-2"
                />
              </div>
              <Button 
                onClick={handlePhoneNumberSubmit}
                disabled={!userPhoneNumber.trim()}
                className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Tabs for account creation
          <>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Utilizador:</strong> {userPhoneNumber}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full overflow-x-auto min-h-[44px] md:grid md:grid-cols-3">
                <TabsTrigger value="personal" className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 md:flex-shrink">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Conta Pessoal</span>
                  <span className="sm:hidden">Pessoal</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 md:flex-shrink">
                  <Building className="w-4 h-4" />
                  <span className="hidden sm:inline">Perfil Comercial</span>
                  <span className="sm:hidden">Comercial</span>
                </TabsTrigger>
                <TabsTrigger value="association" className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 md:flex-shrink">
                  <Link className="w-4 h-4" />
                  <span className="hidden sm:inline">Associação</span>
                  <span className="sm:hidden">Associação</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Account Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Conta Pessoal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...personalForm}>
                      <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={personalForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primeiro Nome</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={personalForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Último Nome</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={personalForm.control}
                          name="middleName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Meio (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalForm.control}
                          name="idNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Identificação</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalForm.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nacionalidade</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar nacionalidade" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="STP">São Tomé e Príncipe</SelectItem>
                                  <SelectItem value="PT">Portugal</SelectItem>
                                  <SelectItem value="BR">Brasil</SelectItem>
                                  <SelectItem value="AO">Angola</SelectItem>
                                  <SelectItem value="OTHER">Outro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalForm.control}
                          name="civilStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado Civil</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar estado civil" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {civilStatuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={personalForm.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={personalForm.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Expiração do Documento</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Document Upload Section */}
                        <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <FileImage className="w-5 h-5" />
                            <span>Documentos de Identificação</span>
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Document Front */}
                            <div className="space-y-2">
                              <Label htmlFor="documentFront">Frente do Documento</Label>
                              <div className="relative">
                                <Input
                                  id="documentFront"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleDocumentFrontUpload}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById('documentFront')?.click()}
                                  className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2"
                                >
                                  <Upload className="w-6 h-6 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    {documentFrontFile ? documentFrontFile.name : 'Carregar Frente'}
                                  </span>
                                </Button>
                              </div>
                            </div>

                            {/* Document Back */}
                            <div className="space-y-2">
                              <Label htmlFor="documentBack">Verso do Documento</Label>
                              <div className="relative">
                                <Input
                                  id="documentBack"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleDocumentBackUpload}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById('documentBack')?.click()}
                                  className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2"
                                >
                                  <Upload className="w-6 h-6 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    {documentBackFile ? documentBackFile.name : 'Carregar Verso'}
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-gray-600 mt-2">
                            <p>• Formatos aceites: JPG, PNG, PDF</p>
                            <p>• Tamanho máximo: 5MB por ficheiro</p>
                            <p>• Certifique-se de que o documento está legível</p>
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90">
                          Criar Conta Pessoal
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Business Profile Tab */}
              <TabsContent value="business" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Perfil Comercial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...businessForm}>
                      <form onSubmit={businessForm.handleSubmit(handleBusinessSubmit)} className="space-y-4">
                        <FormField
                          control={businessForm.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do Negócio</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ex: Loja do João" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={businessForm.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Negócio</FormLabel>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setShowOtherBusinessType(value === 'Outro');
                                }} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar tipo de negócio" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {businessTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {showOtherBusinessType && (
                          <FormField
                            control={businessForm.control}
                            name="otherBusinessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Especificar Tipo de Negócio</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Descreva o tipo de negócio" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={businessForm.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Distrito</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar distrito" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {districts.map((district) => (
                                    <SelectItem key={district} value={district}>
                                      {district}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={businessForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Localização</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ex: Rua Principal, Centro" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={businessForm.control}
                          name="gpsCoordinates"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coordenadas GPS (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ex: 0.3365° N, 6.7273° E" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90">
                          Criar Perfil Comercial
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Association Tab */}
              <TabsContent value="association" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Associação de Comerciante</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="businessProfileId">Perfil Comercial</Label>
                      <Select
                        value={associationForm.businessProfileId}
                        onValueChange={(value) => setAssociationForm({...associationForm, businessProfileId: value})}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecionar perfil comercial" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockBusinessProfiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.id}>
                              {profile.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="accountName">Nome da Conta</Label>
                      <Input
                        id="accountName"
                        type="text"
                        value={associationForm.accountName}
                        onChange={(e) => setAssociationForm({...associationForm, accountName: e.target.value})}
                        placeholder="Ex: Conta Comercial João"
                        className="mt-2"
                      />
                    </div>

                    <Button
                      onClick={handleAssociationSubmit}
                      disabled={!associationForm.businessProfileId || !associationForm.accountName}
                      className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90"
                    >
                      Criar Associação
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default WebAccountCreationScreen;