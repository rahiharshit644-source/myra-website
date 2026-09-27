import React from "react";
import { NavTab } from "../components/Navbar";
import { HeroInteractiveConsole } from "../components/HeroInteractiveConsole";
import { SystemRequirements } from "../components/SystemRequirements";
import { OrchestratorFlow } from "../components/OrchestratorFlow";
import { APP_SPECS } from "../config/appInfo";
import { DEVELOPER_INFO } from "../config/contacts";
import {
  Mic,
  Database,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Radio,
  FileText,
  Sliders,
  CheckCircle2,
  Terminal,
  Sparkles,
  Zap
} from "lucide-react";

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION WITH PREMIUM GRADIENT & INTERACTIVE CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Colorful ambient background lighting */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Android Voice Operating System</span>
              <span className="text-neutral-500">·</span>
              <span className="text-purple-300">API 26 to SDK 36</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 text-balance leading-tight">
              Your AI. <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Your Voice.</span> Your Android.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              MYRA connects real-time voice interaction, AI reasoning, multi-tier memory, Android Accessibility actions, document knowledge (RAG), notifications, scheduling, and ESP32 smart-home control into one cohesive Android assistant.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectTab("download")}
                className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-linear-to-r from-cyan-400 via-sky-300 to-blue-400 rounded-xl hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer font-sans"
              >
                Download MYRA APK
              </button>
              <button
                onClick={() => onSelectTab("docs")}
                className="px-6 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900/90 border border-neutral-700/80 rounded-xl hover:bg-neutral-800 hover:text-white transition-all cursor-pointer shadow-md font-sans"
              >
                Architecture Docs
              </button>
            </div>

            {/* Grounding metadata pills */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-xs font-mono text-neutral-400">
              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-850">
                <span className="block text-cyan-400 font-bold">com.soltini.app</span>
                <span className="text-neutral-500 text-[11px]">Android Package</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-850">
                <span className="block text-indigo-400 font-bold">Gemini Live</span>
                <span className="text-neutral-500 text-[11px]">Full-Duplex WS</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-850">
                <span className="block text-purple-400 font-bold">Material 3</span>
                <span className="text-neutral-500 text-[11px]">Jetpack Compose</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Replaced Orb with the HeroInteractiveConsole */}
          <div className="lg:col-span-6">
            <HeroInteractiveConsole />
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SYSTEM REQUIREMENTS COMPONENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SystemRequirements />
      </section>

      {/* 3. CORE ARCHITECTURE PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 mb-2">
            <span>Decision & Execution Flow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            How MYRA Actually Thinks and Acts
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-3xl">
            MyraOrchestrator enforces a clear boundary: the orchestrator decides what should happen, memory supplies historical context, and plugins/tools provide concrete capabilities.
          </p>
        </div>

        <OrchestratorFlow />
      </section>

      {/* 4. CAPABILITY MODULES (BENTO-GRID) WITH VIBRANT PREMIUM CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 mb-2">
            <span>Built-in Subsystems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Verified Subsystems in com.soltini.app
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
            Every feature documented on this website directly maps to classes implemented in the Android project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Voice AI */}
          <div
            onClick={() => onSelectTab("voice")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-cyan-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors">
                Gemini Live Voice AI
              </h3>
              <p className="text-xs text-cyan-300/80 font-mono mt-1">
                GeminiLiveManager · AudioRecorder · AudioPlayer
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Bi-directional WebSocket streaming with raw 16-bit PCM audio, instant interruption handling, and turn completion without multi-second roundtrips.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-cyan-300 transition-colors">
              <span>View Voice Architecture</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Memory 2.0 */}
          <div
            onClick={() => onSelectTab("memory")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-indigo-400 transition-colors">
                Memory 2.0 & Experience Learning
              </h3>
              <p className="text-xs text-indigo-300/80 font-mono mt-1">
                Memory2Engine · ExperienceLearningEngine
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Three-tiered memory (Session, Working, Durable Room DB) with selective semantic retrieval. Records task attempts and safety-checked patterns.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-indigo-300 transition-colors">
              <span>Explore Memory Tiers</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Accessibility Automation */}
          <div
            onClick={() => onSelectTab("automation")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-emerald-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                Accessibility Automation
              </h3>
              <p className="text-xs text-emerald-300/80 font-mono mt-1">
                SoltiniAccessibilityService · ScreenOperator
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Interacts with Android UI nodes via gestures, coordinate taps, and text injection. Includes targeted automators for WhatsApp, Gmail, Maps, and YouTube.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-emerald-300 transition-colors">
              <span>Inspect Automators</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Local RAG */}
          <div
            onClick={() => onSelectTab("rag-storage")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-purple-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-purple-400 transition-colors">
                Local RAG Knowledge Engine
              </h3>
              <p className="text-xs text-purple-300/80 font-mono mt-1">
                RagKnowledgeEngine · RecursiveDocumentSplitter
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Indexes user-authorized PDFs, code, markdown, and text files. Recursive splitting and local SQLite search provide grounded context to the orchestrator.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-purple-300 transition-colors">
              <span>View RAG Pipeline</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 5: Smart Home & ESP32 */}
          <div
            onClick={() => onSelectTab("smart-home")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-amber-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
                Smart Home & ESP32 Generator
              </h3>
              <p className="text-xs text-amber-300/80 font-mono mt-1">
                MqttManager · Esp32CodeGenerator · HomeDatabase
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Connects directly to MQTT brokers for two-way device state synchronization. Generates ready-to-flash Arduino C++ sketches for your ESP32 relays.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-amber-300 transition-colors">
              <span>Explore MQTT Architecture</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 6: Security & Biometrics */}
          <div
            onClick={() => onSelectTab("security")}
            className="p-6 bg-linear-to-b from-neutral-900/80 via-neutral-950/90 to-neutral-950 border border-neutral-800 hover:border-rose-500/50 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-lg hover:shadow-rose-500/10 hover:-translate-y-0.5"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500/20 to-red-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-rose-400 transition-colors">
                Security & Voice Biometrics
              </h3>
              <p className="text-xs text-rose-300/80 font-mono mt-1">
                VoiceBiometricsManager · KeystoreCryptoManager
              </p>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Acoustic embedding cosine similarity verification, Banking Mode Quick Settings tile, and hardware-backed Android Keystore AES-256 encryption.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400 group-hover:text-rose-300 transition-colors">
              <span>View Safety Controls</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. REALITY & DISCLOSURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-900/90 via-neutral-950 to-neutral-950 p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Honest Technical Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
            Engineered with Real Android Guardrails
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm text-neutral-300">
            <div className="space-y-2 border-l-2 border-cyan-500/40 pl-4">
              <h4 className="font-semibold text-neutral-100">No Secret Recording</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Telephony APIs in Android do not allow background call recording. MYRA announces callers and facilitates voice call answering via TelecomManager; it never records conversations.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-indigo-500/40 pl-4">
              <h4 className="font-semibold text-neutral-100">Pending Confirmation Gates</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Destructive file operations and outgoing SMS transmissions require explicit user verbal or touch confirmations before execution. MYRA will not silently send messages.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-purple-500/40 pl-4">
              <h4 className="font-semibold text-neutral-100">Network & Privacy Transparency</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                While device memory and smart home states reside in local SQLite databases, real-time Gemini voice and public API queries require active internet connections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

