import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/k-logo-no-bg.png" alt="Kalakaarian" className="h-8 w-auto" />
          <span className="font-mono text-sm uppercase tracking-[0.3em] font-bold">KALAKAARIAN</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: "Oswald, sans-serif" }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: May 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using Kalakaarian, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">2. Platform Use</h2>
            <p>Kalakaarian is a marketplace connecting brands and creators. Users must be at least 18 years old. You are responsible for all activity under your account.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">3. Payments</h2>
            <p>All payments are processed securely via Razorpay. Kalakaarian charges a platform fee on transactions. Pricing is displayed before confirmation.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">4. Content</h2>
            <p>Users retain ownership of their content. By posting on Kalakaarian, you grant us a non-exclusive licence to display your content on the platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">5. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">6. Contact</h2>
            <p>For queries regarding these terms, reach us at <a href="mailto:support@kalakaarian.com" className="text-purple-600 hover:underline">support@kalakaarian.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-6 mb-2">
          <Link to="/terms" className="hover:text-foreground">Terms &amp; Conditions</Link>
          <Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
        </div>
        <p>&copy; 2026 Kalakaarian. All rights reserved.</p>
      </footer>
    </div>
  );
}
