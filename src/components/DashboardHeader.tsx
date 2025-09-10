import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  User, 
  LogOut, 
  Search
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import cmNaiduPhoto from '@/assets/cm-chandrababu-naidu.jpeg';
import deputyCMPhoto from '@/assets/deputy-cm-pavan-kalyan.jpg';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-8 w-8" />
          
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/90a71333-3b99-4a53-b91e-c80162737ade.png" 
              alt="Government of Andhra Pradesh" 
              className="h-10 w-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">
                Legal Metrology Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Government of Andhra Pradesh
              </p>
            </div>
            
            {/* CM and Deputy CM Photos */}
            <div className="hidden xl:flex items-center space-x-3 ml-6 pl-6 border-l border-border">
              <div className="flex items-center space-x-2">
                <img 
                  src={cmNaiduPhoto} 
                  alt="CM N. Chandrababu Naidu" 
                  className="h-8 w-8 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="text-xs">
                  <p className="font-medium text-foreground">N. Chandrababu Naidu</p>
                  <p className="text-muted-foreground">Chief Minister</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img 
                  src={deputyCMPhoto} 
                  alt="Deputy CM Pawan Kalyan" 
                  className="h-8 w-8 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="text-xs">
                  <p className="font-medium text-foreground">Pawan Kalyan</p>
                  <p className="text-muted-foreground">Deputy CM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex flex-1 max-w-lg mx-4 md:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search applications, licenses, or entities..."
              className="pl-10 bg-background w-full text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">SLA Breach Alert</p>
                  <p className="text-xs text-muted-foreground">5 applications exceeding deadline</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New Applications</p>
                  <p className="text-xs text-muted-foreground">12 new license applications received</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Inspection Due</p>
                  <p className="text-xs text-muted-foreground">3 inspections scheduled for today</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@apdlm.gov.in</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile')}>Account Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;