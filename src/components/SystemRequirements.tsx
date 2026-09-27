import React, { useState } from "react";
import { APP_SPECS } from "../config/appInfo";
import {
  Smartphone,
  Cpu,
  Layers,
  HardDrive,
  ShieldCheck,
  Zap,
  Wifi,
  Radio,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info,
  Flame,
  Volume2
} from "lucide-react";

export interface DeviceSpecTier {
  id: "minimum" | "recommended" | "enthusiast";
  label: string;
  badge: string;
  badgeColor: string;
  targetAudience: string;
  androidVersion: string;
  apiLevel: string;
  ram: string;
  storage: string;
  processor: string;
  connectivity: string;
  voiceEngineLatency: string;
  ragCapacity: string;
  featuresSupported: string[];
}

export const SPEC_TIERS: DeviceSpecTier[] = [
  {
    id: "minimum",
    label: "Minimum Baseline",
    badge: "Basic Operation",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    targetAudience: "Older Android hardware (Android 8.0+)",
    androidVersion: "Android 8.0 (Oreo)",
    apiLevel: "API 26",
    ram: "3 GB RAM",
    storage: "250 MB free space",
    processor: "Quad-Core ARM64 or ARMv7",
    connectivity: "Wi-Fi or 4G LTE",
    voiceEngineLatency: "~450ms - 800ms",
    ragCapacity: "Up to 50 indexed docs",
    featuresSupported: [
      "Voice Interaction (Gemini Live WebSocket)",
      "Standard Accessibility Automation",
      "Room SQLite Memory 2.0 (Local storage)",
      "Scheduled Tasks & Exact Alarms",
      "Basic MQTT Smart Home Toggles",
      "Pending Confirmation for SMS"
    ]
  },
  {
    id: "recommended",
    label: "Recommended Setup",
    badge: "Optimal Experience",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    targetAudience: "Modern smartphones running Android 11 to 14",
    androidVersion: "Android 12 to 14 (Snow Cone - Upside Down Cake)",
    apiLevel: "API 31 - 34",
    ram: "6 GB - 8 GB RAM",
    storage: "1 GB free space (SAF cache & vectors)",
    processor: "Octa-Core (Snapdragon 7/8 Gen, Dimensity 8000+)",
    connectivity: "Wi-Fi 5/6 + 5G Low Latency",
    voiceEngineLatency: "~180ms - 320ms",
    ragCapacity: "Up to 1,000 indexed documents & code files",
    featuresSupported: [
      "Full Duplex Audio PCM 24kHz with instant barge-in",
      "Real-time UI Automation & Target Automators (WhatsApp, Gmail)",
      "Continuous Background Voice Service with foreground notification",
      "Local RAG Knowledge Engine with recursive multi-format parsing",
      "Multi-channel MQTT 2-Way ESP32 synchronization",
      "Voice Biometrics Cosine Similarity verification",
      "Quick Settings Banking Mode protection tile"
    ]
  },
  {
    id: "enthusiast",
    label: "Peak Performance",
    badge: "Flagship / Android 15 & 16",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    targetAudience: "Flagship devices running Android 15 up to Android 16 (SDK 36)",
    androidVersion: "Android 15 - 16",
    apiLevel: "API 35 - SDK 36 (Targeted)",
    ram: "12 GB+ LPDDR5X",
    storage: "2 GB+ high-speed UFS 3.1 / 4.0",
    processor: "Snapdragon 8 Gen 2/3/Elite, Dimensity 9300+, Google Tensor G3/G4",
    connectivity: "Wi-Fi 7 + Sub-6 / mmWave 5G",
    voiceEngineLatency: "~120ms - 220ms (Hardware accelerated)",
    ragCapacity: "5,000+ indexed chunks, local embeddings & code symbols",
    featuresSupported: [
      "Sub-200ms bi-directional Gemini Live voice streaming",
      "Parallel tool execution & multi-intent planning",
      "Hardware-backed Android Keystore StrongBox AES-256",
      "High-frame rate visual screen understanding (MediaProjection)",
      "Real-time recursive document splitting & semantic memory search",
      "Sub-millisecond ESP32 state telemetry publishing",
      "Enhanced Predictive Experience Learning Engine"
    ]
  }
];

export interface HardwareFeatureSupport {
  feature: string;
  category: string;
  status: "Native & Tested" | "Conditional" | "Safeguarded";
  details: string;
  classesInvolved: string;
}

