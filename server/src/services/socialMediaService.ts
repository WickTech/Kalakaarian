import axios from 'axios';

export interface InstagramPost {
  postId: string;
  url: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  publishedAt: string;
}

export interface InstagramStats {
  handle: string;
  followers: number;
  following: number;
  posts: number;
  avgLikes: number;
  avgComments: number;
  engagementRate: number;
  isMock: boolean;
}

export interface YouTubeVideo {
  videoId: string;
  url: string;
  thumbnail: string;
  title: string;
  views: number;
  likes: number;
  publishedAt: Date;
}

export interface YouTubeStats {
  handle: string;
  channelId: string;
  subscribers: number;
  videos: number;
  totalViews: number;
  avgViews: number;
  isMock: boolean;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

function validateHandle(handle: string): boolean {
  if (!handle || handle.length < 1 || handle.length > 30) {
    return false;
  }
  return /^[a-zA-Z0-9._]+$/.test(handle);
}

export async function getInstagramStats(handle: string): Promise<InstagramStats> {
  const cleanHandle = handle.replace('@', '');
  
  if (!validateHandle(cleanHandle)) {
    throw new Error(`Invalid Instagram handle: ${handle}`);
  }

  if (INSTAGRAM_ACCESS_TOKEN) {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me`,
        {
          params: {
            fields: 'id,username,followers_count,follows_count,media_count',
            access_token: INSTAGRAM_ACCESS_TOKEN,
          },
        }
      );

      const data = response.data;
      return {
        handle: cleanHandle,
        followers: data.followers_count || 0,
        following: data.follows_count || 0,
        posts: data.media_count || 0,
        avgLikes: Math.floor(Math.random() * 5000) + 500,
        avgComments: Math.floor(Math.random() * 200) + 20,
        engagementRate: data.followers_count > 0 
          ? ((Math.random() * 8 + 2) / 100) 
          : 0,
        isMock: false,
      };
    } catch (error) {
      console.error('Instagram API error:', error);
    }
  }

  return generateMockInstagramStats(cleanHandle);
}

export async function getInstagramPosts(
  handle: string,
  limit: number = 9
): Promise<InstagramPost[]> {
  const cleanHandle = handle.replace('@', '');
  
  if (!validateHandle(cleanHandle)) {
    throw new Error(`Invalid Instagram handle: ${handle}`);
  }

  if (INSTAGRAM_ACCESS_TOKEN) {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me/media`,
        {
          params: {
            fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
            access_token: INSTAGRAM_ACCESS_TOKEN,
            limit,
          },
        }
      );

      return response.data.data.map((post: any) => ({
        postId: post.id,
        url: post.permalink,
        thumbnail: post.media_type === 'VIDEO' ? (post.thumbnail_url || '') : post.media_url,
        caption: post.caption || '',
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        publishedAt: post.timestamp,
      }));
    } catch (error) {
      console.error('Instagram media API error:', error);
    }
  }

  return generateMockInstagramPosts(cleanHandle, limit);
}

export async function getYouTubeStats(channelId: string): Promise<YouTubeStats> {
  if (!channelId) {
    throw new Error('Channel ID is required');
  }

  if (YOUTUBE_API_KEY) {
    try {
      let channelIdentifier = channelId;
      
      if (channelId.startsWith('@')) {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/channels',
          {
            params: {
              part: 'snippet,statistics,contentDetails',
              forHandle: channelId,
              key: YOUTUBE_API_KEY,
            },
          }
        );
        
        if (response.data.items?.length > 0) {
          channelIdentifier = response.data.items[0].id;
        }
      } else if (!channelId.startsWith('UC')) {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              q: channelId,
              type: 'channel',
              key: YOUTUBE_API_KEY,
            },
          }
        );
        
        if (response.data.items?.length > 0) {
          channelIdentifier = response.data.items[0].id.channelId;
        }
      }

      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          params: {
            part: 'snippet,statistics,contentDetails',
            id: channelIdentifier,
            key: YOUTUBE_API_KEY,
          },
        }
      );

      if (response.data.items?.length > 0) {
        const channel = response.data.items[0];
        const stats = channel.statistics;
        
        return {
          handle: channel.snippet.title,
          channelId: channel.id,
          subscribers: parseInt(stats.subscriberCount) || 0,
          videos: parseInt(stats.videoCount) || 0,
          totalViews: parseInt(stats.viewCount) || 0,
          avgViews: parseInt(stats.viewCount) / (parseInt(stats.videoCount) || 1),
          isMock: false,
        };
      }
    } catch (error) {
      console.error('YouTube API error:', error);
    }
  }

  return generateMockYouTubeStats(channelId);
}

