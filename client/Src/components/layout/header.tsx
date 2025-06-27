import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
  subtitle: string;
  walletAddress?: string;
}

export default function Header({ title, subtitle, walletAddress }: HeaderProps) {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Wallet Connection Status */}
          {walletAddress && (
            <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 w-3 h-3 p-0 flex items-center justify-center text-xs">
              <span className="sr-only">New notifications</span>
            </Badge>
          </Button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
