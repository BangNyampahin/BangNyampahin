import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Lightbulb, Clock, Target, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LearningInsight {
  id: string;
  type: "pattern" | "optimization" | "prediction";
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high";
  suggestedAction: string;
}

interface UsagePattern {
  timeOfDay: string;
  frequency: number;
  automationType: string;
}

export function MachineLearning() {
  const [learningEnabled, setLearningEnabled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [patterns, setPatterns] = useState<UsagePattern[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate learning insights
    setInsights([
      {
        id: "1",
        type: "pattern",
        title: "Peak Activity Hours",
        description: "You're most active on weekday mornings between 9-11 AM",
        confidence: 92,
        impact: "medium",
        suggestedAction: "Schedule important automations during these hours"
      },
      {
        id: "2", 
        type: "optimization",
        title: "Workflow Optimization",
        description: "Your email automation could be 30% faster with batching",
        confidence: 87,
        impact: "high",
        suggestedAction: "Enable batch processing for email workflows"
      },
      {
        id: "3",
        type: "prediction",
        title: "Resource Usage Prediction",
        description: "Expected to need additional API rate limits next week",
        confidence: 78,
        impact: "medium",
        suggestedAction: "Consider upgrading API plan before limits are reached"
      }
    ]);

    setPatterns([
      { timeOfDay: "9 AM", frequency: 85, automationType: "Email" },
      { timeOfDay: "2 PM", frequency: 60, automationType: "Social" },
      { timeOfDay: "6 PM", frequency: 45, automationType: "Crypto" },
    ]);
  }, []);

  const enableLearning = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLearningEnabled(true);
      
      toast({
        title: "Machine learning enabled",
        description: "AI will now learn from your patterns to suggest optimizations",
      });
    } catch (error) {
      toast({
        title: "Failed to enable learning",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyInsight = (insight: LearningInsight) => {
    toast({
      title: "Insight applied",
      description: `Implementing: ${insight.suggestedAction}`,
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pattern": return <Activity className="w-4 h-4" />;
      case "optimization": return <TrendingUp className="w-4 h-4" />;
      case "prediction": return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Learning & Insights
          </CardTitle>
          <CardDescription>
            Let AI learn from your habits to suggest workflow improvements (with your explicit consent)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Enable Machine Learning</h4>
              <p className="text-sm text-muted-foreground">
                Allow AI to analyze your usage patterns locally to suggest optimizations
              </p>
            </div>
            <Switch 
              checked={learningEnabled}
              onCheckedChange={(checked) => {
                if (checked && !learningEnabled) {
                  enableLearning();
                } else {
                  setLearningEnabled(checked);
                }
              }}
              disabled={isAnalyzing}
            />
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span className="text-sm">Analyzing patterns...</span>
              </div>
              <Progress value={65} className="w-full" />
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• All learning happens locally on your device</p>
            <p>• No personal data is transmitted to external servers</p>
            <p>• You can disable learning at any time</p>
            <p>• Suggestions are based on anonymous usage patterns only</p>
          </div>
        </CardContent>
      </Card>

      {learningEnabled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions based on your usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(insight.type)}
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline" className="capitalize">
                          {insight.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getImpactColor(insight.impact)}`} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {insight.impact} impact
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <span className="text-xs font-medium">{insight.confidence}%</span>
                        <Progress value={insight.confidence} className="w-16 h-2" />
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => applyInsight(insight)}
                      >
                        Apply Suggestion
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Patterns</CardTitle>
              <CardDescription>
                Your automation activity throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-sm font-medium">{pattern.timeOfDay}</div>
                      <div className="text-sm text-muted-foreground">{pattern.automationType}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={pattern.frequency} className="w-20 h-2" />
                      <span className="text-xs text-muted-foreground w-8">{pattern.frequency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
