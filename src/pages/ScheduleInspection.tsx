import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, MapPin, User, Clock, Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import axios from "axios";
import { BASE_URL } from "@/Utils/ApiServiceV1";
import { toast } from "@/hooks/use-toast";

const ScheduleInspection = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    address: "",
    district: "",
    contactPerson: "",
    phone: "",
    email: "",
    inspector: "",
    inspectionType: "",
    priority: "",
    notes: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // const date = new Date()
  const [selectedTime, setSelectedTime] = useState("");

  const navigate = useNavigate();

  const [businessNameList, setBusinessNameList] = useState([])
  const [singleBusiness, setSingleBusiness] = useState([])
  const fetchBusinessNameList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getpendingapplications`)
      if (response.status === 200) setBusinessNameList(response?.data)
    } catch (error) {
      return error
    }
  }
  const fetchBusinessById = async (_id) => {

    try {
      const response = await axios.post(`${BASE_URL}/getapplicationbyid`, { application_id: _id })
      if (response.status === 200) {
        setSingleBusiness(response?.data)
        setFormData({
          ...formData,
          businessType: response.data[0].business_type,
          address: response.data[0].address,
          district: response.data[0].district,
          email: response.data[0].email,
          phone: response.data[0].phone_number,
          contactPerson: response.data[0].owner_name
        })
      }
    } catch (error) {
      return error
    }
  }




  useEffect(() => {
    fetchBusinessNameList()
  }, [])

  const postInspection = async () => {
    const fD = new FormData()
    fD.append("application_id", formData.businessName)
    fD.append("inspection_type", formData.inspectionType)
    fD.append("assigned_inspector", formData.inspector)
    fD.append("priority", formData.priority)
    fD.append("additional_notes", formData.notes)
    if (selectedDate) {
      fD.append("inspection_date", selectedDate.toISOString()); // e.g. "2025-09-10T08:00:00.000Z"
    }

    fD.append("inspection_time", selectedTime)

    try {
      const response = await axios.post(`${BASE_URL}/scheduleinspection`, fD, { headers: { "Content-Type": "application/json" } })
      if (response.status === 200) {
        toast({ title: "Inspection Succesfully Posted", description: response.data.message })

        navigate(-1)
      }
    } catch (error) {
      return error
    }
  }




  useEffect(() => {

    const foundBusiness = businessNameList.find(
      (item) => item.application_id === Number(formData.businessName)
    );


    if (foundBusiness?.application_id) {
      fetchBusinessById(foundBusiness.application_id)
    }


  }, [formData.businessName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Scheduling inspection:", { ...formData, date: selectedDate, time: selectedTime });
    // You can add toast notification here
    navigate('/inspections');
  };

  // console.log(formData);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/inspections')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Schedule New Inspection</h1>
              <p className="text-muted-foreground">
                Create a new field inspection schedule
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Select value={formData.businessName} onValueChange={(value) => setFormData({ ...formData, businessName: value }

                      )}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business name" />
                        </SelectTrigger>

                        {businessNameList?.map((item) => {
                          console.log(item);
                          
                          return (<SelectContent>
                            <SelectItem value={item?.application_id}>{item?.business_name}</SelectItem>
                          </SelectContent>)
                        })}
                      </Select>
                    </div> */}

                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Select
                        value={formData.businessName}
                        onValueChange={(value) =>
                          setFormData({ ...formData, businessName: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {
                              businessNameList.find(
                                (item) => String(item.application_id) === String(formData.businessName)
                              )?.business_name || "Select business name"
                            }
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                          {businessNameList?.map((item) => (
                            <SelectItem key={item.application_id} value={String(item.application_id)}>
                              {item.business_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>





                    <div>


                      <Label htmlFor="businessType">Business Type *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        placeholder="Business Type"
                        required
                        readOnly
                      />
                      {/* <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weighing-scales">Weighing Scales</SelectItem>
                          <SelectItem value="fuel-station">Fuel Station</SelectItem>
                          <SelectItem value="gas-meter">Gas Meter</SelectItem>
                          <SelectItem value="general-trader">General Trader</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select> */}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter complete business address"
                      required
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Select disabled value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="krishna">Krishna</SelectItem>
                        <SelectItem value="guntur">Guntur</SelectItem>
                        <SelectItem value="vijayawada">Vijayawada</SelectItem>
                        <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                        <SelectItem value="tirupati">Tirupati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Contact person name"
                        required
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone number"
                        required
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email address"
                        readOnly
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inspection Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="inspector">Assign Inspector *</Label>
                      <Select value={formData.inspector} onValueChange={(value) => setFormData({ ...formData, inspector: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ravi-kumar">Ravi Kumar</SelectItem>
                          <SelectItem value="lakshmi-prasad">Lakshmi Prasad</SelectItem>
                          <SelectItem value="suresh-babu">Suresh Babu</SelectItem>
                          <SelectItem value="priya-sharma">Priya Sharma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="inspectionType">Inspection Type *</Label>
                      <Select value={formData.inspectionType} onValueChange={(value) => setFormData({ ...formData, inspectionType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspection type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weighing-scale-verification">Weighing Scale Verification</SelectItem>
                          <SelectItem value="fuel-pump-calibration">Fuel Pump Calibration</SelectItem>
                          <SelectItem value="annual-compliance">Annual Compliance Check</SelectItem>
                          <SelectItem value="license-renewal">License Renewal Inspection</SelectItem>
                          <SelectItem value="periodic-calibration">Periodic Calibration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority *</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional instructions or notes for the inspector"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* <div>
                    <Label>Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div> */}



                  ...

                  <div>
                    <Label>Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={{ before: new Date() }} // 🔒 disables all past dates
                        />
                      </PopoverContent>
                    </Popover>
                  </div>


                  <div>
                    <Label htmlFor="time">Select Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="09:30">09:30 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="10:30">10:30 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="11:30">11:30 AM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="14:30">02:30 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="15:30">03:30 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                        <SelectItem value="16:30">04:30 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="button" variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Verify Location
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Check Inspector Availability
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    View Time Slots
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button type="button" className="w-full" onClick={postInspection}>
                  <Save className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Schedule & Notify
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleInspection;