import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
}

interface TaskPerformance {
  taskId: string;
  taskName: string;
  service: string;
  metrics: {
    successRate: number;
    avgResponseTime: number;
    throughput: number;
    errorRate: number;
    efficiency: number;
  };
  timeline: {
    timestamp: Date;
    value: number;
  }[];
}

export default function AnimatedPerformanceMetrics() {
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([
    {
      id: 'success-rate',
      name: 'Success Rate',
      value: 94.5,
      previousValue: 92.1,
      unit: '%',
      trend: 'up',
      status: 'excellent',
      description: 'Overall task completion success rate'
    },
    {
      id: 'response-time',
      name: 'Avg Response Time',
      value: 1.2,
      previousValue: 1.8,
      unit: 's',
      trend: 'down',
      status: 'good',
      description: 'Average time to complete tasks'
    },
    {
      id: 'throughput',
      name: 'Tasks/Hour',
      value: 156,
      previousValue: 142,
      unit: 'tasks',
      trend: 'up',
      status: 'excellent',
      description: 'Tasks completed per hour'
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      value: 2.1,
      previousValue: 3.5,
      unit: '%',
      trend: 'down',
      status: 'good',
      description: 'Percentage of failed tasks'
    },
    {
      id: 'efficiency',
      name: 'AI Efficiency',
      value: 87.3,
      previousValue: 84.7,
      unit: '%',
      trend: 'up',
      status: 'good',
      description: 'Resource utilization efficiency'
    },
    {
      id: 'user-satisfaction',
      name: 'User Satisfaction',
      value: 96.2,
      previousValue: 95.8,
      unit: '%',
      trend: 'up',
      status: 'excellent',
      description: 'User feedback and satisfaction score'
    }
  ]);

  const [taskPerformance, setTaskPerformance] = useState<TaskPerformance[]>([
    {
      taskId: 'twitter-automation',
      taskName: 'Twitter Automation',
      service: 'Twitter',
      metrics: {
        successRate: 96.8,
        avgResponseTime: 0.8,
        throughput: 45,
        errorRate: 1.2,
        efficiency: 92.5
      },
      timeline: generateTimelineData(96.8)
    },
    {
      taskId: 'email-management',
      taskName: 'Email Management',
      service: 'Gmail',
      metrics: {
        successRate: 89.3,
        avgResponseTime: 2.1,
        throughput: 28,
        errorRate: 4.2,
        efficiency: 78.9
      },
      timeline: generateTimelineData(89.3)
    },
    {
      taskId: 'crypto-monitoring',
      taskName: 'Crypto Monitoring',
      service: 'DeFi',
      metrics: {
        successRate: 97.5,
        avgResponseTime: 0.3,
        throughput: 83,
        errorRate: 0.8,
        efficiency: 94.2
      },
      timeline: generateTimelineData(97.5)
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 2; // -1 to 1
        const newValue = Math.max(0, Math.min(100, metric.value + variation));
        const trend = newValue > metric.value ? 'up' : newValue < metric.value ? 'down' : 'stable';
        
        return {
          ...metric,
          previousValue: metric.value,
          value: parseFloat(newValue.toFixed(1)),
          trend: trend as 'up' | 'down' | 'stable'
        };
      }));

      setTaskPerformance(prev => prev.map(task => ({
        ...task,
        timeline: [...task.timeline.slice(-23), {
          timestamp: new Date(),
          value: task.metrics.successRate + (Math.random() - 0.5) * 4
        }]
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function generateTimelineData(baseValue: number) {
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
      value: baseValue + (Math.random() - 0.5) * 10
    }));
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 dark:text-green-400';
      case 'good': return 'text-blue-600 dark:text-blue-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setDisplayValue(value * progress);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span>{displayValue.toFixed(1)}</span>;
  };

  const MiniChart = ({ timeline }: { timeline: { timestamp: Date; value: number }[] }) => {
    const maxValue = Math.max(...timeline.map(d => d.value));
    const minValue = Math.min(...timeline.map(d => d.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="flex items-end space-x-1 h-8 mt-2">
        {timeline.slice(-12).map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <motion.div
              key={index}
              className="bg-primary/20 w-1 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(height, 5)}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">Real-time AI task performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            <Activity className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {performanceData.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <TrendIcon trend={metric.trend} />
                  </div>
                  <CardDescription className="text-xs">{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-end space-x-2">
                      <motion.div 
                        className={`text-2xl font-bold ${getStatusColor(metric.status)}`}
                        key={metric.value}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AnimatedCounter value={metric.value} />
                      </motion.div>
                      <span className="text-sm text-muted-foreground mb-1">{metric.unit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Previous: {metric.previousValue}{metric.unit}
                      </span>
                      <Badge className={getStatusBadgeColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>

                    {/* Progress Bar for percentage metrics */}
                    {metric.unit === '%' && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <Progress value={metric.value} className="h-2" />
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Task-Specific Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Task Performance Breakdown
          </CardTitle>
          <CardDescription>Individual task performance metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
            {taskPerformance.map((task, index) => (
              <motion.div
                key={task.taskId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{task.taskName}</h3>
                  <Badge variant="secondary">{task.service}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success Rate</span>
                      <motion.span 
                        className="font-medium text-green-600"
                        key={task.metrics.successRate}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                      >
                        {task.metrics.successRate}%
                      </motion.span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-medium">{task.metrics.avgResponseTime}s</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Throughput</span>
                      <span className="font-medium">{task.metrics.throughput}/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Error Rate</span>
                      <span className="font-medium text-red-600">{task.metrics.errorRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Efficiency</span>
                    <span className="text-xs font-medium">{task.metrics.efficiency}%</span>
                  </div>
                  <Progress value={task.metrics.efficiency} className="h-1.5" />
                </div>

                <MiniChart timeline={task.timeline} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Live Performance Events
          </CardTitle>
          <CardDescription>Real-time performance alerts and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <motion.div 
              className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Performance Milestone Reached</p>
                <p className="text-xs text-muted-foreground">Twitter automation achieved 95%+ success rate</p>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Throughput Improvement</p>
                <p className="text-xs text-muted-foreground">Email processing speed increased by 15%</p>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Response Time Alert</p>
                <p className="text-xs text-muted-foreground">DeFi monitoring response time slightly elevated</p>
              </div>
              <span className="text-xs text-muted-foreground">8 min ago</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
