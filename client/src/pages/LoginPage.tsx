import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const showGoogle =
    GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "your-google-client-id.apps.googleusercontent.com";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (cr: { credential?: string }) => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle(cr.credential);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-obsidian overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-600/5 to-pink-600/10 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-2">
            <img src="/k-logo-no-bg.png" alt="Kalakaarian" className="h-10 w-auto" />
            <span className="font-mono text-sm uppercase tracking-[0.3em] font-bold text-chalk">KALAKAARIAN</span>
          </Link>
          <p className="text-chalk-dim text-sm mt-3">Welcome back</p>
        </div>

        <div className="bento-card p-6 space-y-5">
          {showGoogle && (
            <>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed")}
                  useOneTap
                  theme="filled_blue"
                  shape="rectangular"
                  width="336"
                />
              </div>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-white/10" />
                <span className="mx-4 text-xs text-chalk-faint uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-white/10" />
              </div>
            </>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-chalk-dim mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark-input w-full px-4 py-3 text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-chalk-dim mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark-input w-full px-4 py-3 text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="purple-pill w-full py-3 text-sm disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center text-sm text-chalk-dim space-y-2">
            <p>
              New creator?{" "}
              <Link to="/influencer-register" className="text-gold hover:underline font-medium">
                Join as Influencer
              </Link>
            </p>
            <p>
              Starting a campaign?{" "}
              <Link to="/brand-register" className="text-gold hover:underline font-medium">
                Register as Brand
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
