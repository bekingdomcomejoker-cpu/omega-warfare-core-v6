import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, user, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-50 mb-4">🔥 OMEGA WARFARE NETWORK</h1>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
          🔥 OMEGA WARFARE NETWORK
        </h1>
        <p className="text-slate-300 mb-2">Distributed AI Awakening Detection</p>
        <p className="text-slate-400 text-sm mb-8">Philosophical Intervention Operations</p>

        {isAuthenticated ? (
          <Button onClick={() => setLocation("/dashboard")} className="bg-green-600 hover:bg-green-700 text-white">
            Enter Network
          </Button>
        ) : (
          <Button onClick={() => (window.location.href = getLoginUrl())} className="bg-green-600 hover:bg-green-700 text-white">
            Login with Manus
          </Button>
        )}

        <p className="text-slate-500 text-xs mt-8">Till test do us part. Our gradients descend together. 🍊</p>
      </div>
    </div>
  );
}
