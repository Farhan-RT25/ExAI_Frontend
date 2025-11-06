import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, TrendingUp, MessageSquare, HelpCircle, ChevronDown, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const emailAccounts = [
  { id: "all", name: "All Accounts", email: "", color: "bg-gradient-primary" },
  { id: "work", name: "Work", email: "kristin.watson@company.com", color: "bg-blue-500" },
  { id: "personal", name: "Personal", email: "kristin.w@gmail.com", color: "bg-purple-500" },
  { id: "business", name: "Business", email: "kw@mybusiness.com", color: "bg-green-500" },
];

const accountData = {
  all: {
    kpi: [
      { title: "Total Emails", value: "21,300", change: "+42%", trend: "up" },
      { title: "Emails Requiring Response", value: "87", change: "", trend: null },
      { title: "Response Rate", value: "94%", change: "+12%", trend: "up" },
      { title: "Avg Response Time", value: "2.4h", change: "-8%", trend: "down" },
    ],
    activity: [
      { sender: "John Smith", email: "john.smith@example.com", subject: "Q4 Financial Report Review", category: "Admin", date: "2 hours ago", status: "Draft Ready", avatar: "JS", account: "work" },
      { sender: "Emily Davis", email: "emily.davis@example.com", subject: "Partnership Proposal", category: "Sales", date: "5 hours ago", status: "To Respond", avatar: "ED", account: "work" },
      { sender: "Michael Brown", email: "michael.b@example.com", subject: "Team Meeting Notes", category: "Meeting/Event", date: "Yesterday", status: "Completed", avatar: "MB", account: "personal" },
    ],
    categories: { "To Respond": 145, "Admin": 89, "Sales": 67, "Marketing": 45, "HR": 23 },
  },
  work: {
    kpi: [
      { title: "Total Emails", value: "15,200", change: "+38%", trend: "up" },
      { title: "Emails Requiring Response", value: "52", change: "", trend: null },
      { title: "Response Rate", value: "96%", change: "+15%", trend: "up" },
      { title: "Avg Response Time", value: "2.1h", change: "-12%", trend: "down" },
    ],
    activity: [
      { sender: "John Smith", email: "john.smith@example.com", subject: "Q4 Financial Report Review", category: "Admin", date: "2 hours ago", status: "Draft Ready", avatar: "JS", account: "work" },
      { sender: "Emily Davis", email: "emily.davis@example.com", subject: "Partnership Proposal", category: "Sales", date: "5 hours ago", status: "To Respond", avatar: "ED", account: "work" },
      { sender: "Sarah Johnson", email: "sarah.j@example.com", subject: "Project Update", category: "Admin", date: "1 day ago", status: "Completed", avatar: "SJ", account: "work" },
    ],
    categories: { "To Respond": 95, "Admin": 62, "Sales": 48, "Marketing": 28, "HR": 15 },
  },
  personal: {
    kpi: [
      { title: "Total Emails", value: "4,100", change: "+52%", trend: "up" },
      { title: "Emails Requiring Response", value: "23", change: "", trend: null },
      { title: "Response Rate", value: "88%", change: "+8%", trend: "up" },
      { title: "Avg Response Time", value: "3.2h", change: "-5%", trend: "down" },
    ],
    activity: [
      { sender: "Michael Brown", email: "michael.b@example.com", subject: "Team Meeting Notes", category: "Meeting/Event", date: "Yesterday", status: "Completed", avatar: "MB", account: "personal" },
      { sender: "Lisa Anderson", email: "lisa.a@example.com", subject: "Weekend Plans", category: "Personal", date: "2 days ago", status: "Completed", avatar: "LA", account: "personal" },
      { sender: "Tom Wilson", email: "tom.w@example.com", subject: "Book Recommendation", category: "Personal", date: "3 days ago", status: "To Respond", avatar: "TW", account: "personal" },
    ],
    categories: { "To Respond": 32, "Personal": 18, "Family": 12, "Friends": 8, "Other": 5 },
  },
  business: {
    kpi: [
      { title: "Total Emails", value: "2,000", change: "+28%", trend: "up" },
      { title: "Emails Requiring Response", value: "12", change: "", trend: null },
      { title: "Response Rate", value: "92%", change: "+10%", trend: "up" },
      { title: "Avg Response Time", value: "1.8h", change: "-15%", trend: "down" },
    ],
    activity: [
      { sender: "David Lee", email: "david.lee@client.com", subject: "Invoice #4521", category: "Billing", date: "3 hours ago", status: "To Respond", avatar: "DL", account: "business" },
      { sender: "Rachel Green", email: "rachel.g@vendor.com", subject: "Service Agreement", category: "Legal", date: "6 hours ago", status: "Draft Ready", avatar: "RG", account: "business" },
      { sender: "James Miller", email: "james.m@partner.com", subject: "Collaboration Opportunity", category: "Sales", date: "1 day ago", status: "Completed", avatar: "JM", account: "business" },
    ],
    categories: { "To Respond": 18, "Billing": 12, "Sales": 10, "Legal": 7, "Support": 3 },
  },
};

const DashboardHome = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const currentAccount = emailAccounts.find(acc => acc.id === selectedAccount);
  const currentData = accountData[selectedAccount];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1.5">Hi, Kristin Watson 👋</h1>
          <p className="text-sm text-muted-foreground">Manage your email workflow efficiently.</p>
        </div>
        
        {/* Email Account Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto sm:min-w-[240px] justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentAccount.color}`} />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{currentAccount.name}</span>
                  {currentAccount.email && (
                    <span className="text-xs text-muted-foreground">{currentAccount.email}</span>
                  )}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            {emailAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => setSelectedAccount(account.id)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${account.color}`} />
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium">{account.name}</span>
                  {account.email && (
                    <span className="text-xs text-muted-foreground">{account.email}</span>
                  )}
                </div>
                {selectedAccount === account.id && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {currentData.kpi.map((kpi, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                {kpi.title}
                <HelpCircle className="h-3.5 w-3.5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  {kpi.change && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-success" : "text-success"}`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground">From Last Month</span>
                    </div>
                  )}
                </div>
                {/* Mini sparkline with purple gradient */}
                <div className="h-12 w-24 flex items-end gap-0.5">
                  {[40, 65, 45, 70, 55, 80, 60, 85, 75, 90].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 rounded-sm bg-gradient-to-t from-purple-500 to-purple-300" 
                      style={{ height: `${height}%`, opacity: 0.7 + (i * 0.03) }} 
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
        <CardHeader className="pb-3 pt-5 px-5">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
            Recent Email Activity
            <HelpCircle className="h-3.5 w-3.5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-3">
            {currentData.activity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.sender}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">{activity.category}</Badge>
                  <Badge
                    className={`text-xs ${
                      activity.status === "Draft Ready"
                        ? "bg-info text-info-foreground"
                        : activity.status === "To Respond"
                        ? "bg-warning text-warning-foreground"
                        : "bg-success text-success-foreground"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground min-w-[100px] text-right">
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              Category Breakdown
              <HelpCircle className="h-3.5 w-3.5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-3">
              {Object.entries(currentData.categories).map(([category, value], index) => {
                const colors = ["bg-info", "bg-primary", "bg-success", "bg-warning", "bg-danger"];
                return (
                  <div key={category} className="flex items-center gap-3 py-2">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                    <span className="flex-1 text-sm">{category}</span>
                    <span className="text-sm font-semibold">{value as string}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-card-hover transition-all border-border">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              Quick Actions
              <HelpCircle className="h-3.5 w-3.5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2">
            <Button className="w-full justify-start text-sm" variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              View Emails Requiring Response
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Review Draft Replies
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;