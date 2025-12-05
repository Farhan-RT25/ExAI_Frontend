import { MdDashboard, MdCategory, MdEdit, MdVideoLibrary, MdLink, MdSettings, MdLogout, MdMail, MdLightMode, MdDarkMode } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { Webhook } from "lucide-react";
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
import { useState, useEffect } from "react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard },
  { title: "Categorization", url: "/dashboard/categorization", icon: MdCategory },
  { title: "Drafts", url: "/dashboard/drafts", icon: MdEdit },
  { title: "Meetings", url: "/dashboard/meetings", icon: MdVideoLibrary },
  { title: "AI Assistant", url: "/dashboard/ai-assistant", icon: RiRobot3Fill, isLucide: true },
  { title: "Connections", url: "/dashboard/connections", icon: MdLink },
];

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme !== 'light';
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }

    toast({
      title: `${newIsDark ? 'Dark' : 'Light'} mode enabled`,
      description: `Switched to ${newIsDark ? 'dark' : 'light'} mode`,
    });
  };

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
                <Webhook className="h-4 w-4 text-primary-foreground" />
              </div>
              {!isCollapsed && <span className="font-semibold mb-3">Nyx</span>}
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
                          ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15 border border-primary rounded-md"
                          : "text-foreground/60 hover:bg-primary/10 hover:text-primary rounded-md"
                        }`}>
                          {item.isLucide ? (
                            <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? '' : ''}`} />
                          ) : (
                            <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'fill-current' : ''}`} />
                          )}
                          {!isCollapsed && (
                            <span className="flex items-center justify-between flex-1">
                              {item.title}
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
                    className="!px-0 !py-5"
                  >
                    {({ isActive }) => (
                      <div className={`flex items-center gap-3 py-2 text-sm w-full ${
                        isCollapsed ? 'px-0 py-2 justify-center' : 'px-3'
                      } ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15 border border-primary rounded-md"
                          : "text-foreground/60 hover:bg-primary/10 hover:text-primary rounded-md"
                      }`}>
                        <MdSettings className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span>Settings</span>}
                      </div>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={toggleTheme}
                  className="!px-0 !py-5"
                >
                  <div className={`flex items-center gap-3 py-2 text-sm w-full ${
                    isCollapsed ? 'px-0 py-2 justify-center' : 'px-3'
                  } text-foreground/60 hover:bg-primary/10 hover:text-primary rounded-md cursor-pointer`}>
                    {isDarkMode ? (
                      <MdLightMode className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <MdDarkMode className="h-4 w-4 flex-shrink-0" />
                    )}
                    {!isCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="!px-0 !py-5"
                >
                  <div className={`flex items-center gap-3 py-2 text-sm w-full ${
                    isCollapsed ? 'px-0 py-2 justify-center' : 'px-3'
                  } text-[#e60f00] hover:bg-[#e60f00]/10 rounded-md cursor-pointer`}>
                    <MdLogout className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
