import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { 
  Copy, 
  Download, 
  Share2, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook, 
  MessageSquare,
  Hash,
  AtSign,
  Wallet,
  Calendar,
  Clock,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

interface GeneratedContent {
  id: string;
  content: string;
  platform: string;
  hashtags: string[];
  mentions: string[];
  imagePrompt?: string;
  web3Elements?: {
    contractAddress?: string;
    tokenSymbol?: string;
    nftDetails?: any;
  };
  metadata: {
    topic: string;
    tone: string;
    templateUsed: string;
    generatedAt: string;
  };
}

interface ContentPreviewProps {
  content: GeneratedContent | null;
  imageUrl?: string;
  onCopy: () => void;
  onGenerateImage: () => void;
  onSchedule: () => void;
  isGeneratingImage?: boolean;
}

export function ContentPreview({ 
  content, 
  imageUrl, 
  onCopy, 
  onGenerateImage, 
  onSchedule,
  isGeneratingImage 
}: ContentPreviewProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isIndonesian = language === 'id';

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: <Twitter className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
      facebook: <Facebook className="w-4 h-4" />,
      threads: <MessageSquare className="w-4 h-4" />
    };
    return icons[platform] || <Share2 className="w-4 h-4" />;
  };

  const getToneColor = (tone: string) => {
    const colors = {
      professional: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      casual: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      humorous: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      inspirational: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      educational: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[tone] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const downloadAsImage = () => {
    // Create a downloadable text file with the content
    const fullContent = [
      content?.content,
      '',
      ...(content?.hashtags || []),
      ...(content?.mentions || [])
    ].join('\n');
    
    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content_${content?.platform}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: isIndonesian ? "Diunduh" : "Downloaded",
      description: isIndonesian ? "Konten disimpan sebagai file teks" : "Content saved as text file",
    });
  };

  if (!content) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <div className="text-lg font-medium mb-2">
            {isIndonesian ? "Belum Ada Konten" : "No Content Yet"}
          </div>
          <div className="text-sm text-muted-foreground">
            {isIndonesian 
              ? "Buat konten terlebih dahulu untuk melihat preview" 
              : "Generate content first to see preview"
            }
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Content Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {getPlatformIcon(content.platform)}
              {isIndonesian ? "Konten yang Dihasilkan" : "Generated Content"}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={getToneColor(content.metadata.tone)}>
                {content.metadata.tone}
              </Badge>
              <Badge variant="outline">
                {content.platform}
              </Badge>
            </div>
          </div>
          <CardDescription>
            {isIndonesian ? "Template: " : "Template: "}{content.metadata.templateUsed} • 
            {isIndonesian ? " Topik: " : " Topic: "}{content.metadata.topic}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Content */}
          <div className="p-4 bg-muted/50 rounded-lg border">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {content.content}
            </div>
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              {content.content.length} {isIndonesian ? "karakter" : "characters"} • 
              {isIndonesian ? " Dibuat pada " : " Generated at "}
              {new Date(content.metadata.generatedAt).toLocaleString()}
            </div>
          </div>

          {/* Hashtags */}
          {content.hashtags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Hash className="w-4 h-4" />
                {isIndonesian ? "Hashtags" : "Hashtags"}
                <Badge variant="secondary">{content.hashtags.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Mentions */}
          {content.mentions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <AtSign className="w-4 h-4" />
                {isIndonesian ? "Mentions" : "Mentions"}
                <Badge variant="secondary">{content.mentions.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.mentions.map((mention, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {mention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Web3 Elements */}
          {content.web3Elements && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Wallet className="w-4 h-4" />
                {isIndonesian ? "Elemen Web3" : "Web3 Elements"}
              </div>
              <div className="p-3 bg-muted/30 rounded-md text-sm space-y-1">
                {content.web3Elements.contractAddress && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Wallet:</span>
                    <code className="text-xs">{content.web3Elements.contractAddress}</code>
                  </div>
                )}
                {content.web3Elements.nftDetails && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">NFT:</span>
                    <span className="text-xs">{JSON.stringify(content.web3Elements.nftDetails)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button onClick={onCopy} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              {isIndonesian ? "Salin" : "Copy"}
            </Button>
            <Button onClick={downloadAsImage} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {isIndonesian ? "Unduh" : "Download"}
            </Button>
            <Button 
              onClick={onGenerateImage}
              disabled={isGeneratingImage || !content.imagePrompt}
              variant="outline" 
              size="sm"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {isGeneratingImage 
                ? (isIndonesian ? "Membuat..." : "Generating...") 
                : (isIndonesian ? "Buat Gambar" : "Generate Image")
              }
            </Button>
            <Button onClick={onSchedule} variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              {isIndonesian ? "Jadwalkan" : "Schedule"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Generation */}
      {content.imagePrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {isIndonesian ? "Gambar Visual" : "Visual Content"}
            </CardTitle>
            <CardDescription>
              {content.imagePrompt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {imageUrl ? (
              <div className="space-y-4">
                <img 
                  src={imageUrl} 
                  alt="Generated visual content"
                  className="w-full rounded-lg border shadow-sm"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = imageUrl;
                      a.download = `content_image_${Date.now()}.png`;
                      a.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isIndonesian ? "Unduh Gambar" : "Download Image"}
                  </Button>
                  <Button 
                    onClick={onGenerateImage}
                    variant="outline" 
                    size="sm"
                    disabled={isGeneratingImage}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isIndonesian ? "Buat Ulang" : "Regenerate"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <div className="text-sm text-muted-foreground mb-3">
                  {isIndonesian 
                    ? "Klik 'Buat Gambar' untuk menghasilkan visual yang sesuai" 
                    : "Click 'Generate Image' to create matching visuals"
                  }
                </div>
                <Button 
                  onClick={onGenerateImage}
                  disabled={isGeneratingImage}
                  size="sm"
                >
                  {isGeneratingImage ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      {isIndonesian ? "Membuat..." : "Generating..."}
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {isIndonesian ? "Buat Gambar" : "Generate Image"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
