
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, CreditCard, Plane } from 'lucide-react';

interface DocumentSelectionScreenProps {
  onBack: () => void;
  onDocumentSelected: (documentType: string) => void;
}

const DocumentSelectionScreen = ({ onBack, onDocumentSelected }: DocumentSelectionScreenProps) => {
  const [selectedDocument, setSelectedDocument] = useState('');

  const documents = [
    {
      id: 'identity-card',
      name: 'Bilhete de Identidade',
      description: 'Documento de identidade nacional',
      icon: CreditCard,
      recommended: true
    },
    {
      id: 'passport',
      name: 'Passaporte',
      description: 'Passaporte válido',
      icon: Plane,
      recommended: false
    }
  ];

  const handleContinue = () => {
    if (selectedDocument) {
      onDocumentSelected(selectedDocument);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-kitadi-navy pt-16 pb-8">
        <div className="flex items-center px-6 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-kitadi-orange rounded-full flex items-center justify-center">
            <FileText className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-center text-white text-2xl font-bold">Escolher Documento</h1>
        <p className="text-center text-white/80 mt-2">Selecione o tipo de documento para verificação</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-kitadi-navy">
              Tipo de Documento
            </CardTitle>
            <CardDescription className="text-center">
              Escolha um documento válido que você tem disponível
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc.id)}
                  className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedDocument === doc.id
                      ? 'border-kitadi-orange bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {doc.recommended && (
                    <div className="absolute -top-2 left-4 bg-kitadi-orange text-white text-xs px-2 py-1 rounded">
                      Recomendado
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedDocument === doc.id ? 'bg-kitadi-orange' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        selectedDocument === doc.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        selectedDocument === doc.id ? 'text-kitadi-navy' : 'text-gray-900'
                      }`}>
                        {doc.name}
                      </h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedDocument === doc.id
                        ? 'border-kitadi-orange bg-kitadi-orange'
                        : 'border-gray-300'
                    }`}>
                      {selectedDocument === doc.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-blue-50 p-4 rounded-xl mt-6">
              <h3 className="font-semibold text-kitadi-navy mb-2">Importante:</h3>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>O documento deve estar válido (não expirado)</li>
                <li>A foto deve estar clara e legível</li>
                <li>Certifique-se de que não há reflexos ou sombras</li>
                <li>Todos os dados devem estar visíveis</li>
              </ul>
            </div>

            <div className="flex space-x-3 mt-8">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 py-3"
              >
                Voltar
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedDocument}
                className="flex-1 bg-kitadi-orange hover:bg-kitadi-orange/90 text-white py-3 disabled:opacity-50"
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentSelectionScreen;
