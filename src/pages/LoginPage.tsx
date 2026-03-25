import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error: authError, clearError } = useAuth();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    clearError();

    try {
      await login(form.email, form.password);
      navigate("/marketplace");
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Kalakaarian</p>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Sign in to continue and choose your role.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="••••••••"
                />
              </div>

              {(error || authError) && <p className="text-sm text-destructive">{error || authError}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Login
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/role-select" className="font-semibold text-purple-700 hover:text-purple-900">
                Get Started
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
