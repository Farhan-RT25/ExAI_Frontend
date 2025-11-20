import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HelpCircle } from "lucide-react";

const initialConnections = [
  {
    id: "google",
    provider: "Google",
    description: "Connect your Gmail and Google Workspace accounts",
    logo: (
      <svg className="h-10 w-10" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    accounts: [
      { email: "kristin.watson@gmail.com", connected: true },
      { email: "kw.business@gmail.com", connected: true },
    ],
  },
  {
    id: "microsoft",
    provider: "Microsoft",
    description: "Connect your Outlook and Office 365 accounts",
    logo: (
      <svg className="h-10 w-10" viewBox="0 0 24 24">
        <path fill="#F25022" d="M1 1h10v10H1z"/>
        <path fill="#00A4EF" d="M13 1h10v10H13z"/>
        <path fill="#7FBA00" d="M1 13h10v10H1z"/>
        <path fill="#FFB900" d="M13 13h10v10H13z"/>
      </svg>
    ),
    accounts: [
      { email: "kristin.watson@company.com", connected: true },
    ],
  },
  {
    id: "zoho",
    provider: "Zoho Mail",
    description: "Connect your Zoho Mail accounts",
    logo: (
      <svg className="h-10 w-10" viewBox="0 0 24 24">
        <path fill="#6001D2" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 7.5l-3 6v3h-3v-3l-3-6h2.5l1.5 3 1.5-3h2.5z"/>
      </svg>
    ),
    accounts: [],
  },
  // {
  //   id: "icloud",
  //   provider: "iCloud Mail",
  //   description: "Connect your iCloud email accounts",
  //   logo: (
  //     <svg className="h-10 w-10" viewBox="0 0 24 24">
  //       <path fill="#3693F3" d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-1.616a4.543 4.543 0 0 0-3.93-4.508 7.212 7.212 0 0 0-6.308-4.653z"/>
  //     </svg>
  //   ),
  //   accounts: [],
  // },
];

const Connections = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [connections, setConnections] = useState(initialConnections);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(null);

  const handleToggle = (providerId, checked) => {
    const provider = connections.find(c => c.id === providerId);
    const connectedAccounts = provider.accounts.filter(acc => acc.connected);
    
    if (!checked && connectedAccounts.length > 0) {
      setPendingToggle({ providerId, checked });
      setDialogOpen(true);
    } else {
      updateProviderStatus(providerId, checked);
    }
  };

  const updateProviderStatus = (providerId, checked) => {
    setConnections(prev => prev.map(conn => {
      if (conn.id === providerId) {
        return {
          ...conn,
          accounts: conn.accounts.map(acc => ({ ...acc, connected: checked }))
        };
      }
      return conn;
    }));
  };

  const confirmToggle = () => {
    if (pendingToggle) {
      updateProviderStatus(pendingToggle.providerId, pendingToggle.checked);
    }
    setDialogOpen(false);
    setPendingToggle(null);
  };

  const getFilteredConnections = () => {
    if (activeTab === "all") return connections;
    if (activeTab === "connected") {
      return connections.filter(c => c.accounts.some(acc => acc.connected));
    }
    if (activeTab === "disconnected") {
      return connections.filter(c => !c.accounts.some(acc => acc.connected));
    }
    return connections;
  };

  const filteredConnections = getFilteredConnections();
  const pendingProvider = pendingToggle ? connections.find(c => c.id === pendingToggle.providerId) : null;
  const pendingAccounts = pendingProvider ? pendingProvider.accounts.filter(acc => acc.connected) : [];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <p className="text-md text-muted-foreground">Manage your connected email accounts</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 md:gap-6 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "all"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Applications
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("connected")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "connected"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Connected
          {activeTab === "connected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("disconnected")}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === "disconnected"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Disconnected
          {activeTab === "disconnected" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Email Providers Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-1">Email Providers</h2>
          <p className="text-xs text-muted-foreground">
            Connect and manage your email service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {filteredConnections.map((connection) => {
            const connectedCount = connection.accounts.filter(acc => acc.connected).length;
            const isConnected = connectedCount > 0;

            return (
              <Card key={connection.id} className="shadow-card hover:shadow-card-hover transition-all border-border">
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{connection.logo}</div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold mb-1">
                        {connection.provider}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {connection.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  {connection.accounts.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {connection.accounts.map((account, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${account.connected ? 'bg-success' : 'bg-muted'}`} />
                          {account.email}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-auto px-0 hover:bg-transparent hover:underline"
                    >
                      Details
                    </Button>
                    <div className="flex items-center gap-2">
                      {!isConnected && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary h-auto px-2 hover:bg-transparent hover:underline"
                        >
                          Connect
                        </Button>
                      )}
                      <Switch
                        checked={isConnected}
                        onCheckedChange={(checked) => handleToggle(connection.id, checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                This will deactivate {pendingAccounts.length} account{pendingAccounts.length !== 1 ? 's' : ''}:
              </p>
              <div className="mt-3 space-y-1">
                {pendingAccounts.map((account, idx) => (
                  <div key={idx} className="text-sm font-medium text-foreground">
                    • {account.email}
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingToggle(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle} className="bg-destructive hover:bg-destructive/90">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Connections;