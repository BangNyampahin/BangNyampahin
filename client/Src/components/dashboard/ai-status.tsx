import { Share2, Mail, Coins, Shield, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AiAction {
  id: number;
  actionType: string;
  serviceName: string;
  description: string;
  status: string;
  createdAt: Date;
}

interface AiStatusProps {
  recentActions: AiAction[];
  personaName: string;
  personaDescription: string;
}

const capabilities = [
  {
    name: "Social Media",
    description: "Auto-posting, engagement monitoring",
    icon: Share2,
    iconColor: "text-accent",
  },
  {
    name: "Email Management",
    description: "Smart replies, scheduling",
    icon: Mail,
    iconColor: "text-primary",
  },
  {
    name: "Crypto Trading",
    description: "DEX interactions, portfolio tracking",
    icon: Coins,
    iconColor: "text-warning",
  },
  {
    name: "Security",
    description: "Smart contract verification",
    icon: Shield,
    iconColor: "text-success",
  },
];

const getActionIcon = (actionType: string) => {
  switch (actionType.toLowerCase()) {
    case 'post_tweet':
      return Share2;
    case 'send_email':
      return Mail;
    case 'swap_tokens':
      return Coins;
    default:
      return Brain;
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function AiStatus({ recentActions, personaName, personaDescription }: AiStatusProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">AI Assistant Status</CardTitle>
          <Badge variant="secondary" className="bg-success/10 text-success">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* AI Persona Configuration */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{personaName}</h4>
              <p className="text-sm text-muted-foreground">{personaDescription}</p>
            </div>
          </div>
          
          {/* AI Capabilities */}
          <div className="grid grid-cols-2 gap-4">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              
              return (
                <div key={capability.name} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className={`w-4 h-4 ${capability.iconColor}`} />
                    <span className="font-medium text-foreground">{capability.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent AI Actions */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Recent Actions</h4>
          <div className="space-y-3">
            {recentActions.length > 0 ? (
              recentActions.map((action) => {
                const Icon = getActionIcon(action.actionType);
                
                return (
                  <div key={action.id} className="action-item">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      action.status === 'completed' ? 'bg-success/10' : 
                      action.status === 'failed' ? 'bg-destructive/10' : 'bg-warning/10'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        action.status === 'completed' ? 'text-success' :
                        action.status === 'failed' ? 'text-destructive' : 'text-warning'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {action.actionType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(new Date(action.createdAt))}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No AI actions yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect services and create automations to see AI activity
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
