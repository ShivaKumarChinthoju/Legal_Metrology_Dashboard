import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  UserCheck,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const districts = [
  "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
  "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", 
  "West Godavari", "Cuddapah", "Hyderabad", "Karimnagar", "Khammam",
  "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Rangareddy", 
  "Warangal", "Adilabad", "Jagtial", "Jangaon", "Jayashankar"
];

const rolePermissions = {
  "Admin": ["Manage users", "View reports", "System configuration", "Full access to all modules"],
  "Applicant": ["Registration", "Upload documents", "Pay fees", "Track application status"],
  "Assistant Controller/Inspector (LMO)": ["Scrutinize applications", "Conduct verification", "Upload evidence", "Approve/reject applications", "Verification management"],
  "Supervisor (DC/JC)": ["Monitor performance", "Ratify cases", "Review approvals", "Performance analytics"]
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Admin":
      return <Badge className="bg-primary/20 text-primary border-primary/30"><Shield className="w-3 h-3 mr-1" />Admin</Badge>;
    case "Assistant Controller/Inspector (LMO)":
      return <Badge className="bg-success/20 text-success border-success/30"><UserCheck className="w-3 h-3 mr-1" />AC/Inspector</Badge>;
    case "Supervisor (DC/JC)":
      return <Badge className="bg-warning/20 text-warning border-warning/30"><MapPin className="w-3 h-3 mr-1" />Supervisor</Badge>;
    case "Applicant":
      return <Badge variant="outline"><Edit className="w-3 h-3 mr-1" />Applicant</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export default function AddNewUser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    district: "",
    mandal: "",
    address: "",
    employeeId: "",
    designation: ""
  });

  const [avatar, setAvatar] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.district) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate user creation
    toast({
      title: "Success",
      description: "User created successfully",
    });

    // Navigate back to users page
    navigate('/users');
  };

  const selectedRolePermissions = formData.role ? rolePermissions[formData.role as keyof typeof rolePermissions] : [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/users')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New User</h1>
          <p className="text-muted-foreground">Create a new user account with appropriate role and permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Enter the basic information for the new user</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@ap.gov.in"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      placeholder="EMP001"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Assistant Controller/Inspector (LMO)">Assistant Controller/Inspector (LMO)</SelectItem>
                        <SelectItem value="Supervisor (DC/JC)">Supervisor (DC/JC)</SelectItem>
                        <SelectItem value="Applicant">Applicant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      placeholder="Assistant Controller"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mandal">Mandal</Label>
                    <Input
                      id="mandal"
                      placeholder="Enter mandal"
                      value={formData.mandal}
                      onChange={(e) => handleInputChange('mandal', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">
                    Create User
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/users')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Upload user profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-lg">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Picture
                </Button>
              </div>
            </CardContent>
          </Card>

          {formData.role && (
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Permissions assigned to this role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Selected Role:</span>
                    {getRoleBadge(formData.role)}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Permissions:</h4>
                    <div className="space-y-1">
                      {selectedRolePermissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}