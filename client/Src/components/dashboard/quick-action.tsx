import { Plus, Link, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function QuickActions() {
  const [, setLocation] = useLocation();

  const actions = [
    {
      label: "New Automation",
      icon: Plus,
      onClick: () => setLocation("/automation"),
      className: "bg-primary hover:bg-primary/90",
    },
    {
      label: "Connect Service",
      icon: Link,
      onClick: () => setLocation("/connections"),
      className: "bg-accent hover:bg-accent/90",
    },
    {
      label: "Deploy Contract",
      icon: Rocket,
      onClick: () => setLocation("/smart-contract"),
      className: "bg-success hover:bg-success/90",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.label}
                onClick={action.onClick}
                className={`w-full flex items-center justify-center space-x-2 text-white ${action.className}`}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
