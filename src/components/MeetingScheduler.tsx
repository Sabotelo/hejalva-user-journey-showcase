import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  date: Date | undefined;
  time: string;
  message: string;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

export default function MeetingScheduler() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<MeetingData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    date: undefined,
    time: "",
    message: ""
  });

  console.log('MeetingScheduler render:', { isOpen, isLoading });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      time: e.target.value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!formData.date) {
      toast({
        title: "Date Required",
        description: "Please select a date for your meeting.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.time) {
      toast({
        title: "Time Required", 
        description: "Please select a time for your meeting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            business_name: formData.businessName,
            preferred_date: formData.date.toISOString().split('T')[0],
            preferred_time: formData.time,
            message: formData.message,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Meeting Scheduled!",
        description: "Your business meeting request has been submitted. We'll contact you at +46 737 587 867 to confirm your appointment!",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        date: undefined,
        time: "",
        message: ""
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleButtonClick = () => {
    console.log('Schedule meeting button clicked!');
    setIsOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleButtonClick}
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-lg transition-colors bg-background text-foreground"
      >
        <Clock className="mr-2 h-5 w-5" />
        Schedule Business Meeting
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold flex items-center text-foreground">
                  <Clock className="mr-2 h-6 w-6" />
                  Schedule Business Meeting with Alva
                </h2>
                <p className="text-muted-foreground mt-2">
                  We'll contact you at <strong>+46 737 587 867</strong> to confirm your meeting details.
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      autoComplete="off"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Date *</Label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={cn(
                          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </span>
                      </button>
                      
                      {showCalendar && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-background border rounded-md shadow-lg">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={handleDateSelect}
                            disabled={isDateDisabled}
                            initialFocus
                            className="p-3"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={handleTimeChange}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your business and what you'd like to discuss in our meeting..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                    className="px-6 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-alva text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? "Scheduling..." : "Schedule Meeting"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}