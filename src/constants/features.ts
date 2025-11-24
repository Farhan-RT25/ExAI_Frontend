import { IconType } from 'react-icons';
import { 
  FiZap, 
  FiSettings, 
  FiTag, 
  FiEdit3, 
  FiBarChart2, 
  FiShield,
  FiPlay,
  FiBook
} from 'react-icons/fi';

export interface Feature {
  id: string;
  icon: IconType;
  caption: string;
  title: string;
  text: string;
  button: {
    icon: IconType;
    title: string;
  };
}

export interface Detail {
  id: string;
  icon: IconType;
  title: string;
}

export const features: Feature[] = [
  {
    id: "0",
    icon: FiZap,
    caption: "Zero Workflow Change",
    title: "Non-Invasive, Deep Integration",
    text: "The AI creates precise labels (HR Policy, To Respond, Admin) inside your existing email provider, applying them instantly based on executive relevance. For items tagged 'To Respond', AI-generated draft replies appear directly in your compose window—ready for quick edits or immediate sending.",
    button: {
      icon: FiPlay,
      title: "Watch the demo",
    },
  },
  {
    id: "1",
    icon: FiSettings,
    caption: "Total Executive Control",
    title: "Customizable AI Intelligence",
    text: "Executives maintain complete control with customizable categories, proprietary labels for specific business units (M&A Pipeline, Strategic Initiatives), and integrated draft refinement. Click the AI icon next to any draft to instantly apply Firm, Diplomatic, or Urgent tones with custom instructions.",
    button: {
      icon: FiBook,
      title: "Explore features",
    },
  },
];

export const details: Detail[] = [
  {
    id: "0",
    icon: FiTag,
    title: "Role-Based Smart Labeling",
  },
  {
    id: "1",
    icon: FiEdit3,
    title: "Native Draft Generation",
  },
  {
    id: "2",
    icon: FiBarChart2,
    title: "Strategic Analytics Dashboard",
  },
  {
    id: "3",
    icon: FiShield,
    title: "Maximum Data Security",
  },
];