import { useState } from 'react';
import { Instagram, Youtube, ExternalLink, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SocialStats {
  instagram?: {
    handle: string;
    followers: number;
    following?: number;
    posts: number;
    avgLikes: number;
    avgComments: number;
    engagementRate?: number;
    isMock?: boolean;
  };
  youtube?: {
    handle: string;
    channelId: string;
    subscribers: number;
    videos: number;
    totalViews: number;
    avgViews: number;
    isMock?: boolean;
  };
}

interface SocialConnectProps {
  socialHandles: {
    instagram?: string;
    youtube?: string;
  };
  stats?: SocialStats;
  isOwnProfile: boolean;
  onConnect: (platform: 'instagram' | 'youtube', handle: string) => void;
}

export function SocialConnect({ socialHandles, stats, isOwnProfile, onConnect }: SocialConnectProps) {
  const [connecting, setConnecting] = useState<'instagram' | 'youtube' | null>(null);
  const [handle, setHandle] = useState('');

  const handleSubmit = async (platform: 'instagram' | 'youtube') => {
    setConnecting(platform);
    await new Promise(resolve => setTimeout(resolve, 500));
    onConnect(platform, handle);
    setConnecting(null);
    setHandle('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-accent" />
            <span className="font-medium">Instagram</span>
          </div>
          {socialHandles.instagram && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Check className="w-3 h-3" /> Connected
            </span>
          )}
        </div>
        
        {socialHandles.instagram ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">@{socialHandles.instagram}</p>
            {stats?.instagram && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{formatNumber(stats.instagram.followers)}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{stats.instagram.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{formatNumber(stats.instagram.avgLikes)}</p>
                  <p className="text-xs text-muted-foreground">Avg Likes</p>
                </div>
              </div>
            )}
            <a
              href={`https://instagram.com/${socialHandles.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              View Profile <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : isOwnProfile ? (
          <div className="space-y-2">
            <Input
              placeholder="Enter Instagram handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value.replace('@', ''))}
            />
            <Button
              onClick={() => handleSubmit('instagram')}
              disabled={!handle || connecting === 'instagram'}
              size="sm"
              className="w-full"
            >
              {connecting === 'instagram' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Connect Instagram'
              )}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not connected</p>
        )}
      </div>

      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-destructive" />
            <span className="font-medium">YouTube</span>
          </div>
          {socialHandles.youtube && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Check className="w-3 h-3" /> Connected
            </span>
          )}
        </div>
        
        {socialHandles.youtube ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">@{socialHandles.youtube}</p>
            {stats?.youtube && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{formatNumber(stats.youtube.subscribers)}</p>
                  <p className="text-xs text-muted-foreground">Subscribers</p>
                </div>
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{stats.youtube.videos}</p>
                  <p className="text-xs text-muted-foreground">Videos</p>
                </div>
                <div className="bg-secondary rounded p-2">
                  <p className="font-bold">{formatNumber(stats.youtube.totalViews)}</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            )}
            <a
              href={`https://youtube.com/@${socialHandles.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-destructive hover:underline flex items-center gap-1"
            >
              View Channel <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : isOwnProfile ? (
          <div className="space-y-2">
            <Input
              placeholder="Enter YouTube handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value.replace('@', ''))}
            />
            <Button
              onClick={() => handleSubmit('youtube')}
              disabled={!handle || connecting === 'youtube'}
              size="sm"
              className="w-full"
            >
              {connecting === 'youtube' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Connect YouTube'
              )}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not connected</p>
        )}
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