export const HARDWARE_FEATURES: HardwareFeatureSupport[] = [
  {
    feature: "Microphone Audio Hardware",
    category: "Voice Processing",
    status: "Native & Tested",
    details: "16-bit PCM streaming (16kHz / 24kHz mono) with active echo suppression and buffer flushing.",
    classesInvolved: "AudioRecorder, AudioPlayer, GeminiLiveManager"
  },
  {
    feature: "Secure Element / TEE Hardware",
    category: "Cryptography",
    status: "Native & Tested",
    details: "Hardware-isolated AndroidKeyStore AES-256 GCM key generation for encrypted preferences and tokens.",
    classesInvolved: "KeystoreCryptoManager"
  },
  {
    feature: "Accessibility Gestures & Canvas",
    category: "UI Automation",
    status: "Native & Tested",
    details: "Coordinate-level dispatchGesture taps, programmatic scrolling, and node hierarchy traversal.",
    classesInvolved: "SoltiniAccessibilityService, ScreenOperator"
  },
  {
    feature: "Android AlarmManager (RTC_WAKEUP)",
    category: "Temporal Scheduling",
    status: "Native & Tested",
    details: "setExactAndAllowWhileIdle() wakes device processor even in deep Doze battery conservation state.",
    classesInvolved: "ScheduledTaskManager, ScheduledTaskAlarmReceiver"
  },
  {
    feature: "Microphone Foreground Service",
    category: "Background Voice",
    status: "Conditional",
    details: "Requires user permission exemption and Android 14+ FOREGROUND_SERVICE_MICROPHONE declaration.",
    classesInvolved: "BackgroundVoiceService"
  },
  {
    feature: "Quick Settings System Tile",
    category: "System UI",
    status: "Native & Tested",
    details: "Direct notification shade tile toggle for instant Banking Mode automation suppression.",
    classesInvolved: "BankingModeTileService, BankingModeManager"
  },
  {
    feature: "Local Wi-Fi & MQTT Sockets",
    category: "Smart Home",
    status: "Native & Tested",
    details: "Direct TCP socket connections to LAN brokers (Port 1883) with auto-reconnect backoff.",
    classesInvolved: "MqttManager, WifiMqttCredentialsStore"
  },
  {
    feature: "Camera & Flashlight Torch",
    category: "Device Control",
    status: "Native & Tested",
    details: "Hardware torch toggling via CameraManager and optional visual reasoning frames.",
    classesInvolved: "DeviceHardwareController, VisualScreenAnalyzer"
  },
  {
    feature: "Telephony & Telecom Audio",
    category: "Telephony",
    status: "Safeguarded",
    details: "Hands-free call answering via TelecomManager; cellular call recording is prohibited by Android OS.",
    classesInvolved: "AgentPhoneController, IncomingCallReceiver"
  }
];

export const SystemRequirements: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<"minimum" | "recommended" | "enthusiast">("recommended");

  const currentTier = SPEC_TIERS.find((t) => t.id === selectedTierId) || SPEC_TIERS[1];

  return (
    <section className="w-full relative overflow-hidden rounded-3xl border border-neutral-800 bg-linear-to-b from-neutral-900/90 via-neutral-950 to-neutral-950 p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Decorative premium ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hardware & OS Compatibility Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-100 tracking-tight">
            System Requirements & Device Specifications
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            MYRA is engineered strictly for Android with native Kotlin 2.x and Jetpack Compose. Compare minimum, recommended, and flagship hardware specs to ensure flawless performance.
          </p>
        </div>

        {/* Package & SDK Pill */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-300">
          <span className="px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
            Package: <strong className="text-cyan-400">com.soltini.app</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
            Min: <strong className="text-amber-400">API 26</strong> · Target: <strong className="text-emerald-400">SDK 36</strong>
          </span>
        </div>
      </div>

      {/* Tier Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
        {SPEC_TIERS.map((tier) => {
          const isSelected = tier.id === selectedTierId;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? "bg-linear-to-br from-neutral-850 via-neutral-900 to-neutral-950 border-cyan-500/60 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30"
                  : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-100 tracking-tight">
                  {tier.label}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {tier.targetAudience}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-neutral-300 font-semibold">{tier.ram}</span>
                <span className="text-cyan-400">{tier.androidVersion.split(" ")[0]} {tier.apiLevel}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Deep-Dive Spec Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold text-neutral-100">
                {currentTier.label} Specifications
              </h4>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${currentTier.badgeColor}`}>
                {currentTier.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Optimized for {currentTier.targetAudience}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="text-neutral-500">Latency:</span>
              <span className="text-cyan-300 font-bold">{currentTier.voiceEngineLatency}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
              <span className="text-neutral-500">RAG Index:</span>
              <span className="text-purple-300 font-bold">{currentTier.ragCapacity}</span>
            </div>
          </div>
        </div>

        {/* Spec Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 text-xs">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Android OS & Level</span>
              <strong className="text-sm font-semibold text-neutral-100 block mt-0.5">
                {currentTier.androidVersion}
              </strong>
              <span className="text-cyan-400 font-mono text-[11px]">{currentTier.apiLevel}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/50 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">System Memory (RAM)</span>
              <strong className="text-sm font-semibold text-neutral-100 block mt-0.5">
                {currentTier.ram}
              </strong>
              <span className="text-neutral-400 font-mono text-[11px]">Dynamic buffer allocation</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 shrink-0">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">Local Storage (SAF)</span>
              <strong className="text-sm font-semibold text-neutral-100 block mt-0.5">
                {currentTier.storage}
              </strong>
              <span className="text-emerald-400 font-mono text-[11px]">Room SQLite & RAG chunks</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/50 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 block">CPU & SoC Architecture</span>
              <strong className="text-sm font-semibold text-neutral-100 block mt-0.5">
                {currentTier.processor.split("(")[0]}
              </strong>
              <span className="text-purple-400 font-mono text-[11px]">ARM64 / ARMv7</span>
            </div>
          </div>
        </div>

        {/* Feature Capabilities on Selected Tier */}
        <div className="mt-2 pt-6 border-t border-neutral-800/80">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
            Verified Subsystem Readiness for this Specification Tier
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {currentTier.featuresSupported.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware Features & Subsystem Integration Table */}
      <div className="mt-10">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-bold text-neutral-100">
              Supported Hardware & Native Driver Capabilities
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              How MYRA interfaces with physical smartphone sensors, hardware cryptography, and wireless interfaces.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
            Hardware Abstraction Layer (HAL)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {HARDWARE_FEATURES.map((hf) => (
            <div
              key={hf.feature}
              className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850 hover:border-neutral-750 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-850/80">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {hf.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      hf.status === "Native & Tested"
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/50"
                        : hf.status === "Conditional"
                        ? "bg-amber-950/60 text-amber-300 border border-amber-800/50"
                        : "bg-blue-950/60 text-blue-300 border border-blue-800/50"
                    }`}
                  >
                    {hf.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-neutral-100 mt-2">
                  {hf.feature}
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {hf.details}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-neutral-900 font-mono text-[10px] text-cyan-400 truncate">
                {hf.classesInvolved}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
