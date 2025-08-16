import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Calendar, 
  Phone, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Crown,
  Star
} from "lucide-react";

const SubscriptionManagement = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock subscription data - in real app this would come from Stripe/API
  const subscriptionData = {
    plan: "Professional",
    status: profile?.subscription_status || "trial",
    nextBilling: "2024-02-15",
    callsUsed: 42,
    callsLimit: 100,
    price: 299,
    currency: "SEK",
    features: [
      "100 AI-handled calls per month",
      "Advanced AI personality customization",
      "Call recording & transcripts",
      "24/7 customer support",
      "Integration with booking systems",
      "Detailed analytics & reports"
    ]
  };

  const plans = [
    {
      name: "Starter",
      price: 149,
      currency: "SEK",
      period: "month",
      calls: 50,
      features: [
        "50 AI-handled calls per month",
        "Basic AI assistant",
        "Call logs",
        "Email support",
        "Standard voice options"
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Professional",
      price: 299,
      currency: "SEK", 
      period: "month",
      calls: 100,
      features: [
        "100 AI-handled calls per month",
        "Advanced AI personality",
        "Call recording & transcripts",
        "Priority support",
        "Multiple voice options",
        "Basic analytics"
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      name: "Enterprise",
      price: 599,
      currency: "SEK",
      period: "month", 
      calls: 250,
      features: [
        "250 AI-handled calls per month",
        "Custom AI training",
        "Advanced integrations",
        "Dedicated support",
        "Custom voice cloning",
        "Advanced analytics",
        "Multi-location support"
      ],
      icon: <Star className="h-6 w-6" />,
      popular: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "trial":
        return "bg-blue-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "trial":
        return "Free Trial";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const handleUpgrade = (planName: string) => {
    setLoading(true);
    toast({
      title: "Redirecting to checkout",
      description: `Upgrading to ${planName} plan...`,
    });
    
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Upgrade initiated",
        description: "You'll be redirected to our secure payment processor.",
      });
    }, 1000);
  };

  const handleManageBilling = () => {
    toast({
      title: "Opening billing portal",
      description: "Redirecting to Stripe customer portal...",
    });
  };

  const callsUsagePercentage = (subscriptionData.callsUsed / subscriptionData.callsLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Manage your AI assistant subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Plan</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{subscriptionData.plan}</h3>
                <Badge className={getStatusColor(subscriptionData.status)}>
                  {getStatusText(subscriptionData.status)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {subscriptionData.price} {subscriptionData.currency}/month
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Usage This Month</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{subscriptionData.callsUsed} calls</span>
                  <span className="text-muted-foreground">
                    of {subscriptionData.callsLimit} limit
                  </span>
                </div>
                <Progress value={callsUsagePercentage} className="w-full" />
              </div>
              {callsUsagePercentage > 80 && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Approaching limit</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Next Billing</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(subscriptionData.nextBilling).toLocaleDateString()}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleManageBilling}
                className="w-full"
              >
                Manage Billing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle>Your Plan Features</CardTitle>
          <CardDescription>What's included in your {subscriptionData.plan} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptionData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Upgrade or change your subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">{plan.icon}</div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price} <span className="text-sm font-normal">{plan.currency}/{plan.period}</span>
                  </div>
                  <CardDescription>{plan.calls} calls per month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {subscriptionData.plan === plan.name ? (
                    <Button disabled className="w-full">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(plan.name)}
                      disabled={loading}
                      className={`w-full ${plan.popular ? 'bg-gradient-alva' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {subscriptionData.plan === "Professional" && plan.name === "Starter" 
                        ? 'Downgrade' 
                        : 'Upgrade'} to {plan.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Usage Statistics
          </CardTitle>
          <CardDescription>Your AI assistant performance this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{subscriptionData.callsUsed}</div>
              <div className="text-sm text-muted-foreground">Calls Handled</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-muted-foreground">Appointments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;