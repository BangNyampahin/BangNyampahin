import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, Clock, Shield } from "lucide-react";

interface AnalyticsData {
  automationUsage: { name: string; count: number; color: string }[];
  productivityScore: number;
  timeDistribution: { name: string; hours: number }[];
  privacyScore: number;
}

export function PrivacyAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    automationUsage: [
      { name: "Social Media", count: 45, color: "#8884d8" },
      { name: "Email", count: 32, color: "#82ca9d" },
      { name: "Crypto", count: 23, color: "#ffc658" },
    ],
    productivityScore: 78,
    timeDistribution: [
      { name: "Mon", hours: 6.5 },
      { name: "Tue", hours: 8.2 },
      { name: "Wed", hours: 7.1 },
      { name: "Thu", hours: 9.0 },
      { name: "Fri", hours: 6.8 },
      { name: "Sat", hours: 4.2 },
      { name: "Sun", hours: 3.1 },
    ],
    privacyScore: 92,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, text: "Excellent" };
    if (score >= 60) return { variant: "secondary" as const, text: "Good" };
    return { variant: "destructive" as const, text: "Needs Improvement" };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Productivity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 flex items-center gap-2">
              <span className={getScoreColor(analytics.productivityScore)}>
                {analytics.productivityScore}%
              </span>
              <Badge {...getScoreBadge(analytics.productivityScore)}>
                {getScoreBadge(analytics.productivityScore).text}
              </Badge>
            </div>
            <Progress value={analytics.productivityScore} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on automation efficiency and task completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 flex items-center gap-2">
              <span className={getScoreColor(analytics.privacyScore)}>
                {analytics.privacyScore}%
              </span>
              <Badge {...getScoreBadge(analytics.privacyScore)}>
                {getScoreBadge(analytics.privacyScore).text}
              </Badge>
            </div>
            <Progress value={analytics.privacyScore} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              Encryption usage and data protection measures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {analytics.timeDistribution.reduce((sum, day) => sum + day.hours, 0).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              Total automation time this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Automation Usage</CardTitle>
            <CardDescription>
              Distribution of automation activities (locally processed)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analytics.automationUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="count"
                >
                  {analytics.automationUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {analytics.automationUsage.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              Time spent on automated tasks (privacy-preserved)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.timeDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy-First Analytics
          </CardTitle>
          <CardDescription>
            All analytics are processed locally on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">What we track:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Automation execution frequency</li>
                <li>• Time saved through automation</li>
                <li>• Service connection status</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Privacy guarantees:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• No personal data leaves your device</li>
                <li>• All processing is done locally</li>
                <li>• Encrypted storage for all metrics</li>
                <li>• Anonymous aggregation only</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
