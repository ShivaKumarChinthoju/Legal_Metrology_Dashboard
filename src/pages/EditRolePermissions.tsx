import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Shield, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const EditRolePermissions = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  
  const roleDisplayName = role?.replace(/_/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
  ).join(' ') || '';

  const [permissions, setPermissions] = useState({
    // System Access
    full_access: role === 'admin',
    system_settings: role === 'admin',
    user_management: role === 'admin' || role === 'district_controller',
    
    // Data Management
    data_entry: true,
    data_edit: role !== 'data_entry_operator',
    data_delete: role === 'admin',
    
    // Application Management
    application_create: true,
    application_edit: role !== 'data_entry_operator',
    application_approve: role === 'admin' || role === 'district_controller',
    application_reject: role === 'admin' || role === 'district_controller',
    
    // License Management
    license_view: true,
    license_create: role !== 'data_entry_operator',
    license_approve: role === 'admin' || role === 'district_controller',
    license_revoke: role === 'admin' || role === 'district_controller',
    
    // Inspection Management
    inspection_schedule: role !== 'data_entry_operator',
    inspection_conduct: role === 'inspector' || role === 'district_controller' || role === 'admin',
    inspection_approve: role === 'district_controller' || role === 'admin',
    field_access: role === 'inspector' || role === 'district_controller' || role === 'admin',
    
    // Reporting
    basic_reports: true,
    advanced_reports: role !== 'data_entry_operator',
    custom_reports: role === 'admin' || role === 'district_controller',
    report_export: role !== 'data_entry_operator',
    
    // District Management
    district_access: role === 'district_controller' || role === 'admin',
    inspector_management: role === 'district_controller' || role === 'admin',
    district_reports: role === 'district_controller' || role === 'admin',
    
    // Analytics
    view_analytics: role !== 'data_entry_operator',
    performance_metrics: role === 'district_controller' || role === 'admin',
    compliance_tracking: role !== 'data_entry_operator'
  });

  const permissionCategories = {
    'System Access': [
      { key: 'full_access', label: 'Full System Access', description: 'Complete access to all system features' },
      { key: 'system_settings', label: 'System Settings', description: 'Modify system configuration and settings' },
      { key: 'user_management', label: 'User Management', description: 'Create, edit, and manage user accounts' }
    ],
    'Data Management': [
      { key: 'data_entry', label: 'Data Entry', description: 'Enter new data into the system' },
      { key: 'data_edit', label: 'Data Editing', description: 'Modify existing data records' },
      { key: 'data_delete', label: 'Data Deletion', description: 'Delete data records from system' }
    ],
    'Application Management': [
      { key: 'application_create', label: 'Create Applications', description: 'Submit new applications' },
      { key: 'application_edit', label: 'Edit Applications', description: 'Modify application details' },
      { key: 'application_approve', label: 'Approve Applications', description: 'Approve or reject applications' },
      { key: 'application_reject', label: 'Reject Applications', description: 'Reject applications with reasons' }
    ],
    'License Management': [
      { key: 'license_view', label: 'View Licenses', description: 'View license information' },
      { key: 'license_create', label: 'Create Licenses', description: 'Issue new licenses' },
      { key: 'license_approve', label: 'Approve Licenses', description: 'Approve license applications' },
      { key: 'license_revoke', label: 'Revoke Licenses', description: 'Revoke or suspend licenses' }
    ],
    'Inspection Management': [
      { key: 'inspection_schedule', label: 'Schedule Inspections', description: 'Plan and schedule inspections' },
      { key: 'inspection_conduct', label: 'Conduct Inspections', description: 'Perform field inspections' },
      { key: 'inspection_approve', label: 'Approve Inspections', description: 'Review and approve inspection reports' },
      { key: 'field_access', label: 'Field Access', description: 'Access to field inspection tools' }
    ],
    'Reporting': [
      { key: 'basic_reports', label: 'Basic Reports', description: 'Access to standard reports' },
      { key: 'advanced_reports', label: 'Advanced Reports', description: 'Access to detailed analytics reports' },
      { key: 'custom_reports', label: 'Custom Reports', description: 'Create custom report templates' },
      { key: 'report_export', label: 'Export Reports', description: 'Download and export reports' }
    ],
    'District Management': [
      { key: 'district_access', label: 'District Access', description: 'Access to district-level features' },
      { key: 'inspector_management', label: 'Inspector Management', description: 'Manage district inspectors' },
      { key: 'district_reports', label: 'District Reports', description: 'Access district-specific reports' }
    ],
    'Analytics': [
      { key: 'view_analytics', label: 'View Analytics', description: 'Access to analytics dashboard' },
      { key: 'performance_metrics', label: 'Performance Metrics', description: 'View performance analytics' },
      { key: 'compliance_tracking', label: 'Compliance Tracking', description: 'Monitor compliance metrics' }
    ]
  };

  const handlePermissionChange = (permissionKey: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permissionKey]: checked
    }));
  };

  const handleSave = () => {
    toast("Role permissions updated successfully!", {
      description: `Permissions for ${roleDisplayName} have been saved.`
    });
    navigate('/users');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-primary/20 text-primary border-primary/30"><Shield className="w-3 h-3 mr-1" />Admin</Badge>;
      case "district_controller":
        return <Badge className="bg-success/20 text-success border-success/30"><Users className="w-3 h-3 mr-1" />District Controller</Badge>;
      case "inspector":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Inspector</Badge>;
      case "data_entry_operator":
        return <Badge variant="outline">Data Entry Operator</Badge>;
      default:
        return <Badge variant="outline">{roleDisplayName}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">Edit Role Permissions</h1>
              {getRoleBadge(role || '')}
            </div>
            <p className="text-muted-foreground">
              Configure permissions for {roleDisplayName} role
            </p>
          </div>
          <div className="ml-auto">
            <Button onClick={handleSave} className="bg-gradient-primary hover:bg-gradient-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Permission Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryPermissions.map((permission) => (
                  <div key={permission.key} className="flex items-start space-x-3">
                    <Checkbox
                      id={permission.key}
                      checked={permissions[permission.key as keyof typeof permissions]}
                      onCheckedChange={(checked) => handlePermissionChange(permission.key, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={permission.key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {permission.label}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-primary/10 rounded">
                <div className="text-2xl font-bold text-primary">
                  {Object.values(permissions).filter(Boolean).length}
                </div>
                <div className="text-xs text-muted-foreground">Granted Permissions</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="text-2xl font-bold">
                  {Object.keys(permissions).length}
                </div>
                <div className="text-xs text-muted-foreground">Total Permissions</div>
              </div>
              <div className="p-3 bg-success/10 rounded">
                <div className="text-2xl font-bold text-success">
                  {Math.round((Object.values(permissions).filter(Boolean).length / Object.keys(permissions).length) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Coverage</div>
              </div>
              <div className="p-3 bg-accent/10 rounded">
                <div className="text-2xl font-bold text-accent">{roleDisplayName}</div>
                <div className="text-xs text-muted-foreground">Role</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default EditRolePermissions;