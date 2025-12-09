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
      className={`overflow-hidden transition-all duration-300 border-b border-border/50 ${
        isOpen ? 'bg-card/30' : 'hover:bg-card/20'
      }`}
    >
      {/* Question Header - Clickable */}
      <button
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-base md:text-lg font-medium text-foreground pr-4">
          {item.question}
        </h3>

        {/* Plus/Minus Icon Button */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-foreground text-background' 
            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
        }`}>
          {isOpen ? (
            <Minus className="w-4 h-4" strokeWidth={2} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={2} />
          )}
        </div>
      </button>

      {/* Answer - Collapsible */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 text-muted-foreground leading-relaxed pr-16">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;