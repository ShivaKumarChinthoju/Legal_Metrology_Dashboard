import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    id: userId,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@ap.gov.in",
    phone: "+91 9876543210",
    role: "Senior Inspector",
    district: "Krishna",
    department: "Legal Metrology",
    joinDate: "2020-03-15",
    status: "active",
    permissions: ["view_applications", "approve_licenses", "conduct_inspections"],
    lastLogin: "2024-12-16 10:30 AM"
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save user data logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/users')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Details</h1>
              <p className="text-muted-foreground">View and manage user information</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit User
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input id="name" defaultValue={user.name} />
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input id="email" type="email" defaultValue={user.email} />
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input id="phone" defaultValue={user.phone} />
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Select defaultValue={user.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Senior Inspector">Senior Inspector</SelectItem>
                        <SelectItem value="Inspector">Inspector</SelectItem>
                        <SelectItem value="Assistant Inspector">Assistant Inspector</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  {isEditing ? (
                    <Input id="district" defaultValue={user.district} />
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.district}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Input id="department" defaultValue={user.department} />
                  ) : (
                    <p className="text-sm p-2 bg-muted rounded">{user.department}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Account Status</Label>
                <Badge variant={user.status === "active" ? "default" : "destructive"}>
                  {user.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label>Join Date</Label>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {user.joinDate}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Last Login</Label>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  {user.lastLogin}
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full">
                  Suspend Account
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.permissions.map((permission) => (
                  <div key={permission} className="flex items-center justify-between p-3 border rounded">
                    <span className="capitalize">{permission.replace('_', ' ')}</span>
                    <Badge variant="outline">Granted</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetails;