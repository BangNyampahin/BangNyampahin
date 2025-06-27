import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook, 
  MessageSquare,
  Hash,
  Smile,
  TrendingUp,
  GraduationCap,
  Users,
  BarChart3,
  Palette
} from 'lucide-react';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  category: string;
  includeHashtags: boolean;
  includeEmojis: boolean;
  maxLength?: number;
}

interface TemplateGridProps {
  templates: ContentTemplate[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export function TemplateGrid({ templates, selectedTemplate, onSelect }: TemplateGridProps) {
  const { language } = useLanguage();
  const isIndonesian = language === 'id';

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: <Twitter className="w-3 h-3" />,
      instagram: <Instagram className="w-3 h-3" />,
      linkedin: <Linkedin className="w-3 h-3" />,
      facebook: <Facebook className="w-3 h-3" />,
      threads: <MessageSquare className="w-3 h-3" />
    };
    return icons[platform] || <MessageSquare className="w-3 h-3" />;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      news: <TrendingUp className="w-4 h-4" />,
      nft: <Palette className="w-4 h-4" />,
      education: <GraduationCap className="w-4 h-4" />,
      lifestyle: <Users className="w-4 h-4" />,
      analysis: <BarChart3 className="w-4 h-4" />,
      community: <Users className="w-4 h-4" />
    };
    return icons[category] || <TrendingUp className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      nft: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      education: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      lifestyle: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      analysis: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      community: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id 
              ? 'ring-2 ring-primary bg-primary/5' 
              : 'hover:bg-muted/50'
          }`}
          onClick={() => onSelect(template.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(template.category)}
                <CardTitle className="text-base">{template.name}</CardTitle>
              </div>
              <Badge className={getCategoryColor(template.category)}>
                {template.category}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {template.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Platform Icons */}
                <div className="flex gap-1">
                  {template.platforms.map(platform => (
                    <div key={platform} className="text-muted-foreground">
                      {getPlatformIcon(platform)}
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="flex gap-2">
                  {template.includeHashtags && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Hash className="w-3 h-3" />
                    </div>
                  )}
                  {template.includeEmojis && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Smile className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>

              {template.maxLength && (
                <div className="text-xs text-muted-foreground">
                  {template.maxLength} chars
                </div>
              )}
            </div>

            {selectedTemplate === template.id && (
              <div className="mt-3 pt-3 border-t">
                <div className="text-xs text-primary font-medium">
                  {isIndonesian ? "Template terpilih" : "Selected template"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function TemplatePreview({ template }: { template: ContentTemplate | null }) {
  const { language } = useLanguage();
  const isIndonesian = language === 'id';

  if (!template) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Palette className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <div className="text-sm text-muted-foreground">
            {isIndonesian ? "Pilih template untuk melihat preview" : "Select a template to see preview"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {template.name}
          <Badge variant="outline">{template.category}</Badge>
        </CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-2">
              {isIndonesian ? "Platform yang Didukung" : "Supported Platforms"}
            </div>
            <div className="flex gap-2">
              {template.platforms.map(platform => (
                <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                  {platform === 'twitter' && <Twitter className="w-3 h-3" />}
                  {platform === 'instagram' && <Instagram className="w-3 h-3" />}
                  {platform === 'linkedin' && <Linkedin className="w-3 h-3" />}
                  {platform === 'facebook' && <Facebook className="w-3 h-3" />}
                  {platform === 'threads' && <MessageSquare className="w-3 h-3" />}
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">
              {isIndonesian ? "Fitur" : "Features"}
            </div>
            <div className="flex gap-2">
              {template.includeHashtags && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {isIndonesian ? "Hashtags" : "Hashtags"}
                </Badge>
              )}
              {template.includeEmojis && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Smile className="w-3 h-3" />
                  {isIndonesian ? "Emojis" : "Emojis"}
                </Badge>
              )}
              {template.maxLength && (
                <Badge variant="outline">
                  {template.maxLength} {isIndonesian ? "karakter" : "chars"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
