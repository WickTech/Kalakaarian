import { Link } from "react-router-dom";
import { ArrowLeft, Plus, TrendingUp, CheckCircle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";

const mockCampaigns = [
  {
    _id: "1",
    title: "Summer Fashion Collection",
    description: "Promote our new summer collection",
    niche: "Fashion",
    budget: 50000,
    deadline: "2026-06-30",
    status: "OPEN" as const,
    createdAt: "2026-03-01",
  },
  {
    _id: "2",
    title: "Tech Product Launch",
    description: "Launch campaign for new smartphone",
    niche: "Tech",
    budget: 100000,
    deadline: "2026-05-15",
    status: "IN_PROGRESS" as const,
    createdAt: "2026-02-10",
  },
  {
    _id: "3",
    title: "Fitness App Promotion",
    description: "Promote our fitness app",
    niche: "Fitness",
    budget: 30000,
    deadline: "2026-04-01",
    status: "COMPLETED" as const,
    createdAt: "2026-01-15",
  },
  {
    _id: "4",
    title: "Beauty Brand Campaign",
    description: "Skincare product launch",
    niche: "Beauty",
    budget: 75000,
    deadline: "2026-03-20",
    status: "DRAFT" as const,
    createdAt: "2026-03-20",
  },
];

const statusColors = {
  DRAFT: "secondary",
  OPEN: "default",
  IN_PROGRESS: "outline",
  COMPLETED: "secondary",
} as const;

const statusIcons = {
  DRAFT: FileText,
  OPEN: Clock,
  IN_PROGRESS: TrendingUp,
  COMPLETED: CheckCircle,
};

export default function BrandDashboard() {
  const { user } = useAuth();

  const stats = {
    total: mockCampaigns.length,
    active: mockCampaigns.filter((c) => c.status === "OPEN" || c.status === "IN_PROGRESS").length,
    completed: mockCampaigns.filter((c) => c.status === "COMPLETED").length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          to="/role-select"
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Brand Dashboard</h1>
            <p className="text-white/80">Welcome back, {user?.brandName || user?.name || "Brand"}</p>
          </div>
          <Button asChild className="bg-white text-cyan-700 hover:bg-white/90">
            <Link to="/brand-campaign">
              <Plus className="h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
            <CardDescription>Manage and track all your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Niche</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCampaigns.map((campaign) => {
                  const StatusIcon = statusIcons[campaign.status];
                  return (
                    <TableRow key={campaign._id}>
                      <TableCell className="font-medium">{campaign.title}</TableCell>
                      <TableCell>{campaign.niche}</TableCell>
                      <TableCell>₹{campaign.budget.toLocaleString()}</TableCell>
                      <TableCell>{new Date(campaign.deadline).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[campaign.status]}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {campaign.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
