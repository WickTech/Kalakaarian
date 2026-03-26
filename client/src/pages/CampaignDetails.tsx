import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { api, Campaign, Proposal } from "@/lib/api";

const mockCampaign: Campaign = {
  _id: "1",
  brandId: "b1",
  title: "Summer Fashion Collection Launch",
  description:
    "We're launching our new summer collection and looking for fashion influencers to create engaging content showcasing our latest designs. The campaign aims to reach young fashion-conscious audiences across India. We value authentic content that resonates with our brand values of sustainability and style.",
  niche: "Fashion",
  budget: 50000,
  deadline: "2026-04-30",
  status: "OPEN",
  createdAt: "2026-03-01",
  deliverables: "1 Instagram post + 3 stories\n1 dedicated Reel showcasing 3-5 outfits\nLink in bio directing to our summer collection page",
  platform: "Instagram",
  brandName: "StyleHub",
};

const mockProposal: Proposal | null = {
  _id: "p1",
  campaignId: "1",
  influencerId: "i1",
  campaignTitle: "Summer Fashion Collection Launch",
  influencerName: "You",
  status: "PENDING",
  offeredAmount: 45000,
  message: "I'm excited to collaborate with StyleHub! With my fashion-forward content and engaged audience, I can help showcase your summer collection effectively.",
  timeline: "7 days",
  createdAt: "2026-03-15",
};

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignData, proposalData] = await Promise.all([
          api.getCampaignById(id!),
          api.getMyProposalForCampaign(id!).catch(() => null),
        ]);
        setCampaign(campaignData);
        setProposal(proposalData);
      } catch (error) {
        setCampaign(mockCampaign);
        setProposal(mockProposal);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Campaigns
          </Link>
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Campaign not found.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const statusColors = {
    PENDING: "outline",
    ACCEPTED: "default",
    REJECTED: "secondary",
  } as const;

  const statusIcons = {
    PENDING: Clock,
    ACCEPTED: CheckCircle,
    REJECTED: XCircle,
  };

  const StatusIcon = proposal ? statusIcons[proposal.status] : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Campaigns
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                <CardDescription className="text-base">{campaign.brandName}</CardDescription>
              </div>
              <Badge variant="secondary">{campaign.niche}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-semibold">₹{campaign.budget.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{new Date(campaign.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              {campaign.platform && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Platform</p>
                    <p className="font-semibold">{campaign.platform}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>

            {campaign.deliverables && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Deliverables</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{campaign.deliverables}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {proposal ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Your Proposal
              </CardTitle>
              <CardDescription>You have already applied to this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Offered Amount</p>
                  <p className="text-xl font-bold">₹{proposal.offeredAmount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="font-medium">{proposal.timeline}</p>
                </div>
                <Badge variant={statusColors[proposal.status]}>
                  {StatusIcon && <StatusIcon className="mr-1 h-3 w-3" />}
                  {proposal.status}
                </Badge>
              </div>
              {proposal.message && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-1">Your Message</p>
                    <p className="text-sm text-muted-foreground">{proposal.message}</p>
                  </div>
                </>
              )}
              <p className="text-xs text-muted-foreground">
                Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to apply?</p>
                  <p className="text-sm text-muted-foreground">Submit your proposal with your rate and timeline</p>
                </div>
                <Button onClick={() => navigate(`/campaign/${id}/propose`)}>Submit Proposal</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
