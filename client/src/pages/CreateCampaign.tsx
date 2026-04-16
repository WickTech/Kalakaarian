import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Plus, X, Upload } from "lucide-react";
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

interface CampaignFile {
  fileUrl: string;
  fileName: string;
  fileType: 'brief' | 'contract' | 'other';
}

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
  const [files, setFiles] = useState<CampaignFile[]>([]);
  const [newFile, setNewFile] = useState<CampaignFile>({ fileUrl: "", fileName: "", fileType: "brief" });
  const [showFileForm, setShowFileForm] = useState(false);

  const handleAddFile = () => {
    if (newFile.fileUrl && newFile.fileName) {
      setFiles([...files, newFile]);
      setNewFile({ fileUrl: "", fileName: "", fileType: "brief" });
      setShowFileForm(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const campaign = await api.createCampaign({
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        deadline: formData.deadline?.toISOString() || "",
        deliverables: formData.deliverables,
        platform: formData.platform,
        niche: formData.niche,
      });

      for (const file of files) {
        await api.uploadCampaignFile(campaign._id, file.fileUrl, file.fileName, file.fileType);
      }

      toast({
        title: "Campaign Created",
        description: files.length > 0 ? "Your campaign and files have been created." : "Your campaign has been successfully created.",
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

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <Label>Campaign Files (Optional)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFileForm(!showFileForm)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add File
                  </Button>
                </div>

                {showFileForm && (
                  <Card className="p-4 bg-muted/50">
                    <div className="space-y-3">
                      <Input
                        placeholder="File name (e.g., Campaign Brief)"
                        value={newFile.fileName}
                        onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
                      />
                      <Input
                        placeholder="File URL (Google Drive, Dropbox, etc.)"
                        value={newFile.fileUrl}
                        onChange={(e) => setNewFile({ ...newFile, fileUrl: e.target.value })}
                      />
                      <div className="flex gap-2">
                        {(['brief', 'contract', 'other'] as const).map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant={newFile.fileType === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setNewFile({ ...newFile, fileType: type })}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddFile} size="sm" className="flex-1">
                          Add
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFileForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <Upload className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{file.fileName}</p>
                            <p className="text-xs text-muted-foreground capitalize">{file.fileType}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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