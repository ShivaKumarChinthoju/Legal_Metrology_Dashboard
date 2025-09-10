import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import loginBackground from '@/assets/ap-login-background.jpg';
import apGovtLogo from '@/assets/ap.png';

const Login = () => {
  const [loginType, setLoginType] = useState<'admin' | 'applicant' | 'inspector' | 'supervisor'>('admin');
  const [email, setEmail] = useState('admin@apdlm.gov.in');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update credentials based on login type
  React.useEffect(() => {
    switch (loginType) {
      case 'admin':
        setEmail('admin@apdlm.gov.in');
        setPassword('admin123');
        break;
      case 'applicant':
        setEmail('applicant@business.com');
        setPassword('applicant123');
        break;
      case 'inspector':
        setEmail('inspector@apdlm.gov.in');
        setPassword('inspector123');
        break;
      case 'supervisor':
        setEmail('supervisor@apdlm.gov.in');
        setPassword('supervisor123');
        break;
    }
  }, [loginType]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process with different credential sets
    setTimeout(() => {
      const validCredentials = {
        admin: { email: 'admin@apdlm.gov.in', password: 'admin123' },
        applicant: { email: 'applicant@business.com', password: 'applicant123' },
        inspector: { email: 'inspector@apdlm.gov.in', password: 'inspector123' },
        supervisor: { email: 'supervisor@apdlm.gov.in', password: 'supervisor123' }
      };

      const isValidLogin = email === validCredentials[loginType].email && 
                          password === validCredentials[loginType].password;

      if (isValidLogin) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loginType', loginType);
        toast({
          title: "Login Successful",
          description: `Welcome to Legal Metrology Dashboard (${loginType.charAt(0).toUpperCase() + loginType.slice(1)})`,
        });
        
        // Redirect based on user type
        switch (loginType) {
          case 'admin':
            navigate('/');
            break;
          case 'applicant':
            navigate('/applicant-dashboard');
            break;
          case 'inspector':
            navigate('/inspector-dashboard');
            break;
          case 'supervisor':
            navigate('/supervisor-dashboard');
            break;
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="w-full max-w-md relative z-10">
        <Card className="border-0 shadow-2xl backdrop-blur-sm bg-background/95">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <img 
                src={apGovtLogo} 
                alt="Government of Andhra Pradesh" 
                className="h-16 w-16"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                Legal Metrology System
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Government of Andhra Pradesh
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Login Type Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                <Button
                  variant={loginType === 'admin' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('admin')}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  variant={loginType === 'applicant' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('applicant')}
                  className="text-xs"
                >
                  Applicant
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg mt-2">
                <Button
                  variant={loginType === 'inspector' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('inspector')}
                  className="text-xs"
                >
                  Inspector
                </Button>
                <Button
                  variant={loginType === 'supervisor' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLoginType('supervisor')}
                  className="text-xs"
                >
                  Supervisor
                </Button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In as {loginType.charAt(0).toUpperCase() + loginType.slice(1)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="text-center">
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Admin:</strong> admin@apdlm.gov.in / admin123</p>
                <p><strong>Applicant:</strong> applicant@business.com / applicant123</p>
                <p><strong>Inspector:</strong> inspector@apdlm.gov.in / inspector123</p>
                <p><strong>Supervisor:</strong> supervisor@apdlm.gov.in / supervisor123</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 space-y-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/contact-us')}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Contact Us
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/support')}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Support
            </Button>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              © 2025 Government of Andhra Pradesh. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Powered by Garudalytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
