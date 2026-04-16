import { TrendingUp, Eye, DollarSign, Users } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: 'er' | 'views' | 'cpv' | 'fake';
  trend?: { value: number; positive: boolean };
}

const iconMap = {
  er: TrendingUp,
  views: Eye,
  cpv: DollarSign,
  fake: Users,
};

const iconColors = {
  er: 'text-blue-500 bg-blue-500/10',
  views: 'text-purple-500 bg-purple-500/10',
  cpv: 'text-green-500 bg-green-500/10',
  fake: 'text-red-500 bg-red-500/10',
};

export function AnalyticsCard({ title, value, subtitle, icon, trend }: AnalyticsCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${iconColors[icon]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
