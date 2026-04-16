import { useState } from 'react';
import { Copy, Gift, Users, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReferralStats {
  code: string | null;
  usedCount: number;
  goldUnlocked: boolean;
  silverUnlocked: boolean;
}

interface ReferralCardProps {
  stats: ReferralStats;
  isOwnProfile: boolean;
  onGenerateCode: () => void;
  onUseCode: (code: string) => void;
}

export function ReferralCard({ stats, isOwnProfile, onGenerateCode, onUseCode }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleCopy = async () => {
    if (stats.code) {
      await navigator.clipboard.writeText(stats.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUseCode = () => {
    if (referralCode) {
      onUseCode(referralCode);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Refer & Earn</h2>
      </div>

      {isOwnProfile ? (
        <>
          {stats.code ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-secondary rounded-md font-mono text-lg text-center">
                  {stats.code}
                </div>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{stats.usedCount}</p>
                  <p className="text-xs text-muted-foreground">Referrals</p>
                </div>
                <div>
                  <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${stats.silverUnlocked ? 'bg-gray-400' : 'bg-gray-200'}`}>
                    {stats.silverUnlocked && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Silver Unlocked</p>
                </div>
                <div>
                  <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${stats.goldUnlocked ? 'bg-yellow-500' : 'bg-gray-200'}`}>
                    {stats.goldUnlocked && <Star className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Gold Unlocked</p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• 10 Gold referrals = 1 free year Gold membership</p>
                <p>• Silver referrals = free Silver membership</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Users className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Generate your referral code and share with friends</p>
              <Button onClick={onGenerateCode} className="w-full">
                Generate Referral Code
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Have a referral code? Enter it below:</p>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="font-mono"
            />
            <Button onClick={handleUseCode}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}
