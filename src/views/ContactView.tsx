import React, { useState } from "react";
import { DEVELOPER_INFO, SOCIAL_CARDS } from "../config/contacts";
import { Mail, Send, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Technical Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Communication & Engineering Inquiries</span>
          <span aria-hidden="true">·</span>
          <span>Lead Developer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Contact & Collaboration
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Reach out directly to Harshit Raahi regarding MYRA Android OS architecture, security disclosures, device compatibility testing, or open-source development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h3 className="text-lg font-semibold text-neutral-100">
              Send a Technical Message
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Direct inbox delivery to {DEVELOPER_INFO.primaryEmail}
            </p>
          </div>

          {submitted ? (
            <div className="bg-neutral-950 p-6 rounded-xl border border-emerald-800/60 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-neutral-100">
                Inquiry Form Prepared
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. You can also dispatch directly to{" "}
                <a
                  href={`mailto:${DEVELOPER_INFO.primaryEmail}?subject=${encodeURIComponent(
                    formData.subject
                  )}&body=${encodeURIComponent(formData.message)}`}
                  className="text-cyan-400 underline font-mono"
                >
                  {DEVELOPER_INFO.primaryEmail}
                </a>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", subject: "Technical Inquiry", message: "" });
                }}
                className="mt-3 text-xs text-neutral-400 hover:text-neutral-200 underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Technical Inquiry">Technical Inquiry / Architecture</option>
                  <option value="Bug Report / Log">Bug Report / Subsystem Log</option>
                  <option value="ESP32 / Hardware Question">ESP32 / Hardware Wiring</option>
                  <option value="Security Disclosure">Security & Vulnerability Disclosure</option>
                  <option value="Collaboration">Collaboration / Open Source</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your question or system environment (device model, Android version)..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-neutral-100 text-neutral-950 font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels Column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Instant AI Support Card */}
          <div className="bg-linear-to-br from-cyan-950/40 via-blue-950/30 to-neutral-900 border border-cyan-500/40 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h4 className="text-sm font-bold text-neutral-100">
                Instant AI Support Available
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Need immediate answers about MYRA's architecture, Gemini Live streaming, or Memory 2.0? The AI Support assistant is online 24/7.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-ai-support"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <span>Ask AI Support Now</span>
              </button>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-semibold text-neutral-100">
              Direct Contact Details
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <span className="text-neutral-500 block text-[10px]">PRIMARY EMAIL</span>
                <a
                  href={`mailto:${DEVELOPER_INFO.primaryEmail}`}
                  className="text-cyan-400 hover:underline select-all mt-0.5 block"
                >
                  {DEVELOPER_INFO.primaryEmail}
                </a>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-850">
                <span className="text-neutral-500 block text-[10px]">LEAD DEVELOPER</span>
                <span className="text-neutral-200 mt-0.5 block">
                  {DEVELOPER_INFO.name}
                </span>
                <span className="text-neutral-500 text-[10px] block">
                  {DEVELOPER_INFO.role}
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Connected Networks
            </h4>
            <div className="space-y-2 text-xs">
              {SOCIAL_CARDS.map((card) => (
                <a
                  key={card.label}
                  href={card.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-neutral-700 flex items-center justify-between transition-colors group"
                >
                  <span className="text-neutral-300 font-medium group-hover:text-cyan-400">
                    {card.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
