import { Link, useLocation } from "wouter";
import { Brain, Home, Plug, Bot, Link as LinkIcon, Wallet, Settings, Shield, BarChart3, Store, Database, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import LanguageSelector from "@/components/language-selector";


const getNavigation = (t: (key: string) => string) => [
  { name: t("nav.dashboard"), href: "/", icon: Home },
  { name: t("nav.connections"), href: "/connections", icon: Plug },
  { name: t("nav.automation"), href: "/automation", icon: Bot },
  { name: t("nav.smart_contract"), href: "/smart-contract", icon: LinkIcon },
  { name: t("nav.wallet"), href: "/wallet", icon: Wallet },
  { name: t("nav.analytics"), href: "/analytics", icon: BarChart3 },
  { name: t("nav.security"), href: "/security", icon: Shield },
  { name: t("nav.ipfs"), href: "/ipfs", icon: Database },
  { name: t("nav.ai_automation"), href: "/ai-automation", icon: Bot },
  { name: "AI Research", href: "/research", icon: Search },
  { name: "Thirdweb", href: "/thirdweb", icon: LinkIcon },
  { name: "Content Generator", href: "/content-generator", icon: Brain },
  { name: t("nav.marketplace"), href: "/marketplace", icon: Store },
  { name: t("nav.ai_settings"), href: "/ai-settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  
  // Mock user ID - in a real app this would come from auth context
  const userId = 1;
  
  const { data: stats } = useQuery({
    queryKey: [`/api/dashboard/stats/${userId}`],
    enabled: !!userId,
  });

  const navigation = getNavigation(t);

  return (
    <div className="w-64 bg-sidebar-background shadow-lg border-r border-sidebar-border">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
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
            <h1 className="text-xl font-bold text-sidebar-foreground">Bang Nyampahin AI</h1>
            <p className="text-xs text-muted-foreground">Personal Assistant</p>
            <p className="text-xs text-muted-foreground/60 font-mono">
              {`0xA17b...464c`}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <span className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}>
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                  {item.name === "Connections" && stats?.connectedServices && (
                    <Badge variant="secondary" className="ml-auto bg-accent text-accent-foreground text-xs">
                      {stats.connectedServices.length}
                    </Badge>
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Security Status */}
        <div className="mt-8 px-3">
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-success" />
              <span className="text-sm font-medium text-success">Secure</span>
            </div>
            <p className="text-xs text-success/80 mt-1">All connections encrypted</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
