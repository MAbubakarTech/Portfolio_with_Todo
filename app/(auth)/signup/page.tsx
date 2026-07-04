"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup frontend error:", err);
      setError("Server connection failed. Make sure your backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden select-none">
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-green-600 rounded-full filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-red-600 rounded-full filter blur-[120px] opacity-20 pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/20 py-7 px-8 rounded-2xl shadow-4xl backdrop-blur-md transition-all duration-350 hover:scale-[1.01] group">
        <h2 className="text-3xl font-bold text-center bg-linear-to-r from-white via-slate-400 to-red-300 bg-clip-text text-transparent mb-1">
          Create Account
        </h2>

        {message && (
          <div className="p-2.5 mb-4 text-center rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold animate-pulse">
            {message}
          </div>
        )}
        {error && (
          <div className="p-2.5 mb-4 text-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative flex items-center">
              <HiOutlineUser className="absolute left-4 text-slate-500 w-4 h-4 group-hover:text-slate-400 transition-colors" />
              <input
                type="text"
                required
                placeholder="Enter your name..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/30 transition-all text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <HiOutlineMail className="absolute left-4 text-slate-500 w-4 h-4 group-hover:text-slate-400 transition-colors" />
              <input
                type="email"
                required
                placeholder="Enter you email..."
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/30 transition-all text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <HiOutlineLockClosed className="absolute left-4 text-slate-500 w-4 h-4 group-hover:text-slate-400 transition-colors" />
              <input
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/30 transition-all text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-linear-to-r from-slate-800 to-red-950/60 hover:from-slate-700 hover:to-red-900 text-white font-bold py-2.5 rounded-xl border border-white/10 hover:border-red-500/30 shadow-lg hover:shadow-red-900/20 transition-all duration-300 cursor-pointer text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[11px] mt-4 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-400 hover:text-red-300 transition-colors font-bold ml-1"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
