import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, Mail, Calendar, FileText, Lightbulb, MessageSquare, TrendingUp, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample AI insights
const aiInsights = [
  { text: "Peak email hours are between 9 AM and 11 AM", trend: "up" },
  { text: "35% of your emails are follow-ups", trend: "neutral" },
  { text: "Response rate improved by 12% this week", trend: "up" },
];

const mainInsight = "24% more emails processed this week";

// Sample chat messages
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm Nyx AI, your intelligent email and productivity assistant. I can help you with drafting emails, scheduling meetings, summarizing your inbox, and more. What would you like to do today?",
    timestamp: "Just now",
  },
];

// Quick action suggestions
const suggestions = [
  { icon: Mail, text: "Draft a reply", action: "draft_reply" },
  { icon: Calendar, text: "Schedule meeting", action: "schedule" },
  { icon: FileText, text: "Summarize inbox", action: "summarize" },
  { icon: Lightbulb, text: "Productivity tips", action: "tips" },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: "Just now",
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: "Just now",
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("email") || lowerQuery.includes("draft")) {
      return "I can help you draft emails! I've analyzed your writing style from previous emails. Would you like me to:\n\n1. Draft a reply to a specific email\n2. Compose a new email\n3. Review and improve an existing draft\n\nJust let me know what you need!";
    }
    
    if (lowerQuery.includes("meeting") || lowerQuery.includes("schedule")) {
      return "I'd be happy to help with scheduling! Based on your calendar, you have some free slots:\n\n• Tomorrow: 10:00 AM - 11:00 AM\n• Wednesday: 2:00 PM - 4:00 PM\n• Friday: 9:00 AM - 12:00 PM\n\nWould you like me to schedule a meeting during any of these times?";
    }
    
    if (lowerQuery.includes("summarize") || lowerQuery.includes("summary")) {
      return "Here's a summary of your inbox:\n\n📧 **12 unread emails**\n• 3 high priority (client responses needed)\n• 5 newsletters\n• 4 internal updates\n\n⚡ **Action items:**\n1. Reply to Sarah about the project deadline\n2. Review the budget proposal from Finance\n3. Confirm meeting with the design team\n\nWould you like me to draft responses for the high priority emails?";
    }
    
    return "I understand you're asking about: \"" + query + "\"\n\nI can assist you with:\n• Email drafting and management\n• Meeting scheduling\n• Task prioritization\n• Inbox summarization\n\nHow can I help you with this?";
  };

  const handleSuggestionClick = (action: string) => {
    const suggestionMap: Record<string, string> = {
      draft_reply: "Help me draft replies to my recent emails",
      schedule: "I need to schedule a meeting for next week",
      summarize: "Can you summarize my unread emails?",
      tips: "Give me some productivity tips for managing my inbox",
    };
    
    setInput(suggestionMap[action] || "");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-muted-foreground mt-1">Your intelligent email and productivity companion</p>
        </div>
        <Badge variant="secondary" className="w-fit flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Powered by AI
        </Badge>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* AI Insights Card - Left Column */}
        <Card className="lg:col-span-1 border border-border/50 hover:border-primary/50 transition-all shadow-card relative overflow-hidden bg-gradient-to-br from-card to-card/80">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#009773]/5 pointer-events-none" />
          
          <CardHeader className="pb-4 pt-6 px-6 relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">Real-time</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 relative z-10">
            {mainInsight && (
              <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-[#009773]/10 border border-primary/20 relative">
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">This Week</p>
                <h3 className="text-xl font-bold mb-1">{mainInsight}</h3>
                <p className="text-xs text-muted-foreground">Compared to last week</p>
              </div>
            )}

            <div className="space-y-2">
              {aiInsights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    {insight.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <BarChart3 className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm flex-1">{insight.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface - Right Column (2/3 width) */}
        <Card className="lg:col-span-2 flex flex-col border border-border/50 min-h-0 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="pb-4 border-b border-border/50">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              Chat with Nyx AI
            </CardTitle>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-9 w-9 shrink-0 border border-border/50">
                  <AvatarFallback className={message.role === 'assistant' ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' : 'bg-secondary'}>
                    {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block p-4 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-secondary/50 border border-border/50 rounded-bl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 px-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary/50 border border-border/50 p-4 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Suggestions */}
          <div className="px-6 pb-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <Button
                    key={suggestion.action}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-secondary/30 border-border/50 hover:bg-secondary/50 hover:border-primary/50"
                    onClick={() => handleSuggestionClick(suggestion.action)}
                  >
                    <Icon className="h-3 w-3 mr-1.5" />
                    {suggestion.text}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-secondary/20">
            <div className="flex gap-3">
              <Input
                placeholder="Ask Nyx AI anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim()}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
