import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, TrendingUp, MessageSquare, HelpCircle, ChevronDown, Check, Zap, CheckCircle2, Sparkles, BarChart3, Calendar, Video, ChevronRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatCard from "@/components/StatCard";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

import { getProfile, getAccessToken, type User } from "@/lib/api/auth";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { 
  getDashboardData, 
  getDashboardAccounts,
  type EmailAccountInfo,
  type KPIMetric,
  type VolumeDataPoint,
  type CategoryDataPoint,
  type ProcessingTimeDataPoint,
  type AIInsight
} from "@/lib/api/dashboard";

// Icon mapping for KPI metrics
const iconMap: Record<string, any> = {
  Mail: <Mail className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  HelpCircle: <HelpCircle className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />
};

// Sample upcoming meetings data
const upcomingMeetings = [
  {
    id: 1,
    title: "Product marketing meeting",
    date: "Today",
    time: "10:30 AM",
    participants: [{ name: "Jane Cooper", avatar: "JC" }],
    tag: "Marketing"
  },
  {
    id: 2,
    title: "User research discussion",
    date: "Today",
    time: "2:30 PM",
    participants: [{ name: "Darrell Steward", avatar: "DS" }],
    tag: "Research"
  },
  {
    id: 3,
    title: "Weekly team standup",
    date: "Tomorrow",
    time: "9:00 AM",
    participants: [{ name: "Team", avatar: "TM" }, { name: "Lead", avatar: "LD" }],
    tag: "Team"
  }
];

const DashboardHome = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  // Dashboard data state
  const [emailAccounts, setEmailAccounts] = useState<EmailAccountInfo[]>([
    { id: "all", name: "All Accounts", email: "", color: "bg-gradient-primary" }
  ]);
  const [kpi, setKpi] = useState<KPIMetric[]>([]);
  const [volumeData, setVolumeData] = useState<VolumeDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([]);
  const [spendingData, setSpendingData] = useState<ProcessingTimeDataPoint[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [mainInsight, setMainInsight] = useState<string>("");

  const currentAccount = emailAccounts.find(acc => acc.id === selectedAccount);

  // Fetch dashboard data
  const fetchDashboardData = async (accountId?: string) => {
    try {
      setError(null);
      console.log("Fetching dashboard data for account:", accountId || "all");
      
      const data = await getDashboardData(accountId);
      
      console.log("Dashboard data received:", data);
      
      setEmailAccounts(data.accounts);
      setKpi(data.kpi);
      setVolumeData(data.volumeData);
      setCategoryData(data.categoryData);
      setSpendingData(data.spendingData);
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
            Please create a <code className="bg-muted px-2 py-1 rounded">.env</code> file in the New_UI folder with:
          </p>
          <pre className="mt-2 bg-muted p-4 rounded text-sm overflow-x-auto">
            VITE_API_BASE=http://localhost:8000
          </pre>
          <p className="text-sm opacity-75 mt-4">
            Replace <code className="bg-muted px-2 py-1 rounded">http://localhost:8000</code> with your actual backend API URL.
          </p>
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
                <div className={`w-2 h-2 rounded-full ${currentAccount?.color}`} />
                <span className="text-sm font-medium">{currentAccount?.name}</span>
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

      {/* KPI Cards - Using StatCard Component */}
      {kpi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpi.map((kpiItem, index) => {
            const Icon = iconMap[kpiItem.icon] || <Mail className="h-5 w-5" />;
            
            // Parse the change percentage for the progress bar
            const changePercent = kpiItem.change ? 
              parseInt(kpiItem.change.replace(/[^0-9]/g, '')) || 0 : 0;
            
            return (
              <StatCard
                key={index}
                icon={Icon}
                title={kpiItem.title}
                value={kpiItem.value}
                suffix={kpiItem.suffix || ""}
                percent={changePercent}
                trendDirection={kpiItem.trend === "up" ? "up" : "down"}
                color={kpiItem.color}
              />
            );
          })}
        </div>
      ) : !loading && (
        <div className="text-center py-8 text-muted-foreground">
          {/* No data message */}
        </div>
      )}

      {/* Main Content Grid - Charts + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Section - Charts (2/3 width on XL) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Insights Card */}
            <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card relative overflow-hidden bg-gradient-to-br from-card to-card/80">
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
                    <p className="text-xs text-muted-foreground mb-1">Your Email Volume</p>
                    <h3 className="text-xl font-bold mb-1">  
                      {mainInsight}
                    </h3>
                    <p className="text-xs text-muted-foreground">Since last Month</p>
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

            {/* Email Volume Chart */}
            <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4 pt-6 px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Email Volume</CardTitle>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Received</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#009773]" />
                      <span className="text-muted-foreground">Responded</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {volumeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="emails" 
                        stroke="#a78bfa" 
                        strokeWidth={2}
                        dot={{ fill: '#a78bfa', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responded" 
                        stroke="#009773" 
                        strokeWidth={2}
                        dot={{ fill: '#009773', r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[220px] flex items-center justify-center text-muted-foreground">
                    <p>No email data available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution Pie Chart */}
            <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4 pt-6 px-6">
                <CardTitle className="text-lg font-semibold">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={1}
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
                          fontSize: '11px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[260px] flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">No categories selected yet.</p>
                  </div>
                )}
                {categoryData.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {categoryData.map((cat, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-xs text-muted-foreground truncate">{cat.name}</span>
                        <span className="text-xs font-medium ml-auto">{cat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Time Bar Chart */}
            <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4 pt-6 px-6">
                <CardTitle className="text-lg font-semibold">Processing Time</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {spendingData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={spendingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="category" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}
                      />
                      <Bar 
                        dataKey="amount" 
                        radius={[6, 6, 0, 0]}
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[260px] flex items-center justify-center text-muted-foreground">
                    <p className="text-sm">No processing data available yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Calendar & Upcoming Meetings */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-4">
              <CalendarComponent
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
                className="rounded-md w-full pointer-events-auto"
              />
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card className="border border-border/50 hover:border-primary/50 transition-all shadow-card bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-3 pt-5 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Video className="h-4 w-4 text-primary" />
                  Upcoming Meetings
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-primary hover:text-primary/80 h-7 px-2"
                  onClick={() => navigate("/dashboard/meetings")}
                >
                  View all
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                    onClick={() => navigate("/dashboard/meetings")}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {meeting.title}
                      </h4>
                      <Badge className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20 shrink-0">
                        {meeting.tag}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{meeting.date}</span>
                        <span>•</span>
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex -space-x-1.5">
                        {meeting.participants.slice(0, 2).map((p, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full bg-primary/20 border border-card flex items-center justify-center text-[9px] font-medium"
                          >
                            {p.avatar}
                          </div>
                        ))}
                        {meeting.participants.length > 2 && (
                          <div className="w-5 h-5 rounded-full bg-muted border border-card flex items-center justify-center text-[9px] text-muted-foreground">
                            +{meeting.participants.length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;