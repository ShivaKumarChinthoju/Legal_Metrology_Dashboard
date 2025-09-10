import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const InspectionChecklist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const checklistItems = [
    { id: 'license', label: 'Valid License Display', required: true },
    { id: 'scales', label: 'Scale Calibration Certificate', required: true },
    { id: 'weights', label: 'Standard Weights Available', required: true },
    { id: 'cleanliness', label: 'Equipment Cleanliness', required: false },
    { id: 'safety', label: 'Safety Measures in Place', required: true },
    { id: 'records', label: 'Proper Record Keeping', required: true },
    { id: 'signage', label: 'Required Signage Present', required: false },
    { id: 'staff', label: 'Trained Staff Present', required: true },
  ];

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const handleNoteChange = (itemId: string, note: string) => {
    setNotes(prev => ({ ...prev, [itemId]: note }));
  };

  const handleSubmit = () => {
    const requiredItems = checklistItems.filter(item => item.required);
    const missingRequired = requiredItems.filter(item => !checkedItems[item.id]);
    
    if (missingRequired.length > 0) {
      toast.error("Please complete all required items before submitting");
      return;
    }

    toast.success("Inspection checklist submitted successfully");
    navigate('/inspector-dashboard');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Inspection Checklist</h1>
            <p className="text-muted-foreground">Inspection ID: {id || 'INS001'}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Business Inspection Items
              <Badge variant="outline">8 Items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {checklistItems.map(item => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                    />
                    <label className="text-sm font-medium">
                      {item.label}
                      {item.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  </div>
                  {item.required && (
                    <Badge variant={checkedItems[item.id] ? "default" : "destructive"}>
                      {checkedItems[item.id] ? "Complete" : "Required"}
                    </Badge>
                  )}
                </div>
                
                <Textarea
                  placeholder="Add notes or observations..."
                  value={notes[item.id] || ''}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  className="mt-2"
                />
                
                <Button variant="outline" size="sm">
                  <Camera className="h-3 w-3 mr-2" />
                  Add Photo Evidence
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Submit Checklist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InspectionChecklist;