import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Search, 
  ArrowLeft,
  Book,
  Video,
  Download,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Settings,
  Shield,
  Users,
  Clock
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import apGovtLogo from '@/assets/ap-govt-logo.png';

const Support = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I apply for a new license?",
      answer: "To apply for a new license, log in to the system using your credentials, navigate to the Applications section, and click on 'New Application'. Fill out all required information and submit the necessary documents.",
      category: "Licensing"
    },
    {
      question: "What documents are required for license renewal?",
      answer: "For license renewal, you need: Valid business registration, Previous license copy, Updated business details, Fee payment receipt, and any compliance certificates if applicable.",
      category: "Licensing"
    },
    {
      question: "How can I track my application status?",
      answer: "You can track your application status by logging into the system and navigating to 'Applications' → 'Application Status'. Enter your application ID or search by your details.",
      category: "Applications"
    },
    {
      question: "What are the inspection procedures?",
      answer: "Inspections are conducted by certified inspectors. You will receive advance notice, and the inspector will verify compliance with legal metrology standards. A detailed report will be provided after inspection.",
      category: "Inspections"
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' on the login page, enter your registered email address, and follow the instructions sent to your email.",
      category: "Technical"
    },
    {
      question: "What are the fee structures?",
      answer: "Fee structures vary based on license type, business category, and district. Please refer to the official fee schedule available in the Downloads section or contact our office for detailed information.",
      category: "Fees"
    }
  ];

  const supportChannels = [
    {
      title: "Phone Support",
      description: "Speak directly with our support team",
      icon: Phone,
      contact: "+91-863-2340123",
      hours: "9:30 AM - 5:30 PM (Mon-Fri)",
      availability: "Available"
    },
    {
      title: "Email Support",
      description: "Send us your queries via email",
      icon: Mail,
      contact: "support@apdlm.gov.in",
      hours: "Response within 24 hours",
      availability: "Available"
    },
    {
      title: "Live Chat",
      description: "Get instant help through chat",
      icon: MessageCircle,
      contact: "Chat Now",
      hours: "10:00 AM - 4:00 PM (Mon-Fri)",
      availability: "Available"
    },
    {
      title: "Visit Office",
      description: "Visit our office for in-person support",
      icon: Users,
      contact: "Secretariat, Amaravati",
      hours: "9:30 AM - 5:30 PM (Mon-Fri)",
      availability: "Available"
    }
  ];

  const resources = [
    {
      title: "User Manual",
      description: "Complete guide to using the Legal Metrology system",
      icon: Book,
      type: "PDF",
      size: "2.5 MB"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: Video,
      type: "Video",
      size: "Various"
    },
    {
      title: "Forms & Templates",
      description: "Downloadable application forms and templates",
      icon: FileText,
      type: "ZIP",
      size: "1.8 MB"
    },
    {
      title: "System Requirements",
      description: "Technical specifications and browser requirements",
      icon: Settings,
      type: "PDF",
      size: "500 KB"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-government-green-light to-government-gold-light p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Button>
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={apGovtLogo} alt="Government of Andhra Pradesh" className="h-20 w-20" />
          </div>
          <h1 className="text-4xl font-bold text-government-green mb-4">Support Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions and get help with the Legal Metrology system
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          {/* FAQ Section */}
          <TabsContent value="faq">
            <div className="space-y-6">
              {/* Search */}
              <Card className="shadow-government">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* FAQ List */}
              <Card className="shadow-government">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{faq.question}</span>
                            <Badge variant="secondary" className="ml-2">{faq.category}</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Support */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="shadow-government hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <channel.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                        <p className="text-muted-foreground mb-3">{channel.description}</p>
                        <div className="space-y-2">
                          <p className="font-medium">{channel.contact}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {channel.hours}
                          </p>
                          <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                            {channel.availability}
                          </Badge>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          Get Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="shadow-government hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent p-3 rounded-lg">
                        <resource.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="secondary">{resource.size}</Badge>
                          </div>
                          <Button size="sm" className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Status */}
          <TabsContent value="status">
            <div className="space-y-6">
              <Card className="shadow-government">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span>System Status</span>
                    <Badge variant="secondary" className="bg-success/20 text-success">All Systems Operational</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="h-3 w-3 bg-success rounded-full mx-auto mb-2"></div>
                      <h4 className="font-semibold">Web Application</h4>
                      <p className="text-sm text-muted-foreground">Operational</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="h-3 w-3 bg-success rounded-full mx-auto mb-2"></div>
                      <h4 className="font-semibold">Database Services</h4>
                      <p className="text-sm text-muted-foreground">Operational</p>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="h-3 w-3 bg-success rounded-full mx-auto mb-2"></div>
                      <h4 className="font-semibold">API Services</h4>
                      <p className="text-sm text-muted-foreground">Operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-government">
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">System Maintenance Completed</p>
                        <p className="text-sm text-muted-foreground">Scheduled maintenance completed successfully - Jan 28, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-success rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">New Features Released</p>
                        <p className="text-sm text-muted-foreground">Enhanced reporting and analytics features - Jan 25, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-warning rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Security Update</p>
                        <p className="text-sm text-muted-foreground">Enhanced security protocols implemented - Jan 20, 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;