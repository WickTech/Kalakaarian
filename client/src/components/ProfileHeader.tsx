import { useState } from 'react';
import { Camera, MapPin, Instagram, Youtube, Wifi, WifiOff } from 'lucide-react';

interface ProfileHeaderProps {
  profile: {
    name: string;
    handle: string;
    profileImage: string;
    tier: 'gold' | 'silver' | 'regular';
    city: string;
    socialHandles?: { instagram?: string; youtube?: string };
    isOnline?: boolean;
  };
  isOwnProfile: boolean;
  onImageUpload?: (file: File) => void;
  onStatusToggle?: (isOnline: boolean) => void;
}

const tierStyles = {
  gold: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900',
  silver: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800',
  regular: 'bg-secondary text-secondary-foreground',
};

export function ProfileHeader({ profile, isOwnProfile, onImageUpload, onStatusToggle }: ProfileHeaderProps) {
  const [isOnline, setIsOnline] = useState(profile.isOnline || false);

  const handleStatusToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    onStatusToggle?.(newStatus);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload?.(file);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          {isOwnProfile && (
            <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4 text-primary-foreground" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
          {/* Online Indicator */}
          {isOwnProfile && (
            <button
              onClick={handleStatusToggle}
              className="absolute top-0 right-0 p-2 rounded-full bg-card border-2 border-border hover:border-primary transition-colors"
              title={isOnline ? 'Online' : 'Offline'}
            >
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${tierStyles[profile.tier]}`}>
              {profile.tier === 'gold' ? '★ Gold' : profile.tier === 'silver' ? '◇ Silver' : profile.tier}
            </span>
          </div>
          <p className="text-muted-foreground mb-3">{profile.handle}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            {profile.city && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {profile.city}
              </span>
            )}
            {profile.socialHandles?.instagram && (
              <a
                href={`https://instagram.com/${profile.socialHandles.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
              >
                <Instagram className="w-4 h-4" />
                {profile.socialHandles.instagram}
              </a>
            )}
            {profile.socialHandles?.youtube && (
              <a
                href={`https://youtube.com/@${profile.socialHandles.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-destructive hover:underline"
              >
                <Youtube className="w-4 h-4" />
                {profile.socialHandles.youtube}
              </a>
            )}
          </div>
        </div>

        {/* Edit Button */}
        {isOwnProfile && (
          <div className="flex items-start">
            <a
              href="/profile/edit"
              className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors text-sm font-medium"
            >
              Edit Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
