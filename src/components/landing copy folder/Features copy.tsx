import { Tag, FileEdit, Mail, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    number: "01",
    icon: Tag,
    title: "Smart Categorization",
    description:
      "AI analyzes and labels emails automatically into customizable categories for better organization",
  },
  {
    number: "02",
    icon: FileEdit,
    title: "AI Draft Replies",
    description:
      "Generate contextual responses in your communication style, saving hours of writing time",
  },
  {
    number: "03",
    icon: Mail,
    title: "Multi-Provider Support",
    description:
      "Works seamlessly with Gmail, Outlook, and Zoho mail providers",
  },
  {
    number: "04",
    icon: Video,
    title: "Meeting Intelligence",
    description:
      "Get meeting transcripts and AI-generated summaries automatically",
    badge: "Coming Soon",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 mx-auto text-center max-w-2xl animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Work Smarter</h2>
          <p className="text-gray-600 max-w-2xl text-base leading-relaxed">
            Explore the AI-driven features designed to automate your inbox,
            generate replies, and deliver meeting insights instantly.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-6 w-full mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 flex gap-6"
            >
              {/* Left side - Icon and Number */}
              <div className="flex-shrink-0">
                <div
                  className="text-sm font-semibold text-gray-500 mb-4 
                  border-b-4 border-purple-500/50 pb-2 
                  flex items-center gap-2 w-12 mx-auto md:mx-0"
                >
                  {" "}
                  {/* Modified line */}
                  {feature.number}
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-gray-700" />
                </div>
              </div>

              {/* Right side - Title and Description */}
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
