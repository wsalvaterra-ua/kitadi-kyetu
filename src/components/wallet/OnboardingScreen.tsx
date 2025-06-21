
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Bem-vindo ao Kitadi",
      description: "Sua carteira digital para São Tomé e Príncipe. Envie, receba e guarde seu dinheiro com segurança.",
      image: "💰"
    },
    {
      title: "Envie Dinheiro",
      description: "Transfira dinheiro instantaneamente para qualquer pessoa usando apenas o número de telefone.",
      image: "📱"
    },
    {
      title: "Seguro e Confiável",
      description: "Suas transações são protegidas com tecnologia de ponta e verificação em duas etapas.",
      image: "🔒"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-kitadi-navy flex flex-col">
      {/* Header with logo */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="w-24 h-24 bg-kitadi-orange rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">K</span>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 px-8 flex flex-col items-center justify-center text-center">
        <div className="text-8xl mb-8">{slides[currentSlide].image}</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg text-white/80 mb-12 leading-relaxed">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center space-x-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-kitadi-orange' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="px-8 pb-12">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={nextSlide}
            className="bg-kitadi-orange hover:bg-kitadi-orange/90 text-white px-8 py-3 rounded-full font-semibold"
          >
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
