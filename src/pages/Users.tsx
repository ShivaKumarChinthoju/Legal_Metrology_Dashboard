import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield, 
  Eye,
  Settings,
  UserCheck,
  UserX,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const userData = [
  {
    id: "U001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@ap.gov.in",
    role: "Admin",
    district: "Visakhapatnam",
    status: "active",
    lastLogin: "2024-01-28 10:30 AM",
    avatar: "",
    phone: "+91 9876543210"
  },
  {
    id: "U002",
    name: "Priya Sharma",
    email: "priya.sharma@ap.gov.in", 
    role: "Assistant Controller/Inspector (LMO)",
    district: "Hyderabad",
    status: "active",
    lastLogin: "2024-01-28 09:15 AM",
    avatar: "",
    phone: "+91 9876543211"
  },
  {
    id: "U003",
    name: "Suresh Reddy",
    email: "suresh.reddy@ap.gov.in",
    role: "Supervisor (DC/JC)",
    district: "Guntur", 
    status: "inactive",
    lastLogin: "2024-01-25 02:45 PM",
    avatar: "",
    phone: "+91 9876543212"
  },
  {
    id: "U004",
    name: "Lakshmi Devi",
    email: "lakshmi.devi@ap.gov.in",
    role: "Applicant",
    district: "Vijayawada",
    status: "active",
    lastLogin: "2024-01-28 11:00 AM",
    avatar: "",
    phone: "+91 9876543213"
  },
  {
    id: "U005",
    name: "Venkata Rao",
    email: "venkata.rao@ap.gov.in",
    role: "Assistant Controller/Inspector (LMO)",
    district: "Kurnool",
    status: "active",
    lastLogin: "2024-01-28 08:45 AM",
    avatar: "",
    phone: "+91 9876543214"
  }
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

const getStatusBadge = (status: string) => {
  return status === "active" ? (
    <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
  ) : (
    <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
  );
};

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredUsers = userData.filter(user => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === "" || selectedRole === "all" || user.role === selectedRole) &&
      (selectedDistrict === "" || selectedDistrict === "all" || user.district === selectedDistrict) &&
      (selectedStatus === "" || selectedStatus === "all" || user.status === selectedStatus)
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage system users and roles</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90" onClick={() => navigate('/users/add')}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">231</div>
            <p className="text-xs text-muted-foreground">93.5% active rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles Defined</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Different access levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <UserX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">New user requests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Directory</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Manage all system users and their access</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Assistant Controller/Inspector (LMO)">Assistant Controller/Inspector (LMO)</SelectItem>
                    <SelectItem value="Supervisor (DC/JC)">Supervisor (DC/JC)</SelectItem>
                    <SelectItem value="Applicant">Applicant</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
                    <SelectItem value="Vijayawada">Vijayawada</SelectItem>
                    <SelectItem value="Guntur">Guntur</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.district}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                       <TableCell>
                         <div className="flex gap-2">
                           <Button variant="outline" size="sm" title="View Details" onClick={() => navigate(`/users/${user.id}/details`)}>
                             <Eye className="h-4 w-4" />
                           </Button>
                           <Button variant="outline" size="sm" title="Edit User" onClick={() => navigate(`/users/${user.id}/edit`)}>
                             <Edit className="h-4 w-4" />
                           </Button>
                           <Button variant="outline" size="sm" title="User Actions" onClick={() => navigate(`/users/${user.id}/actions`)}>
                             <Settings className="h-4 w-4" />
                           </Button>
                         </div>
                       </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Define roles and permissions for different user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(rolePermissions).map(([role, permissions]) => (
                  <Card key={role}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{role}</CardTitle>
                        {getRoleBadge(role)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Permissions:</h4>
                        <div className="space-y-1">
                          {permissions.map((permission, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              {permission}
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/users/roles/${role.toLowerCase().replace(/\s+/g, '_')}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Permissions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Audit</CardTitle>
              <CardDescription>Track user actions and system access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="text-sm font-medium">User login: rajesh.kumar@ap.gov.in</p>
                    <p className="text-xs text-muted-foreground">2024-12-16 10:30 AM</p>
                  </div>
                  <Badge variant="outline">INFO</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="text-sm font-medium">License approved: LIC001</p>
                    <p className="text-xs text-muted-foreground">2024-12-16 09:15 AM</p>
                  </div>
                  <Badge variant="outline">ACTION</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="text-sm font-medium">Inspection completed: INS004</p>
                    <p className="text-xs text-muted-foreground">2024-12-15 03:45 PM</p>
                  </div>
                  <Badge variant="outline">SUCCESS</Badge>
                </div>
                <div className="text-center pt-4">
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Audit Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}