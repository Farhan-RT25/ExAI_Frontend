import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, TrendingUp, MessageSquare, HelpCircle, ChevronDown, Check, ArrowUp, ArrowDown, Zap, CheckCircle2, Sparkles, BarChart3, Calendar as CalendarIcon, Plus, Settings, FileText, Video, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfile, getAccessToken, type User } from "@/lib/api/auth";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  getDashboardData, 
  type EmailAccountInfo,
  type KPIMetric,
  type VolumeDataPoint,
  type CategoryDataPoint,
  type AIInsight
} from "@/lib/api/dashboard";
import { Link } from "react-router-dom";

// Icon mapping for KPI metrics
const iconMap: Record<string, any> = {
  Mail,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  HelpCircle
};

// Counter animation component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 100;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const displayValue = suffix === "%" || suffix === "h" 
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

// Sample upcoming events
const upcomingEvents = [
  { id: 1, title: "Team Standup", time: "9:00 AM", type: "meeting" },
  { id: 2, title: "Client Call - Project Review", time: "11:30 AM", type: "meeting" },
  { id: 3, title: "Lunch with Marketing", time: "1:00 PM", type: "event" },
  { id: 4, title: "Sprint Planning", time: "3:00 PM", type: "meeting" },
];

// Quick actions
const quickActions = [
  { title: "Compose Email", icon: Mail, href: "#", color: "bg-primary" },
  { title: "Schedule Meeting", icon: Video, href: "/dashboard/meetings", color: "bg-info" },
  { title: "AI Assistant", icon: Bot, href: "/dashboard/ai-assistant", color: "bg-success" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings", color: "bg-warning" },
];

const DashboardHome = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Dashboard data state
  const [emailAccounts, setEmailAccounts] = useState<EmailAccountInfo[]>([
    { id: "all", name: "All Accounts", email: "", color: "bg-gradient-primary" }
  ]);
  const [kpi, setKpi] = useState<KPIMetric[]>([]);
  const [volumeData, setVolumeData] = useState<VolumeDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [mainInsight, setMainInsight] = useState<string>("");

  const currentAccount = emailAccounts.find(acc => acc.id === selectedAccount) || emailAccounts[0];

  // Fetch dashboard data
  const fetchDashboardData = async (accountId?: string) => {
    try {
      setError(null);
      const data = await getDashboardData(accountId);
      
      setEmailAccounts(data.accounts);
      setKpi(data.kpi);
      setVolumeData(data.volumeData);
      setCategoryData(data.categoryData);
      setAiInsights(data.aiInsights);
      setMainInsight(data.mainInsight || "");
      
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data";
      setError(errorMessage);
      
      if (emailAccounts.length === 0) {
        setEmailAccounts([{ id: "all", name: "All Accounts", email: "", color: "bg-gradient-primary" }]);
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = getAccessToken();
        if (!token) {
          throw new Error("No access token found");
        }

        const profile = await getProfile(token);
        setUser(profile);
        
        await fetchDashboardData();
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setError(null);
            await fetchDashboardData();
          } catch {
            // Ignore parse error
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!loading) {
      const accountId = selectedAccount === "all" ? undefined : selectedAccount;
      fetchDashboardData(accountId);
    }
  }, [selectedAccount]);

  const getFirstName = () => {
    if (!user) return "there";
    
    if (user.full_name) {
      const firstName = user.full_name.split(' ')[0];
      return firstName;
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return "there";
  };

  if (error && error.includes("API base URL is not configured")) {
    return (
      <div className="space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-8 rounded-lg">
          <h2 className="font-bold text-lg mb-2">Configuration Error</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm opacity-75">
            Please create a <code className="bg-muted px-2 py-1 rounded">.env</code> file with:
          </p>
          <pre className="mt-2 bg-muted p-4 rounded text-sm overflow-x-auto">
            VITE_API_BASE=http://localhost:8000
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold">
            {loading ? (
              <span className="inline-block bg-muted animate-pulse rounded w-48 h-8">&nbsp;</span>
            ) : error ? (
              "Welcome back!"
            ) : (
              `Welcome back, ${getFirstName()}!`
            )}
          </h1>
        </div>
        
        {/* Email Account Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto sm:min-w-[240px] justify-between h-11">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${currentAccount?.color || 'bg-primary'}`} />
                <span className="text-sm font-medium">{currentAccount?.name || 'All Accounts'}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            {emailAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => setSelectedAccount(account.id)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${account.color}`} />
                <span className="text-sm font-medium flex-1">{account.name}</span>
                {selectedAccount === account.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI Cards */}
      {kpi.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpi.map((kpiItem, index) => {
            const Icon = iconMap[kpiItem.icon] || Mail;
            
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden border-l-[6px] transition-all duration-700 group cursor-pointer bg-card"
                style={{ borderLeftColor: kpiItem.color }}
              >
                <div 
                  className="absolute bottom-0 right-0 w-full h-[40%] rounded-full transition-all duration-700 ease-in-out group-hover:scale-[7] group-hover:translate-x-[-20px]"
                  style={{ 
                    backgroundColor: kpiItem.color,
                    transform: 'translateY(70px)',
                  }}
                />
                
                <CardHeader className="flex flex-row items-start justify-between pb-2 pt-5 px-5 relative z-10">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-3 transition-colors duration-700">
                      {kpiItem.title}
                    </CardTitle>
                    <div className="text-3xl font-bold tracking-tight mb-2 transition-colors duration-700">
                      <AnimatedCounter value={kpiItem.value} suffix={kpiItem.suffix || ""} />
                    </div>
                    {kpiItem.change && (
                      <div className="flex items-center gap-1">
                        {kpiItem.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 transition-colors duration-700" style={{ color: kpiItem.color }} />
                        ) : (
                          <ArrowDown className="h-3 w-3 transition-colors duration-700" style={{ color: kpiItem.color }} />
                        )}
                        <span className="text-xs font-medium transition-colors duration-700" style={{ color: kpiItem.color }}>
                          {kpiItem.change}
                        </span>
                        <span className="text-xs text-muted-foreground transition-colors duration-700">vs last month</span>
                      </div>
                    )}
                  </div>
                  <div 
                    className="p-3 rounded-xl transition-all duration-700"
                    style={{ backgroundColor: kpiItem.color }}
                  >
                    <Icon className="h-5 w-5 text-white transition-all duration-700" />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="xl:col-span-2 space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Insights Card */}
            <Card className="border hover:border-primary/50 transition-all shadow-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 pointer-events-none" />
              
              <CardHeader className="pb-4 pt-6 px-6 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">Real-time</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 relative z-10">
                {mainInsight && (
                  <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Your Email Volume</p>
                    <h3 className="text-2xl font-bold mb-2">{mainInsight}</h3>
                    <p className="text-sm text-muted-foreground">Since last Month</p>
                  </div>
                )}

                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        {insight.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <BarChart3 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm flex-1">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Email Volume Chart */}
            <Card className="border hover:border-primary/50 transition-all shadow-card">
              <CardHeader className="pb-4 pt-6 px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg font-semibold">Email Volume</CardTitle>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Received</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <span>Responded</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {volumeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Line type="monotone" dataKey="emails" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 4 }} />
                      <Line type="monotone" dataKey="responded" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <p>No email data available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <Card className="border hover:border-primary/50 transition-all shadow-card">
            <CardHeader className="pb-4 pt-6 px-6">
              <CardTitle className="text-lg font-semibold">Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  <p>No category data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar & Quick Actions */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="border hover:border-primary/50 transition-all shadow-card">
            <CardHeader className="pb-2 pt-6 px-6">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full"
              />
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border hover:border-primary/50 transition-all shadow-card">
            <CardHeader className="pb-4 pt-6 px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${event.type === 'meeting' ? 'bg-primary/20' : 'bg-success/20'}`}>
                      {event.type === 'meeting' ? (
                        <Video className="h-4 w-4 text-primary" />
                      ) : (
                        <CalendarIcon className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border hover:border-primary/50 transition-all shadow-card">
            <CardHeader className="pb-4 pt-6 px-6">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-warning" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                    >
                      <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-center">{action.title}</span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
