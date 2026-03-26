import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import BrandDashboard from "./BrandDashboard";
import InfluencerDashboard from "./InfluencerDashboard";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "brand") {
    return <BrandDashboard />;
  }

  if (user.role === "influencer") {
    return <InfluencerDashboard />;
  }

  return <Navigate to="/role-select" replace />;
}
