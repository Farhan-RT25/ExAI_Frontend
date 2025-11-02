import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, TrendingUp, MessageSquare, ArrowUp, ArrowDown, ArrowRight, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const kpiData = [
  { title: "Total Emails", value: "21,300", change: "+42%", icon: Mail, trend: "up" },
  { title: "Emails Requiring Response", value: "87", change: "", icon: MessageSquare, trend: null },
  { title: "Response Rate", value: "94%", change: "+12%", icon: TrendingUp, trend: "up" },
  { title: "Avg Response Time", value: "2.4h", change: "-8%", icon: Clock, trend: "down" },
];

const recentActivity = [
  {
    sender: "John Smith",
    email: "john.smith@example.com",
    subject: "Q4 Financial Report Review",
    category: "Admin",
    date: "2 hours ago",
    status: "Draft Ready",
    avatar: "JS",
  },
  {
    sender: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Partnership Proposal",
    category: "Sales",
    date: "5 hours ago",
    status: "To Respond",
    avatar: "ED",
  },
  {
    sender: "Michael Brown",
    email: "michael.b@example.com",
    subject: "Team Meeting Notes",
    category: "Meeting/Event",
    date: "Yesterday",
    status: "Completed",
    avatar: "MB",
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1.5">Hi, Kristin Watson 👋</h1>
          <p className="text-sm text-muted-foreground">Greetings on UPMAIL! Generate your Email Campaign effortlessly with just a single click.</p>
        </div>
        <Button className="bg-teal hover:bg-teal/90 text-teal-foreground">
          Create New Campaign
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-card hover:shadow-card-hover transition-all border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
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
                {/* Mini sparkline placeholder */}
                <div className="h-12 w-24 flex items-end gap-0.5">
                  {[40, 65, 45, 70, 55, 80, 60, 85, 75, 90].map((height, i) => (
                    <div key={i} className="flex-1 bg-muted rounded-sm" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Email Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{activity.sender}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{activity.category}</Badge>
                  <Badge
                    className={
                      activity.status === "Draft Ready"
                        ? "bg-info text-info-foreground"
                        : activity.status === "To Respond"
                        ? "bg-warning text-warning-foreground"
                        : "bg-success text-success-foreground"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground min-w-[100px] text-right">
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["To Respond", "Admin", "Sales", "Marketing", "HR"].map((category, index) => {
                const values = [145, 89, 67, 45, 23];
                const colors = ["bg-info", "bg-primary", "bg-success", "bg-warning", "bg-danger"];
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                    <span className="flex-1">{category}</span>
                    <span className="font-semibold">{values[index]}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              View Emails Requiring Response
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Review Draft Replies
            </Button>
            <Button className="w-full justify-start" variant="outline">
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
