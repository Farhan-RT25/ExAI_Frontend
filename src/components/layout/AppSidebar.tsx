import { MdDashboard, MdCategory, MdEdit, MdVideoLibrary, MdLink, MdSettings, MdLogout, MdMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { logout } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard },
  { title: "Categorization", url: "/dashboard/categorization", icon: MdCategory },
  { title: "Drafts", url: "/dashboard/drafts", icon: MdEdit },
  { title: "Meetings", url: "/dashboard/meetings", icon: MdVideoLibrary, badge: "Coming Soon" },
  { title: "Connections", url: "/dashboard/connections", icon: MdLink },
];

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent className="bg-card rounded-sm border border-border shadow-sm" >
        <div className="p-2 border-b border-sidebar-border">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 mb-5 mt-2 bg-gradient-primary rounded-sm">
                <MdMail className="h-4 w-4 text-primary-foreground" />
              </div>
              {!isCollapsed && <span className="font-semibold mb-3">Ex AI</span>}
            </div>
            {isMobile && (
              <button
                onClick={() => setOpenMobile(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors mb-3"
                aria-label="Close sidebar"
              >
                <MdLogout className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      onClick={handleNavClick}
                      className="!px-0 !py-5"
                    >
                      {({ isActive }) => (
                        <div className={`flex items-center gap-3 py-2 text-sm w-full ${
                          isCollapsed ? 'px-0 py-2 justify-center' : 'px-3'
                        } ${
                          isActive
                          ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15 border border-primary"
                          : "text-primary hover:bg-primary/10 hover:text-primary"
                        }`}>
                          <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'fill-current' : ''}`} />
                          {!isCollapsed && (
                            <span className="flex items-center justify-between flex-1">
                              {item.title}
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs ml-2">
                                  {item.badge}
                                </Badge>
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/dashboard/settings"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary/10 text-primary font-semibold hover:text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  >
                    <MdSettings className="h-4 w-4" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <MdLogout className="h-4 w-4" />
                  {!isCollapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}