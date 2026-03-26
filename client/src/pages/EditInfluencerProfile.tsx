import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, InfluencerProfile, UpdateInfluencerProfileData } from "@/lib/api";

const NICHE_OPTIONS = [
  "Fashion",
  "Beauty",
  "Tech",
  "Travel",
  "Food",
  "Fitness",
  "Gaming",
  "Lifestyle",
  "Finance",
  "Other",
];

interface FormData {
  fullName: string;
  bio: string;
  instagramHandle: string;
  youtubeHandle: string;
  tiktokHandle: string;
  twitterHandle: string;
  niches: string[];
  instagramFollowers: string;
  youtubeFollowers: string;
  tiktokFollowers: string;
  twitterFollowers: string;
}

interface FormErrors {
  fullName?: string;
  bio?: string;
  niches?: string;
}

export default function EditInfluencerProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    fullName: "",
    bio: "",
    instagramHandle: "",
    youtubeHandle: "",
    tiktokHandle: "",
    twitterHandle: "",
    niches: [],
    instagramFollowers: "",
    youtubeFollowers: "",
    tiktokFollowers: "",
    twitterFollowers: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: InfluencerProfile = await api.getInfluencerProfile();
        setForm({
          fullName: profile.name || "",
          bio: profile.bio || "",
          instagramHandle: profile.instagramHandle || "",
          youtubeHandle: profile.youtubeHandle || "",
          tiktokHandle: profile.tiktokHandle || "",
          twitterHandle: profile.twitterHandle || "",
          niches: profile.niches || [],
          instagramFollowers: profile.followers?.instagram?.toString() || "",
          youtubeFollowers: profile.followers?.youtube?.toString() || "",
          tiktokFollowers: profile.followers?.tiktok?.toString() || "",
          twitterFollowers: profile.followers?.twitter?.toString() || "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  const bioCount = useMemo(() => form.bio.length, [form.bio]);

  const toggleNiche = (niche: string) => {
    setForm((prev) => ({
      ...prev,
      niches: prev.niches.includes(niche)
        ? prev.niches.filter((item) => item !== niche)
        : [...prev.niches, niche],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full Name is required.";
    if (!form.bio.trim()) nextErrors.bio = "Bio is required.";
    if (form.bio.length > 300) nextErrors.bio = "Bio cannot exceed 300 characters.";
    if (form.niches.length === 0) nextErrors.niches = "Please select at least one niche.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const updateData: UpdateInfluencerProfileData = {
      name: form.fullName,
      bio: form.bio,
      niches: form.niches,
      instagramHandle: form.instagramHandle || undefined,
      youtubeHandle: form.youtubeHandle || undefined,
      tiktokHandle: form.tiktokHandle || undefined,
      twitterHandle: form.twitterHandle || undefined,
      followers: {
        instagram: form.instagramFollowers ? parseInt(form.instagramFollowers) : undefined,
        youtube: form.youtubeFollowers ? parseInt(form.youtubeFollowers) : undefined,
        tiktok: form.tiktokFollowers ? parseInt(form.tiktokFollowers) : undefined,
        twitter: form.twitterFollowers ? parseInt(form.twitterFollowers) : undefined,
      },
    };

    setSaving(true);
    try {
      await api.updateInfluencerProfile(updateData);
      toast({
        title: "Profile updated",
        description: "Your influencer profile has been saved successfully.",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Edit Influencer Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-7" onSubmit={handleSubmit}>
              <section className="space-y-3">
                <h2 className="font-semibold">Personal Info</h2>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={form.bio}
                    maxLength={300}
                    onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
                    placeholder="Tell brands about your content style, audience, and strengths"
                  />
                  <p className="text-right text-xs text-muted-foreground">{bioCount}/300</p>
                  {errors.bio && <p className="text-xs text-destructive">{errors.bio}</p>}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="font-semibold">Social Media Handles</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Instagram handle"
                    value={form.instagramHandle}
                    onChange={(event) => setForm((prev) => ({ ...prev, instagramHandle: event.target.value }))}
                  />
                  <Input
                    placeholder="YouTube channel URL"
                    value={form.youtubeHandle}
                    onChange={(event) => setForm((prev) => ({ ...prev, youtubeHandle: event.target.value }))}
                  />
                  <Input
                    placeholder="TikTok handle"
                    value={form.tiktokHandle}
                    onChange={(event) => setForm((prev) => ({ ...prev, tiktokHandle: event.target.value }))}
                  />
                  <Input
                    placeholder="Twitter/X handle"
                    value={form.twitterHandle}
                    onChange={(event) => setForm((prev) => ({ ...prev, twitterHandle: event.target.value }))}
                  />
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="font-semibold">Niche / Category *</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {NICHE_OPTIONS.map((niche) => (
                    <label key={niche} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                      <Checkbox
                        checked={form.niches.includes(niche)}
                        onCheckedChange={() => toggleNiche(niche)}
                      />
                      {niche}
                    </label>
                  ))}
                </div>
                {errors.niches && <p className="text-xs text-destructive">{errors.niches}</p>}
              </section>

              <section className="space-y-3">
                <h2 className="font-semibold">Follower Counts</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    type="number"
                    min={0}
                    placeholder="Instagram Followers"
                    value={form.instagramFollowers}
                    onChange={(event) => setForm((prev) => ({ ...prev, instagramFollowers: event.target.value }))}
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="YouTube Subscribers"
                    value={form.youtubeFollowers}
                    onChange={(event) => setForm((prev) => ({ ...prev, youtubeFollowers: event.target.value }))}
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="TikTok Followers"
                    value={form.tiktokFollowers}
                    onChange={(event) => setForm((prev) => ({ ...prev, tiktokFollowers: event.target.value }))}
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="Twitter/X Followers"
                    value={form.twitterFollowers}
                    onChange={(event) => setForm((prev) => ({ ...prev, twitterFollowers: event.target.value }))}
                  />
                </div>
              </section>

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-95"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
