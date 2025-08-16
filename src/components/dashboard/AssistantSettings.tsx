import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bot, Save, Loader2, Phone, MessageSquare, Clock, Volume2 } from "lucide-react";

const AssistantSettings = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ai_assistant_name: profile?.ai_assistant_name || "Alex",
    ai_personality: profile?.ai_personality || "",
    voice_type: "friendly_female",
    language: "swedish",
    call_routing: true,
    appointment_booking: true,
    business_hours_only: false,
    max_call_duration: "10",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateProfile({
      ai_assistant_name: formData.ai_assistant_name,
      ai_personality: formData.ai_personality,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update assistant settings. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "AI Assistant settings updated successfully!",
      });
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const testCall = () => {
    toast({
      title: "Test Call Initiated",
      description: "Your AI assistant will call you in a few moments for testing.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant Configuration
          </CardTitle>
          <CardDescription>
            Customize your AI assistant's personality and behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ai_assistant_name">Assistant Name</Label>
                <Input
                  id="ai_assistant_name"
                  value={formData.ai_assistant_name}
                  onChange={(e) => handleInputChange("ai_assistant_name", e.target.value)}
                  placeholder="Alex"
                />
                <p className="text-xs text-muted-foreground">
                  The name your customers will hear
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice_type">Voice Type</Label>
                <Select
                  value={formData.voice_type}
                  onValueChange={(value) => handleInputChange("voice_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly_female">Friendly Female (Swedish)</SelectItem>
                    <SelectItem value="professional_male">Professional Male (Swedish)</SelectItem>
                    <SelectItem value="warm_female">Warm Female (English)</SelectItem>
                    <SelectItem value="confident_male">Confident Male (English)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swedish">Swedish</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="multilingual">Auto-detect (Multilingual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_call_duration">Max Call Duration (minutes)</Label>
                <Select
                  value={formData.max_call_duration}
                  onValueChange={(value) => handleInputChange("max_call_duration", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai_personality">Assistant Personality & Instructions</Label>
              <Textarea
                id="ai_personality"
                value={formData.ai_personality}
                onChange={(e) => handleInputChange("ai_personality", e.target.value)}
                placeholder="Describe how your AI assistant should behave, what information it should know about your business, and how it should interact with customers..."
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Be specific about your business, services, pricing, and how you want the assistant to handle different situations.
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Assistant Settings
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Handling Options
          </CardTitle>
          <CardDescription>
            Configure how your AI assistant handles calls and appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Call Routing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow assistant to transfer calls to you when needed
                </p>
              </div>
              <Switch
                checked={formData.call_routing}
                onCheckedChange={(checked) => handleInputChange("call_routing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Booking</Label>
                <p className="text-sm text-muted-foreground">
                  Let customers book appointments through the AI assistant
                </p>
              </div>
              <Switch
                checked={formData.appointment_booking}
                onCheckedChange={(checked) => handleInputChange("appointment_booking", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Business Hours Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only answer calls during configured business hours
                </p>
              </div>
              <Switch
                checked={formData.business_hours_only}
                onCheckedChange={(checked) => handleInputChange("business_hours_only", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Test Your Assistant
          </CardTitle>
          <CardDescription>
            Test how your AI assistant will interact with customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={testCall} variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Test Call
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat Test
            </Button>
            <Button variant="outline" className="flex-1">
              <Clock className="mr-2 h-4 w-4" />
              Booking Test
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Test your assistant's responses before going live with customers
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantSettings;