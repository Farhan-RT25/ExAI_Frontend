import { Bell, Mail, Calendar, CheckCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Notification {
  id: number;
  type: "email" | "meeting" | "success" | "alert";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "email",
    title: "New email from John Doe",
    description: "Re: Project Update - Please review the attached...",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "meeting",
    title: "Meeting starting soon",
    description: "Team Standup in 15 minutes",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "AI Draft completed",
    description: "Your email draft is ready for review",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "alert",
    title: "Action required",
    description: "3 emails need your response",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "email",
    title: "Weekly digest ready",
    description: "Your email summary for this week",
    time: "3 hours ago",
    read: true,
  },
];

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "email":
      return <Mail className="h-4 w-4 text-primary" />;
    case "meeting":
      return <Calendar className="h-4 w-4 text-info" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "alert":
      return <AlertCircle className="h-4 w-4 text-warning" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationsPanel = ({ open, onOpenChange }: NotificationsPanelProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 pb-3 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-primary text-xs px-2 ml-1">
                {unreadCount}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[400px]">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-muted shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary">
            Mark all as read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsPanel;