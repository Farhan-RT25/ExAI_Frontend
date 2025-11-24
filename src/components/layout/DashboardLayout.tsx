import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const getPageInfo = (pathname: string) => {
  const routes: Record<string, { title: string; subtitle: string }> = {
    "/dashboard": { 
      title: "Dashboard", 
      subtitle: "Manage your email workflow efficiently" 
    },
    "/dashboard/connections": { 
      title: "Connections", 
      subtitle: "Manage your connected email accounts" 
    },
    "/dashboard/categorization": { 
      title: "Manage Categories", 
      subtitle: "Select which categories to use for organizing your emails" 
    },
    "/dashboard/drafts": { 
      title: "Draft Reply Settings", 
      subtitle: "Configure how AI generates draft responses" 
    },
    "/dashboard/meetings": { 
      title: "Meetings", 
      subtitle: "View and manage your meeting schedules" 
    },
    "/dashboard/settings": { 
      title: "Settings", 
      subtitle: "Manage your account preferences and AI behavior" 
    },
  };
  return routes[pathname] || { title: "Dashboard", subtitle: "Full details of your campaigns" };
};

export const DashboardLayout = () => {
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full bg-muted overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col p-4 md:p-2 gap-4 md:gap-2 overflow-hidden">
          <header className="bg-card rounded-sm border border-border shadow-sm px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
              <SidebarTrigger />
              <div className="min-w-0 flex-1">
                <h2 className="text-base md:text-lg font-semibold text-foreground truncate">{pageInfo.title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-48 xl:w-64 pl-9 h-9"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs md:text-sm">
                  KW
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 bg-card rounded-sm border border-border shadow-sm p-4 md:p-6 overflow-y-auto min-h-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};