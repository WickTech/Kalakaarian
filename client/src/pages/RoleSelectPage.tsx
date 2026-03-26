import { Building2, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-12">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center text-white">
          <h1 className="text-3xl font-black sm:text-4xl">What best describes you?</h1>
          <p className="mt-2 text-white/90">Choose a role to continue your onboarding journey.</p>
          <Link to="/login" className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-white">
            Back to Login
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-0 bg-white/95 shadow-xl">
            <CardHeader>
              <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Star className="h-5 w-5" />
              </div>
              <CardTitle>I&apos;m an Influencer</CardTitle>
              <CardDescription>List your profile and get discovered by top brands.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-95" onClick={() => navigate("/influencer-register")}>
                Join as Influencer
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/95 shadow-xl">
            <CardHeader>
              <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle>I&apos;m a Brand</CardTitle>
              <CardDescription>Find the perfect influencers for your next campaign.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-95" onClick={() => navigate("/brand-register")}>
                Start as Brand
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
