"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-teal-900 px-4">
      {/* Decorative blurred orbs — purely visual, sit behind the glass card */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-teal-500/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-300/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-xl">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-semibold text-white">Student ERP Portal</h1>
          <p className="mt-1 text-sm text-white/60">Sign in to access your academic dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
        >
          <div className="mb-4">
            <label
              htmlFor="rollNumber"
              className="mb-1.5 block text-sm font-medium text-white/80"
            >
              Roll Number
            </label>
            <div className="relative">
              <User
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                id="rollNumber"
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="SP21-BCS-045"
                className="glass-input w-full rounded-lg border border-white/20 bg-white/10 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40 focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-white/80"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input w-full rounded-lg border border-white/20 bg-white/10 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40 focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/20 px-3 py-2 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-400 to-teal-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition-all hover:from-brand-300 hover:to-teal-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-5 text-center text-xs text-white/50">
            Demo credentials — Roll No: <span className="font-medium text-white/70">SP21-BCS-045</span>{" "}
            · Password: <span className="font-medium text-white/70">password123</span>
          </p>
        </form>
      </div>
    </div>
  );
}
