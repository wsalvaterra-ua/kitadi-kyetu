
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Building, Link } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface AccountCreationScreenProps {
  onBack: () => void;
}

const AccountCreationScreen = ({ onBack }: AccountCreationScreenProps) => {
  const [activeTab, setActiveTab] = useState('personal');

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

  // Mock data for business profiles and phone numbers
  const mockBusinessProfiles = [
    { id: '1', name: 'Loja do João - Centro' },
    { id: '2', name: 'Restaurante Maria - Água Grande' },
    { id: '3', name: 'Oficina Pedro - Mé-Zóchi' }
  ];

  const mockPhoneNumbers = [
    '+239 991 1234',
    '+239 991 5678',
    '+239 991 9876'
  ];

  const handlePersonalSubmit = (data: any) => {
    console.log('Creating personal account:', data);
    // Here you would typically send to your backend
  };

  const handleBusinessSubmit = (data: any) => {
    console.log('Creating business profile:', data);
    // Here you would typically send to your backend
  };

  const handleAssociationSubmit = () => {
    console.log('Creating merchant association:', associationForm);
    // Here you would typically send to your backend
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
          <h1 className="text-white text-xl font-semibold">Criação de Contas</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Conta Pessoal</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Perfil Comercial</span>
            </TabsTrigger>
            <TabsTrigger value="association" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>Associação</span>
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
                            <Input {...field} />
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
                            <Input {...field} placeholder="Endereço ou descrição da localização" />
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
                            <Input {...field} placeholder="Ex: 0.3302, 6.7273" />
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
                <CardTitle>Associar Conta Comercial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phoneNumber">Número de Telefone</Label>
                    <Select 
                      value={associationForm.phoneNumber} 
                      onValueChange={(value) => setAssociationForm({...associationForm, phoneNumber: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar número de telefone" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPhoneNumbers.map((phone) => (
                          <SelectItem key={phone} value={phone}>
                            {phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="businessProfile">Perfil Comercial</Label>
                    <Select 
                      value={associationForm.businessProfileId} 
                      onValueChange={(value) => setAssociationForm({...associationForm, businessProfileId: value})}
                    >
                      <SelectTrigger>
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
                      value={associationForm.accountName}
                      onChange={(e) => setAssociationForm({...associationForm, accountName: e.target.value})}
                      placeholder="Digite o nome da conta comercial"
                    />
                  </div>

                  <Button 
                    onClick={handleAssociationSubmit} 
                    className="w-full bg-kitadi-orange hover:bg-kitadi-orange/90"
                  >
                    Criar Associação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountCreationScreen;
