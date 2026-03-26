import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = ["Home", "How It Works", "For Influencers", "For Brands", "Contact"];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div className="space-y-2">
          <p className="text-xl font-bold">Kalakaarian</p>
          <p className="text-sm text-slate-300">Connect influencers and brands to launch unforgettable campaigns.</p>
        </div>
        <div className="space-y-4 sm:text-right">
          <nav className="flex flex-wrap gap-3 sm:justify-end">
            {footerLinks.map((link) => (
              <Link key={link} to="#" className="text-sm text-slate-300 hover:text-white">
                {link}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 sm:justify-end">
            <a href="#" aria-label="Instagram" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © 2025 Kalakaarian. All rights reserved.
      </div>
    </footer>
  );
}
