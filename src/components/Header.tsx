import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/90a71333-3b99-4a53-b91e-c80162737ade.png" 
              alt="Government of Andhra Pradesh" 
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">
                AI Enabled Legal Metrology
              </h1>
              <p className="text-sm text-muted-foreground">
                Government of Andhra Pradesh
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#verification" className="text-foreground hover:text-primary transition-colors">
              Verification
            </a>
            <a href="#inspection" className="text-foreground hover:text-primary transition-colors">
              Inspection
            </a>
            <a href="#reports" className="text-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;