import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItemType {
  id: string;
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItemType;
  index: number;
}

const FaqItem = ({ item, index }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-primary/10 border-2 border-primary shadow-lg' 
          : 'bg-card border-2 border-border'
      }`}
    >
      {/* Question Header - Clickable */}
      <button
        className="w-full flex items-center justify-between gap-6 p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <div className={`text-sm font-bold mb-3 transition-colors duration-300 ${
            isOpen ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            isOpen ? 'text-foreground' : 'text-foreground'
          }`}>
            {item.question}
          </h3>
        </div>

        {/* Plus/Minus Icon Button */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-primary/20 text-primary hover:bg-primary/30'
        }`}>
          {isOpen ? (
            <Minus className="w-6 h-6" strokeWidth={3} />
          ) : (
            <Plus className="w-6 h-6" strokeWidth={3} />
          )}
        </div>
      </button>

      {/* Answer - Collapsible */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-foreground/80 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;