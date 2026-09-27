import React from "react";
import { DEVELOPER_INFO } from "../config/contacts";
import { Download, Smartphone, CheckCircle2, ShieldCheck, Terminal, AlertTriangle, ArrowRight, Github } from "lucide-react";

export const DownloadView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Official Distribution & Release Hub</span>
          <span aria-hidden="true">·</span>
          <span>com.soltini.app</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Download MYRA for Android
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Install the native APK package directly onto your Android device. Review minimum operating system requirements and setup instructions below.
        </p>
      </div>

      {/* Main Release Card */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-100">
                MYRA Universal Release
              </span>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                {DEVELOPER_INFO.version}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Package: <span className="text-neutral-200">com.soltini.app</span> · Signed Release
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DEVELOPER_INFO.links.apkDownloadPlaceholder}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (Placeholder)</span>
            </a>
            <a
              href={DEVELOPER_INFO.links.githubRepoPlaceholder}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-300 bg-neutral-950 border border-neutral-800 rounded-lg hover:bg-neutral-900 hover:text-neutral-100 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Releases</span>
            </a>
          </div>
        </div>

        {/* System Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
            <span className="text-neutral-500 text-[10px] block">MINIMUM OS</span>
            <strong className="text-neutral-200 block text-xs mt-1">Android 8.0 (API 26)</strong>
            <span className="text-neutral-500 text-[10px]">Oreo or later</span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
            <span className="text-cyan-400 text-[10px] block">TARGET SDK</span>
            <strong className="text-cyan-300 block text-xs mt-1">Android 16 (SDK 36)</strong>
            <span className="text-neutral-500 text-[10px]">Latest modern platform</span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
            <span className="text-blue-400 text-[10px] block">ARCHITECTURE</span>
            <strong className="text-blue-300 block text-xs mt-1">arm64-v8a / armeabi-v7a</strong>
            <span className="text-neutral-500 text-[10px]">Universal APK</span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
            <span className="text-emerald-400 text-[10px] block">UI TOOLKIT</span>
            <strong className="text-emerald-300 block text-xs mt-1">Jetpack Compose</strong>
            <span className="text-neutral-500 text-[10px]">Material 3 Design</span>
          </div>
        </div>

        {/* SHA-256 Verification Placeholder */}
        <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <span className="text-neutral-400">Release Artifact Checksum:</span>
          <span className="text-neutral-300 text-[11px] select-all bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
            sha256:PLACEHOLDER_RELEASE_VERIFICATION_HASH_PENDING_TAG
          </span>
        </div>
      </div>

      {/* Step-by-Step Installation Guide */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <h3 className="text-lg font-semibold text-neutral-100 border-b border-neutral-800 pb-3">
          Installation & Android System Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold">
              <span>01. Sideload APK</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Download the APK file to your device. When prompted, permit your browser to <em>"Install unknown apps"</em> in Android Settings, then complete package installation.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono font-semibold">
              <span>02. Enable Accessibility</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Navigate to <strong>Settings → Accessibility → Installed apps → MYRA</strong>. Toggle service ON. This enables ScreenOperator and app automators.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
              <span>03. Set Digital Assistant</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Open <strong>Settings → Apps → Default apps → Digital assistant app</strong> and select MYRA. This binds SoltiniVoiceInteractionService to your home button or power gesture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
