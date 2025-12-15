import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getConnections, getAuthorizationUrl, disconnectEmailAccount, type ConnectionProvider } from "@/lib/api/connections";

// Provider logos
const GoogleLogo = () => (
  <svg className="h-10 w-10" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MicrosoftLogo = () => (
  <svg className="h-10 w-10" viewBox="0 0 24 24">
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M13 1h10v10H13z"/>
    <path fill="#7FBA00" d="M1 13h10v10H1z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
);

const ZohoLogo = () => (
  <svg className="h-10 w-10" viewBox="0 0 24 24">
    <path fill="#6001D2" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 7.5l-3 6v3h-3v-3l-3-6h2.5l1.5 3 1.5-3h2.5z"/>
  </svg>
);

const getProviderLogo = (providerId: string) => {
  switch (providerId.toLowerCase()) {
    case "google":
      return <GoogleLogo />;
    case "microsoft":
      return <MicrosoftLogo />;
    case "zoho":
      return <ZohoLogo />;
    default:
      return <div className="h-10 w-10 rounded bg-muted" />;
  }
};

const Connections = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [connections, setConnections] = useState<ConnectionProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingDisconnect, setPendingDisconnect] = useState<{ emailAccountId: number; email: string } | null>(null);
  const [connectingAccount, setConnectingAccount] = useState<number | null>(null);

  // Load connections on mount
  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      setIsLoading(true);
      const data = await getConnections();
      setConnections(data.providers);
    } catch (error) {
      console.error("Failed to load connections:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load connections",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (emailAccountId: number) => {
    try {
      setConnectingAccount(emailAccountId);
      const authUrl = await getAuthorizationUrl(emailAccountId);
      // Redirect to OAuth authorization URL
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to get authorization URL:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to initiate connection",
        variant: "destructive",
      });
      setConnectingAccount(null);
    }
  };

  const handleDisconnect = async () => {
    if (!pendingDisconnect) return;

    try {
      await disconnectEmailAccount(pendingDisconnect.emailAccountId);
      toast({
        title: "Success",
        description: `Disconnected ${pendingDisconnect.email}`,
      });
      // Reload connections
      await loadConnections();
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to disconnect account",
        variant: "destructive",
      });
    } finally {
      setDialogOpen(false);
      setPendingDisconnect(null);
    }
  };

  const getFilteredConnections = () => {
    if (activeTab === "all") return connections;
    if (activeTab === "connected") {
      return connections.filter(c => c.accounts.some(acc => acc.connected));
    }
    if (activeTab === "disconnected") {
      return connections.filter(c => !c.accounts.some(acc => acc.connected) || c.accounts.length === 0);
    }
    return connections;
  };

  const filteredConnections = getFilteredConnections();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
              <Card key={connection.id} className="shadow-card hover:shadow-card-hover transition-all border-border h-full flex flex-col">
                <CardHeader className="pb-3 pt-5 px-5 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">{getProviderLogo(connection.id)}</div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold mb-1">
                        {connection.provider}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {connection.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 mt-auto">
                  {connection.accounts.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {connection.accounts.map((account) => (
                        <div key={account.email_account_id} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${account.connected ? 'bg-green-500' : 'bg-muted'}`} />
                          <span className="flex-1 truncate">{account.email}</span>
                          {!account.connected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6 px-2 text-primary hover:bg-primary/10 shrink-0"
                              onClick={() => handleConnect(account.email_account_id)}
                              disabled={connectingAccount === account.email_account_id}
                            >
                              {connectingAccount === account.email_account_id ? (
                                <>
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Connecting...
                                </>
                              ) : (
                                "Connect"
                              )}
                            </Button>
                          )}
                          {account.connected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6 px-2 text-destructive hover:bg-destructive/10 shrink-0"
                              onClick={() => {
                                setPendingDisconnect({
                                  emailAccountId: account.email_account_id,
                                  email: account.email
                                });
                                setDialogOpen(true);
                              }}
                            >
                              Disconnect
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {connection.accounts.length === 0 ? (
                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground">
                        No accounts added yet
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => {
                          // Redirect to onboarding to add account for this provider
                          window.location.href = `/onboarding/email-connection?provider=${connection.id}`;
                        }}
                      >
                        Add Account
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => {
                          // Redirect to onboarding to add account for this provider
                          window.location.href = `/onboarding/email-connection?provider=${connection.id}`;
                        }}
                      >
                        Add Account
                      </Button>
                    </div>
                  )}
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
                This will disconnect the email account:
              </p>
              <div className="mt-3">
                <div className="text-sm font-medium text-foreground">
                  • {pendingDisconnect?.email}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You can reconnect it later by clicking the Connect button.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingDisconnect(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisconnect} className="bg-destructive hover:bg-destructive/90">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Connections;
