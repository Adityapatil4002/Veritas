import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/hooks/useAuth";

const Login = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already logged in → go to home
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-zinc-400 tracking-widest text-sm uppercase animate-pulse">
          Authenticating...
        </div>
      </main>
    );
  }

  return (
    <>
      {/* 
        Custom styles for the premium minimal animation. 
        Kept inline for component portability. 
      */}
      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; }
        }
        .animate-scan {
          animation: scan-line 3s ease-in-out infinite;
        }
        @keyframes float-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: float-up 0.8s ease-out forwards;
        }
      `}</style>

      <main className="min-h-screen w-full flex bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden">
        {/* LEFT COLUMN: Login Section */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="max-w-md w-full animate-fade-in-up">
            {/* Branding / Typography Hierarchy */}
            <div className="mb-16">
              <h2 className="text-zinc-500 tracking-[0.2em] text-xs font-semibold uppercase mb-4">
                Veritas AI
              </h2>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-3">
                Welcome back.
              </h1>
              <p className="text-zinc-400 font-light text-lg">
                Log in to access your oral exam evaluations.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Editorial Input: Thin bottom border, no boxes */}
              <div className="flex flex-col group">
                <label
                  htmlFor="email"
                  className="text-xs text-zinc-500 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-zinc-300"
                >
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  required
                  className="bg-transparent border-b border-zinc-800 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-300 transition-colors"
                  placeholder="name@example.com"
                />
              </div>

              <div className="flex flex-col group">
                <label
                  htmlFor="password"
                  className="text-xs text-zinc-500 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-zinc-300"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  required
                  className="bg-transparent border-b border-zinc-800 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-300 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-100 text-zinc-950 py-4 text-sm font-medium tracking-wide hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Authenticating..." : "Sign In"}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-zinc-900 text-sm text-zinc-500">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-zinc-300 hover:text-white transition-colors border-b border-zinc-700 pb-0.5"
                >
                  Request access
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Animation / Visual Section */}
        <section className="hidden lg:flex w-1/2 bg-[#050505] border-l border-zinc-900 items-center justify-center p-12 relative overflow-hidden">
          {/* Subtle background grid pattern for the "Tech" feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative w-full max-w-lg h-[600px] flex items-center justify-center">
            {/* The Document (PDF) being analyzed */}
            <div className="absolute left-4 top-12 w-64 h-80 border border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-sm p-6 shadow-2xl flex flex-col gap-4 transform -rotate-6">
              {/* Document Header Skeleton */}
              <div className="w-1/3 h-2 bg-zinc-800 rounded-full"></div>
              {/* Document Body Skeletons */}
              <div className="space-y-2 mt-4">
                <div className="w-full h-2 bg-zinc-800/50 rounded-full"></div>
                <div className="w-[90%] h-2 bg-zinc-800/50 rounded-full"></div>
                <div className="w-[95%] h-2 bg-zinc-800/50 rounded-full"></div>
                <div className="w-4/5 h-2 bg-zinc-800/50 rounded-full"></div>
              </div>
              <div className="space-y-2 mt-6">
                <div className="w-full h-2 bg-zinc-800/50 rounded-full"></div>
                <div className="w-[85%] h-2 bg-zinc-800/50 rounded-full"></div>
                <div className="w-[90%] h-2 bg-zinc-800/50 rounded-full"></div>
              </div>

              {/* Scanning Laser Line */}
              <div className="absolute left-0 w-full h-[1px] bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-scan z-20"></div>
            </div>

            {/* Connecting visual elements (Minimalist paths) */}
            <div className="absolute w-32 h-[1px] bg-gradient-to-r from-zinc-800 to-indigo-500/30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-12"></div>

            {/* The Report / Extraction Output */}
            <div className="absolute right-4 bottom-12 w-72 h-auto border border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md p-6 shadow-2xl transform translate-y-4">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs tracking-widest text-zinc-400 uppercase">
                    Analysis Complete
                  </span>
                </div>
              </div>

              {/* Report Stats */}
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Clarity Score
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-light text-zinc-200">
                      94
                    </span>
                    <span className="text-xs text-zinc-500 mb-1">/100</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                    Key Entities Extracted
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 border border-zinc-800 text-[10px] text-zinc-300 rounded-sm">
                      Syntax
                    </span>
                    <span className="px-2 py-1 border border-zinc-800 text-[10px] text-zinc-300 rounded-sm">
                      Logic
                    </span>
                    <span className="px-2 py-1 border border-zinc-800 text-[10px] text-zinc-300 rounded-sm">
                      Fluency
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
