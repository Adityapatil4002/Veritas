import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/hooks/useAuth";

const Register = () => {
  const { register, user, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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
      await register({ username, email, password });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-zinc-400 tracking-widest text-sm uppercase animate-pulse">
          Initializing...
        </div>
      </main>
    );
  }

  return (
    <>
      {/* 
        Custom styles for the premium minimal animation. 
        Audio waveform and float animations tailored for speech/vocal evaluation.
      */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: float-up 0.8s ease-out forwards;
        }
        @keyframes bar-pulse {
          0%, 100% { height: 15%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; }
        }
        .animate-bar-1 { animation: bar-pulse 1.2s ease-in-out infinite; }
        .animate-bar-2 { animation: bar-pulse 0.9s ease-in-out infinite 0.2s; }
        .animate-bar-3 { animation: bar-pulse 1.4s ease-in-out infinite 0.4s; }
        .animate-bar-4 { animation: bar-pulse 1.1s ease-in-out infinite 0.1s; }
        .animate-bar-5 { animation: bar-pulse 1.3s ease-in-out infinite 0.5s; }
        .animate-bar-6 { animation: bar-pulse 1.0s ease-in-out infinite 0.3s; }
        .animate-bar-7 { animation: bar-pulse 1.5s ease-in-out infinite 0.6s; }
      `}</style>

      <main className="min-h-screen w-full flex bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden">
        {/* LEFT COLUMN: Registration Section */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="max-w-md w-full animate-fade-in-up">
            {/* Branding / Typography Hierarchy */}
            <div className="mb-14">
              <h2 className="text-zinc-500 tracking-[0.2em] text-xs font-semibold uppercase mb-4">
                Veritas AI
              </h2>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-3">
                Begin evaluation.
              </h1>
              <p className="text-zinc-400 font-light text-lg">
                Create an account to initialize your oral exam profile.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="flex flex-col group">
                <label
                  htmlFor="username"
                  className="text-xs text-zinc-500 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-zinc-300"
                >
                  Full Name
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  required
                  className="bg-transparent border-b border-zinc-800 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-300 transition-colors"
                  placeholder="John Doe"
                />
              </div>

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

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-100 text-zinc-950 py-4 text-sm font-medium tracking-wide hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Profile..." : "Register"}
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-zinc-900 text-sm text-zinc-500">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-white transition-colors border-b border-zinc-700 pb-0.5"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Audio / Speech-to-Text Animation */}
        <section className="hidden lg:flex w-1/2 bg-[#050505] border-l border-zinc-900 items-center justify-center p-12 relative overflow-hidden">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative w-full max-w-lg h-[600px] flex items-center justify-center">
            {/* The Audio Input Module */}
            <div className="absolute left-8 top-24 w-56 h-48 border border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-sm p-6 shadow-2xl flex flex-col justify-between transform -rotate-3 z-10">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Mic Active
                </span>
              </div>

              {/* Dynamic Waveform */}
              <div className="h-16 flex items-end justify-between gap-1 w-full">
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-1"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-2"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-3"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-4"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-5"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-6"></div>
                <div className="w-full bg-indigo-500/80 rounded-t-sm animate-bar-7"></div>
              </div>

              <div className="text-[10px] text-zinc-600 font-mono">
                Capture: 44.1kHz
              </div>
            </div>

            {/* Connecting Connector (Minimalist path) */}
            <div className="absolute w-40 h-[1px] bg-gradient-to-r from-indigo-500/40 to-zinc-800 left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transform rotate-12"></div>

            {/* The NLP / Transcription Output Engine */}
            <div className="absolute right-4 bottom-24 w-72 h-auto border border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-md p-6 shadow-2xl transform translate-y-4">
              <div className="flex items-center justify-between mb-5 border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  <span className="text-xs tracking-widest text-zinc-400 uppercase">
                    NLP Engine
                  </span>
                </div>
              </div>

              {/* Transcription Simulation */}
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                    Live Transcript
                  </div>
                  <div className="text-sm font-light text-zinc-300 leading-relaxed italic border-l-2 border-zinc-800 pl-3">
                    "The primary advantage of neural networks in this context
                    is..."
                    <span className="inline-block w-1.5 h-3 bg-zinc-500 ml-1 animate-pulse"></span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Pronunciation
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      Optimal
                    </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/80 w-[88%]"></div>
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

export default Register;
