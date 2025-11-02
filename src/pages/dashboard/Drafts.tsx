import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Drafts = () => {
  const [gmailOpen, setGmailOpen] = useState(false);
  const [outlookOpen, setOutlookOpen] = useState(false);
  const [signaturesOpen, setSignaturesOpen] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Draft Replies</h1>
        <p className="text-muted-foreground">
          Configure AI-powered draft email responses
        </p>
      </div>

      {/* Enable Toggle */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Draft Replies</CardTitle>
              <CardDescription>
                When you get an email you need to reply to, we'll leave a draft response in your inbox for you to send or edit.
              </CardDescription>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
      </Card>

      {/* Info Box */}
      <Card className="shadow-card bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
            <div className="space-y-4">
              <p className="text-sm">
                For draft replies to work smoothly, your Gmail or Outlook should group related emails into a single thread. We save drafts within the thread for easy access.
              </p>
              <p className="text-sm">
                By default, both Gmail and Outlook do this automatically. If your emails aren't grouping, you can enable threading by following the steps below:
              </p>

              {/* Gmail Collapsible */}
              <Collapsible open={gmailOpen} onOpenChange={setGmailOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-card rounded-lg hover:bg-accent transition-colors">
                  <span className="font-semibold text-sm">How to enable threading in Gmail</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${gmailOpen ? "rotate-180" : ""}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 px-3">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Open Gmail settings (gear icon)</li>
                    <li>Click "See all settings"</li>
                    <li>Go to the "General" tab</li>
                    <li>Find "Conversation View" and select "Conversation view on"</li>
                    <li>Scroll down and click "Save Changes"</li>
                  </ol>
                </CollapsibleContent>
              </Collapsible>

              {/* Outlook Collapsible */}
              <Collapsible open={outlookOpen} onOpenChange={setOutlookOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-card rounded-lg hover:bg-accent transition-colors">
                  <span className="font-semibold text-sm">How to enable threading in Outlook</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${outlookOpen ? "rotate-180" : ""}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 px-3">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Open Outlook and go to View tab</li>
                    <li>Click "Show as Conversations"</li>
                    <li>Select "All mailboxes"</li>
                    <li>Enable "Show messages from other folders"</li>
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Draft Prompt */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Draft Prompt</CardTitle>
          <CardDescription>
            Provide custom instructions to the AI that generates your draft email replies. For example, your priorities, how you make decisions, or information about your business. (max 1000 characters)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="I am concise in my communication, polite but direct.

I am in <role> for <company name>.

I prefer shorter emails.

If asked for help or guidance, I prefer to respond with bullet points for ease of reading.

I don't want to be too compliant in my responses. I can acknowledge but not necessarily agree."
            className="min-h-[200px] font-mono text-sm"
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Character count: 0 / 1000
          </p>
        </CardContent>
      </Card>

      {/* Email Signatures */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Email Signatures</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <Collapsible open={signaturesOpen} onOpenChange={setSignaturesOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="font-semibold">How signatures work</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${signaturesOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                We'll use your account-specific signature first. If you haven't set one up, we'll use your default signature instead.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
};

export default Drafts;
