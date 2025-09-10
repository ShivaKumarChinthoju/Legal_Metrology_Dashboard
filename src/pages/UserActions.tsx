import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Shield, Lock, Unlock, UserMinus, UserCheck, History, Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import AIReportGenerator from "@/components/AIReportGenerator";

const UserActions = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  // Mock user data
  const userData = {
    id: userId || "U001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@ap.gov.in",
    role: "District Controller",
    district: "Visakhapatnam",
    status: "active",
    lastLogin: "2024-01-28 10:30 AM"
  };

  const actions = [
    {
      category: "Account Management",
      items: [
        { name: "Reset Password", icon: Lock, description: "Send password reset link to user", variant: "outline" },
        { name: "Unlock Account", icon: Unlock, description: "Unlock user account if locked", variant: "outline" },
        { name: "Activate Account", icon: UserCheck, description: "Activate suspended account", variant: "default" },
        { name: "Suspend Account", icon: UserMinus, description: "Temporarily suspend user access", variant: "destructive" }
      ]
    },
    {
      category: "Role & Permissions",
      items: [
        { name: "Change Role", icon: Shield, description: "Modify user role and permissions", variant: "outline" },
        { name: "Reset Permissions", icon: Settings, description: "Reset to default role permissions", variant: "outline" }
      ]
    },
    {
      category: "Audit & History",
      items: [
        { name: "View Activity Log", icon: History, description: "View detailed user activity history", variant: "outline" },
        { name: "Generate User Report", icon: User, description: "Generate comprehensive user report", variant: "outline" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">User Actions</h1>
            <p className="text-muted-foreground">
              Manage user {userData.name} ({userData.email})
            </p>
          </div>
        </div>

        {/* User Summary */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <Badge variant="outline">{userData.role}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">District</label>
                <p className="font-medium">{userData.district}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Badge className="bg-success/20 text-success border-success/30">
                  {userData.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-6">
          {actions.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <div key={action.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{action.name}</h4>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <Button variant={action.variant as any} size="sm">
                          Execute
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Report Generation */}
        <AIReportGenerator 
          title="User Analytics & Insights"
          description="Generate AI-powered user behavior analysis and recommendations"
        />
      </div>
      <Footer />
    </div>
  );
};

export default UserActions;