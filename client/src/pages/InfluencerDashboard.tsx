import { Link } from "react-router-dom";
import { ArrowLeft, Plus, TrendingUp, DollarSign, CheckCircle, Clock, Edit, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";

const mockProposals = [
  {
    _id: "1",
    campaignId: "c1",
    influencerId: "i1",
    campaignTitle: "Summer Fashion Collection",
    influencerName: "You",
    status: "ACCEPTED" as const,
    offeredAmount: 25000,
    message: "Excited to collaborate!",
    createdAt: "2026-03-15",
  },
  {
    _id: "2",
    campaignId: "c2",
    influencerId: "i1",
    campaignTitle: "Tech Product Launch",
    influencerName: "You",
    status: "PENDING" as const,
    offeredAmount: 50000,
    message: "Looking forward to this!",
    createdAt: "2026-03-20",
  },
  {
    _id: "3",
    campaignId: "c3",
    influencerId: "i1",
    campaignTitle: "Fitness App Promotion",
    influencerName: "You",
    status: "REJECTED" as const,
    offeredAmount: 15000,
    createdAt: "2026-03-10",
  },
  {
    _id: "4",
    campaignId: "c4",
    influencerId: "i1",
    campaignTitle: "Beauty Brand Campaign",
    influencerName: "You",
    status: "ACCEPTED" as const,
    offeredAmount: 35000,
    message: "Love the brand!",
    createdAt: "2026-03-05",
  },
];

const statusColors = {
  PENDING: "outline",
  ACCEPTED: "default",
  REJECTED: "secondary",
} as const;

const mockProfile = {
  name: "John Doe",
  bio: "Fashion and lifestyle content creator",
  niches: ["Fashion", "Lifestyle", "Travel"],
  instagramHandle: "@johndoe",
  youtubeHandle: "@johndoe",
  followers: {
    instagram: 150000,
    youtube: 75000,
    total: 225000,
  },
};

export default function InfluencerDashboard() {
  const { user } = useAuth();

  const stats = {
    total: mockProposals.length,
    accepted: mockProposals.filter((p) => p.status === "ACCEPTED").length,
    earnings: mockProposals
      .filter((p) => p.status === "ACCEPTED")
      .reduce((sum, p) => sum + p.offeredAmount, 0),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          to="/role-select"
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Influencer Dashboard</h1>
            <p className="text-white/80">Welcome back, {user?.name || "Influencer"}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/15">
              <Link to="/campaigns">
                Browse Campaigns
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/15">
              <Link to="/influencer-profile">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{mockProfile.name}</p>
                <p className="text-sm text-muted-foreground">{mockProfile.bio}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Niches</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {mockProfile.niches.map((niche) => (
                    <Badge key={niche} variant="secondary">
                      {niche}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Followers</p>
                <div className="mt-1 grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="font-bold">{mockProfile.followers.instagram.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Instagram</p>
                  </div>
                  <div>
                    <p className="font-bold">{mockProfile.followers.youtube.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">YouTube</p>
                  </div>
                  <div>
                    <p className="font-bold">{mockProfile.followers.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted Proposals</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.accepted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.earnings.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Proposals</CardTitle>
            <CardDescription>Track the status of your campaign proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProposals.map((proposal) => (
                  <TableRow key={proposal._id}>
                    <TableCell className="font-medium">{proposal.campaignTitle}</TableCell>
                    <TableCell>₹{proposal.offeredAmount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[proposal.status]}>
                        {proposal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
