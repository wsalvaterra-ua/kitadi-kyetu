
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';

interface NumericKeypadProps {
  onNumberPress: (number: string) => void;
  onBackspace: () => void;
}

const NumericKeypad = ({ onNumberPress, onBackspace }: NumericKeypadProps) => {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace']
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
      {numbers.map((row, rowIndex) => 
        row.map((item, colIndex) => {
          if (item === '') {
            return <div key={`${rowIndex}-${colIndex}`} />;
          }
          
          if (item === 'backspace') {
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                variant="ghost"
                size="lg"
                onClick={onBackspace}
                className="h-16 text-kitadi-navy hover:bg-gray-100 rounded-full"
              >
                <Delete className="w-6 h-6" />
              </Button>
            );
          }
          
          return (
            <Button
              key={`${rowIndex}-${colIndex}`}
              variant="ghost"
              size="lg"
              onClick={() => onNumberPress(item)}
              className="h-16 text-xl font-semibold text-kitadi-navy hover:bg-gray-100 rounded-full"
            >
              {item}
            </Button>
          );
        })
      )}
    </div>
  );
};

export default NumericKeypad;
