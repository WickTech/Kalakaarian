import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, BrandProfile, UpdateBrandProfileData } from "@/lib/api";

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  description: string;
}

interface FormErrors {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  industry?: string;
}

const INDUSTRY_OPTIONS = [
  "Fashion",
  "Technology",
  "Food & Beverage",
  "Health & Wellness",
  "Finance",
  "Entertainment",
  "Retail",
  "Education",
  "Other",
];

export default function EditBrandProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile: BrandProfile = await api.getBrandProfile();
        setForm({
          companyName: profile.companyName || "",
          contactPerson: profile.contactPerson || "",
          email: profile.email || "",
          phone: profile.phone || "",
          industry: profile.industry || "",
          website: profile.website || "",
          description: profile.description || "",
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.companyName.trim()) nextErrors.companyName = "Company Name is required.";
    if (!form.contactPerson.trim()) nextErrors.contactPerson = "Contact Person is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!form.industry) nextErrors.industry = "Industry is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const updateData: UpdateBrandProfileData = {
      companyName: form.companyName,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      industry: form.industry,
      website: form.website || undefined,
      description: form.description || undefined,
    };

    setSaving(true);
    try {
      await api.updateBrandProfile(updateData);
      toast({
        title: "Profile updated",
        description: "Your brand profile has been saved successfully.",
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
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-500 px-4 py-10">
      <div className="w-full max-w-xl space-y-4">
        <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Brand Profile</CardTitle>
            <CardDescription>Update your brand information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={form.companyName}
                  onChange={(event) => setForm((prev) => ({ ...prev, companyName: event.target.value }))}
                  placeholder="Enter company name"
                />
                {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={form.contactPerson}
                  onChange={(event) => setForm((prev) => ({ ...prev, contactPerson: event.target.value }))}
                  placeholder="Enter contact person name"
                />
                {errors.contactPerson && <p className="text-xs text-destructive">{errors.contactPerson}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label>Industry *</Label>
                <Select
                  value={form.industry}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Bio</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Tell influencers about your company"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95"
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
