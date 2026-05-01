import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandCampaignPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 px-4 py-10">
      <div className="w-full max-w-xl space-y-4">
        <Link to="/brand/dashboard" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Brand Campaign Dashboard</CardTitle>
            <CardDescription>This page is reserved for the next version of campaign management.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your brand profile has been captured successfully. Campaign creation tools will be available here soon.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
