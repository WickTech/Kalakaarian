import { useState } from 'react';
import { Play, ExternalLink, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Video {
  _id: string;
  influencerId: { name: string; profileImage?: string };
  videoUrl: string;
  platform: 'instagram' | 'youtube' | 'file' | 'drive';
  status: 'pending' | 'approved' | 'revision';
  feedback?: string;
}

interface VideoReviewGridProps {
  videos: Video[];
  onApprove: (index: number) => void;
  onRequestRevision: (index: number, feedback: string) => void;
}

export function VideoReviewGrid({ videos, onApprove, onRequestRevision }: VideoReviewGridProps) {
  const [revisionFeedback, setRevisionFeedback] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<number | null>(null);

  const statusConfig = {
    pending: { icon: Play, color: 'bg-yellow-500', label: 'Pending' },
    approved: { icon: CheckCircle, color: 'bg-green-500', label: 'Approved' },
    revision: { icon: XCircle, color: 'bg-red-500', label: 'Needs Revision' },
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-border rounded-lg">
        <Play className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No videos uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Uploaded Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => {
          const status = statusConfig[video.status];
          const StatusIcon = status.icon;

          return (
            <div key={video._id} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="aspect-video bg-black relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/50" />
                </div>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 text-white ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    {video.influencerId?.name || 'Creator'}
                  </p>
                  <span className="text-xs text-muted-foreground capitalize">{video.platform}</span>
                </div>

                {video.feedback && (
                  <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <strong>Feedback:</strong> {video.feedback}
                  </div>
                )}

                {video.status === 'pending' && (
                  <div className="space-y-2">
                    {showFeedback === index ? (
                      <div className="space-y-2">
                        <Input
                          placeholder="Enter feedback..."
                          value={revisionFeedback[index] || ''}
                          onChange={(e) => setRevisionFeedback({ ...revisionFeedback, [index]: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              onRequestRevision(index, revisionFeedback[index] || '');
                              setShowFeedback(null);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Request Revision
                          </Button>
                          <Button size="sm" onClick={() => onApprove(index)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setShowFeedback(index)}>
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Request Revision
                        </Button>
                        <Button size="sm" onClick={() => onApprove(index)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
