import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface DemoScheduleData {
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

const Demo = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [formData, setFormData] = useState<DemoScheduleData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    date: undefined,
    time: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      time: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      toast({
        title: t('demoPage.dateRequired'),
        description: t('demoPage.dateRequiredDesc'),
        variant: "destructive",
      });
      return;
    }

    if (!formData.time) {
      toast({
        title: t('demoPage.timeRequired'),
        description: t('demoPage.timeRequiredDesc'),
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
        title: t('demoPage.success'),
        description: t('demoPage.successDesc'),
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
    } catch (error) {
      toast({
        title: t('demoPage.error'),
        description: t('demoPage.errorDesc'),
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('demoPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('demoPage.subtitle')}
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('demoPage.formTitle')}</h2>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                {t('demoPage.contactNote')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('demoPage.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('demoPage.namePlaceholder')}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('demoPage.email')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('demoPage.emailPlaceholder')}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('demoPage.phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('demoPage.phonePlaceholder')}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessName">{t('demoPage.business')}</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder={t('demoPage.businessPlaceholder')}
                    autoComplete="off"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('demoPage.date')} *</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                        onClick={() => setIsCalendarOpen(true)}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : t('demoPage.pickDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-[100]" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          handleDateSelect(date);
                          setIsCalendarOpen(false);
                        }}
                        disabled={isDateDisabled}
                        initialFocus
                        className="p-3 pointer-events-auto bg-background"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>{t('demoPage.time')} *</Label>
                  <Select value={formData.time} onValueChange={handleTimeChange} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('demoPage.pickTime')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border z-50 max-h-60 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{t('demoPage.message')}</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('demoPage.messagePlaceholder')}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  disabled={isLoading}
                  className="sm:w-auto"
                >
                  {t('demoPage.cancel')}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-alva flex-1 sm:flex-initial"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {isLoading ? t('demoPage.submitting') : t('demoPage.submit')}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Demo;
