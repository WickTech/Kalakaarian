import { Star, Shield } from 'lucide-react';

interface MembershipBadgeProps {
  tier: 'gold' | 'silver' | 'regular';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const tierConfig = {
  gold: {
    icon: Star,
    bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    text: 'text-yellow-900',
    border: 'border-yellow-500',
    label: 'Gold Member',
    perks: ['Top banner placement', 'Profile boost', 'Highest visibility'],
  },
  silver: {
    icon: Shield,
    bg: 'bg-gradient-to-r from-gray-300 to-gray-400',
    text: 'text-gray-800',
    border: 'border-gray-400',
    label: 'Silver Member',
    perks: ['2-3x selection chances', 'Profile visibility boost'],
  },
  regular: {
    icon: null,
    bg: 'bg-secondary',
    text: 'text-secondary-foreground',
    border: 'border-border',
    label: 'Free Member',
    perks: ['Basic profile', 'Standard visibility'],
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export function MembershipBadge({ tier, size = 'md', showLabel = true }: MembershipBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border ${config.bg} ${config.border} ${sizeClasses[size]}`}>
      {Icon && <Icon className={`w-4 h-4 ${config.text}`} />}
      {showLabel && <span className={`font-medium ${config.text}`}>{config.label}</span>}
    </div>
  );
}

export function MembershipUpgradeCard({ currentTier, onUpgrade }: {
  currentTier: 'gold' | 'silver' | 'regular';
  onUpgrade: (tier: 'gold' | 'silver') => void;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold mb-4">Upgrade Your Membership</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Silver</span>
            <span className="ml-auto text-sm text-muted-foreground">Free</span>
          </div>
          <ul className="text-sm space-y-1 text-muted-foreground mb-4">
            <li>✓ 2-3x selection chances</li>
            <li>✓ Profile visibility boost</li>
          </ul>
          {currentTier === 'regular' && (
            <button
              onClick={() => onUpgrade('silver')}
              className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Activate Silver
            </button>
          )}
        </div>

        <div className="border border-yellow-500 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-bl-lg">
            POPULAR
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold">Gold</span>
            <span className="ml-auto text-sm font-medium">₹149/mo</span>
          </div>
          <ul className="text-sm space-y-1 text-muted-foreground mb-4">
            <li>✓ Top banner placement</li>
            <li>✓ Profile boost</li>
            <li>✓ Highest visibility</li>
          </ul>
          {currentTier !== 'gold' && (
            <button
              onClick={() => onUpgrade('gold')}
              className="w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Upgrade to Gold
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Cancel anytime. Auto-renews monthly.
      </p>
    </div>
  );
}
