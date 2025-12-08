import { LucideIcon, Sparkles, Zap, Calendar, Brain } from 'lucide-react';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BottomFeature {
  title: string;
  titleEmphasis: string;
  description: string;
}

export const featuresHeading = {
  title: "Achieve",
  titleEmphasis: "Email Excellence",
  description: "A comprehensive suite of AI-powered tools designed to transform how you manage your email."
};

export const features: Feature[] = [
  {
    id: "1",
    icon: Sparkles,
    title: "Smart Email Categorization",
    description: "Create custom categories that match your workflow. Our AI automatically organizes incoming emails into your chosen categories—whether it's Clients, Invoices, Newsletters, or Projects—keeping your inbox structured without manual sorting."
  },
  {
    id: "2",
    icon: Zap,
    title: "AI-Powered Draft Replies",
    description: "Never start from scratch again. Our AI analyzes each email's context and generates personalized draft responses that match your communication style, saving hours of writing time while maintaining your authentic voice."
  },
  {
    id: "3",
    icon: Calendar,
    title: "Calendar & Meeting Intelligence",
    description: "Seamlessly extract meeting details and automatically add events to your calendar. Get AI-generated meeting notes and summaries, ensuring you never miss important discussions or action items from your conversations."
  },
  {
    id: "4",
    icon: Brain,
    title: "Intelligent Dashboard Assistant",
    description: "Your personal AI assistant provides actionable insights, answers questions about your emails, tracks important threads, and helps you stay on top of priorities—all from your web dashboard."
  }
];

export const bottomFeature: BottomFeature = {
  title: "Powered by",
  titleEmphasis: "Advanced AI",
  description: "Our intelligent engine learns from your email patterns and preferences, continuously improving its suggestions and automations to work seamlessly with Gmail, Outlook, and Zoho."
};
