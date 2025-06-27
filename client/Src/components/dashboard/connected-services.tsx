import { Twitter, Mail, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ConnectedService {
  name: string;
  isActive: boolean;
  lastUsed?: Date | null;
}

interface ConnectedServicesProps {
  services: ConnectedService[];
}

const serviceIcons = {
  twitter: Twitter,
  gmail: Mail,
  metamask: Wallet,
};

const serviceColors = {
  twitter: 'bg-blue-500',
  gmail: 'bg-red-500',
  metamask: 'bg-purple-600',
};

export default function ConnectedServices({ services }: ConnectedServicesProps) {
  const [, setLocation] = useLocation();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Connected Services</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/connections")}
            className="text-primary hover:text-primary/80"
          >
            Manage
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {services.length > 0 ? (
            services.map((service, index) => {
              const Icon = serviceIcons[service.name as keyof typeof serviceIcons] || Wallet;
              const colorClass = serviceColors[service.name as keyof typeof serviceColors] || 'bg-gray-500';
              
              return (
                <div key={index} className="service-card">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${colorClass} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {service.name === 'gmail' ? 'Gmail' : 
                         service.name === 'twitter' ? 'Twitter/X' :
                         service.name === 'metamask' ? 'MetaMask' : service.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {service.name === 'gmail' ? 'your@email.com' :
                         service.name === 'twitter' ? '@your_handle' :
                         service.name === 'metamask' ? 'Wallet connected' : 'Connected'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${service.isActive ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No services connected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Connect your accounts to enable AI automation
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/connections")}
                className="mt-3"
              >
                Connect Services
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
