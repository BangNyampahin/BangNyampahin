import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Dashboard from "@/pages/dashboard";
import Connections from "@/pages/connections";
import Automation from "@/pages/automation";
import SmartContract from "@/pages/smart-contract";
import Wallet from "@/pages/wallet";
import AiSettings from "@/pages/ai-settings";
import Security from "./pages/security";
import Analytics from "./pages/analytics";
import Marketplace from "./pages/marketplace";
import IPFSStorage from "./pages/ipfs-storage";
import AIAutomation from "./pages/ai-automation";
import Research from "./pages/research";
import ThirdwebPage from "./pages/thirdweb";
import ContentGeneratorPage from "./pages/content-generator";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/mobile-nav";
import LoginPage from "@/components/auth/login-page";
import { useAuth } from "@/hooks/use-auth";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Auto-detect device type
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setViewMode(isMobile ? 'mobile' : 'desktop');
  }, [isMobile]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Landing />;
  }

  const forceDesktop = viewMode === 'desktop' && isMobile;
  const forceMobile = viewMode === 'mobile' && !isMobile;

  return (
    <div className={`flex h-screen bg-background ${
      viewMode === 'mobile' ? 'flex-col' : ''
    }`}>
      {/* Desktop Sidebar */}
      {(!isMobile || forceDesktop) && <Sidebar />}
      
      {/* Mobile Navigation */}
      {(isMobile || forceMobile) && (
        <MobileNav viewMode={viewMode} onViewModeChange={setViewMode} />
      )}
      
      <div className={`flex-1 flex flex-col overflow-hidden ${
        (isMobile || forceMobile) ? 'pt-16 pb-20' : ''
      } ${
        forceDesktop ? 'transform scale-75 origin-top-left w-[133%]' : ''
      }`}>
        <div className={`flex-1 overflow-auto ${
          viewMode === 'mobile' ? 'px-2' : 'px-6'
        }`}>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/connections" component={Connections} />
            <Route path="/automation" component={Automation} />
            <Route path="/smart-contract" component={SmartContract} />
            <Route path="/wallet" component={Wallet} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/security" component={Security} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/ipfs" component={IPFSStorage} />
            <Route path="/ai-automation" component={AIAutomation} />
            <Route path="/research" component={Research} />
            <Route path="/thirdweb" component={ThirdwebPage} />
            <Route path="/content-generator" component={ContentGeneratorPage} />
            <Route path="/ai-settings" component={AiSettings} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider 
        activeChain={ChainId.BaseMainnet}
        clientId="2509b4189ca0092f9113adc3c7996ae1"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default App;
