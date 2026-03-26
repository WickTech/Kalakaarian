import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const platforms = ["Instagram", "YouTube", "TikTok", "Multiple"] as const;
const niches = ["Fashion", "Tech", "Food", "Fitness", "Beauty", "Lifestyle", "Gaming", "Travel"] as const;

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: undefined as Date | undefined,
    deliverables: "",
    platform: "" as typeof platforms[number] | "",
    niche: "" as typeof niches[number] | "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createCampaign({
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        deadline: formData.deadline?.toISOString() || "",
        deliverables: formData.deliverables,
        platform: formData.platform,
        niche: formData.niche,
      });

      toast({
        title: "Campaign Created",
        description: "Your campaign has been successfully created.",
        variant: "default",
      });
      navigate("/brand/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to="/brand/dashboard"
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>
              Fill in the details to create a new campaign for influencers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals and requirements"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget amount"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? formData.deadline.toLocaleDateString() : "Select deadline"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData({ ...formData, deadline: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliverables">Deliverables</Label>
                <Textarea
                  id="deliverables"
                  placeholder="Describe what content is expected (e.g., 1 Instagram post, 2 stories)"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Target Platform</Label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <Button
                      key={platform}
                      type="button"
                      variant={formData.platform === platform ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, platform })}
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Niche</Label>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche) => (
                    <Button
                      key={niche}
                      type="button"
                      variant={formData.niche === niche ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, niche })}
                    >
                      {niche}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Campaign"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}