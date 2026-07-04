"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.BaseSyntheticEvent) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form) return;

    setLoading(true);
    setStatus("");

    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus("Please enter all required data and queries!");
      setLoading(false);
      setTimeout(() => {
        setStatus("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to send message",
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-full flex py-20 justify-center bg-slate-950"
    >
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-600 rounded-9xl filter blur-[120px] opacity-30 z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-600 rounded-r-9xl filter blur-[120px] opacity-30 z-0"></div>

      <div className="max-w-4xl w-full relative z-10">
        <h2 className="text-4xl font-black mb-4 text-center bg-linear-to-r from-green-500 via-slate-400 to-red-700 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-center text-slate-400 max-w-sm mx-auto mb-12">
          Have a project in mind or looking to collaborate? Drop a message and
          let&apos;s build something amazing together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 bg-white/2 backdrop-blur-md p-6 md:p-12 rounded-4xl shadow-2xl">
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Let&apos;s talk
              </h3>
              <p className="text-sm text-slate-400">
                I&apos;m currently available for freelance work, internships,
                and full-time structural development roles.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  📩
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    Email Me
                  </p>
                  <a
                    href="mailto:Abubakar@gmail.com"
                    className="text-sm text-slate-200 hover:text-purple-400 transition-colors"
                  >
                    Abubakar@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-500/10">📍</div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    Location
                  </p>
                  <p className="text-sm text-slate-200">Lahore, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Response time: Within 24 hours.
            </div>
          </div>

          <form
            className="md:col-span-3 flex flex-col space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-6 sm:gap-10">
              <div className="flex flex-col space-y-2 w-full">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Name
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Message
              </label>

              <textarea
                name="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="max-w-fit bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-slate-300 font-black px-4 py-3 rounded-3xl transition-all duration-300 shadow-lg shadow-purple-900/20 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status ? <p className="text-sm text-green-400">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
