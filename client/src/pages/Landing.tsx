import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Target, TrendingUp, Shield, Sparkles } from "lucide-react";

interface LandingProps {
  dark: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onCartOpen: () => void;
}

const features = [
  {
    icon: Users,
    title: "Connect with Influencers",
    description: "Access our curated network of nano, micro, macro, and celebrity influencers across all major platforms.",
  },
  {
    icon: Target,
    title: "Targeted Campaigns",
    description: "Create campaigns tailored to specific niches and reach the perfect audience for your brand.",
  },
  {
    icon: TrendingUp,
    title: "Track Performance",
    description: "Real-time analytics and reporting to measure your campaign ROI and influencer performance.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All influencers are verified with authentic engagement metrics and transparent pricing.",
  },
];

const tiers = [
  {
    key: "nano",
    label: "NANO",
    range: "2K — 30K REACH",
    cpm: "AVG CPM: ₹12",
    desc: "INVENTORY: 30 ASSETS",
    color: "border-terminal",
  },
  {
    key: "micro",
    label: "MICRO",
    range: "31K — 250K REACH",
    cpm: "AVG CPM: ₹8",
    desc: "INVENTORY: 30 ASSETS",
    color: "border-terminal",
  },
  {
    key: "macro",
    label: "MACRO",
    range: "251K — 5M REACH",
    cpm: "AVG CPM: ₹5",
    desc: "INVENTORY: 30 ASSETS",
    color: "border-terminal",
  },
  {
    key: "celebrity",
    label: "CELEBRITY",
    range: "5M+ REACH",
    cpm: "PRICING: CONTACT",
    desc: "INVENTORY: 10 ASSETS",
    color: "border-destructive",
  },
];

export default function Landing({ dark, toggleTheme, cartCount, onCartOpen }: LandingProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-sm uppercase tracking-[0.3em] font-bold">
            <span className="text-terminal">■</span> KALAKAARIAN
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <Link to="/login">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <Link to="/role-select">
            <Button size="sm">Get Started</Button>
          </Link>
          <button onClick={onCartOpen} className="border border-border p-2 hover:border-terminal transition-colors relative">
            <span className="font-mono text-xs">CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-terminal text-primary-foreground font-mono text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-pink-600/10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            India&apos;s Premier Influencer Marketplace
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Connect. Collaborate.
            </span>
            <br />
            <span className="text-foreground">Create Impact.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bridge the gap between brands and influencers. Discover authentic partnerships 
            that drive real results for your marketing campaigns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/role-select">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 gap-2">
                Start as Brand
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/role-select">
              <Button size="lg" variant="outline" className="gap-2">
                Join as Influencer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Kalakaarian?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to run successful influencer marketing campaigns
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-purple-500/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Explore Influencer Tiers</h2>
            <p className="text-muted-foreground">
              Find the perfect influencer tier for your budget and campaign goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                onClick={() => navigate(`/marketplace?tier=${tier.key}`)}
                className="border-2 border-border rounded-xl p-6 cursor-pointer group hover:border-purple-500 transition-all relative bg-card"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all" />
                <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-2 block">
                  {tier.range}
                </span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                  {tier.label}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">{tier.cpm}</p>
                <p className="text-xs text-muted-foreground">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Brand?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of brands and influencers already growing their business on Kalakaarian
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/role-select">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Kalakaarian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
