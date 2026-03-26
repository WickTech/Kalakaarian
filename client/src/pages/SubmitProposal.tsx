import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api, Campaign, SubmitProposalData } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const mockCampaign: Campaign = {
  _id: "1",
  brandId: "b1",
  title: "Summer Fashion Collection Launch",
  description: "We're launching our new summer collection and looking for fashion influencers.",
  niche: "Fashion",
  budget: 50000,
  deadline: "2026-04-30",
  status: "OPEN",
  createdAt: "2026-03-01",
  deliverables: "1 Instagram post + 3 stories",
  platform: "Instagram",
  brandName: "StyleHub",
};

const timelineOptions = ["3 days", "5 days", "7 days", "10 days", "14 days", "21 days", "30 days"];

export default function SubmitProposal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    offeredAmount: "",
    message: "",
    timeline: "",
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await api.getCampaignById(id!);
        setCampaign(data);
      } catch (error) {
        setCampaign(mockCampaign);
      }
    };
    if (id) fetchCampaign();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.offeredAmount || !formData.message || !formData.timeline) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const proposalData: SubmitProposalData = {
        campaignId: id!,
        offeredAmount: Number(formData.offeredAmount),
        message: formData.message,
        timeline: formData.timeline,
      };
      await api.submitProposal(proposalData);
      toast({
        title: "Proposal Submitted",
        description: "Your proposal has been sent to the brand.",
        variant: "default",
      });
      navigate("/influencer/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to={`/campaign/${id}`}
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Campaign
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Submit Proposal</CardTitle>
            <CardDescription>Apply for: {campaign.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium">{campaign.brandName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Budget Range</span>
                <span className="font-medium">₹{campaign.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium">{new Date(campaign.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Proposal</CardTitle>
            <CardDescription>Fill in your proposal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="offeredAmount">
                  <DollarSign className="mr-1 h-4 w-4 inline" />
                  Your Bid Amount (₹)
                </Label>
                <Input
                  id="offeredAmount"
                  type="number"
                  placeholder="Enter your proposed amount"
                  value={formData.offeredAmount}
                  onChange={(e) => setFormData({ ...formData, offeredAmount: e.target.value })}
                  required
                  min={1000}
                />
                <p className="text-xs text-muted-foreground">
                  Suggested: Between ₹{Math.floor(campaign.budget * 0.5).toLocaleString()} and ₹
                  {Math.floor(campaign.budget * 1.2).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Timeline</Label>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={formData.timeline === option ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, timeline: option })}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  <FileText className="mr-1 h-4 w-4 inline" />
                  Cover Letter / Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Introduce yourself, explain why you're a good fit, and any relevant experience..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Proposal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
