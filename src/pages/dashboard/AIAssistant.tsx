import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, Mail, Calendar, FileText, Zap, MessageSquare, Lightbulb, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample chat messages
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI assistant. I can help you with emails, scheduling, and more. What would you like to do today?",
    timestamp: "Just now",
  },
];

// Quick action suggestions
const suggestions = [
  { icon: Mail, text: "Draft a reply to recent emails", action: "draft_reply" },
  { icon: Calendar, text: "Schedule a meeting for next week", action: "schedule" },
  { icon: FileText, text: "Summarize my unread emails", action: "summarize" },
  { icon: Lightbulb, text: "Get productivity tips", action: "tips" },
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Emails drafted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-success" />
              <div>
                <p className="text-xl font-bold">42</p>
                <p className="text-xs text-muted-foreground">Meetings scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-info" />
              <div>
                <p className="text-xl font-bold">8h</p>
                <p className="text-xs text-muted-foreground">Time saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-warning" />
              <div>
                <p className="text-xl font-bold">94%</p>
                <p className="text-xs text-muted-foreground">Accuracy rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col border min-h-0">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Chat with AI
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={message.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                  {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block p-3 rounded-2xl text-sm whitespace-pre-line ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-secondary rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-secondary p-3 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Suggestions */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <Button
                  key={suggestion.action}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick(suggestion.action)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {suggestion.text}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistant;
