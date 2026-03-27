import { Sparkles, Handshake, Megaphone, Zap, Users, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Influencers",
    description: "Sign up, list your profile, and get discovered by brands that match your niche.",
    icon: Sparkles,
    tone: "from-purple-500 to-pink-500",
  },
  {
    title: "Brands",
    description: "Post campaigns, browse influencer profiles, and send invites quickly.",
    icon: Megaphone,
    tone: "from-blue-500 to-cyan-500",
  },
  {
    title: "Collaborate",
    description: "Connect, negotiate, and launch high-impact campaigns together.",
    icon: Handshake,
    tone: "from-orange-400 to-yellow-400",
  },
];

const whyKalakaarian = [
  {
    title: "Creator Connectivity",
    description: "Connect with countless creators in a single click, with zero margins.",
    icon: Users,
    tone: "from-purple-500 to-pink-500",
  },
  {
    title: "Fast Campaign Delivery",
    description: "Get your campaign ready within 24 hours with the lowest platform fees.",
    icon: Zap,
    tone: "from-yellow-400 to-orange-500",
  },
  {
    title: "Track & Navigate",
    description: "Track your payments and navigate your campaigns seamlessly.",
    icon: TrendingUp,
    tone: "from-green-500 to-emerald-500",
  },
  {
    title: "AI Profile Suggestions",
    description: "Use AI to find creators with 100% compatibility for your target audience.",
    icon: Target,
    tone: "from-blue-500 to-cyan-500",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-700 via-fuchsia-600 to-pink-500 text-white">
      <Navbar />

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute -left-10 top-12 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl text-center">
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">Where Influencers Meet Brands</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-lg">
            Build creator partnerships in minutes. Find the right fit, launch campaigns, and grow together.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="w-full max-w-xs bg-white text-purple-700 hover:bg-white/90" onClick={() => navigate("/login")}>
              Join as Influencer
            </Button>
            <Button variant="outline" className="w-full max-w-xs border-white text-white hover:bg-white/15" onClick={() => navigate("/login")}>
              Start a Campaign
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-6 text-center text-2xl font-extrabold sm:text-3xl">How It Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon, tone }) => (
              <Card key={title} className="border-0 bg-white/95 text-slate-900 shadow-lg">
                <div className={`h-1 w-full bg-gradient-to-r ${tone}`} />
                <CardHeader>
                  <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r ${tone} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-slate-900 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-extrabold sm:text-3xl">Why Kalakaarian?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyKalakaarian.map(({ title, description, icon: Icon, tone }) => (
              <Card key={title} className="border-0 bg-slate-50 shadow-lg">
                <div className={`h-1 w-full bg-gradient-to-r ${tone}`} />
                <CardHeader>
                  <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r ${tone} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">Get In Touch</h2>
          <p className="mb-6 text-base text-white/80">
            Have questions? We'd love to hear from you.
          </p>
          <Button className="bg-white text-purple-700 hover:bg-white/90" onClick={() => navigate("/login")}>
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