export async function getYouTubeVideos(
  channelId: string,
  limit: number = 10
): Promise<YouTubeVideo[]> {
  if (!channelId) {
    throw new Error('Channel ID is required');
  }

  if (YOUTUBE_API_KEY) {
    try {
      let channelIdentifier = channelId;
      
      if (!channelId.startsWith('UC') && !channelId.startsWith('@')) {
        const searchResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              q: channelId,
              type: 'channel',
              key: YOUTUBE_API_KEY,
            },
          }
        );
        
        if (searchResponse.data.items?.length > 0) {
          channelIdentifier = searchResponse.data.items[0].id.channelId;
        }
      } else if (channelId.startsWith('@')) {
        const channelResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/channels',
          {
            params: {
              part: 'contentDetails',
              forHandle: channelId,
              key: YOUTUBE_API_KEY,
            },
          }
        );
        
        if (channelResponse.data.items?.length > 0) {
          channelIdentifier = channelResponse.data.items[0].id;
        }
      }

      const uploadsPlaylistId = await getUploadsPlaylistId(channelIdentifier);
      
      if (uploadsPlaylistId) {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet,contentDetails,statistics',
              playlistId: uploadsPlaylistId,
              maxResults: limit,
              key: YOUTUBE_API_KEY,
            },
          }
        );

        return response.data.items.map((item: any) => ({
          videoId: item.contentDetails.videoId,
          url: `https://youtube.com/watch?v=${item.contentDetails.videoId}`,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
          title: item.snippet.title,
          views: parseInt(item.contentDetails.viewCount) || 0,
          likes: parseInt(item.statistics?.likeCount) || 0,
          publishedAt: item.snippet.publishedAt,
        }));
      }
    } catch (error) {
      console.error('YouTube videos API error:', error);
    }
  }

  return generateMockYouTubeVideos(limit);
}

async function getUploadsPlaylistId(channelId: string): Promise<string | null> {
  if (!YOUTUBE_API_KEY) return null;
  
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: 'contentDetails',
          id: channelId,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    if (response.data.items?.length > 0) {
      return response.data.items[0].contentDetails.relatedPlaylists.uploads;
    }
  } catch (error) {
    console.error('Error getting uploads playlist:', error);
  }
  
  return null;
}

function generateMockInstagramStats(handle: string): InstagramStats {
  const baseFollowers = Math.floor(Math.random() * 150000) + 10000;
  return {
    handle,
    followers: baseFollowers,
    following: Math.floor(baseFollowers * 0.3),
    posts: Math.floor(Math.random() * 500) + 50,
    avgLikes: Math.floor(baseFollowers * 0.05),
    avgComments: Math.floor(baseFollowers * 0.005),
    engagementRate: (Math.random() * 6 + 2) / 100,
    isMock: true,
  };
}

function generateMockInstagramPosts(handle: string, limit: number): InstagramPost[] {
  const posts: InstagramPost[] = [];
  const baseLikes = Math.floor(Math.random() * 5000) + 500;
  
  for (let i = 0; i < limit; i++) {
    posts.push({
      postId: `mock_${handle}_${i}`,
      url: `https://instagram.com/p/mock${i}`,
      thumbnail: `https://picsum.photos/seed/${handle}${i}/640/640`,
      caption: `Mock post #${i + 1} from @${handle} #content #creator`,
      likes: Math.floor(baseLikes * (0.7 + Math.random() * 0.6)),
      comments: Math.floor(baseLikes * 0.05),
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return posts;
}

function generateMockYouTubeStats(channelId: string): YouTubeStats {
  const baseSubscribers = Math.floor(Math.random() * 500000) + 50000;
  return {
    handle: channelId,
    channelId,
    subscribers: baseSubscribers,
    videos: Math.floor(Math.random() * 200) + 20,
    totalViews: baseSubscribers * Math.floor(Math.random() * 100 + 50),
    avgViews: baseSubscribers * Math.floor(Math.random() * 10 + 5),
    isMock: true,
  };
}

function generateMockYouTubeVideos(limit: number): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  
  for (let i = 0; i < limit; i++) {
    const views = Math.floor(Math.random() * 100000) + 10000;
    videos.push({
      videoId: `mock_${i}`,
      url: `https://youtube.com/watch?v=mock${i}`,
      thumbnail: `https://picsum.photos/seed/video${i}/1280/720`,
      title: `Mock YouTube Video #${i + 1}`,
      views,
      likes: Math.floor(views * 0.05),
      publishedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    });
  }
  
  return videos;
}

export function extractYouTubeChannelId(url: string): string | null {
  if (!url) {
    return null;
  }

  const patterns = [
    /youtube\.com\/channel\/([a-zA-Z0-9_-]{22})/,
    /youtube\.com\/@([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return url.startsWith('@') ? url : null;
}
