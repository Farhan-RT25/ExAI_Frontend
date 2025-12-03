import { cn } from "@/lib/utils";
import {Loader} from "lucide-react";
interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeading = ({ badge, title, description, className }: SectionHeadingProps) => {
  return (
    <div className={cn("text-center mb-16 animate-fade-up", className)}>
      {badge && (
        <div className="inline-flex items-center px-4 py-2 bg-primary/5 backdrop-blur-sm mb-4">
          {/* Added a simple loader/spinner icon (replace 'LoaderIcon' with your actual icon component) */}
          <Loader className="w-4 h-4 mr-2 text-primary animate-spin" />
          <span className="text-sm font-medium text-primary uppercase">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
