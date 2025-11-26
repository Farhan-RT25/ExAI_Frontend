import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, TrendingUp, MessageSquare, HelpCircle, ChevronDown, Check, ArrowUp, ArrowDown, Zap, CheckCircle2, Sparkles, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfile, getAccessToken, type User } from "@/lib/api/auth";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const emailAccounts = [
  { id: "all", name: "All Accounts", email: "", color: "bg-gradient-primary" },
  { id: "work", name: "Work", email: "kristin.watson@company.com", color: "bg-[#009773]" },
  { id: "personal", name: "Personal", email: "kristin.w@gmail.com", color: "bg-primary" },
  { id: "business", name: "Business", email: "kw@mybusiness.com", color: "bg-[#4a4453]" },
];

const accountData = {
  all: {
    kpi: [
      { title: "Total Emails", value: 21300, change: "40%", trend: "up", icon: Mail, color: "#009773" },
      { title: "Requiring Response", value: 87, change: "20%", trend: "up", icon: Clock, color: "#f59e0b" },
      { title: "Response Rate", value: 94, change: "15%", trend: "up", icon: CheckCircle2, suffix: "%", color: "#ef4444" },
      { title: "Avg Response Time", value: 2.4, change: "30%", trend: "down", icon: TrendingUp, suffix: "h", color: "#3b82f6" },
    ],
    volumeData: [
      { month: 'Jan', emails: 1200, responded: 980 },
      { month: 'Feb', emails: 1400, responded: 1150 },
      { month: 'Mar', emails: 1100, responded: 920 },
      { month: 'Apr', emails: 1600, responded: 1350 },
      { month: 'May', emails: 1450, responded: 1200 },
      { month: 'Jun', emails: 1800, responded: 1550 },
      { month: 'Jul', emails: 1650, responded: 1420 },
      { month: 'Aug', emails: 1900, responded: 1680 },
      { month: 'Sep', emails: 1750, responded: 1520 },
      { month: 'Oct', emails: 2000, responded: 1800 },
      { month: 'Nov', emails: 1850, responded: 1650 },
      { month: 'Dec', emails: 2100, responded: 1900 },
    ],
    categoryData: [
      { name: 'To Respond', value: 145, color: '#a78bfa' },
      { name: 'Admin', value: 89, color: '#009773' },
      { name: 'Sales', value: 67, color: '#4a4453' },
      { name: 'Marketing', value: 45, color: '#f59e0b' },
      { name: 'HR', value: 23, color: '#ef4444' },
    ],
    spendingData: [
      { category: 'Drafting', amount: 320, color: '#a78bfa' },
      { category: 'Categories', amount: 180, color: '#009773' },
      { category: 'Reply', amount: 240, color: '#4a4453' },
      { category: 'Misc', amount: 140, color: '#f59e0b' },
    ],
    aiInsights: [
      { text: "Your email response rate has increased by 5% since last month", trend: "up" },
      { text: "Peak email time is between 9 AM - 11 AM", trend: "neutral" },
      { text: "Average response time improved by 12 minutes", trend: "up" },
    ],
  },
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

const DashboardHome = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentAccount = emailAccounts.find(acc => acc.id === selectedAccount);
  const currentData = accountData[selectedAccount];

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
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setError(null);
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
                <div className={`w-2 h-2 rounded-full ${currentAccount.color}`} />
                <span className="text-sm font-medium">{currentAccount.name}</span>
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

      {/* KPI Cards - Medical Dashboard Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentData.kpi.map((kpi, index) => {
          const Icon = kpi.icon;
          
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden border-l-[6px] transition-all duration-700 group cursor-pointer bg-card"
              style={{ borderLeftColor: kpi.color }}
            >
              {/* Wave animation background */}
              <div 
                className="absolute bottom-0 right-0 w-full h-[40%] rounded-full transition-all duration-700 ease-in-out group-hover:scale-[7] group-hover:translate-x-[-20px]"
                style={{ 
                  backgroundColor: kpi.color,
                  transform: 'translateY(70px)',
                }}
              />
              
              <CardHeader className="flex flex-row items-start justify-between pb-2 pt-5 px-5 relative z-10">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground mb-3 transition-colors duration-700">
                    {kpi.title}
                  </CardTitle>
                  <div className="text-3xl font-bold tracking-tight mb-2 transition-colors duration-700">
                    <AnimatedCounter value={kpi.value} suffix={kpi.suffix || ""} />
                  </div>
                  {kpi.change && (
                    <div className="flex items-center gap-1">
                      {kpi.trend === "up" ? (
                        <ArrowUp className="h-3 w-3 transition-colors duration-700" style={{ color: kpi.color }} />
                      ) : (
                        <ArrowDown className="h-3 w-3 transition-colors duration-700" style={{ color: kpi.color }} />
                      )}
                      <span className="text-xs font-medium transition-colors duration-700" style={{ color: kpi.color }}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground transition-colors duration-700">vs last month</span>
                    </div>
                  )}
                </div>
                <div 
                  className="p-3 rounded-xl transition-all duration-700"
                  style={{ backgroundColor: kpi.color }}
                >
                  <Icon className="h-5 w-5 text-white transition-all duration-700" />
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Card */}
        <Card className="border-2 hover:border-primary/50 transition-all shadow-card relative overflow-hidden">
          {/* Gradient background similar to first image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#009773]/5 pointer-events-none" />
          
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
            {/* Main insight with glow effect */}
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-[#009773]/10 border border-primary/20 relative">
              <div className="absolute top-4 right-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Your Email Volume</p>
              <h3 className="text-2xl font-bold mb-2">  
                has increased by 5%
              </h3>
              <p className="text-sm text-muted-foreground">Since last Month</p>
            </div>

            {/* Additional insights */}
            <div className="space-y-3">
              {currentData.aiInsights.map((insight, index) => (
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
        <Card className="border-2 hover:border-primary/50 transition-all shadow-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Email Volume Trend</CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Received</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#009773]" />
                  <span>Responded</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={currentData.volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="emails" 
                  stroke="#a78bfa" 
                  strokeWidth={3}
                  dot={{ fill: '#a78bfa', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responded" 
                  stroke="#009773" 
                  strokeWidth={3}
                  dot={{ fill: '#009773', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card className="border-2 hover:border-primary/50 transition-all shadow-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-semibold">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentData.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {currentData.categoryData.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentData.categoryData.map((cat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-muted-foreground">{cat.name}</span>
                  <span className="text-xs font-semibold ml-auto">{cat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Bar Chart */}
        <Card className="border-2 hover:border-primary/50 transition-all shadow-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-semibold">Processing Time</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  radius={[8, 8, 0, 0]}
                >
                  {currentData.spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;