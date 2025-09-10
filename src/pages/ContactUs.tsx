import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  ArrowLeft,
  Building,
  Globe,
  Users
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import apGovtLogo from '@/assets/ap-govt-logo.png';

const ContactUs = () => {
  const navigate = useNavigate();

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
          <h1 className="text-4xl font-bold text-government-green mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with the Legal Metrology Department, Government of Andhra Pradesh
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-government">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Building className="h-5 w-5" />
                  <span>Department Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Office Address</h4>
                    <p className="text-muted-foreground">
                      Legal Metrology Department<br />
                      Government of Andhra Pradesh<br />
                      Secretariat, Velagapudi<br />
                      Amaravati - 522503
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone Numbers</h4>
                    <p className="text-muted-foreground">
                      Main Office: +91-863-2340123<br />
                      Toll Free: 1800-425-1111<br />
                      Emergency: +91-863-2340124
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Email Addresses</h4>
                    <p className="text-muted-foreground">
                      General Inquiries: info@apdlm.gov.in<br />
                      Technical Support: support@apdlm.gov.in<br />
                      Complaints: complaints@apdlm.gov.in
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Office Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:30 AM - 5:30 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-government">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Users className="h-5 w-5" />
                  <span>Key Officials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">Director</h4>
                  <p className="text-muted-foreground">Dr. Rajesh Kumar, IAS</p>
                  <p className="text-sm text-muted-foreground">director@apdlm.gov.in</p>
                </div>
                <div>
                  <h4 className="font-semibold">Additional Director</h4>
                  <p className="text-muted-foreground">Smt. Priya Sharma, ACS</p>
                  <p className="text-sm text-muted-foreground">addl.director@apdlm.gov.in</p>
                </div>
                <div>
                  <h4 className="font-semibold">Chief Inspector</h4>
                  <p className="text-muted-foreground">Sri Venkat Reddy</p>
                  <p className="text-sm text-muted-foreground">chief.inspector@apdlm.gov.in</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-government">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Send className="h-5 w-5" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter message subject" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message here..." 
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-government hover:opacity-90">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="shadow-government bg-gradient-government text-white">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Visit Our Website</h3>
              <p className="mb-4">
                For more information about Legal Metrology regulations, procedures, and updates, 
                visit our official website.
              </p>
              <Button variant="secondary" className="bg-white text-government-green hover:bg-gray-100">
                Visit Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;