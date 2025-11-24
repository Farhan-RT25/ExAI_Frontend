export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    id: "0",
    question: "How does AI email prioritization work?",
    answer: "Our AI analyzes your email patterns, sender importance, content urgency, and your response history to automatically prioritize messages that need your immediate attention."
  },
  {
    id: "1",
    question: "Is my email data secure?",
    answer: "Yes, we use end-to-end encryption and never store your email content. Our AI processes emails in real-time without retaining sensitive information."
  },
  {
    id: "2",
    question: "Can I customize the AI's behavior?",
    answer: "Absolutely! You can train the AI by providing feedback, set custom rules, and adjust prioritization criteria to match your workflow."
  },
  {
    id: "3",
    question: "Which email providers are supported?",
    answer: "We currently support Gmail, Outlook, and most IMAP/SMTP email providers. More integrations are being added regularly."
  },
  {
    id: "4",
    question: "How much does it cost?",
    answer: "We offer a free tier for up to 100 emails per day. Premium plans start at $9.99/month with unlimited email processing and advanced features."
  },
  {
    id: "5",
    question: "Can I try it before subscribing?",
    answer: "Yes! We offer a 14-day free trial with full access to all premium features. No credit card required."
  }
];