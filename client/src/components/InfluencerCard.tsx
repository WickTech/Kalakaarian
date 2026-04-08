import { ShoppingCart, Check, MapPin } from "lucide-react";
import { Influencer } from "@/lib/store";

const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

interface InfluencerCardProps {
  influencer: Influencer;
  isInCart: boolean;
  onAddToCart: (i: Influencer) => void;
}

export function InfluencerCard({ influencer, isInCart, onAddToCart }: InfluencerCardProps) {
  const hasLocation = influencer.city && influencer.city.trim() !== "";
  const hasNiche = influencer.genre && influencer.genre.trim() !== "";

  return (
    <div className="border border-border bg-card group hover:border-purple-500 transition-colors">
      {/* Photo */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={influencer.photo || DEFAULT_AVATAR}
          alt={influencer.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="font-mono text-[10px] uppercase tracking-widest bg-background/90 border border-border px-2 py-0.5 text-foreground">
            {influencer.tier}
          </span>
        </div>
        {hasLocation && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-widest bg-background/90 border border-border px-2 py-0.5 text-muted-foreground">
              {influencer.city}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold leading-tight">{influencer.name}</p>
            {influencer.handle && (
              <p className="font-mono text-xs text-muted-foreground">{influencer.handle}</p>
            )}
          </div>
        </div>

        {/* Niche Tags */}
        {hasNiche && (
          <div className="flex flex-wrap gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5">
              {influencer.genre}
            </span>
          </div>
        )}

        {/* Social Handles */}
        <div className="flex gap-2 text-xs text-muted-foreground">
          {influencer.platform === "instagram" && (
            <span className="text-ig-pink">Instagram</span>
          )}
          {influencer.platform === "youtube" && (
            <span className="text-yt-red">YouTube</span>
          )}
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-mono text-lg font-bold text-purple-600">
            GET IN TOUCH
          </span>
          <button
            onClick={() => onAddToCart(influencer)}
            disabled={isInCart}
            className={`p-2 border transition-colors ${
              isInCart
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-border hover:border-purple-600 hover:text-purple-600"
            }`}
          >
            {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
