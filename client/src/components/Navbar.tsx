import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/10 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-black tracking-tight text-white sm:text-xl">
          Kalakaarian
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button className="bg-white text-purple-700 hover:bg-white/90" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
