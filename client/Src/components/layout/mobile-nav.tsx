import { useState } from 'react';
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Brain, 
  Home, 
  Plug, 
  Bot, 
  Link as LinkIcon, 
  Wallet, 
  Settings, 
  Shield, 
  BarChart3, 
  Store,
  Database,
  Search,
  Menu,
  Monitor,
  Smartphone
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Connections", href: "/connections", icon: Plug },
  { name: "Automation", href: "/automation", icon: Bot },
  { name: "Smart Contract", href: "/smart-contract", icon: LinkIcon },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Security", href: "/security", icon: Shield },
  { name: "IPFS Storage", href: "/ipfs", icon: Database },
  { name: "AI Automation", href: "/ai-automation", icon: Bot },
  { name: "AI Research", href: "/research", icon: Search },
  { name: "Thirdweb", href: "/thirdweb", icon: LinkIcon },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "AI Settings", href: "/ai-settings", icon: Settings },
];

interface MobileNavProps {
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
}

export default function MobileNav({ viewMode, onViewModeChange }: MobileNavProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userId = 1;

  const { data: stats } = useQuery({
    queryKey: [`/api/dashboard/stats/${userId}`],
    enabled: !!userId,
  });

  const isActive = (href: string) => {
    if (href === '/') return location === href;
    return location.startsWith(href);
  };

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-6">
                  {/* Logo */}
                  <div className="flex items-center space-x-3 px-6 mb-6">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src="https://gateway.pinata.cloud/ipfs/QmfR65e5Y2fgDWduwMhSX1GrT3gYweXT9dsb6Qonh5VMNi/0.jpg" 
                        alt="Bang Nyampahin AI Logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.className = 'w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center';
                          e.currentTarget.parentElement!.innerHTML = '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
                        }}
                      />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">Bang Nyampahin AI</h1>
                      <p className="text-xs text-muted-foreground">Personal Assistant</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      
                      return (
                        <Link key={item.name} href={item.href}>
                          <Button
                            variant={active ? "secondary" : "ghost"}
                            className={`w-full justify-start h-10 ${
                              active 
                                ? "bg-primary/10 text-primary hover:bg-primary/15" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="w-4 h-4 mr-3" />
                            {item.name}
                          </Button>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Status */}
                  <div className="px-6 mt-6 pt-6 border-t border-border">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active Services</span>
                        <Badge variant="secondary">
                          {stats?.stats?.connectedServices || 0}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Automations</span>
                        <Badge variant="secondary">
                          {stats?.stats?.automations || 0}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center">
                <img 
                  src="https://gateway.pinata.cloud/ipfs/QmfR65e5Y2fgDWduwMhSX1GrT3gYweXT9dsb6Qonh5VMNi/0.jpg" 
                  alt="Bang Nyampahin AI Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.className = 'w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center';
                    e.currentTarget.parentElement!.innerHTML = '<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
                  }}
                />
              </div>
              <span className="font-semibold">Bang Nyampahin AI</span>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="grid grid-cols-5 py-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center justify-center h-16 rounded-none ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.name.split(' ')[0]}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
