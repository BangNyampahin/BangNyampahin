import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  RefreshCw, 
  MessageSquare,
  Twitter,
  Mail,
  Coins,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Settings,
  Send
} from 'lucide-react';

interface AITask {
  id: string;
  type: string;
  service: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  description: string;
  startTime: Date;
  endTime?: Date;
  result?: any;
  error?: string;
  logs: string[];
}

interface AICommand {
  command: string;
  parameters?: Record<string, any>;
  description: string;
}

export default function AITaskMonitor() {
  const userId = 1;
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Mock AI tasks data with real-time updates
  const [aiTasks, setAiTasks] = useState<AITask[]>([
    {
      id: 'task-1',
      type: 'social_media_posting',
      service: 'Twitter',
      status: 'running',
      progress: 65,
      description: 'Posting scheduled tweets and engaging with followers',
      startTime: new Date(Date.now() - 1800000),
      logs: [
        '11:15 - Started social media automation',
        '11:16 - Posted tweet about AI innovations',
        '11:17 - Replied to 3 mentions',
        '11:18 - Currently analyzing trending hashtags...'
      ]
    },
    {
      id: 'task-2', 
      type: 'email_management',
      service: 'Gmail',
      status: 'running',
      progress: 40,
      description: 'Processing emails and generating smart replies',
      startTime: new Date(Date.now() - 900000),
      logs: [
        '11:30 - Email processing started',
        '11:31 - Categorized 12 emails',
        '11:32 - Generated 3 draft replies',
        '11:33 - Currently reviewing priority emails...'
      ]
    },
    {
      id: 'task-3',
      type: 'token_monitoring',
      service: 'DeFi',
      status: 'completed',
      progress: 100,
      description: 'Monitor crypto portfolio and execute trades',
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 600000),
      result: 'Successfully monitored 5 tokens, no trades executed',
      logs: [
        '10:35 - Portfolio monitoring started',
        '10:36 - Checked 5 token prices',
        '10:40 - No trading opportunities found',
        '10:45 - Monitoring completed successfully'
      ]
    }
  ]);

  // Simulate real-time task updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setAiTasks(prev => prev.map(task => {
        if (task.status === 'running' && task.progress < 100) {
          const newProgress = Math.min(task.progress + Math.random() * 5, 100);
          const newLog = generateLogEntry(task.type, newProgress);
          
          return {
            ...task,
            progress: newProgress,
            logs: [...task.logs, newLog],
            status: newProgress >= 100 ? 'completed' : 'running',
            endTime: newProgress >= 100 ? new Date() : undefined
          };
        }
        return task;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const generateLogEntry = (taskType: string, progress: number): string => {
    const time = new Date().toLocaleTimeString();
    const entries = {
      social_media_posting: [
        `${time} - Analyzing engagement metrics`,
        `${time} - Scheduled 2 new posts`,
        `${time} - Responding to comments`,
        `${time} - Optimizing posting schedule`
      ],
      email_management: [
        `${time} - Processing new emails`,
        `${time} - Generated auto-reply`,
        `${time} - Flagged important email`,
        `${time} - Updated email categories`
      ],
      token_monitoring: [
        `${time} - Checking market conditions`,
        `${time} - Analyzed price movements`,
        `${time} - Updated portfolio metrics`,
        `${time} - No action required`
      ]
    };

    const logEntries = entries[taskType as keyof typeof entries] || [`${time} - Task in progress`];
    return logEntries[Math.floor(Math.random() * logEntries.length)];
  };

  const pauseTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { taskId, action: 'paused' };
    },
    onSuccess: (data) => {
      setAiTasks(prev => prev.map(task => 
        task.id === data.taskId ? { ...task, status: 'paused' } : task
      ));
      toast({ title: "Task dijeda", description: "AI task berhasil dijeda" });
    }
  });

  const resumeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { taskId, action: 'resumed' };
    },
    onSuccess: (data) => {
      setAiTasks(prev => prev.map(task => 
        task.id === data.taskId ? { ...task, status: 'running' } : task
      ));
      toast({ title: "Task dilanjutkan", description: "AI task berhasil dilanjutkan" });
    }
  });

  const stopTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { taskId, action: 'stopped' };
    },
    onSuccess: (data) => {
      setAiTasks(prev => prev.map(task => 
        task.id === data.taskId ? { ...task, status: 'failed', error: 'Stopped by user' } : task
      ));
      toast({ title: "Task dihentikan", description: "AI task berhasil dihentikan" });
    }
  });

  const sendCommandMutation = useMutation({
    mutationFn: async (command: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { command, response: `AI mengeksekusi: ${command}` };
    },
    onSuccess: (data) => {
      toast({ 
        title: "Perintah terkirim", 
        description: data.response 
      });
      setCommandInput('');
      
      // Add new task based on command
      const newTask: AITask = {
        id: `task-${Date.now()}`,
        type: 'manual_command',
        service: 'Manual',
        status: 'running',
        progress: 0,
        description: data.command,
        startTime: new Date(),
        logs: [`${new Date().toLocaleTimeString()} - Executing command: ${data.command}`]
      };
      
      setAiTasks(prev => [newTask, ...prev]);
    }
  });

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Gmail': return <Mail className="w-4 h-4" />;
      case 'DeFi': return <Coins className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const quickCommands = [
    'Post update tentang perkembangan terbaru',
    'Balas semua email penting',
    'Cek peluang trading di crypto',
    'Analisis performa media sosial',
    'Buat laporan harian aktivitas'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Task Monitor</h2>
          <p className="text-muted-foreground">Pantau dan kendalikan aktivitas AI secara real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isMonitoring ? "default" : "outline"}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isMonitoring ? 'Monitoring On' : 'Monitoring Off'}
          </Button>
          <Button variant="outline" onClick={() => setAiTasks([])}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
      </div>

      {/* Command Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Perintah AI
          </CardTitle>
          <CardDescription>
            Berikan perintah langsung kepada AI assistant untuk mengeksekusi tugas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Masukkan perintah untuk AI (contoh: Post tweet tentang teknologi AI terbaru)"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => sendCommandMutation.mutate(commandInput)}
              disabled={!commandInput.trim() || sendCommandMutation.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick commands:</span>
            {quickCommands.map((cmd, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCommandInput(cmd)}
              >
                {cmd}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Active Tasks</h3>
        {aiTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Tidak ada tugas AI yang sedang berjalan</p>
              <p className="text-sm text-muted-foreground mt-1">
                Berikan perintah di atas untuk memulai automasi AI
              </p>
            </CardContent>
          </Card>
        ) : (
          aiTasks.map((task) => (
            <Card key={task.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getServiceIcon(task.service)}
                      <span className="font-medium">{task.service}</span>
                    </div>
                    <Badge 
                      variant={task.status === 'completed' ? 'default' : 
                              task.status === 'failed' ? 'destructive' : 'secondary'}
                    >
                      {task.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {task.status === 'running' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => pauseTaskMutation.mutate(task.id)}
                        disabled={pauseTaskMutation.isPending}
                      >
                        <Pause className="w-3 h-3" />
                      </Button>
                    )}
                    
                    {task.status === 'paused' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resumeTaskMutation.mutate(task.id)}
                        disabled={resumeTaskMutation.isPending}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                    
                    {(task.status === 'running' || task.status === 'paused') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => stopTaskMutation.mutate(task.id)}
                        disabled={stopTaskMutation.isPending}
                      >
                        <Square className="w-3 h-3" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                    >
                      <Monitor className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <CardDescription className="flex items-center justify-between">
                  <span>{task.description}</span>
                  <span className="text-xs">
                    Started: {task.startTime.toLocaleTimeString()}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {task.status !== 'completed' && task.status !== 'failed' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(task.progress)}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}
                
                {task.status === 'completed' && task.result && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {task.result}
                    </p>
                  </div>
                )}
                
                {task.status === 'failed' && task.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Failed</span>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {task.error}
                    </p>
                  </div>
                )}
                
                {selectedTask === task.id && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Task Logs
                    </h4>
                    <div className="bg-muted p-3 rounded-lg max-h-48 overflow-y-auto">
                      {task.logs.map((log, index) => (
                        <div key={index} className="text-xs font-mono text-muted-foreground mb-1">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
