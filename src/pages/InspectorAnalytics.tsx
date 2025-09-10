import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Star,
  Award
} from "lucide-react";

const InspectorAnalytics = () => {
  const navigate = useNavigate();

  const inspectors = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      district: 'Vijayawada',
      completed: 45, 
      pending: 3, 
      efficiency: 94,
      rating: 4.8,
      experience: '5 years'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      district: 'Visakhapatnam',
      completed: 52, 
      pending: 2, 
      efficiency: 96,
      rating: 4.9,
      experience: '7 years'
    },
    { 
      id: 3, 
      name: 'Suresh Reddy', 
      district: 'Guntur',
      completed: 38, 
      pending: 5, 
      efficiency: 88,
      rating: 4.5,
      experience: '3 years'
    },
    { 
      id: 4, 
      name: 'Lakshmi Devi', 
      district: 'Tirupati',
      completed: 41, 
      pending: 1, 
      efficiency: 98,
      rating: 4.7,
      experience: '6 years'
    }
  ];

  const performanceMetrics = [
    { metric: 'Average Completion Time', value: '2.5 hours', trend: '+5%' },
    { metric: 'Quality Score', value: '92%', trend: '+8%' },
    { metric: 'Customer Satisfaction', value: '4.6/5', trend: '+12%' },
    { metric: 'Efficiency Rating', value: '94%', trend: '+3%' },
  ];

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 95) return { variant: "default", label: "Excellent" };
    if (efficiency >= 90) return { variant: "secondary", label: "Good" };
    return { variant: "outline", label: "Average" };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Inspector Analytics</h1>
            <p className="text-muted-foreground">Performance metrics and productivity analysis</p>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {performanceMetrics.map(metric => (
            <Card key={metric.metric}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.metric}</div>
                <div className="text-xs text-green-600 mt-1">{metric.trend} from last month</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Inspector Performance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspectors.map(inspector => {
                const badge = getEfficiencyBadge(inspector.efficiency);
                return (
                  <Card key={inspector.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {inspector.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{inspector.name}</h3>
                          <p className="text-sm text-muted-foreground">{inspector.district}</p>
                          <p className="text-xs text-muted-foreground">{inspector.experience} experience</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-6 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">{inspector.completed}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">{inspector.pending}</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{inspector.efficiency}%</div>
                          <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {inspector.rating}
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                      
                      <Badge variant={badge.variant as any}>
                        {badge.label}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Workload Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Workload Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectors.map(inspector => (
                  <div key={inspector.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{inspector.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(inspector.completed / 60) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{inspector.completed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Quality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accuracy Rate</span>
                  <span className="font-medium">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Report Completeness</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Compliance</span>
                  <span className="font-medium">91%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Customer Feedback</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="font-bold text-green-600">93%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InspectorAnalytics;